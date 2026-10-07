"use client";

import React, { useState } from "react";
import { RECITERS } from "@/lib/api/reciters";
import { Headphones, Check, Play, Pause, Heart, Search } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";
import { useAudio } from "@/providers/audio-provider";
import { getAyahAudioUrl } from "@/lib/api/audio";

export default function RecitersPage() {
  const { settings, updateSettings, t } = useSettings();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quran_favorite_reciters");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed parsing favorite reciters", e);
        }
      }
    }
    return ["ar.alafasy"];
  });

  const toggleFavorite = (reciterId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(reciterId)
        ? prev.filter((id) => id !== reciterId)
        : [...prev, reciterId];
      if (typeof window !== "undefined") {
        localStorage.setItem("quran_favorite_reciters", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleSelectDefault = (reciterId: string) => {
    updateSettings({ reciter_id: reciterId });
  };

  const handlePreview = (reciterId: string) => {
    const isThisPlaying = currentTrack?.audioUrl.includes(reciterId) && isPlaying;
    if (isThisPlaying) {
      togglePlay();
    } else {
      playTrack({
        surahNumber: 1,
        ayahNumber: 1,
        surahName: "Al-Fatihah",
        audioUrl: getAyahAudioUrl(1, 1, reciterId),
      });
    }
  };

  const filteredReciters = RECITERS.filter((r) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      (r.arabicName && r.arabicName.includes(q)) ||
      (r.style && r.style.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <Headphones className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.qarisReciters}</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Choose from world-renowned Quran Qaris and Sheikhs. Select your preferred reciter to listen across the entire platform.
        </p>

        <div className="relative max-w-md pt-2">
          <Search className="absolute left-3.5 top-5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reciters by name (e.g., Alafasy, عبد الباسط)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-emerald-900/20 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {filteredReciters.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-3xl border border-dashed border-emerald-900/20 bg-card/50">
          <p className="text-muted-foreground text-sm">No reciters found matching &quot;{search}&quot;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredReciters.map((r) => {
            const isSelected = settings.reciter_id === r.id;
            const isFav = favorites.includes(r.id);
            const isPreviewPlaying = currentTrack?.audioUrl.includes(r.id) && isPlaying;

            return (
              <div
                key={r.id}
                className={`p-6 rounded-3xl border transition flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-xs"
                    : "border-emerald-900/10 bg-card hover:border-emerald-600/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base text-foreground">{r.name}</h3>
                    <p className="font-arabic font-semibold text-sm text-emerald-800 dark:text-emerald-300">
                      {r.arabicName}
                    </p>
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-900/10 text-emerald-800 dark:text-emerald-300 mt-1">
                      {r.style || "Murattal"}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFavorite(r.id)}
                    className={`p-2 rounded-full transition ${
                      isFav ? "text-red-500 fill-red-500" : "text-muted-foreground hover:text-red-500"
                    }`}
                    title="Favorite Reciter"
                  >
                    <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-emerald-900/10">
                  <button
                    onClick={() => handlePreview(r.id)}
                    className="p-2 rounded-xl border border-emerald-900/20 text-xs font-semibold hover:bg-emerald-900/10 transition flex items-center gap-1.5"
                  >
                    {isPreviewPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    <span>{isPreviewPlaying ? t.pause : "Sample"}</span>
                  </button>

                  <button
                    onClick={() => handleSelectDefault(r.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "bg-card border border-emerald-900/20 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Default</span>
                      </>
                    ) : (
                      <span>Set Default</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
