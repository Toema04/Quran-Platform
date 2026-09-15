"use client";

import React from "react";
import Link from "next/link";
import { useSettings } from "@/providers/settings-provider";

export function Footer() {
  const { t } = useSettings();

  return (
    <footer className="border-t border-emerald-900/10 bg-card py-10 px-4 md:px-8 text-xs text-muted-foreground mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <h3 className="font-serif font-bold text-base text-foreground">{t.brand}</h3>
          <p className="leading-relaxed">
            {t.tagline}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">{t.quran}</h4>
          <ul className="space-y-1">
            <li><Link href="/quran" className="hover:underline">{t.allSurahs}</Link></li>
            <li><Link href="/juz" className="hover:underline">{t.thirtyJuz}</Link></li>
            <li><Link href="/hizb" className="hover:underline">{t.hizbQuarters}</Link></li>
            <li><Link href="/reciters" className="hover:underline">{t.qarisReciters}</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">{t.tools}</h4>
          <ul className="space-y-1">
            <li><Link href="/prayer-times" className="hover:underline">{t.prayerTimes}</Link></li>
            <li><Link href="/qibla" className="hover:underline">{t.qiblaDirection}</Link></li>
            <li><Link href="/ramadan" className="hover:underline">{t.ramadanCompanion}</Link></li>
            <li><Link href="/tafsir" className="hover:underline">{t.classicalTafsir}</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">{t.legal}</h4>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:underline">{t.about}</Link></li>
            <li><Link href="/privacy" className="hover:underline">{t.privacy}</Link></li>
            <li><Link href="/terms" className="hover:underline">{t.terms}</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-emerald-900/10 text-center">
        <p>© {new Date().getFullYear()} {t.brand}. {t.copyright}</p>
      </div>
    </footer>
  );
}
