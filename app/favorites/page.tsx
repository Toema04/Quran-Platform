"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Play, Trash2 } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

type FavoriteSurah = {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
};

export default function FavoritesPage() {
  const { t } = useSettings();
  const [favorites, setFavorites] = useState<FavoriteSurah[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quran_favorites");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      { number: 18, name: "الكهف", englishName: "Al-Kahf", numberOfAyahs: 110 },
      { number: 36, name: "يس", englishName: "Ya-Sin", numberOfAyahs: 83 },
      { number: 67, name: "الملك", englishName: "Al-Mulk", numberOfAyahs: 30 },
    ];
  });

  const removeFavorite = (number: number) => {
    const updated = favorites.filter((f) => f.number !== number);
    setFavorites(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_favorites", JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.favorites}</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Your favorite Quran Surahs saved for quick daily access.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-3xl border border-dashed border-emerald-900/20 bg-card/50">
          <p className="text-muted-foreground text-base">No favorite surahs saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((s) => (
            <div
              key={s.number}
              className="p-5 rounded-2xl border border-emerald-900/10 bg-card hover:border-emerald-600/30 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800/10 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  {s.number}
                </span>
                <div>
                  <Link href={`/quran/${s.number}`} className="font-serif font-bold text-base text-foreground hover:underline">
                    {s.englishName}
                  </Link>
                  <p className="text-xs text-muted-foreground">{s.numberOfAyahs} Verses</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-arabic font-bold text-xl text-emerald-900 dark:text-emerald-200" dir="rtl">
                  {s.name}
                </span>

                <button
                  onClick={() => removeFavorite(s.number)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
