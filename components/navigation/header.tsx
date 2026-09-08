"use client";

import React from "react";
import Link from "next/link";
import { Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-emerald-900/10 px-4 md:px-8 py-3.5 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="h-9 w-9 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
          ق
        </div>
        <div>
          <span className="font-serif font-bold text-lg tracking-tight text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition">
            Quran Platform
          </span>
          <span className="text-[10px] block font-arabic text-emerald-700 font-semibold -mt-1">
            القرآن الكريم
          </span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-muted-foreground">
        <Link href="/quran" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          Quran
        </Link>
        <Link href="/juz" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          Juz
        </Link>
        <Link href="/search" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          Search
        </Link>
        <Link href="/tafsir" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          Tafsir
        </Link>
        <Link href="/reciters" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          Reciters
        </Link>
        <Link href="/prayer-times" className="hover:text-emerald-800 dark:hover:text-emerald-300 transition">
          Prayer Times
        </Link>
        <Link href="/ramadan" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">
          Ramadan
        </Link>
      </nav>

      <div className="flex items-center gap-2">
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
          <span>Account</span>
        </Link>
      </div>
    </header>
  );
}
