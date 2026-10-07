"use client";

import React from "react";
import Link from "next/link";
import { Search, User, Globe } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

export function Header() {
  const { settings, updateSettings, t } = useSettings();

  const toggleLanguage = () => {
    const nextLang = settings.language === "ar" ? "en" : "ar";
    updateSettings({ language: nextLang });
  };

  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-emerald-900/10 px-4 md:px-8 py-3.5 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="h-9 w-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
          ق
        </div>
        <div>
          <span className="font-serif font-bold text-lg tracking-tight text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition">
            {t.brand}
          </span>
          <span className="text-[10px] block font-arabic text-emerald-700 font-semibold -mt-1">
            {t.subBrand}
          </span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-muted-foreground">
        <Link href="/quran" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          {t.quran}
        </Link>
        <Link href="/juz" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          {t.juz}
        </Link>
        <Link href="/search" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          {t.search}
        </Link>
        <Link href="/tafsir" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          {t.tafsir}
        </Link>
        <Link href="/reciters" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          {t.reciters}
        </Link>
        <Link href="/adhkar" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          {t.adhkar}
        </Link>
        <Link href="/quiz" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          {t.quiz}
        </Link>
        <Link href="/prayer-times" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          {t.prayerTimes}
        </Link>
        <Link href="/ramadan" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">
          {t.ramadan}
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleLanguage}
          className="px-2.5 py-1.5 rounded-xl border border-emerald-900/10 text-xs font-semibold text-muted-foreground hover:bg-emerald-900/10 hover:text-emerald-800 transition flex items-center gap-1.5"
          title="Switch Language / تغيير اللغة"
        >
          <Globe className="h-3.5 w-3.5" />
          <span>{settings.language === "ar" ? "English" : "العربية"}</span>
        </button>

        <Link
          href="/search"
          className="p-2 rounded-xl text-muted-foreground hover:bg-emerald-900/10 hover:text-emerald-800 transition"
        >
          <Search className="h-4 w-4" />
        </Link>

        <Link
          href="/dashboard"
          className="px-3.5 py-1.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition shadow-xs flex items-center gap-1.5"
        >
          <User className="h-3.5 w-3.5" />
          <span>{t.account}</span>
        </Link>
      </div>
    </header>
  );
}
