"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { SURAHS_METADATA } from "@/lib/api/quran";
import { getAyahAudioUrl } from "@/lib/api/audio";
import { getAyahTafsir } from "@/lib/api/tafsir";
import { useAudio } from "@/providers/audio-provider";
import { useSettings } from "@/providers/settings-provider";
import { Ayah, Surah } from "@/types";
import { WordPracticeModal } from "@/components/quran/word-practice-modal";
import {
  Play,
  Pause,
  Copy,
  Book,
  ChevronLeft,
  ChevronRight,
  BookmarkCheck,
  Search,
} from "lucide-react";

export default function MushafPageReader({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const resolvedParams = use(params);
  const pageNum = parseInt(resolvedParams.number) || 1;

  const { settings, t } = useSettings();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  const [pageAyahs, setPageAyahs] = useState<{ surah: Surah; ayah: Ayah }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTafsir, setSelectedTafsir] = useState<{ surah: number; ayah: number; text: string; author: string } | null>(null);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [practiceWord, setPracticeWord] = useState<{ word: string; surahNum: number; ayahNum: number; wordIdx: number } | null>(null);
  const [jumpPageInput, setJumpPageInput] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_last_read_page", pageNum.toString());
    }
  }, [pageNum]);

  useEffect(() => {
    async function loadPageData() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/page/${pageNum}/editions/quran-uthmani,en.sahih`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length >= 2) {
            const arabicData = json.data[0].ayahs;
            const translationData = json.data[1].ayahs;

            const items = arabicData.map((item: { number: number; numberInSurah: number; juz: number; manzil: number; page: number; ruku: number; hizbQuarter: number; sajda: boolean | object; text: string; surah: { number: number; englishName: string; name: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string } }, idx: number) => {
              const matchedSurah = SURAHS_METADATA[item.surah.number - 1] || {
                number: item.surah.number,
                name: item.surah.name,
                englishName: item.surah.englishName,
                englishNameTranslation: item.surah.englishNameTranslation || "",
                numberOfAyahs: item.surah.numberOfAyahs || 0,
                revelationType: item.surah.revelationType || "Meccan",
              };

              return {
                surah: matchedSurah,
                ayah: {
                  number: item.number,
                  numberInSurah: item.numberInSurah,
                  juz: item.juz,
                  manzil: item.manzil,
                  page: item.page,
                  ruku: item.ruku,
                  hizbQuarter: item.hizbQuarter,
                  sajda: item.sajda,
                  text: item.text,
                  translation: translationData[idx] ? translationData[idx].text : "",
                },
              };
            });
            setPageAyahs(items);
          }
        }
      } catch (err) {
        console.error("Failed to fetch Mushaf page:", err);
      }
      setLoading(false);
    }
    loadPageData();
  }, [pageNum]);

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPageInput);
    if (p >= 1 && p <= 604) {
      window.location.href = `/quran/page/${p}`;
    }
  };

  const handlePlayAyah = (surahNum: number, ayah: Ayah, surahName: string) => {
    const isThisPlaying =
      currentTrack?.surahNumber === surahNum &&
      currentTrack?.ayahNumber === ayah.numberInSurah &&
      isPlaying;

    if (isThisPlaying) {
      togglePlay();
    } else {
      playTrack({
        surahNumber: surahNum,
        ayahNumber: ayah.numberInSurah,
        surahName: surahName,
        audioUrl: getAyahAudioUrl(surahNum, ayah.numberInSurah, settings.reciter_id),
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

  const handleCopyAyah = (surahName: string, surahNum: number, ayah: Ayah) => {
    const textToCopy = `${ayah.text}\n\n"${ayah.translation}"\n- Surah ${surahName} (${surahNum}:${ayah.numberInSurah})`;
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

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 p-6 md:p-8 text-white shadow-lg space-y-4 text-center">
        <div className="flex items-center justify-between text-xs text-emerald-200">
          <Link
            href={pageNum > 1 ? `/quran/page/${pageNum - 1}` : "/quran"}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{pageNum > 1 ? `${t.previous} (${t.page} ${pageNum - 1})` : t.quran}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-widest text-[11px] bg-emerald-700/50 px-3 py-1 rounded-full">
              {t.page} {pageNum} / 604
            </span>
            <span className="flex items-center gap-1 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-full font-bold">
              <BookmarkCheck className="h-3 w-3" /> {t.lastRead}
            </span>
          </div>

          <Link
            href={pageNum < 604 ? `/quran/page/${pageNum + 1}` : "/quran"}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <span>{pageNum < 604 ? `${t.next} (${t.page} ${pageNum + 1})` : t.quran}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
          {t.page} {pageNum}
        </h1>

        <form onSubmit={handleJumpPage} className="flex items-center justify-center gap-2 pt-2">
          <input
            type="number"
            min="1"
            max="604"
            placeholder={t.goToPage}
            value={jumpPageInput}
            onChange={(e) => setJumpPageInput(e.target.value)}
            className="w-28 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-white text-xs text-center focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-xs font-semibold text-white transition flex items-center gap-1"
          >
            <Search className="h-3.5 w-3.5" />
            <span>{t.goToPage}</span>
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {pageAyahs.map(({ surah, ayah }) => {
          const isPlayingThis =
            currentTrack?.surahNumber === surah.number &&
            currentTrack?.ayahNumber === ayah.numberInSurah &&
            isPlaying;

          const words = ayah.text.split(" ");

          return (
            <div
              key={`${surah.number}-${ayah.numberInSurah}`}
              className={`p-6 rounded-3xl border transition ${
                isPlayingThis
                  ? "border-emerald-500 bg-emerald-50/60 shadow-md dark:bg-emerald-950/40"
                  : "border-emerald-900/10 bg-card hover:border-emerald-600/30"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-800 text-white font-bold">
                    {surah.number}:{ayah.numberInSurah}
                  </span>
                  <span className="font-serif font-bold text-foreground">{surah.englishName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlayAyah(surah.number, ayah, surah.englishName)}
                    className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition"
                    title={t.play}
                  >
                    {isPlayingThis ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={() => handleOpenTafsir(surah.number, ayah.numberInSurah)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-emerald-700 transition"
                    title={t.tafsir}
                  >
                    <Book className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleCopyAyah(surah.englishName, surah.number, ayah)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-emerald-700 transition"
                    title={t.copy}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {copiedAyah === ayah.numberInSurah && (
                    <span className="text-[10px] text-emerald-600 font-bold">{t.copied}</span>
                  )}
                </div>
              </div>

              <div className="py-6 text-right flex flex-wrap gap-x-2 gap-y-3 leading-widest" dir="rtl">
                {words.map((w, wIdx) => (
                  <span
                    key={wIdx}
                    onClick={() =>
                      setPracticeWord({
                        word: w,
                        surahNum: surah.number,
                        ayahNum: ayah.numberInSurah,
                        wordIdx: wIdx,
                      })
                    }
                    className="font-arabic font-bold text-emerald-950 dark:text-emerald-100 hover:text-emerald-600 hover:bg-emerald-800/10 rounded-lg px-1 transition cursor-pointer inline-block"
                    style={{ fontSize: `${settings.arabic_font_size || 28}px` }}
                  >
                    {w}
                  </span>
                ))}
                <span
                  className="font-arabic font-bold text-emerald-700 dark:text-emerald-400 self-center"
                  style={{ fontSize: `${settings.arabic_font_size || 28}px` }}
                >
                  ﴿{ayah.numberInSurah}﴾
                </span>
              </div>

              <p className="text-sm text-muted-foreground font-serif leading-relaxed">
                {ayah.translation}
              </p>
            </div>
          );
        })}
      </div>

      {practiceWord && (
        <WordPracticeModal
          word={practiceWord.word}
          surahNumber={practiceWord.surahNum}
          ayahNumber={practiceWord.ayahNum}
          wordIndex={practiceWord.wordIdx}
          onClose={() => setPracticeWord(null)}
        />
      )}

      {selectedTafsir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="max-w-2xl w-full rounded-3xl bg-card border border-emerald-900/20 p-6 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-foreground font-serif">
                {t.tafsir} — Surah {selectedTafsir.surah}:{selectedTafsir.ayah}
              </h3>
              <button
                onClick={() => setSelectedTafsir(null)}
                className="text-xs font-bold px-2 py-1 rounded bg-muted hover:bg-emerald-100"
              >
                {t.close}
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
