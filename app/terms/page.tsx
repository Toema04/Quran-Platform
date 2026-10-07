"use client";

import React from "react";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <FileText className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">Terms of Service</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Guidelines and terms for accessing and using the Holy Quran platform.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-4 text-sm text-foreground/90 font-serif leading-relaxed">
        <h2 className="text-lg font-bold font-sans text-foreground">1. Platform Purpose</h2>
        <p>
          This platform is provided for non-commercial educational, devotional, and study purposes for Muslims and interested readers worldwide.
        </p>

        <h2 className="text-lg font-bold font-sans text-foreground pt-4 border-t">2. Content Integrity</h2>
        <p>
          The Arabic Quranic text, translations, commentaries, and recitations must be respected and referenced accurately without alteration.
        </p>

        <h2 className="text-lg font-bold font-sans text-foreground pt-4 border-t">3. Service Availability</h2>
        <p>
          We strive to keep the service operational and available free of charge continuously.
        </p>
      </div>
    </div>
  );
}
