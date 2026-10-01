"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { getJuzAyahs, JUZ_METADATA } from "@/lib/api/quran";
import { getAyahAudioUrl } from "@/lib/api/audio";
import { useAudio } from "@/providers/audio-provider";
import { useSettings } from "@/providers/settings-provider";
import { Ayah, Surah } from "@/types";
import { Play, Pause, ChevronLeft, ChevronRight, BookOpen, AlertCircle } from "lucide-react";

export default function SingleJuzPage({ params }: { params: Promise<{ number: string }> }) {
  const resolvedParams = use(params);
  const juzNum = parseInt(resolvedParams.number) || 1;

  const { settings, t } = useSettings();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  const [sections, setSections] = useState<{ surah: Surah; ayahs: Ayah[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const juzInfo = JUZ_METADATA.find((j) => j.juzNumber === juzNum) || JUZ_METADATA[0];

  useEffect(() => {
    async function loadJuz() {
      setLoading(true);
      setError(null);
      try {
        const data = await getJuzAyahs(juzNum);
        if (data && data.length > 0) {
          setSections(data);
        } else {
          setError("Failed to load Juz content. Please try again.");
        }
      } catch (err) {
        console.error(`Error loading Juz ${juzNum}:`, err);
        setError("Network error while loading Juz content.");
      }
      setLoading(false);
    }
    loadJuz();
  }, [juzNum]);

  if (loading) {
    return (
      <div className="space-y-6 py-12 max-w-4xl mx-auto">
        <div className="h-28 rounded-3xl bg-emerald-900/10 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 rounded-2xl bg-emerald-900/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 p-8 text-white shadow-lg text-center space-y-4">
        <div className="flex items-center justify-between text-xs text-emerald-200">
          <Link
            href={juzNum > 1 ? `/juz/${juzNum - 1}` : "/juz"}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{juzNum > 1 ? `${t.juz} ${juzNum - 1}` : t.thirtyJuz}</span>
          </Link>

          <span className="font-semibold uppercase tracking-widest text-[11px] bg-emerald-700/50 px-3 py-1 rounded-full">
            {t.juz} {juzNum} / 30
          </span>

          <Link
            href={juzNum < 30 ? `/juz/${juzNum + 1}` : "/juz"}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <span>{juzNum < 30 ? `${t.juz} ${juzNum + 1}` : t.thirtyJuz}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
          {t.juz} {juzNum}
        </h1>

        <div className="p-3 rounded-2xl bg-white/10 text-xs text-emerald-100 flex flex-wrap items-center justify-around gap-2">
          <span>Starts: <strong>{juzInfo.startSurahName} ({juzInfo.startSurah}:{juzInfo.startAyah})</strong></span>
          <span>Ends: <strong>{juzInfo.endSurahName} ({juzInfo.endSurah}:{juzInfo.endAyah})</strong></span>
        </div>
      </div>

      {error ? (
        <div className="p-8 text-center rounded-3xl border border-red-500/20 bg-red-500/10 text-red-900 dark:text-red-200 space-y-3">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      ) : (
        <div className="space-y-10">
          {sections.map(({ surah, ayahs }) => (
            <div key={surah.number} className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-950 text-white flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-lg">{surah.englishName}</h2>
                  <p className="text-xs text-emerald-200">{surah.englishNameTranslation}</p>
                </div>
                <p className="font-arabic font-bold text-2xl text-emerald-100" dir="rtl">{surah.name}</p>
              </div>

              <div className="space-y-4">
                {ayahs.map((ayah) => {
                  const isPlayingThis =
                    currentTrack?.surahNumber === surah.number &&
                    currentTrack?.ayahNumber === ayah.numberInSurah &&
                    isPlaying;

                  return (
                    <div
                      key={ayah.numberInSurah}
                      className={`p-6 rounded-3xl border transition ${
                        isPlayingThis
                          ? "border-emerald-500 bg-emerald-50/60 shadow-md dark:bg-emerald-950/40"
                          : "border-emerald-900/10 bg-card hover:border-emerald-600/30"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-emerald-900/10 text-xs">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-800 text-white font-bold">
                          {surah.number}:{ayah.numberInSurah}
                        </span>

                        <button
                          onClick={() => {
                            if (isPlayingThis) togglePlay();
                            else
                              playTrack({
                                surahNumber: surah.number,
                                ayahNumber: ayah.numberInSurah,
                                surahName: surah.englishName,
                                audioUrl: getAyahAudioUrl(surah.number, ayah.numberInSurah),
                              });
                          }}
                          className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition"
                        >
                          {isPlayingThis ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                      </div>

                      <div className="py-4 text-right" dir="rtl">
                        <p
                          className="font-arabic font-bold text-emerald-950 dark:text-emerald-100 leading-widest"
                          style={{ fontSize: `${settings.arabic_font_size || 28}px` }}
                        >
                          {ayah.text} ﴿{ayah.numberInSurah}﴾
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                        {ayah.translation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
