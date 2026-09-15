"use client";

import React from "react";
import Link from "next/link";
import { JUZ_METADATA } from "@/lib/api/quran";
import { BookOpen, ChevronRight } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

export default function JuzIndexPage() {
  const { t } = useSettings();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.thirtyJuz}</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          The Quran is divided into 30 equal parts called Juz. Browse and read any Juz below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {JUZ_METADATA.map((juz) => (
          <Link
            key={juz.juzNumber}
            href={`/juz/${juz.juzNumber}`}
            className="group p-5 rounded-2xl border border-emerald-900/10 bg-card hover:border-emerald-600/40 hover:shadow-md transition space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800/10 text-emerald-800 dark:text-emerald-300 font-bold text-xs group-hover:bg-emerald-800 group-hover:text-white transition">
                {juz.juzNumber}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-700 transition" />
            </div>

            <div>
              <h3 className="font-serif font-bold text-base text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition">
                Juz {juz.juzNumber}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Starts: {juz.startSurahName} ({juz.startSurah}:{juz.startAyah})
              </p>
              <p className="text-xs text-muted-foreground">
                Ends: {juz.endSurahName} ({juz.endSurah}:{juz.endAyah})
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
