"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserSettings } from "@/types";
import { getTranslation, Language } from "@/lib/translations";

const defaultSettings: UserSettings = {
  theme: "system",
  language: "en",
  arabic_font: "uthmani",
  arabic_font_size: 28,
  translation_font_size: 16,
  translation_id: "en.sahih",
  tafsir_id: "en-tafisr-ibn-kathir",
  reciter_id: "ar.alafasy",
  playback_speed: 1,
  auto_play: true,
  notifications_enabled: true,
};

type SettingsContextType = {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  t: ReturnType<typeof getTranslation>;
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  t: getTranslation("en"),
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quran_user_settings");
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) };
        } catch (e) {
          console.error("Failed to parse settings", e);
        }
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      const lang = settings.language || "en";
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [settings.language]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== "undefined") {
        localStorage.setItem("quran_user_settings", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const t = getTranslation(settings.language as Language);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
