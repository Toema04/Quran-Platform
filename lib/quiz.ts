export type QuizQuestion = {
  id: string;
  level: "beginner" | "easy" | "intermediate" | "advanced" | "expert";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    level: "beginner",
    question: "How many Surahs are in the Holy Quran?",
    options: ["100", "114", "120", "110"],
    correctIndex: 1,
    explanation: "The Holy Quran consists of exactly 114 Surahs, beginning with Al-Fatihah and concluding with An-Nas.",
    source: "Authentic Quranic Compilation",
  },
  {
    id: "q2",
    level: "beginner",
    question: "Which Surah is known as the Heart of the Quran?",
    options: ["Surah Al-Baqarah", "Surah Ya-Sin", "Surah Ar-Rahman", "Surah Al-Ikhlas"],
    correctIndex: 1,
    explanation: "Prophet Muhammad ﷺ mentioned that Surah Ya-Sin is the heart of the Quran.",
    source: "Sunan al-Tirmidhi, Hadith 2887",
  },
  {
    id: "q3",
    level: "easy",
    question: "What is the longest Surah in the Quran?",
    options: ["Surah Ali 'Imran", "Surah An-Nisa", "Surah Al-Baqarah", "Surah Al-Ma'idah"],
    correctIndex: 2,
    explanation: "Surah Al-Baqarah is the second and longest Surah in the Quran containing 286 verses.",
    source: "Holy Quran, Surah 2",
  },
  {
    id: "q4",
    level: "intermediate",
    question: "In which year did the Hijrah (migration to Madinah) take place?",
    options: ["610 CE", "622 CE", "632 CE", "615 CE"],
    correctIndex: 1,
    explanation: "The Hijrah of Prophet Muhammad ﷺ from Makkah to Madinah took place in 622 CE, marking the start of the Islamic Hijri calendar.",
    source: "Ar-Raheeq Al-Makhtum (The Sealed Nectar)",
  },
  {
    id: "q5",
    level: "advanced",
    question: "Which companion was known as 'As-Siddiq' (The Truthful)?",
    options: ["Umar ibn al-Khattab", "Abu Bakr as-Siddiq", "Uthman ibn Affan", "Ali ibn Abi Talib"],
    correctIndex: 1,
    explanation: "Abu Bakr (may Allah be pleased with him) was given the title As-Siddiq for immediately believing the Isra and Mi'raj journey.",
    source: "Sahih al-Bukhari, Hadith 3661",
  },
  {
    id: "q6",
    level: "expert",
    question: "Which Surah does not begin with Bismillah?",
    options: ["Surah At-Tawbah", "Surah Al-Anfal", "Surah Yunus", "Surah Hud"],
    correctIndex: 0,
    explanation: "Surah At-Tawbah (Surah 9) is the only Surah in the Quran that does not begin with Bismillah ir-Rahman ir-Rahim.",
    source: "Holy Quran, Surah At-Tawbah",
  },
];
