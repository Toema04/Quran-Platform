export type Language = "en" | "ar";

export const translations = {
  en: {
    // Nav
    brand: "Quran Platform",
    subBrand: "القرآن الكريم",
    home: "Home",
    quran: "Quran",
    juz: "Juz",
    search: "Search",
    tafsir: "Tafsir",
    reciters: "Reciters",
    prayerTimes: "Prayer Times",
    qibla: "Qibla",
    ramadan: "Ramadan",
    account: "Account",
    settings: "Settings",
    bookmarks: "Bookmarks",
    favorites: "Favorites",
    dashboard: "Dashboard",
    hizb: "Hizb",

    // Header & Mobile
    searchPlaceholder: "Search Quran, Surahs, translations...",

    // Footer
    tagline: "A premium, distraction-free Quran reading, audio, and study platform for Muslims worldwide.",
    tools: "Tools",
    legal: "Legal & About",
    about: "About Project",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    allSurahs: "All Surahs",
    thirtyJuz: "30 Juz",
    hizbQuarters: "Hizb Quarters",
    qarisReciters: "Qaris & Reciters",
    qiblaDirection: "Qibla Direction",
    ramadanCompanion: "Ramadan Companion",
    classicalTafsir: "Classical Tafsir",
    copyright: "All Quranic data sourced from verified authentic endpoints.",

    // General
    language: "Language",
    english: "English",
    arabic: "العربية",
    play: "Play",
    pause: "Pause",
    listen: "Listen",
    practice: "Practice",
    copy: "Copy",
    copied: "Copied!",
    share: "Share",
    close: "Close",
    save: "Save",
    loading: "Loading...",
    error: "An error occurred. Please try again.",
    retry: "Retry",
    noResults: "No results found.",
  },
  ar: {
    // Nav
    brand: "منصة القرآن الكريم",
    subBrand: "القرآن الكريم",
    home: "الرئيسية",
    quran: "القرآن الكريم",
    juz: "الأجزاء",
    search: "البحث",
    tafsir: "التفسير",
    reciters: "القراء",
    prayerTimes: "مواقيت الصلاة",
    qibla: "القبلة",
    ramadan: "رمضان",
    account: "الحساب",
    settings: "الإعدادات",
    bookmarks: "الفواصل",
    favorites: "المفضلة",
    dashboard: "لوحة التحكم",
    hizb: "الأحزاب",

    // Header & Mobile
    searchPlaceholder: "ابحث في القرآن، السور، التفاسير...",

    // Footer
    tagline: "منصة إسلامية متكاملة لقراءة وتلاوة وتدبر القرآن الكريم لمسلمي العالم.",
    tools: "الأدوات",
    legal: "معلومات وقانوني",
    about: "عن المشروع",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    allSurahs: "جميع السور",
    thirtyJuz: "٣٠ جزءاً",
    hizbQuarters: "أرباع الأحزاب",
    qarisReciters: "القراء والتلاوات",
    qiblaDirection: "اتجاه القبلة",
    ramadanCompanion: "مرافق رمضان",
    classicalTafsir: "التفاسير المعتمدة",
    copyright: "جميع البيانات القرآنية مستمدة من مصادر معتمدة وموثوقة.",

    // General
    language: "اللغة",
    english: "English",
    arabic: "العربية",
    play: "تشغيل",
    pause: "إيقاف مؤقت",
    listen: "استماع",
    practice: "تدرب",
    copy: "نسخ",
    copied: "تم النسخ!",
    share: "مشاركة",
    close: "إغلاق",
    save: "حفظ",
    loading: "جاري التحميل...",
    error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    retry: "إعادة المحاولة",
    noResults: "لم يتم العثور على نتائج.",
  },
};

export function getTranslation(lang: Language = "en") {
  return translations[lang] || translations.en;
}
