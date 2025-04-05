"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  audioFeatures: {
    tempo: number;
    danceability: number;
    energy: number;
    valence: number;
  };
};

export function MusicInput() {
  const [musicLink, setMusicLink] = useState("");
  const [trackInfo, setTrackInfo] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTrackInfo(null);

    try {
      const trackId = extractTrackId(musicLink);
      if (!trackId) {
        throw new Error("Invalid Spotify link format");
      }

      // Call secure server-side endpoints for track and audio features data
      const [trackRes, featuresRes] = await Promise.all([
        axios.get(`/api/spotify/track?id=${trackId}`),
        axios.get(`/api/spotify/audio-features?id=${trackId}`),
      ]);

      // Check if response status is 200
      if (trackRes.status !== 200 || featuresRes.status !== 200) {
        throw new Error("Error fetching data from Spotify");
      }

      // Combine track and audio features data into trackInfo
      setTrackInfo({
        ...trackRes.data,
        audioFeatures: featuresRes.data,
      });
    } catch (err: any) {
      console.error("Fetch error:", err);
      // Handle Spotify-specific error message
      setError(
        err.response?.data?.error?.message ||
          err.message ||
          "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Extract track ID from Spotify URL or URI
  const extractTrackId = (input: string): string | null => {
    const spotifyRegex =
      /(?:spotify:track:|https:\/\/open\.spotify\.com\/track\/)([a-zA-Z0-9]{22})/;
    const match = input.match(spotifyRegex);
    return match ? match[1] : null;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Input Music Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Analyze Spotify Track</DialogTitle>
          <DialogDescription>
            Paste a Spotify track link to analyze its musical characteristics.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="spotify-link" className="text-right">
                Spotify Link
              </Label>
              <Input
                id="spotify-link"
                value={musicLink}
                onChange={(e) => setMusicLink(e.target.value)}
                className="col-span-3"
                placeholder="https://open.spotify.com/track/..."
                type="url"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Analyze Track"}
            </Button>
          </DialogFooter>
        </form>

        {trackInfo && (
          <div className="py-4 space-y-2">
            <h3 className="font-bold">Track Analysis</h3>
            <p>
              <strong>🎵 Track:</strong> {trackInfo.name}
            </p>
            <p>
              <strong>🎤 Artist:</strong> {trackInfo.artists[0].name}
            </p>
            <p>
              <strong>⏱️ BPM:</strong>{" "}
              {Math.round(trackInfo.audioFeatures.tempo)}
            </p>
            <p>
              <strong>💃 Danceability:</strong>{" "}
              {(trackInfo.audioFeatures.danceability * 100).toFixed(0)}%
            </p>
            <p>
              <strong>⚡ Energy:</strong>{" "}
              {(trackInfo.audioFeatures.energy * 100).toFixed(0)}%
            </p>
            <p>
              <strong>😊 Mood:</strong>{" "}
              {(trackInfo.audioFeatures.valence * 100).toFixed(0)}%
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
