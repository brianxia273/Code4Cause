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

type Track = {
  name: string;
  artist: string;
  bpm: number;
  danceability: number;
  energy: number;
  mood: number;
  rank: number; // Add rank property
};

export function MusicInput() {
  const [musicLink, setMusicLink] = useState("");
  const [trackInfo, setTrackInfo] = useState<Track | null>(null);
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
        throw new Error("Invalid Deezer link format");
      }

      // Fetch track data from your backend (which calls Deezer API)
      const trackRes = await axios.get(`/api/track?id=${trackId}`);

      // Check if response is successful
      if (trackRes.status === 200) {
        const trackData = trackRes.data;
        const rank = calculateRank(trackData); // Calculate rank
        setTrackInfo({ ...trackData, rank }); // Add rank to track data
      } else {
        throw new Error("Error fetching data from Deezer");
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to extract Deezer track ID from URL
  const extractTrackId = (input: string): string | null => {
    // Deezer track URL regex
    const deezerRegex = /(?:deezer\.com\/(?:[^\/]+\/\S+\/|track\/))(\d+)/;
    const match = input.match(deezerRegex);
    return match ? match[1] : null;
  };

  // Function to calculate the rank out of 100
  const calculateRank = (trackData: Track): number => {
    const { bpm, danceability, energy, mood } = trackData;

    // Normalize BPM (assuming BPM ranges from 60 to 200)
    const bpmScore = bpm ? Math.min(((bpm - 60) / 140) * 100, 100) : 0;

    // Use preset values for Danceability, Energy, Mood
    const danceabilityScore = danceability ? danceability * 100 : 69.8; // Default preset
    const energyScore = energy ? energy * 100 : 45.2; // Default preset
    const moodScore = mood ? mood * 100 : 34.6; // Default preset

    // Calculate the final rank as an average
    const finalRank =
      (bpmScore + danceabilityScore + energyScore + moodScore) / 4;

    return Math.round(finalRank); // Round to nearest integer
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Input Music Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Analyze Track</DialogTitle>
          <DialogDescription>
            Paste a Deezer track link to analyze its musical characteristics.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="track-link" className="text-right">
                Track Link
              </Label>
              <Input
                id="track-link"
                value={musicLink}
                onChange={(e) => setMusicLink(e.target.value)}
                className="col-span-3"
                placeholder="https://www.deezer.com/track/..."
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
              <strong>🎤 Artist:</strong> {trackInfo.artist}
            </p>
            <p>
              {/* 5 metrics still work in progress: hard-coded for now */}
              <strong>⏱️ BPM:</strong> {123}
            </p>
            <p>
              <strong>💃 Danceability:</strong> {(0.698 * 100).toFixed()}%
            </p>
            <p>
              <strong>⚡ Energy:</strong> {(0.452 * 100).toFixed(0)}%
            </p>
            <p>
              <strong>😊 Mood:</strong> {(0.346 * 100).toFixed(0)}%
            </p>
            <p>
              <strong>🏆 Rank:</strong> {trackInfo.rank} / 100
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
