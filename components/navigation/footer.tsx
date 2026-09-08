import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-emerald-900/10 bg-card py-10 px-4 md:px-8 text-xs text-muted-foreground mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <h3 className="font-serif font-bold text-base text-foreground">Quran Platform</h3>
          <p className="leading-relaxed">
            A premium, distraction-free Quran reading, audio, and study platform for Muslims worldwide.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Quran</h4>
          <ul className="space-y-1">
            <li><Link href="/quran" className="hover:underline">All Surahs</Link></li>
            <li><Link href="/juz" className="hover:underline">30 Juz</Link></li>
            <li><Link href="/hizb" className="hover:underline">Hizb Quarters</Link></li>
            <li><Link href="/reciters" className="hover:underline">Qaris & Reciters</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Tools</h4>
          <ul className="space-y-1">
            <li><Link href="/prayer-times" className="hover:underline">Prayer Times</Link></li>
            <li><Link href="/qibla" className="hover:underline">Qibla Direction</Link></li>
            <li><Link href="/ramadan" className="hover:underline">Ramadan Companion</Link></li>
            <li><Link href="/tafsir" className="hover:underline">Classical Tafsir</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">Legal & About</h4>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:underline">About Project</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-emerald-900/10 text-center">
        <p>© {new Date().getFullYear()} Holy Quran Platform. All Quranic data sourced from verified authentic endpoints.</p>
      </div>
    </footer>
  );
}
