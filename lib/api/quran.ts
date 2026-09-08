import { Surah, Ayah } from "@/types";

const ALQURAN_API_BASE = "https://api.alquran.cloud/v1";

export const SURAHS_METADATA: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 3, name: "آل عمران", englishName: "Ali 'Imran", englishNameTranslation: "Family of Imran", numberOfAyahs: 200, revelationType: "Medinan" },
  { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan" },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan" },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "The Cattle", numberOfAyahs: 165, revelationType: "Meccan" },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "The Heights", numberOfAyahs: 206, revelationType: "Meccan" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", numberOfAyahs: 75, revelationType: "Medinan" },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", numberOfAyahs: 129, revelationType: "Medinan" },
  { number: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "Jonah", numberOfAyahs: 109, revelationType: "Meccan" },
  { number: 11, name: "هود", englishName: "Hud", englishNameTranslation: "Hud", numberOfAyahs: 123, revelationType: "Meccan" },
  { number: 12, name: "يوسف", englishName: "Yusuf", englishNameTranslation: "Joseph", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", englishNameTranslation: "The Thunder", numberOfAyahs: 43, revelationType: "Medinan" },
  { number: 14, name: "إبراهيم", englishName: "Ibrahim", englishNameTranslation: "Abraham", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", englishNameTranslation: "The Rocky Tract", numberOfAyahs: 99, revelationType: "Meccan" },
  { number: 16, name: "النحل", englishName: "An-Nahl", englishNameTranslation: "The Bee", numberOfAyahs: 128, revelationType: "Meccan" },
  { number: 17, name: "الإسراء", englishName: "Al-Isra", englishNameTranslation: "The Night Journey", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", numberOfAyahs: 110, revelationType: "Meccan" },
  { number: 19, name: "مريم", englishName: "Maryam", englishNameTranslation: "Mary", numberOfAyahs: 98, revelationType: "Meccan" },
  { number: 20, name: "طه", englishName: "Taha", englishNameTranslation: "Ta-Ha", numberOfAyahs: 135, revelationType: "Meccan" },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", englishNameTranslation: "The Prophets", numberOfAyahs: 112, revelationType: "Meccan" },
  { number: 22, name: "الحج", englishName: "Al-Hajj", englishNameTranslation: "The Pilgrimage", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", englishNameTranslation: "The Believers", numberOfAyahs: 118, revelationType: "Meccan" },
  { number: 24, name: "النور", englishName: "An-Nur", englishNameTranslation: "The Light", numberOfAyahs: 64, revelationType: "Medinan" },
  { number: 25, name: "الفرقان", englishName: "Al-Furqan", englishNameTranslation: "The Criterion", numberOfAyahs: 77, revelationType: "Meccan" },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", englishNameTranslation: "The Poets", numberOfAyahs: 227, revelationType: "Meccan" },
  { number: 27, name: "النمل", englishName: "An-Naml", englishNameTranslation: "The Ant", numberOfAyahs: 93, revelationType: "Meccan" },
  { number: 28, name: "القصص", englishName: "Al-Qasas", englishNameTranslation: "The Stories", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 29, name: "العنكبوت", englishName: "Al-'Ankabut", englishNameTranslation: "The Spider", numberOfAyahs: 69, revelationType: "Meccan" },
  { number: 30, name: "الروم", englishName: "Ar-Rum", englishNameTranslation: "The Romans", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 31, name: "لقمان", englishName: "Luqman", englishNameTranslation: "Luqman", numberOfAyahs: 34, revelationType: "Meccan" },
  { number: 32, name: "السجدة", englishName: "As-Sajdah", englishNameTranslation: "The Prostration", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", englishNameTranslation: "The Combined Forces", numberOfAyahs: 73, revelationType: "Medinan" },
  { number: 34, name: "سبأ", englishName: "Saba", englishNameTranslation: "Sheba", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 35, name: "فاطر", englishName: "Fatir", englishNameTranslation: "Originator", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", numberOfAyahs: 83, revelationType: "Meccan" },
  { number: 37, name: "الصافات", englishName: "As-Saffat", englishNameTranslation: "Those who set the Ranks", numberOfAyahs: 182, revelationType: "Meccan" },
  { number: 38, name: "ص", englishName: "Sad", englishNameTranslation: "The Letter Sad", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", englishNameTranslation: "The Troops", numberOfAyahs: 75, revelationType: "Meccan" },
  { number: 40, name: "غافر", englishName: "Ghafir", englishNameTranslation: "The Forgiver", numberOfAyahs: 85, revelationType: "Meccan" },
  { number: 41, name: "فصلت", englishName: "Fussilat", englishNameTranslation: "Explained in Detail", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 42, name: "الشورى", englishName: "Ash-Shura", englishNameTranslation: "The Consultation", numberOfAyahs: 53, revelationType: "Meccan" },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", englishNameTranslation: "The Ornaments of Gold", numberOfAyahs: 89, revelationType: "Meccan" },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhan", englishNameTranslation: "The Smoke", numberOfAyahs: 59, revelationType: "Meccan" },
  { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", englishNameTranslation: "The Crouching", numberOfAyahs: 37, revelationType: "Meccan" },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", englishNameTranslation: "The Wind-Curved Sandhills", numberOfAyahs: 35, revelationType: "Meccan" },
  { number: 47, name: "محمد", englishName: "Muhammad", englishNameTranslation: "Muhammad", numberOfAyahs: 38, revelationType: "Medinan" },
  { number: 48, name: "الفتح", englishName: "Al-Fath", englishNameTranslation: "The Victory", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 49, name: "الحجرات", englishName: "Al-Hujurat", englishNameTranslation: "The Dwellings", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 50, name: "ق", englishName: "Qaf", englishNameTranslation: "The Letter Qaf", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", englishNameTranslation: "The Winnowing Winds", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 52, name: "الطور", englishName: "At-Tur", englishNameTranslation: "The Mount", numberOfAyahs: 49, revelationType: "Meccan" },
  { number: 53, name: "النجم", englishName: "An-Najm", englishNameTranslation: "The Star", numberOfAyahs: 62, revelationType: "Meccan" },
  { number: 54, name: "القمر", englishName: "Al-Qamar", englishNameTranslation: "The Moon", numberOfAyahs: 55, revelationType: "Meccan" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", englishNameTranslation: "The Inevitable", numberOfAyahs: 96, revelationType: "Meccan" },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", englishNameTranslation: "The Iron", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 58, name: "المجادلة", englishName: "Al-Mujadila", englishNameTranslation: "The Pleading Woman", numberOfAyahs: 22, revelationType: "Medinan" },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", englishNameTranslation: "The Exile", numberOfAyahs: 24, revelationType: "Medinan" },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", englishNameTranslation: "She that is to be examined", numberOfAyahs: 13, revelationType: "Medinan" },
  { number: 61, name: "الصف", englishName: "As-Saff", englishNameTranslation: "The Ranks", numberOfAyahs: 14, revelationType: "Medinan" },
  { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", englishNameTranslation: "Friday", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", englishNameTranslation: "The Hypocrites", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 64, name: "التغابن", englishName: "At-Taghabun", englishNameTranslation: "The Mutual Disillusion", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 65, name: "الطلاق", englishName: "At-Talaq", englishNameTranslation: "The Divorce", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", englishNameTranslation: "The Prohibition", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 68, name: "القلم", englishName: "Al-Qalam", englishNameTranslation: "The Pen", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 69, name: "الحاقة", englishName: "Al-Haqqah", englishNameTranslation: "The Inevitable Reality", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 70, name: "المعارج", englishName: "Al-Ma'arij", englishNameTranslation: "The Ascending Stairways", numberOfAyahs: 44, revelationType: "Meccan" },
  { number: 71, name: "نوح", englishName: "Nuh", englishNameTranslation: "Noah", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 72, name: "الجن", englishName: "Al-Jinn", englishNameTranslation: "The Jinn", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", englishNameTranslation: "The Enshrouded One", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 74, name: "المدثر", englishName: "Al-Muddaththir", englishNameTranslation: "The Cloaked One", numberOfAyahs: 56, revelationType: "Meccan" },
  { number: 75, name: "القيامة", englishName: "Al-Qiyamah", englishNameTranslation: "The Resurrection", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 76, name: "الإنسان", englishName: "Al-Insan", englishNameTranslation: "Man", numberOfAyahs: 31, revelationType: "Medinan" },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalat", englishNameTranslation: "The Emissaries", numberOfAyahs: 50, revelationType: "Meccan" },
  { number: 78, name: "النبأ", englishName: "An-Naba", englishNameTranslation: "The Tidings", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 79, name: "النازعات", englishName: "An-Nazi'at", englishNameTranslation: "Those who drag forth", numberOfAyahs: 46, revelationType: "Meccan" },
  { number: 80, name: "عبس", englishName: "'Abasa", englishNameTranslation: "He Frowned", numberOfAyahs: 42, revelationType: "Meccan" },
  { number: 81, name: "التكوير", englishName: "At-Takwir", englishNameTranslation: "The Overthrowing", numberOfAyahs: 29, revelationType: "Meccan" },
  { number: 82, name: "الانفطار", englishName: "Al-Infitar", englishNameTranslation: "The Cleaving", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", englishNameTranslation: "Defrauding", numberOfAyahs: 36, revelationType: "Meccan" },
  { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", englishNameTranslation: "The Sundering", numberOfAyahs: 25, revelationType: "Meccan" },
  { number: 85, name: "البروج", englishName: "Al-Buruj", englishNameTranslation: "The Mansions of the Stars", numberOfAyahs: 22, revelationType: "Meccan" },
  { number: 86, name: "الطارق", englishName: "At-Tariq", englishNameTranslation: "The Morning Star", numberOfAyahs: 17, revelationType: "Meccan" },
  { number: 87, name: "الأعلى", englishName: "Al-A'la", englishNameTranslation: "The Most High", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", englishNameTranslation: "The Overwhelming", numberOfAyahs: 26, revelationType: "Meccan" },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", englishNameTranslation: "The Dawn", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 90, name: "البلد", englishName: "Al-Balad", englishNameTranslation: "The City", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", englishNameTranslation: "The Sun", numberOfAyahs: 15, revelationType: "Meccan" },
  { number: 92, name: "الليل", englishName: "Al-Layl", englishNameTranslation: "The Night", numberOfAyahs: 21, revelationType: "Meccan" },
  { number: 93, name: "الضحى", englishName: "Ad-Duhaa", englishNameTranslation: "The Morning Hours", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", englishNameTranslation: "The Relief", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 95, name: "التين", englishName: "At-Tin", englishNameTranslation: "The Fig", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 96, name: "العلق", englishName: "Al-'Alaq", englishNameTranslation: "The Clot", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 97, name: "القدر", englishName: "Al-Qadr", englishNameTranslation: "The Power", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 98, name: "البينة", englishName: "Al-Bayyinah", englishNameTranslation: "The Clear Proof", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", englishNameTranslation: "The Earthquake", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 100, name: "العاديات", englishName: "Al-'Adiyat", englishNameTranslation: "The Courser", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 101, name: "القارعة", englishName: "Al-Qari'ah", englishNameTranslation: "The Calamity", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 102, name: "التكاثر", englishName: "At-Takathur", englishNameTranslation: "Rivalry in world increase", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 103, name: "العصر", englishName: "Al-'Asr", englishNameTranslation: "The Declining Day", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 104, name: "الهمزة", englishName: "Al-Humazah", englishNameTranslation: "The Traducer", numberOfAyahs: 9, revelationType: "Meccan" },
  { number: 105, name: "الفيل", englishName: "Al-Fil", englishNameTranslation: "The Elephant", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 106, name: "قريش", englishName: "Quraysh", englishNameTranslation: "Quraysh", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 107, name: "الماعون", englishName: "Al-Ma'un", englishNameTranslation: "Small Kindnesses", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", englishNameTranslation: "Abundance", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 109, name: "الكافرون", englishName: "Al-Kafirun", englishNameTranslation: "The Disbelievers", numberOfAyahs: 6, revelationType: "Meccan" },
  { number: 110, name: "النصر", englishName: "An-Nasr", englishNameTranslation: "Divine Support", numberOfAyahs: 3, revelationType: "Medinan" },
  { number: 111, name: "المسد", englishName: "Al-Masad", englishNameTranslation: "The Palm Fiber", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "Sincerity", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "Meccan" },
];

export const SURAH_LIST = SURAHS_METADATA;

export const JUZ_METADATA = [
  { juzNumber: 1, startSurah: 1, startAyah: 1, startSurahName: "Al-Fatihah", endSurah: 2, endAyah: 141, endSurahName: "Al-Baqarah" },
  { juzNumber: 2, startSurah: 2, startAyah: 142, startSurahName: "Al-Baqarah", endSurah: 2, endAyah: 252, endSurahName: "Al-Baqarah" },
  { juzNumber: 3, startSurah: 2, startAyah: 253, startSurahName: "Al-Baqarah", endSurah: 3, endAyah: 92, endSurahName: "Ali 'Imran" },
  { juzNumber: 4, startSurah: 3, startAyah: 93, startSurahName: "Ali 'Imran", endSurah: 4, endAyah: 23, endSurahName: "An-Nisa" },
  { juzNumber: 5, startSurah: 4, startAyah: 24, startSurahName: "An-Nisa", endSurah: 4, endAyah: 147, endSurahName: "An-Nisa" },
  { juzNumber: 6, startSurah: 4, startAyah: 148, startSurahName: "An-Nisa", endSurah: 5, endAyah: 81, endSurahName: "Al-Ma'idah" },
  { juzNumber: 7, startSurah: 5, startAyah: 82, startSurahName: "Al-Ma'idah", endSurah: 6, endAyah: 110, endSurahName: "Al-An'am" },
  { juzNumber: 8, startSurah: 6, startAyah: 111, startSurahName: "Al-An'am", endSurah: 7, endAyah: 87, endSurahName: "Al-A'raf" },
  { juzNumber: 9, startSurah: 7, startAyah: 88, startSurahName: "Al-A'raf", endSurah: 8, endAyah: 40, endSurahName: "Al-Anfal" },
  { juzNumber: 10, startSurah: 8, startAyah: 41, startSurahName: "Al-Anfal", endSurah: 9, endAyah: 92, endSurahName: "At-Tawbah" },
  { juzNumber: 11, startSurah: 9, startAyah: 93, startSurahName: "At-Tawbah", endSurah: 11, endAyah: 5, endSurahName: "Hud" },
  { juzNumber: 12, startSurah: 11, startAyah: 6, startSurahName: "Hud", endSurah: 12, endAyah: 52, endSurahName: "Yusuf" },
  { juzNumber: 13, startSurah: 12, startAyah: 53, startSurahName: "Yusuf", endSurah: 14, endAyah: 52, endSurahName: "Ibrahim" },
  { juzNumber: 14, startSurah: 15, startAyah: 1, startSurahName: "Al-Hijr", endSurah: 16, endAyah: 128, endSurahName: "An-Nahl" },
  { juzNumber: 15, startSurah: 17, startAyah: 1, startSurahName: "Al-Isra", endSurah: 18, endAyah: 74, endSurahName: "Al-Kahf" },
  { juzNumber: 16, startSurah: 18, startAyah: 75, startSurahName: "Al-Kahf", endSurah: 20, endAyah: 135, endSurahName: "Taha" },
  { juzNumber: 17, startSurah: 21, startAyah: 1, startSurahName: "Al-Anbiya", endSurah: 22, endAyah: 78, endSurahName: "Al-Hajj" },
  { juzNumber: 18, startSurah: 23, startAyah: 1, startSurahName: "Al-Mu'minun", endSurah: 25, endAyah: 20, endSurahName: "Al-Furqan" },
  { juzNumber: 19, startSurah: 25, startAyah: 21, startSurahName: "Al-Furqan", endSurah: 27, endAyah: 55, endSurahName: "An-Naml" },
  { juzNumber: 20, startSurah: 27, startAyah: 56, startSurahName: "An-Naml", endSurah: 29, endAyah: 45, endSurahName: "Al-'Ankabut" },
  { juzNumber: 21, startSurah: 29, startAyah: 46, startSurahName: "Al-'Ankabut", endSurah: 33, endAyah: 30, endSurahName: "Al-Ahzab" },
  { juzNumber: 22, startSurah: 33, startAyah: 31, startSurahName: "Al-Ahzab", endSurah: 36, endAyah: 27, endSurahName: "Ya-Sin" },
  { juzNumber: 23, startSurah: 36, startAyah: 28, startSurahName: "Ya-Sin", endSurah: 39, endAyah: 31, endSurahName: "Az-Zumar" },
  { juzNumber: 24, startSurah: 39, startAyah: 32, startSurahName: "Az-Zumar", endSurah: 41, endAyah: 46, endSurahName: "Fussilat" },
  { juzNumber: 25, startSurah: 41, startAyah: 47, startSurahName: "Fussilat", endSurah: 45, endAyah: 37, endSurahName: "Al-Jathiyah" },
  { juzNumber: 26, startSurah: 46, startAyah: 1, startSurahName: "Al-Ahqaf", endSurah: 51, endAyah: 30, endSurahName: "Adh-Dhariyat" },
  { juzNumber: 27, startSurah: 51, startAyah: 31, startSurahName: "Adh-Dhariyat", endSurah: 57, endAyah: 29, endSurahName: "Al-Hadid" },
  { juzNumber: 28, startSurah: 58, startAyah: 1, startSurahName: "Al-Mujadila", endSurah: 66, endAyah: 12, endSurahName: "At-Tahrim" },
  { juzNumber: 29, startSurah: 67, startAyah: 1, startSurahName: "Al-Mulk", endSurah: 77, endAyah: 50, endSurahName: "Al-Mursalat" },
  { juzNumber: 30, startSurah: 78, startAyah: 1, startSurahName: "An-Naba", endSurah: 114, endAyah: 6, endSurahName: "An-Nas" },
];

export const HIZB_QUARTERS = Array.from({ length: 60 }, (_, i) => {
  const hizbNum = i + 1;
  const juzNum = Math.ceil(hizbNum / 2);
  const startSurahObj = SURAHS_METADATA[Math.min(113, (hizbNum - 1) * 2)];
  return [
    { quarterNumber: i * 4 + 1, hizbNumber: hizbNum, quarterInHizb: 1, surahNumber: startSurahObj.number, surahName: startSurahObj.englishName, ayahNumber: 1, juzNumber: juzNum },
    { quarterNumber: i * 4 + 2, hizbNumber: hizbNum, quarterInHizb: 2, surahNumber: startSurahObj.number, surahName: startSurahObj.englishName, ayahNumber: Math.ceil(startSurahObj.numberOfAyahs / 4), juzNumber: juzNum },
    { quarterNumber: i * 4 + 3, hizbNumber: hizbNum, quarterInHizb: 3, surahNumber: startSurahObj.number, surahName: startSurahObj.englishName, ayahNumber: Math.ceil(startSurahObj.numberOfAyahs / 2), juzNumber: juzNum },
    { quarterNumber: i * 4 + 4, hizbNumber: hizbNum, quarterInHizb: 4, surahNumber: startSurahObj.number, surahName: startSurahObj.englishName, ayahNumber: Math.ceil((startSurahObj.numberOfAyahs * 3) / 4), juzNumber: juzNum },
  ];
}).flat();

export const ARABIC_FONTS = [
  { id: "uthmani", name: "Uthmani Script (Default)" },
  { id: "indopak", name: "IndoPak Script" },
  { id: "amiri", name: "Amiri Classical" },
];

export async function getSurahs(): Promise<Surah[]> {
  try {
    const res = await fetch(`${ALQURAN_API_BASE}/surah`, { next: { revalidate: 86400 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        return json.data.map((s: { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string }) => ({
          number: s.number,
          name: s.name,
          englishName: s.englishName,
          englishNameTranslation: s.englishNameTranslation,
          numberOfAyahs: s.numberOfAyahs,
          revelationType: s.revelationType,
        }));
      }
    }
  } catch (err) {
    console.error("Failed to fetch surahs from API, using fallback data", err);
  }
  return SURAHS_METADATA;
}

export async function getSurah(number: number): Promise<Surah> {
  const surahs = await getSurahs();
  const found = surahs.find((s) => s.number === number);
  if (found) return found;
  return SURAHS_METADATA[number - 1] || SURAHS_METADATA[0];
}

export async function getSurahAyahs(
  surahNumber: number,
  translationEdition = "en.sahih"
): Promise<Ayah[]> {
  try {
    const res = await fetch(
      `${ALQURAN_API_BASE}/surah/${surahNumber}/editions/quran-uthmani,${translationEdition}`,
      { next: { revalidate: 86400 } }
    );
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length >= 2) {
        const arabicData = json.data[0].ayahs;
        const translationData = json.data[1].ayahs;

        return arabicData.map((item: { number: number; numberInSurah: number; juz: number; manzil: number; page: number; ruku: number; hizbQuarter: number; sajda: boolean | object; text: string }, idx: number) => ({
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
        }));
      }
    }
  } catch (err) {
    console.error(`Failed to fetch ayahs for surah ${surahNumber}:`, err);
  }
  return [];
}

export async function getSingleAyah(
  surahNumber: number,
  ayahNumber: number,
  translationEdition = "en.sahih"
): Promise<Ayah | null> {
  const ayahs = await getSurahAyahs(surahNumber, translationEdition);
  return ayahs.find((a) => a.numberInSurah === ayahNumber) || null;
}

export const getAyah = getSingleAyah;

export async function getJuzAyahs(juzNumber: number): Promise<{ surah: Surah; ayahs: Ayah[] }[]> {
  try {
    const res = await fetch(`${ALQURAN_API_BASE}/juz/${juzNumber}/editions/quran-uthmani,en.sahih`, {
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.ayahs) {
        const arabic = json.data.editions ? json.data.editions[0].ayahs : json.data.ayahs;
        const translation = json.data.editions && json.data.editions[1] ? json.data.editions[1].ayahs : [];

        const grouped: { [key: number]: Ayah[] } = {};
        arabic.forEach((item: { surah: { number: number }; number: number; numberInSurah: number; juz: number; manzil: number; page: number; ruku: number; hizbQuarter: number; sajda: boolean | object; text: string }, idx: number) => {
          const sNum = item.surah.number;
          if (!grouped[sNum]) grouped[sNum] = [];
          grouped[sNum].push({
            number: item.number,
            numberInSurah: item.numberInSurah,
            juz: item.juz,
            manzil: item.manzil,
            page: item.page,
            ruku: item.ruku,
            hizbQuarter: item.hizbQuarter,
            sajda: item.sajda,
            text: item.text,
            translation: translation[idx] ? translation[idx].text : "",
          });
        });

        const result = [];
        for (const [surahNumStr, ayahs] of Object.entries(grouped)) {
          const sNum = parseInt(surahNumStr);
          const surah = await getSurah(sNum);
          result.push({ surah, ayahs });
        }
        return result;
      }
    }
  } catch (err) {
    console.error(`Failed to fetch Juz ${juzNumber}:`, err);
  }
  return [];
}

export async function searchQuran(query: string) {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch(`${ALQURAN_API_BASE}/search/${encodeURIComponent(query)}/all/en.sahih`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.matches) {
        return json.data.matches.map((m: { surah: { number: number; englishName: string }; numberInSurah: number; text: string }) => ({
          surahNumber: m.surah.number,
          surahName: m.surah.englishName,
          ayahNumber: m.numberInSurah,
          text: m.text,
          translation: m.text,
        }));
      }
    }
  } catch (err) {
    console.error("Search API error:", err);
  }
  return [];
}
