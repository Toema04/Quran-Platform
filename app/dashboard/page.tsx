"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Bookmark, Heart, Flame, Settings, ChevronRight, User } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

export default function DashboardPage() {
  const { t } = useSettings();

  const stats = [
    { label: "Surahs Read", value: "14 / 114", icon: BookOpen },
    { label: "Bookmarks Saved", value: "8", icon: Bookmark },
    { label: "Reading Streak", value: "5 Days", icon: Flame },
    { label: "Favorite Reciter", value: "Mishary Alafasy", icon: Heart },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
            <User className="h-4 w-4" />
            <span>Welcome to your Quran Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Personal Companion
          </h1>
          <p className="text-emerald-100 text-sm max-w-xl">
            Track your recitation progress, review your active bookmarks, manage your favorite Qaris, and maintain your daily Quran streak.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/quran/1"
            className="px-6 py-3 rounded-2xl bg-white text-emerald-950 font-bold text-sm hover:bg-emerald-50 transition shadow-md flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            <span>Continue Reading</span>
          </Link>
          <Link
            href="/settings"
            className="p-3 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-700/50 text-white transition"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl border border-emerald-900/10 bg-card space-y-2">
              <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-300">
                <span className="text-xs font-semibold text-muted-foreground">{s.label}</span>
                <Icon className="h-4 w-4" />
              </div>
              <p className="font-serif font-bold text-xl md:text-2xl text-foreground">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl border border-emerald-900/10 bg-card space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              <Bookmark className="h-5 w-5" />
              <h2 className="font-serif font-bold text-lg text-foreground">{t.bookmarks}</h2>
            </div>
            <Link href="/bookmarks" className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="/quran/2/255" className="p-3.5 rounded-2xl bg-emerald-900/5 hover:bg-emerald-900/10 transition block space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Surah Al-Baqarah (2:255)</span>
                <span className="text-muted-foreground">Ayat al-Kursi</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ</p>
            </Link>

            <Link href="/quran/36/1" className="p-3.5 rounded-2xl bg-emerald-900/5 hover:bg-emerald-900/10 transition block space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Surah Ya-Sin (36:1)</span>
                <span className="text-muted-foreground">Daily Recitation</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">يس ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ</p>
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-emerald-900/10 bg-card space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              <Heart className="h-5 w-5" />
              <h2 className="font-serif font-bold text-lg text-foreground">{t.favorites}</h2>
            </div>
            <Link href="/favorites" className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="/quran/18" className="p-3.5 rounded-2xl bg-emerald-900/5 hover:bg-emerald-900/10 transition flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm text-foreground">Surah Al-Kahf</h3>
                <p className="text-xs text-muted-foreground">110 Verses</p>
              </div>
              <span className="font-arabic font-bold text-lg text-emerald-800 dark:text-emerald-300">الكهف</span>
            </Link>

            <Link href="/quran/67" className="p-3.5 rounded-2xl bg-emerald-900/5 hover:bg-emerald-900/10 transition flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm text-foreground">Surah Al-Mulk</h3>
                <p className="text-xs text-muted-foreground">30 Verses</p>
              </div>
              <span className="font-arabic font-bold text-lg text-emerald-800 dark:text-emerald-300">الملك</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
