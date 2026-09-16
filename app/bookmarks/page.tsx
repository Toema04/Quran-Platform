"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Play, Trash2, BookOpen } from "lucide-react";
import { useAudio } from "@/providers/audio-provider";
import { getAyahAudioUrl } from "@/lib/api/audio";
import { useSettings } from "@/providers/settings-provider";

type BookmarkItem = {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  arabicText: string;
  translation: string;
  note?: string;
  date: string;
};

export default function BookmarksPage() {
  const { t } = useSettings();
  const { playTrack } = useAudio();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quran_bookmarks");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      {
        surahNumber: 2,
        ayahNumber: 255,
        surahName: "Al-Baqarah",
        arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
        translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence.",
        note: "Ayat al-Kursi daily reflection",
        date: new Date().toLocaleDateString(),
      },
    ];
  });

  const removeBookmark = (surahNum: number, ayahNum: number) => {
    const updated = bookmarks.filter((b) => !(b.surahNumber === surahNum && b.ayahNumber === ayahNum));
    setBookmarks(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_bookmarks", JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <Bookmark className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.bookmarks}</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Your saved Quran verses and personal reflection notes.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-3xl border border-dashed border-emerald-900/20 bg-card/50">
          <p className="text-muted-foreground text-base">No bookmarks saved yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((b) => (
            <div
              key={`${b.surahNumber}-${b.ayahNumber}`}
              className="p-6 rounded-3xl border border-emerald-900/10 bg-card hover:border-emerald-600/30 transition space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between border-b pb-3 text-xs">
                <Link
                  href={`/quran/${b.surahNumber}/${b.ayahNumber}`}
                  className="flex items-center gap-2 hover:text-emerald-700 transition"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-800 text-white font-bold">
                    {b.surahNumber}:{b.ayahNumber}
                  </span>
                  <span className="font-serif font-bold text-sm text-foreground">
                    Surah {b.surahName}
                  </span>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      playTrack({
                        surahNumber: b.surahNumber,
                        ayahNumber: b.ayahNumber,
                        surahName: b.surahName,
                        audioUrl: getAyahAudioUrl(b.surahNumber, b.ayahNumber),
                      })
                    }
                    className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition"
                    title={t.play}
                  >
                    <Play className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => removeBookmark(b.surahNumber, b.ayahNumber)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="text-right" dir="rtl">
                <p className="font-arabic font-bold text-xl text-emerald-950 dark:text-emerald-100 leading-widest">
                  {b.arabicText}
                </p>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed font-serif">{b.translation}</p>

              {b.note && (
                <div className="p-3 rounded-2xl bg-emerald-900/5 border border-emerald-900/10 text-xs text-muted-foreground italic">
                  Note: {b.note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
