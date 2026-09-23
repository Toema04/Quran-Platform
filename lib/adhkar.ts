export type Dhikr = {
  id: string;
  category: "morning" | "evening" | "after_prayer" | "sleeping" | "travel" | "protection";
  arabicText: string;
  translation: string;
  transliteration?: string;
  repeatCount: number;
  source: string;
};

export const ADHKAR_DATA: Dhikr[] = [
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
  {
    id: "e1",
    category: "evening",
    arabicText: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
    translation: "We have reached the evening and at this time all sovereignty belongs to Allah, Lord of the worlds.",
    repeatCount: 1,
    source: "Sahih Muslim, Hadith 2723",
  },
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
  {
    id: "s1",
    category: "sleeping",
    arabicText: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ",
    translation: "In Your name my Lord, I lie down and in Your name I rise.",
    repeatCount: 1,
    source: "Sahih Bukhari, Hadith 6320",
  },
  {
    id: "t1",
    category: "travel",
    arabicText: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    translation: "Glory unto Him Who has subjected this to us, though we were unable to subdue it ourselves. And unto our Lord we shall return.",
    repeatCount: 1,
    source: "Surah Az-Zukhruf 43:13-14 / Sahih Muslim 1342",
  },
  {
    id: "pr1",
    category: "protection",
    arabicText: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    translation: "In the Name of Allah with Whose Name nothing can cause harm in the earth nor in the heaven, and He is the All-Hearing, the All-Knowing.",
    repeatCount: 3,
    source: "Sunan Abu Dawud, Hadith 5088",
  },
];
