import { RECITERS } from "./reciters";

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

  // Use reliable Islamic Network CDN for Ayah-level audio
  return `https://cdn.islamic.network/quran/audio/128/${reciter.id}/${surahNumber}:${ayahNumber}.mp3`;
}

export function getSurahAudioUrl(surahNumber: number, reciterId = "ar.alafasy"): string {
  const formattedSurah = String(surahNumber).padStart(3, "0");
  return `https://download.quranicaudio.com/quran/${reciterId.replace("ar.", "")}/${formattedSurah}.mp3`;
}
