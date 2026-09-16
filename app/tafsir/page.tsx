"use client";

import React, { useState, useEffect } from "react";
import { getSurahs, SURAHS_METADATA } from "@/lib/api/quran";
import { TAFSIR_EDITIONS, getAyahTafsir } from "@/lib/api/tafsir";
import { Surah } from "@/types";
import { Book, Loader2 } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

export default function TafsirExplorerPage() {
  const { t } = useSettings();
  const [surahs, setSurahs] = useState<Surah[]>(SURAHS_METADATA);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedAyah, setSelectedAyah] = useState(1);
  const [selectedEdition, setSelectedEdition] = useState("en-tafisr-ibn-kathir");
  const [tafsirData, setTafsirData] = useState<{ text: string; authorName: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSurahList() {
      const data = await getSurahs();
      if (data && data.length > 0) setSurahs(data);
    }
    loadSurahList();
  }, []);

  useEffect(() => {
    async function loadTafsir() {
      setLoading(true);
      const res = await getAyahTafsir(selectedSurah, selectedAyah, selectedEdition);
      setTafsirData(res);
      setLoading(false);
    }
    loadTafsir();
  }, [selectedSurah, selectedAyah, selectedEdition]);

  const currentSurah = surahs.find((s) => s.number === selectedSurah) || surahs[0];
  const maxAyahs = currentSurah ? currentSurah.numberOfAyahs : 7;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <Book className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.tafsir}</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Explore authentic classical commentaries and explanations of Quranic verses from renowned scholars.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Surah</label>
            <select
              value={selectedSurah}
              onChange={(e) => {
                setSelectedSurah(Number(e.target.value));
                setSelectedAyah(1);
              }}
              className="w-full p-2.5 rounded-2xl border border-emerald-900/20 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {surahs.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.englishName} ({s.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Ayah</label>
            <select
              value={selectedAyah}
              onChange={(e) => setSelectedAyah(Number(e.target.value))}
              className="w-full p-2.5 rounded-2xl border border-emerald-900/20 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {Array.from({ length: maxAyahs }, (_, i) => i + 1).map((aNum) => (
                <option key={aNum} value={aNum}>
                  Ayah {aNum}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Tafsir Source</label>
            <select
              value={selectedEdition}
              onChange={(e) => setSelectedEdition(e.target.value)}
              className="w-full p-2.5 rounded-2xl border border-emerald-900/20 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {TAFSIR_EDITIONS.map((ed) => (
                <option key={ed.id} value={ed.id}>
                  {ed.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center rounded-3xl border border-emerald-900/10 bg-card">
          <Loader2 className="h-8 w-8 text-emerald-700 animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">{t.loading}</p>
        </div>
      ) : tafsirData ? (
        <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              {tafsirData.authorName}
            </span>
            <span className="text-xs text-muted-foreground font-semibold">
              Surah {currentSurah.englishName} ({selectedSurah}:{selectedAyah})
            </span>
          </div>

          <div className="text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-line pt-2 font-serif">
            {tafsirData.text}
          </div>
        </div>
      ) : null}
    </div>
  );
}
