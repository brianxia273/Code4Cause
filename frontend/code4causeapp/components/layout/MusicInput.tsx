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
  explicit_lyrics: boolean;
  rank: number;
};

type Album = {
  id: string;
  title: string;
  bpm: number;
  artist: string;
  explicit_lyrics: boolean;
  rank: number;
};

export function MusicInput() {
  const [musicLink, setMusicLink] = useState("");
  const [trackInfo, setTrackInfo] = useState<Track | Album | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTrackInfo(null);

    try {
      const trackId = extractTrackId(musicLink);
      const albumId = extractAlbumId(musicLink);

      if (trackId) {
        // Fetch track data from your backend (which calls Deezer API)
        const trackRes = await axios.get(`/api/track?id=${trackId}`);

        if (trackRes.status === 200) {
          const trackData = trackRes.data;
          const rank = calculateRank(trackData.bpm, trackData.explicit_lyrics);
          setTrackInfo({ ...trackData, rank });
        } else {
          throw new Error("Error fetching data from Deezer");
        }
      } else if (albumId) {
        // Fetch album data from your backend (which calls Deezer API)
        const albumRes = await axios.get(`/api/album?id=${albumId}`);

        if (albumRes.status === 200) {
          const albumData = albumRes.data;
          const rank = calculateRank(albumData.bpm, albumData.explicit_lyrics);
          setTrackInfo({ ...albumData, rank });
        } else {
          throw new Error("Error fetching data from Deezer");
        }
      } else {
        throw new Error("Invalid Deezer link format");
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
    const deezerTrackRegex = /deezer\.com\/track\/(\d+)/;
    const match = input.match(deezerTrackRegex);
    return match ? match[1] : null;
  };

  // Function to extract Deezer album ID from URL
  const extractAlbumId = (input: string): string | null => {
    const deezerAlbumRegex = /deezer\.com\/album\/(\d+)/;
    const match = input.match(deezerAlbumRegex);
    return match ? match[1] : null;
  };

  // Function to calculate rank based on BPM and explicit content
  const calculateRank = (bpm: number, explicit_lyrics: boolean): number => {
    let baseRank = 50;

    // Use BPM to determine rank
    if (bpm === 0) {
      baseRank = 40; // Handle tracks with BPM of 0 (unknown or non-standard tempo)
    } else if (bpm < 100) {
      baseRank = 40; // Slow tempo tracks
    } else if (bpm >= 100 && bpm <= 120) {
      baseRank = 60; // Medium tempo tracks
    } else {
      baseRank = 80; // Fast tempo tracks
    }

    // Adjust rank for explicit content
    if (explicit_lyrics) {
      baseRank -= 15; // Subtract 15 points for explicit content
    }

    return Math.max(0, Math.min(100, baseRank));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Input Music Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Analyze Track or Album</DialogTitle>
          <DialogDescription>
            Paste a Deezer track or album link to analyze its musical
            characteristics.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="music-link" className="text-right">
                Music Link
              </Label>
              <Input
                id="music-link"
                value={musicLink}
                onChange={(e) => setMusicLink(e.target.value)}
                className="col-span-3"
                placeholder="https://www.deezer.com/track/... or https://www.deezer.com/album/..."
                type="url"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Analyze Music"}
            </Button>
          </DialogFooter>
        </form>

        {trackInfo && (
          <div className="py-4 space-y-2">
            <h3 className="font-bold">Music Analysis</h3>
            <p>
              <strong>🎵 Title:</strong> {trackInfo.title}
            </p>
            <p>
              <strong>🎤 Artist:</strong> {trackInfo.artist}
            </p>
            <p>
              <strong>🎶 BPM:</strong> {trackInfo.bpm}
            </p>
            <p>
              <strong>🚨 Explicit Content:</strong>{" "}
              {trackInfo.explicit_lyrics ? "Yes" : "No"}
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
