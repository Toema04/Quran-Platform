export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
  text: string;
  translation?: string;
}

export interface Reciter {
  id: string;
  name: string;
  arabicName?: string;
  englishName?: string;
  style?: string;
  baseUrl?: string;
}

export interface SearchResult {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  translation?: string;
}

export interface UserSettings {
  theme: "system" | "light" | "dark";
  language: "en" | "ar";
  arabic_font: "uthmani" | "indopak" | "scheherazade" | "amiri";
  arabic_font_size: number;
  translation_font_size: number;
  translation_id: string;
  tafsir_id: string;
  reciter_id: string;
  playback_speed: number;
  auto_play: boolean;
  notifications_enabled: boolean;
}
