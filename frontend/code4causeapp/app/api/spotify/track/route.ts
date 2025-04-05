const clientId = "a66b1a3d712e4b9bbbf88ae70263c754"; // Replace with your actual client ID
const code = getUrlCode();

if (!code) {
  redirectToAuthCodeFlow(clientId); // Redirect to Spotify authorization if no code in URL
} else {
  handleAuthorizationCodeFlow(clientId, code); // Process the code if it exists
}

// Function to extract the code from the URL (for the callback flow)
function getUrlCode(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("code");
}

// Handle the Authorization Code Flow (to get the access token)
async function handleAuthorizationCodeFlow(clientId: string, code: string) {
  try {
    // Get the access token using the code received in the callback
    const accessToken = await getAccessToken(clientId, code);

    // Fetch the track metrics using the access token
    const trackId = "3n3Ppam7vgaVa1iaRUc9Lp"; // Example track ID (you'd replace this with actual track ID)
    const trackData = await fetchTrackData(accessToken, trackId);
    const audioFeatures = await fetchAudioFeatures(accessToken, trackId);

    // Update the UI with track metrics
    populateUI(trackData, audioFeatures);
  } catch (error) {
    console.error("Authorization flow error:", error);
  }
}

// Step 1: Redirect to Spotify's authorization page for user consent
async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  // Store the verifier in localStorage to match it later during token exchange
  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:3000/callback"); // Your callback URL
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  // Redirect to Spotify for user login/consent
  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Function to get the access token by exchanging the authorization code
async function getAccessToken(clientId: string, code: string) {
  const verifier = localStorage.getItem("verifier"); // Retrieve the stored verifier
  if (!verifier) throw new Error("Verifier not found.");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://127.0.0.1:5173/callback"); // Your callback URL
  params.append("code_verifier", verifier);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:your-client-secret-here`)}`,
    },
  });

  const data = await response.json();
  if (!data.access_token) throw new Error("Failed to get access token.");

  return data.access_token;
}

// Function to fetch track data from Spotify's API
async function fetchTrackData(token: string, trackId: string) {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const trackData = await response.json();
  return trackData;
}

// Function to fetch audio features (metrics) from Spotify's API
async function fetchAudioFeatures(token: string, trackId: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const audioFeatures = await response.json();
  return audioFeatures;
}

// Update the UI with track information and metrics
function populateUI(trackData: any, audioFeatures: any) {
  const trackName = trackData.name;
  const artistName = trackData.artists[0].name;
  const tempo = Math.round(audioFeatures.tempo);
  const danceability = (audioFeatures.danceability * 100).toFixed(0);
  const energy = (audioFeatures.energy * 100).toFixed(0);
  const mood = (audioFeatures.valence * 100).toFixed(0);

  document.getElementById("trackName")!.innerText = `🎵 Track: ${trackName}`;
  document.getElementById("artistName")!.innerText = `🎤 Artist: ${artistName}`;
  document.getElementById("tempo")!.innerText = `⏱️ BPM: ${tempo}`;
  document.getElementById(
    "danceability"
  )!.innerText = `💃 Danceability: ${danceability}%`;
  document.getElementById("energy")!.innerText = `⚡ Energy: ${energy}%`;
  document.getElementById("mood")!.innerText = `😊 Mood: ${mood}%`;
}

// Function to generate the code verifier for PKCE
function generateCodeVerifier(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Function to generate the code challenge for PKCE
async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
