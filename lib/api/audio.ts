import { RECITERS } from "./reciters";
import { SURAHS_METADATA } from "./quran";

export function getGlobalAyahNumber(surahNumber: number, ayahNumber: number): number {
  let count = 0;
  for (let i = 0; i < surahNumber - 1; i++) {
    count += SURAHS_METADATA[i]?.numberOfAyahs || 0;
  }
  return count + ayahNumber;
}

export function getAyahAudioUrl(
  surahNumber: number,
  ayahNumber: number,
  reciterId = "ar.alafasy"
): string {
  const reciter = RECITERS.find((r) => r.id === reciterId) || RECITERS[0];
  const formattedSurah = String(surahNumber).padStart(3, "0");
  const formattedAyah = String(ayahNumber).padStart(3, "0");

  if (reciter.baseUrl) {
    return `${reciter.baseUrl}/${formattedSurah}${formattedAyah}.mp3`;
  }

  const globalAyahIndex = getGlobalAyahNumber(surahNumber, ayahNumber);
  return `https://cdn.islamic.network/quran/audio/128/${reciter.id}/${globalAyahIndex}.mp3`;
}

export function getSurahAudioUrl(surahNumber: number, reciterId = "ar.alafasy"): string {
  const reciter = RECITERS.find((r) => r.id === reciterId) || RECITERS[0];
  if (reciter.baseUrl) {
    const formattedSurah = String(surahNumber).padStart(3, "0");
    return `${reciter.baseUrl}/${formattedSurah}001.mp3`;
  }
  const globalAyahIndex = getGlobalAyahNumber(surahNumber, 1);
  return `https://cdn.islamic.network/quran/audio/128/${reciter.id}/${globalAyahIndex}.mp3`;
}

export const ADHAN_SOUNDS = [
  { id: "makkah", name: "Makkah Al-Mukarramah Adhan", url: "https://cdn.islamic.network/adhan/makkah.mp3" },
  { id: "madinah", name: "Madinah Al-Munawwarah Adhan", url: "https://cdn.islamic.network/adhan/madinah.mp3" },
  { id: "alafasy", name: "Mishary Rashid Alafasy Adhan", url: "https://cdn.islamic.network/adhan/alafasy.mp3" },
];
