"use client";

import React from "react";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <Shield className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Your privacy is sacred to us. Learn how we handle your preferences and data.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-4 text-sm text-foreground/90 font-serif leading-relaxed">
        <h2 className="text-lg font-bold font-sans text-foreground">1. Data Storage</h2>
        <p>
          We prioritize local storage for guest users. Your preferences, including font size, language selection, bookmarks, and favorite Qaris, remain on your device unless synced with your account.
        </p>

        <h2 className="text-lg font-bold font-sans text-foreground pt-4 border-t">2. Location Permissions</h2>
        <p>
          Location data is used strictly client-side to calculate local prayer times and Kaaba direction for Qibla finding. Precise location data is never shared with third parties or stored on external servers.
        </p>

        <h2 className="text-lg font-bold font-sans text-foreground pt-4 border-t">3. Microphone Permissions</h2>
        <p>
          Microphone permission is requested solely when using the interactive Word Pronunciation Practice feature to record and analyze audio. Recorded audio is processed strictly within the session and never stored permanently.
        </p>
      </div>
    </div>
  );
}
