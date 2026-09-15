"use client";

import React from "react";
import { useAudio } from "@/providers/audio-provider";
import { Play, Pause, Music, Repeat } from "lucide-react";

export function AudioPlayerUI() {
  const { currentTrack, isPlaying, togglePlay, playbackSpeed, setSpeed, repeatMode, setRepeatMode } = useAudio();

  if (!currentTrack) return null;

  const cycleRepeat = () => {
    if (repeatMode === "none") setRepeatMode("ayah");
    else if (repeatMode === "ayah") setRepeatMode("surah");
    else setRepeatMode("none");
  };

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-emerald-900/15 p-3 md:px-8 md:py-3 shadow-2xl flex items-center justify-between transition-all">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Music className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-serif font-bold text-sm text-foreground truncate">
            Surah {currentTrack.surahName || currentTrack.surahNumber}
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            Verse {currentTrack.ayahNumber}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={cycleRepeat}
          className={`p-2 rounded-xl text-xs font-semibold border transition flex items-center gap-1 ${
            repeatMode !== "none"
              ? "bg-emerald-800/10 border-emerald-600 text-emerald-800 dark:text-emerald-300"
              : "border-emerald-900/10 text-muted-foreground hover:text-foreground"
          }`}
          title={`Repeat: ${repeatMode}`}
        >
          <Repeat className="h-4 w-4" />
          <span className="hidden sm:inline capitalize text-[10px]">{repeatMode}</span>
        </button>

        <button
          onClick={togglePlay}
          className="h-10 w-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center hover:bg-emerald-700 transition shadow-sm"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
        </button>

        <select
          value={playbackSpeed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="hidden sm:block text-xs font-semibold px-2 py-1.5 rounded-xl border border-emerald-900/20 bg-background"
        >
          <option value={0.75}>0.75x</option>
          <option value={1}>1.0x</option>
          <option value={1.25}>1.25x</option>
          <option value={1.5}>1.5x</option>
        </select>
      </div>
    </div>
  );
}
