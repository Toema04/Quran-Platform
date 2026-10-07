"use client";

import React from "react";
import { BookOpen, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

export default function AboutPage() {
  const { t } = useSettings();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="space-y-4 text-center">
        <div className="h-14 w-14 rounded-2xl bg-emerald-800 text-white mx-auto flex items-center justify-center font-bold text-2xl shadow-md">
          ق
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
          About {t.brand}
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
          {t.tagline}
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-6 shadow-xs leading-relaxed text-sm text-foreground/90 font-serif">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2 font-sans">
          <ShieldCheck className="h-5 w-5 text-emerald-700" />
          <span>Our Commitment to Authenticity</span>
        </h2>
        <p>
          All Arabic Quranic text and verse recitations displayed on this platform are retrieved dynamically from verified authentic endpoints. Quranic verses and text are never generated or modified artificially.
        </p>

        <h2 className="text-xl font-bold text-foreground flex items-center gap-2 font-sans pt-4 border-t">
          <Sparkles className="h-5 w-5 text-emerald-700" />
          <span>Core Mission & Features</span>
        </h2>
        <ul className="list-disc pl-5 space-y-2 font-sans text-xs md:text-sm text-muted-foreground">
          <li><strong>Distraction-Free Reading:</strong> Beautiful typography with continuous and Mushaf modes.</li>
          <li><strong>Verified Classical Tafsir:</strong> Commentary from Ibn Kathir, Tabari, Qurtubi, and Sa&apos;di.</li>
          <li><strong>Qaris Recitations:</strong> High quality audio recitations from renowned world Qaris.</li>
          <li><strong>Word Pronunciation Practice:</strong> Interactive word selection and microphone pronunciation feedback.</li>
          <li><strong>Global Prayer Schedules & Qibla:</strong> Accurate location-aware prayer times and Kaaba direction finder.</li>
        </ul>
      </div>
    </div>
  );
}
