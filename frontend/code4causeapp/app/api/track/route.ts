import { NextResponse } from "next/server";
import axios from "axios";

const DEEZER_API_BASE_URL = "https://api.deezer.com";

async function fetchTrackData(trackId: string) {
  try {
    const trackRes = await axios.get(`${DEEZER_API_BASE_URL}/track/${trackId}`);

    const trackData = trackRes.data;

    return {
      name: trackData.title,
      artist: trackData.artist.name,
      bpm: trackData.bpm,
      danceability: trackData.danceability || 0, // Deezer might not directly return this, but you can infer
      energy: trackData.energy || 0,
      mood: trackData.mood || 0,
    };
  } catch (error) {
    console.error("Error fetching track data from Deezer:", error);
    throw new Error("Failed to fetch track data from Deezer");
  }
}

// API Route Handler
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackId = searchParams.get("id");

    if (!trackId) {
      return NextResponse.json(
        { error: "Track ID is required" },
        { status: 400 }
      );
    }

    const trackData = await fetchTrackData(trackId);

    return NextResponse.json(trackData);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch track data", message: error.message },
      { status: 500 }
    );
  }
}
