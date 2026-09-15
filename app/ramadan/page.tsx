"use client";

import React from "react";
import Link from "next/link";
import { Moon, Sparkles, BookOpen, Clock, Heart } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

export default function RamadanPage() {
  const { t } = useSettings();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-emerald-950 to-teal-950 p-8 md:p-14 text-white shadow-xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
          <Moon className="h-4 w-4" />
          <span>Holy Month Companion</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
          Ramadan Mubarak
        </h1>

        <p className="text-emerald-100 text-sm md:text-base max-w-2xl leading-relaxed">
          Welcome to the blessed month of Quran, fasting, and spiritual reflection. Track your daily Quran Khatm, checkSuhoor and Iftar timings, and listen to recitations.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/prayer-times"
            className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition shadow-md flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            <span>Check Iftar & Suhoor Times</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl border border-emerald-900/10 bg-card space-y-4">
          <div className="flex items-center gap-2 text-amber-600 font-serif font-bold text-lg">
            <Sparkles className="h-5 w-5" />
            <h2>Iftar Supplication (Dua)</h2>
          </div>
          <p className="font-arabic font-bold text-2xl text-right text-emerald-950 dark:text-emerald-100 leading-widest py-2" dir="rtl">
            ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ
          </p>
          <p className="text-xs text-muted-foreground font-serif leading-relaxed">
            &quot;The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.&quot;
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-emerald-900/10 bg-card space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-serif font-bold text-lg">
            <BookOpen className="h-5 w-5" />
            <h2>Daily Quran Khatm Plan</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Complete the entire Holy Quran in 30 days by reading 1 Juz per day or 4 pages after each of the 5 daily prayers.
          </p>
          <Link
            href="/juz"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline"
          >
            <span>Explore 30 Juz Plan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
