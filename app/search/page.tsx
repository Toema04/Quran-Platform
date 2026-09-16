"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { searchQuran } from "@/lib/api/quran";
import { SearchResult } from "@/types";
import { Search, BookOpen, Play, Loader2 } from "lucide-react";
import { useAudio } from "@/providers/audio-provider";
import { getAyahAudioUrl } from "@/lib/api/audio";
import { useSettings } from "@/providers/settings-provider";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const { playTrack } = useAudio();
  const { t } = useSettings();

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setSearched(true);
      const res = await searchQuran(query);
      setResults(res);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim() || val.trim().length < 2) {
      setResults([]);
      setLoading(false);
      setSearched(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <Search className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.search}</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Search across the entire Quran text, English translations, and Surah names in real-time.
        </p>

        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={handleQueryChange}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-emerald-900/20 bg-card text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
          />
          {loading && (
            <Loader2 className="absolute right-4 top-3.5 h-5 w-5 text-emerald-600 animate-spin" />
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-24 rounded-2xl bg-emerald-900/10 animate-pulse" />
          ))}
        </div>
      ) : searched && results.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-3xl border border-dashed border-emerald-900/20 bg-card/50">
          <p className="text-muted-foreground text-base">{t.noResults}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((res, index) => (
            <div
              key={`${res.surahNumber}-${res.ayahNumber}-${index}`}
              className="p-6 rounded-2xl border border-emerald-900/10 bg-card hover:border-emerald-600/30 transition space-y-3"
            >
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                <Link
                  href={`/quran/${res.surahNumber}/${res.ayahNumber}`}
                  className="flex items-center gap-2 hover:text-emerald-700 transition"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-800 text-white font-bold text-xs">
                    {res.surahNumber}:{res.ayahNumber}
                  </span>
                  <span className="font-serif font-bold text-sm text-foreground">
                    {res.surahName}
                  </span>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      playTrack({
                        surahNumber: res.surahNumber,
                        ayahNumber: res.ayahNumber,
                        surahName: res.surahName,
                        audioUrl: getAyahAudioUrl(res.surahNumber, res.ayahNumber),
                      })
                    }
                    className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition"
                    title={t.play}
                  >
                    <Play className="h-4 w-4" />
                  </button>

                  <Link
                    href={`/quran/${res.surahNumber}/${res.ayahNumber}`}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-emerald-700 transition"
                    title="Open Ayah"
                  >
                    <BookOpen className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-serif">
                {res.translation || res.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
