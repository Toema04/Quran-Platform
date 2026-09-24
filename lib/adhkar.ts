export type Dhikr = {
  id: string;
  category:
    | "morning"
    | "evening"
    | "after_prayer"
    | "sleeping"
    | "waking_up"
    | "eating"
    | "mosque"
    | "travel"
    | "protection";
  arabicText: string;
  translation: string;
  transliteration?: string;
  repeatCount: number;
  source: string;
};

export const ADHKAR_DATA: Dhikr[] = [
  // Morning
  {
    id: "m1",
    category: "morning",
    arabicText: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    translation: "We have reached the morning and at this very time all sovereignty belongs to Allah, Lord of the worlds. Praise is to Allah.",
    repeatCount: 1,
    source: "Sahih Muslim, Hadith 2723",
  },
  {
    id: "m2",
    category: "morning",
    arabicText: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    translation: "O Allah, by Your leave we have reached the morning and by Your leave we reach the evening, by Your leave we live and die and unto You is our resurrection.",
    repeatCount: 1,
    source: "Sunan Abu Dawud, Hadith 5068",
  },
  {
    id: "m3",
    category: "morning",
    arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    translation: "Glory is to Allah and praise is to Him.",
    repeatCount: 100,
    source: "Sahih Muslim, Hadith 2692",
  },

  // Evening
  {
    id: "e1",
    category: "evening",
    arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    translation: "We have reached the evening and at this time all sovereignty belongs to Allah, Lord of the worlds.",
    repeatCount: 1,
    source: "Sahih Muslim, Hadith 2723",
  },

  // After Prayer
  {
    id: "p1",
    category: "after_prayer",
    arabicText: "أَسْتَغْفِرُ اللَّهَ (٣x)، اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ",
    translation: "I ask Allah for forgiveness (3x). O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of Majesty and Honor.",
    repeatCount: 1,
    source: "Sahih Muslim, Hadith 591",
  },
  {
    id: "p2",
    category: "after_prayer",
    arabicText: "سُبْحَانَ اللَّهِ (٣٣x)، الْحَمْدُ لِلَّهِ (٣٣x)، اللَّهُ أَكْبَرُ (٣٣x)",
    translation: "Glory be to Allah (33x), Praise be to Allah (33x), Allah is the Greatest (33x).",
    repeatCount: 33,
    source: "Sahih Bukhari, Hadith 843",
  },

  // Sleeping
  {
    id: "s1",
    category: "sleeping",
    arabicText: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ",
    translation: "In Your name my Lord, I lie down and in Your name I rise.",
    repeatCount: 1,
    source: "Sahih Bukhari, Hadith 6320",
  },

  // Waking Up
  {
    id: "w1",
    category: "waking_up",
    arabicText: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    translation: "All praise is for Allah Who gave us life after having taken it from us and unto Him is the resurrection.",
    repeatCount: 1,
    source: "Sahih Bukhari, Hadith 6312",
  },

  // Food & Drink
  {
    id: "f1",
    category: "eating",
    arabicText: "بِسْمِ اللَّهِ",
    translation: "In the Name of Allah.",
    repeatCount: 1,
    source: "Sunan Abu Dawud, Hadith 3767",
  },
  {
    id: "f2",
    category: "eating",
    arabicText: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
    translation: "All praise is for Allah Who fed me this and provided it for me without any power or strength from myself.",
    repeatCount: 1,
    source: "Sunan al-Tirmidhi, Hadith 3458",
  },

  // Mosque
  {
    id: "mq1",
    category: "mosque",
    arabicText: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    translation: "O Allah, open the doors of Your mercy for me.",
    repeatCount: 1,
    source: "Sahih Muslim, Hadith 713",
  },

  // Travel
  {
    id: "t1",
    category: "travel",
    arabicText: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    translation: "Glory unto Him Who has subjected this to us, though we were unable to subdue it ourselves. And unto our Lord we shall return.",
    repeatCount: 1,
    source: "Surah Az-Zukhruf 43:13-14 / Sahih Muslim 1342",
  },

  // Protection
  {
    id: "pr1",
    category: "protection",
    arabicText: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    translation: "In the Name of Allah with Whose Name nothing can cause harm in the earth nor in the heaven, and He is the All-Hearing, the All-Knowing.",
    repeatCount: 3,
    source: "Sunan Abu Dawud, Hadith 5088",
  },
];
