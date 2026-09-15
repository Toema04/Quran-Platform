"use client";

import React from "react";
import { useSettings } from "@/providers/settings-provider";
import { Settings, Globe, BookOpen, Volume2, MapPin, Bell } from "lucide-react";
import { RECITERS } from "@/lib/api/reciters";
import { CITIES } from "@/app/prayer-times/page";
import { ARABIC_FONTS } from "@/lib/api/quran";
import { UserSettings } from "@/types";

export default function SettingsPage() {
  const { settings, updateSettings, t } = useSettings();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <Settings className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.settings}</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Customize your Quran reading, language, audio reciters, prayer calculation, and theme preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Language & Theme */}
        <div className="p-6 rounded-3xl border border-emerald-900/10 bg-card space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-foreground flex items-center gap-2 border-b pb-3">
            <Globe className="h-5 w-5 text-emerald-700" />
            <span>{t.language} & Display</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{t.language}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateSettings({ language: "en" })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    settings.language === "en"
                      ? "bg-emerald-800 text-white border-emerald-800"
                      : "bg-background border-emerald-900/20 text-muted-foreground"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => updateSettings({ language: "ar" })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    settings.language === "ar"
                      ? "bg-emerald-800 text-white border-emerald-800"
                      : "bg-background border-emerald-900/20 text-muted-foreground"
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Theme</label>
              <div className="grid grid-cols-3 gap-2">
                {(["system", "light", "dark"] as const).map((th) => (
                  <button
                    key={th}
                    onClick={() => updateSettings({ theme: th })}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border capitalize transition ${
                      settings.theme === th
                        ? "bg-emerald-800 text-white border-emerald-800"
                        : "bg-background border-emerald-900/20 text-muted-foreground"
                    }`}
                  >
                    {th}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quran Reader Settings */}
        <div className="p-6 rounded-3xl border border-emerald-900/10 bg-card space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-foreground flex items-center gap-2 border-b pb-3">
            <BookOpen className="h-5 w-5 text-emerald-700" />
            <span>Quran Script & Typography</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Arabic Script Font</label>
              <select
                value={settings.arabic_font || "uthmani"}
                onChange={(e) => updateSettings({ arabic_font: e.target.value as UserSettings["arabic_font"] })}
                className="w-full p-2.5 rounded-2xl border border-emerald-900/20 bg-background text-xs font-semibold focus:outline-none"
              >
                {ARABIC_FONTS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                Arabic Font Size ({settings.arabic_font_size || 28}px)
              </label>
              <input
                type="range"
                min="20"
                max="44"
                value={settings.arabic_font_size || 28}
                onChange={(e) => updateSettings({ arabic_font_size: parseInt(e.target.value) })}
                className="w-full accent-emerald-800"
              />
            </div>
          </div>
        </div>

        {/* Audio Preferences */}
        <div className="p-6 rounded-3xl border border-emerald-900/10 bg-card space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-foreground flex items-center gap-2 border-b pb-3">
            <Volume2 className="h-5 w-5 text-emerald-700" />
            <span>Default Qari & Audio</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Default Reciter</label>
              <select
                value={settings.reciter_id || "ar.alafasy"}
                onChange={(e) => updateSettings({ reciter_id: e.target.value })}
                className="w-full p-2.5 rounded-2xl border border-emerald-900/20 bg-background text-xs font-semibold focus:outline-none"
              >
                {RECITERS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.arabicName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Playback Speed</label>
              <select
                value={settings.playback_speed || 1}
                onChange={(e) => updateSettings({ playback_speed: parseFloat(e.target.value) })}
                className="w-full p-2.5 rounded-2xl border border-emerald-900/20 bg-background text-xs font-semibold focus:outline-none"
              >
                <option value={0.75}>0.75x (Slower)</option>
                <option value={1}>1.0x (Normal)</option>
                <option value={1.25}>1.25x (Faster)</option>
                <option value={1.5}>1.5x (Fast)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prayer Settings */}
        <div className="p-6 rounded-3xl border border-emerald-900/10 bg-card space-y-4 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-foreground flex items-center gap-2 border-b pb-3">
            <MapPin className="h-5 w-5 text-emerald-700" />
            <span>Prayer Location & Notifications</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Default City</label>
              <select
                onChange={(e) => alert(`Default city set to ${e.target.value}`)}
                className="w-full p-2.5 rounded-2xl border border-emerald-900/20 bg-background text-xs font-semibold focus:outline-none"
              >
                {CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}, {c.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="text-xs font-semibold text-foreground flex items-center gap-2">
                <Bell className="h-4 w-4 text-emerald-700" />
                <span>Prayer Time Alerts</span>
              </span>
              <input
                type="checkbox"
                checked={settings.notifications_enabled}
                onChange={(e) => updateSettings({ notifications_enabled: e.target.checked })}
                className="h-5 w-5 accent-emerald-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
