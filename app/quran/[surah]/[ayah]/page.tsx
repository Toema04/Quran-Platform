"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { getSurah, getSingleAyah } from "@/lib/api/quran";
import { getAyahAudioUrl } from "@/lib/api/audio";
import { getAyahTafsir } from "@/lib/api/tafsir";
import { useAudio } from "@/providers/audio-provider";
import { useSettings } from "@/providers/settings-provider";
import { Surah, Ayah } from "@/types";
import { Play, Pause, Book, Copy, ChevronLeft, ChevronRight, Share2 } from "lucide-react";

export default function SingleAyahPage({
  params,
}: {
  params: Promise<{ surah: string; ayah: string }>;
}) {
  const resolvedParams = use(params);
  const surahNum = parseInt(resolvedParams.surah) || 1;
  const ayahNum = parseInt(resolvedParams.ayah) || 1;

  const { settings } = useSettings();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayah, setAyah] = useState<Ayah | null>(null);
  const [tafsir, setTafsir] = useState<{ text: string; authorName: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const s = await getSurah(surahNum);
      const a = await getSingleAyah(surahNum, ayahNum);
      const tData = await getAyahTafsir(surahNum, ayahNum);
      setSurah(s);
      setAyah(a);
      setTafsir(tData);
      setLoading(false);
    }
    loadData();
  }, [surahNum, ayahNum]);

  if (loading) {
    return (
      <div className="space-y-6 py-12 max-w-3xl mx-auto">
        <div className="h-32 rounded-3xl bg-emerald-900/10 animate-pulse" />
        <div className="h-48 rounded-3xl bg-emerald-900/5 animate-pulse" />
      </div>
    );
  }

  if (!ayah || !surah) return <div className="text-center py-12">Verse not found.</div>;

  const isPlayingThis =
    currentTrack?.surahNumber === surahNum &&
    currentTrack?.ayahNumber === ayahNum &&
    isPlaying;

  const handleCopy = () => {
    const textToCopy = `${ayah.text}\n\n"${ayah.translation}"\n- Surah ${surah.englishName} (${surahNum}:${ayahNum})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 p-6 md:p-8 text-white shadow-lg space-y-4 text-center">
        <div className="flex items-center justify-between text-xs text-emerald-200">
          <Link
            href={ayahNum > 1 ? `/quran/${surahNum}/${ayahNum - 1}` : `/quran/${surahNum}`}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{ayahNum > 1 ? `Verse ${ayahNum - 1}` : `Surah ${surah.englishName}`}</span>
          </Link>

          <span className="font-semibold uppercase tracking-widest text-[11px] bg-emerald-700/50 px-3 py-1 rounded-full">
            Surah {surah.englishName} ({surahNum}:{ayahNum})
          </span>

          <Link
            href={ayahNum < surah.numberOfAyahs ? `/quran/${surahNum}/${ayahNum + 1}` : `/quran/${surahNum}`}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <span>{ayahNum < surah.numberOfAyahs ? `Verse ${ayahNum + 1}` : `Surah ${surah.englishName}`}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <h1 className="text-3xl font-serif font-bold text-white">
          {surah.englishName} — Verse {ayahNum}
        </h1>
      </div>

      <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4 text-xs">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-800 text-white font-bold">
            {surahNum}:{ayahNum}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isPlayingThis) togglePlay();
                else
                  playTrack({
                    surahNumber: surahNum,
                    ayahNumber: ayahNum,
                    surahName: surah.englishName,
                    audioUrl: getAyahAudioUrl(surahNum, ayahNum),
                  });
              }}
              className="p-2 rounded-xl bg-emerald-800/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-800 hover:text-white transition"
            >
              {isPlayingThis ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl text-muted-foreground hover:bg-emerald-900/10 hover:text-emerald-800 transition"
            >
              <Copy className="h-4 w-4" />
            </button>
            {copied && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
          </div>
        </div>

        <div className="py-6 text-right" dir="rtl">
          <p
            className="font-arabic font-bold text-emerald-950 dark:text-emerald-100 leading-widest"
            style={{ fontSize: `${settings.arabic_font_size || 32}px` }}
          >
            {ayah.text} ﴿{ayah.numberInSurah}﴾
          </p>
        </div>

        <p className="text-base text-foreground/90 leading-relaxed font-serif pt-2 border-t border-emerald-900/10">
          {ayah.translation}
        </p>
      </div>

      {tafsir && (
        <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 pb-2 border-b">
            <Book className="h-5 w-5" />
            <h2 className="font-serif font-bold text-lg">Tafsir Commentary ({tafsir.authorName})</h2>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed font-serif whitespace-pre-line">
            {tafsir.text}
          </p>
        </div>
      )}
    </div>
  );
}
