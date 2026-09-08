"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSurahs } from "@/lib/api/quran";
import { Surah } from "@/types";
import { Search, BookOpen } from "lucide-react";

export default function QuranBrowserPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "Meccan" | "Medinan">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSurahs() {
      setLoading(true);
      const data = await getSurahs();
      setSurahs(data);
      setLoading(false);
    }
    loadSurahs();
  }, []);

  const filteredSurahs = surahs.filter((s) => {
    const matchesSearch =
      s.englishName.toLowerCase().includes(search.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
      s.name.includes(search) ||
      s.number.toString().includes(search);

    const matchesFilter = filter === "all" || s.revelationType === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">The Holy Quran</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Browse all 114 Surahs of the Glorious Quran with full Arabic text, transliteration, and authentic translations.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, translation, or number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-emerald-900/20 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl border border-emerald-900/10 bg-card text-xs font-semibold">
            {(["all", "Meccan", "Medinan"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-1.5 rounded-xl capitalize transition ${
                  filter === type
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type === "all" ? "All Surahs" : type === "Meccan" ? "Makki" : "Madani"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="h-28 rounded-2xl bg-emerald-900/10 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSurahs.map((s) => (
            <Link
              key={s.number}
              href={`/quran/${s.number}`}
              className="group p-5 rounded-2xl border border-emerald-900/10 bg-card hover:border-emerald-600/40 hover:shadow-md transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800/10 text-emerald-800 dark:text-emerald-300 font-bold text-xs group-hover:bg-emerald-800 group-hover:text-white transition">
                  {s.number}
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-900/5 text-emerald-700 dark:text-emerald-400">
                  {s.revelationType === "Meccan" ? "Makki" : "Madani"} • {s.numberOfAyahs} v
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <h3 className="font-serif font-bold text-base text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition">
                    {s.englishName}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                    {s.englishNameTranslation}
                  </p>
                </div>

                <p className="font-arabic font-bold text-xl text-emerald-900 dark:text-emerald-200" dir="rtl">
                  {s.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
