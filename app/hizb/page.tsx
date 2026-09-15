"use client";

import React from "react";
import Link from "next/link";
import { HIZB_QUARTERS } from "@/lib/api/quran";
import { BookOpen, ChevronRight } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

export default function HizbIndexPage() {
  const { t } = useSettings();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.hizbQuarters}</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          The Quran contains 60 Hizbs, subdivided into 240 Quarter Hizbs for structured daily recitation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {HIZB_QUARTERS.slice(0, 60).map((hizb) => (
          <Link
            key={hizb.quarterNumber}
            href={`/quran/${hizb.surahNumber}`}
            className="group p-5 rounded-2xl border border-emerald-900/10 bg-card hover:border-emerald-600/40 hover:shadow-md transition space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800/10 text-emerald-800 dark:text-emerald-300 font-bold text-xs group-hover:bg-emerald-800 group-hover:text-white transition">
                Hizb {hizb.hizbNumber}
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground">
                Juz {hizb.juzNumber}
              </span>
            </div>

            <div>
              <h3 className="font-serif font-bold text-sm text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition">
                Quarter {hizb.quarterInHizb}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {hizb.surahName} (Ayah {hizb.ayahNumber})
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
