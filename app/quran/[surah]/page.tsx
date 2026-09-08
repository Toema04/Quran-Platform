"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { getSurah, getSurahAyahs } from "@/lib/api/quran";
import { getAyahAudioUrl } from "@/lib/api/audio";
import { getAyahTafsir } from "@/lib/api/tafsir";
import { useAudio } from "@/providers/audio-provider";
import { useSettings } from "@/providers/settings-provider";
import { Surah, Ayah } from "@/types";
import {
  Play,
  Pause,
  Copy,
  Book,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from "lucide-react";

export default function SurahReaderPage({ params }: { params: Promise<{ surah: string }> }) {
  const resolvedParams = use(params);
  const surahNumber = parseInt(resolvedParams.surah) || 1;

  const { settings, updateSettings } = useSettings();
  const { currentTrack, isPlaying, playTrack, togglePlay, setNextTrackHandler } = useAudio();

  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingMode, setReadingMode] = useState<"continuous" | "mushaf">("continuous");
  const [selectedTafsir, setSelectedTafsir] = useState<{ surah: number; ayah: number; text: string; author: string } | null>(null);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const s = await getSurah(surahNumber);
      const a = await getSurahAyahs(surahNumber);
      setSurah(s);
      setAyahs(a);
      setLoading(false);
    }
    loadData();
  }, [surahNumber]);

  useEffect(() => {
    if (!ayahs || ayahs.length === 0) return;

    setNextTrackHandler(() => {
      if (!currentTrack) return;
      const currentIndex = ayahs.findIndex((a) => a.numberInSurah === currentTrack.ayahNumber);
      if (currentIndex !== -1 && currentIndex < ayahs.length - 1) {
        const nextAyah = ayahs[currentIndex + 1];
        playTrack({
          surahNumber: surahNumber,
          ayahNumber: nextAyah.numberInSurah,
          surahName: surah?.englishName,
          audioUrl: getAyahAudioUrl(surahNumber, nextAyah.numberInSurah),
        });
      }
    });
  }, [ayahs, currentTrack, surahNumber, surah, playTrack, setNextTrackHandler]);

  const handlePlayAyah = (ayah: Ayah) => {
    const isThisPlaying =
      currentTrack?.surahNumber === surahNumber &&
      currentTrack?.ayahNumber === ayah.numberInSurah &&
      isPlaying;

    if (isThisPlaying) {
      togglePlay();
    } else {
      playTrack({
        surahNumber: surahNumber,
        ayahNumber: ayah.numberInSurah,
        surahName: surah?.englishName,
        audioUrl: getAyahAudioUrl(surahNumber, ayah.numberInSurah),
      });
    }
  };

  const handleOpenTafsir = async (surahNum: number, ayahNum: number) => {
    const res = await getAyahTafsir(surahNum, ayahNum);
    setSelectedTafsir({
      surah: surahNum,
      ayah: ayahNum,
      text: res.text,
      author: res.authorName,
    });
  };

  const handleCopyAyah = (ayah: Ayah) => {
    const textToCopy = `${ayah.text}\n\n"${ayah.translation}"\n- Surah ${surah?.englishName} (${surahNumber}:${ayah.numberInSurah})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  if (loading) {
    return (
      <div className="space-y-6 py-12 max-w-4xl mx-auto">
        <div className="h-32 rounded-3xl bg-emerald-900/10 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-24 rounded-2xl bg-emerald-900/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!surah) return <div>Surah not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 p-8 text-white shadow-lg text-center space-y-4">
        <div className="flex items-center justify-between text-xs text-emerald-200">
          <Link
            href={surahNumber > 1 ? `/quran/${surahNumber - 1}` : "/quran"}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{surahNumber > 1 ? `Surah ${surahNumber - 1}` : "Surahs"}</span>
          </Link>

          <span className="font-semibold uppercase tracking-widest text-[11px] bg-emerald-700/50 px-3 py-1 rounded-full">
            {surah.revelationType === "Meccan" ? "Makki" : "Madani"} • {surah.numberOfAyahs} Verses
          </span>

          <Link
            href={surahNumber < 114 ? `/quran/${surahNumber + 1}` : "/quran"}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <span>{surahNumber < 114 ? `Surah ${surahNumber + 1}` : "Surahs"}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-arabic font-bold text-emerald-100">
          {surah.name}
        </h1>
        <h2 className="text-xl font-bold tracking-tight text-white font-serif">
          {surah.englishName} ({surah.englishNameTranslation})
        </h2>

        <div className="flex items-center justify-center gap-4 pt-2 border-t border-emerald-700/40 text-xs">
          <button
            onClick={() => setReadingMode(readingMode === "continuous" ? "mushaf" : "continuous")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 transition"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Mode: {readingMode === "continuous" ? "Continuous" : "Mushaf"}</span>
          </button>

          <button
            onClick={() =>
              updateSettings({
                arabic_font_size: Math.min(42, (settings.arabic_font_size || 28) + 2),
              })
            }
            className="px-2.5 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 transition font-bold"
            title="Increase font size"
          >
            A+
          </button>
          <button
            onClick={() =>
              updateSettings({
                arabic_font_size: Math.max(20, (settings.arabic_font_size || 28) - 2),
              })
            }
            className="px-2.5 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 transition font-bold"
            title="Decrease font size"
          >
            A-
          </button>
        </div>
      </div>

      {surahNumber !== 9 && (
        <div className="text-center py-6">
          <p className="text-2xl md:text-3xl font-arabic font-bold text-emerald-800 dark:text-emerald-300">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>
      )}

      {readingMode === "continuous" ? (
        <div className="space-y-6">
          {ayahs.map((ayah) => {
            const isPlayingThis =
              currentTrack?.surahNumber === surahNumber &&
              currentTrack?.ayahNumber === ayah.numberInSurah &&
              isPlaying;

            return (
              <div
                key={ayah.numberInSurah}
                id={`ayah-${ayah.numberInSurah}`}
                className={`group p-6 rounded-3xl border transition-all ${
                  isPlayingThis
                    ? "border-emerald-500 bg-emerald-50/60 shadow-md dark:bg-emerald-950/40 dark:border-emerald-500"
                    : "border-emerald-900/10 bg-card hover:border-emerald-600/30 dark:border-emerald-800/20"
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-emerald-900/10 dark:border-emerald-800/20 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-700 text-white font-bold text-xs">
                      {surahNumber}:{ayah.numberInSurah}
                    </span>
                    <span className="text-muted-foreground font-medium">Juz {ayah.juz}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayAyah(ayah)}
                      className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition"
                      title="Play Audio"
                    >
                      {isPlayingThis ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>

                    <button
                      onClick={() => handleOpenTafsir(surahNumber, ayah.numberInSurah)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-emerald-700 transition"
                      title="Read Tafsir"
                    >
                      <Book className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-emerald-700 transition"
                      title="Copy Ayah"
                    >
                      <Copy className="h-4 w-4" />
                    </button>

                    {copiedAyah === ayah.numberInSurah && (
                      <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>
                    )}
                  </div>
                </div>

                <div className="py-6 text-right" dir="rtl">
                  <p
                    className="font-arabic font-bold text-emerald-950 dark:text-emerald-100 leading-widest"
                    style={{ fontSize: `${settings.arabic_font_size || 28}px` }}
                  >
                    {ayah.text} ﴿{ayah.numberInSurah}﴾
                  </p>
                </div>

                <div className="pt-2 text-muted-foreground text-sm md:text-base leading-relaxed">
                  {ayah.translation}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 rounded-3xl border border-emerald-900/20 bg-card leading-loose text-right" dir="rtl">
          {ayahs.map((ayah) => (
            <span
              key={ayah.numberInSurah}
              className="inline font-arabic font-bold text-emerald-950 dark:text-emerald-100 hover:text-emerald-600 cursor-pointer transition px-1"
              style={{ fontSize: `${(settings.arabic_font_size || 28) + 2}px` }}
              onClick={() => handlePlayAyah(ayah)}
            >
              {ayah.text} ﴿{ayah.numberInSurah}﴾{" "}
            </span>
          ))}
        </div>
      )}

      {selectedTafsir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="max-w-2xl w-full rounded-3xl bg-card border border-emerald-900/20 p-6 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-foreground font-serif">
                Tafsir — Surah {surahNumber}:{selectedTafsir.ayah}
              </h3>
              <button
                onClick={() => setSelectedTafsir(null)}
                className="text-xs font-bold px-2 py-1 rounded bg-muted hover:bg-emerald-100"
              >
                Close
              </button>
            </div>

            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              {selectedTafsir.author}
            </p>

            <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
              {selectedTafsir.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
