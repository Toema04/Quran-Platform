"use client";

import React, { createContext, useContext, useState } from "react";
import { UserSettings } from "@/types";

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
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
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

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== "undefined") {
        localStorage.setItem("quran_user_settings", JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
