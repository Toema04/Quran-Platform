"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Headphones, Search, Clock, Compass, Sparkles, ChevronRight, Moon } from "lucide-react";

export default function HomePage() {
  const popularSurahs = [
    { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7 },
    { number: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286 },
    { number: 18, name: "Al-Kahf", arabic: "الكهف", verses: 110 },
    { number: 36, name: "Ya-Sin", arabic: "يس", verses: 83 },
    { number: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78 },
    { number: 67, name: "Al-Mulk", arabic: "الملك", verses: 30 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-8 md:p-14 text-white shadow-xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-700/50 text-emerald-200 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Complete Digital Quran Companion</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
          Read. Listen. Reflect.
        </h1>

        <p className="text-emerald-100 text-sm md:text-base max-w-2xl leading-relaxed">
          Experience the Holy Quran with crystal-clear audio recitations, verified classical Tafsir, verse search, bookmark synchronization, prayer schedules, and Ramadan companion mode.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/quran"
            className="px-6 py-3 rounded-2xl bg-white text-emerald-950 font-bold text-sm hover:bg-emerald-50 transition shadow-md flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            <span>Start Reading</span>
          </Link>

          <Link
            href="/reciters"
            className="px-6 py-3 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-700/50 text-white font-semibold text-sm transition flex items-center gap-2"
          >
            <Headphones className="h-4 w-4" />
            <span>Listen Recitations</span>
          </Link>
        </div>
      </section>

      <section className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-700" />
            <h2 className="font-serif font-bold text-lg text-foreground">Verse of the Day</h2>
          </div>
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Surah Al-Baqarah (2:255)</span>
        </div>

        <div className="text-right py-4" dir="rtl">
          <p className="font-arabic font-bold text-2xl md:text-3xl text-emerald-950 dark:text-emerald-100 leading-widest">
            اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed font-serif">
          &quot;Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.&quot;
        </p>

        <div className="pt-2 flex items-center justify-end">
          <Link
            href="/quran/2/255"
            className="text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline flex items-center gap-1"
          >
            <span>Read Verse Tafsir</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-2xl text-foreground">Popular Surahs</h2>
          <Link href="/quran" className="text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline flex items-center gap-1">
            <span>View All 114</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {popularSurahs.map((s) => (
            <Link
              key={s.number}
              href={`/quran/${s.number}`}
              className="p-5 rounded-2xl border border-emerald-900/10 bg-card hover:border-emerald-600/40 hover:shadow-md transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800/10 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  {s.number}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base text-foreground">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.verses} Verses</p>
                </div>
              </div>

              <span className="font-arabic font-bold text-xl text-emerald-900 dark:text-emerald-200">
                {s.arabic}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/search" className="p-5 rounded-2xl border border-emerald-900/10 bg-card hover:bg-emerald-900/5 transition space-y-2 text-center">
          <Search className="h-6 w-6 text-emerald-700 mx-auto" />
          <h4 className="font-bold text-sm">Verse Search</h4>
        </Link>
        <Link href="/prayer-times" className="p-5 rounded-2xl border border-emerald-900/10 bg-card hover:bg-emerald-900/5 transition space-y-2 text-center">
          <Clock className="h-6 w-6 text-emerald-700 mx-auto" />
          <h4 className="font-bold text-sm">Prayer Times</h4>
        </Link>
        <Link href="/qibla" className="p-5 rounded-2xl border border-emerald-900/10 bg-card hover:bg-emerald-900/5 transition space-y-2 text-center">
          <Compass className="h-6 w-6 text-emerald-700 mx-auto" />
          <h4 className="font-bold text-sm">Qibla Compass</h4>
        </Link>
        <Link href="/ramadan" className="p-5 rounded-2xl border border-emerald-900/10 bg-card hover:bg-emerald-900/5 transition space-y-2 text-center">
          <Moon className="h-6 w-6 text-amber-600 mx-auto" />
          <h4 className="font-bold text-sm">Ramadan Hub</h4>
        </Link>
      </section>
    </div>
  );
}
