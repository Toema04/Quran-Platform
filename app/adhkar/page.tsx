"use client";

import React, { useState } from "react";
import { ADHKAR_DATA, Dhikr } from "@/lib/adhkar";
import { BookOpen, CheckCircle2, RotateCcw, Shield } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

export default function AdhkarPage() {
  const { t } = useSettings();
  const [activeCategory, setActiveCategory] = useState<Dhikr["category"]>("morning");
  const [counters, setCounters] = useState<{ [id: string]: number }>({});

  const categories: { id: Dhikr["category"]; labelKey: keyof typeof t }[] = [
    { id: "morning", labelKey: "morning" },
    { id: "evening", labelKey: "evening" },
    { id: "after_prayer", labelKey: "after_prayer" },
    { id: "sleeping", labelKey: "sleeping" },
    { id: "waking_up", labelKey: "waking_up" },
    { id: "eating", labelKey: "eating" },
    { id: "mosque", labelKey: "mosque" },
    { id: "travel", labelKey: "travel" },
    { id: "protection", labelKey: "protection" },
    { id: "prophetic_duas", labelKey: "prophetic_duas" },
  ];

  const handleIncrement = (item: Dhikr) => {
    const current = counters[item.id] || 0;
    if (current < item.repeatCount) {
      setCounters((prev) => ({ ...prev, [item.id]: current + 1 }));
    }
  };

  const handleReset = (id: string) => {
    setCounters((prev) => ({ ...prev, [id]: 0 }));
  };

  const filtered = ADHKAR_DATA.filter((d) => d.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{t.adhkar}</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Authentic Islamic morning, evening, daily supplications, and Prophetic Duas with repetition counters and verified sources.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold border transition ${
                activeCategory === cat.id
                  ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                  : "bg-card border-emerald-900/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{t[cat.labelKey] as string}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item) => {
          const count = counters[item.id] || 0;
          const isCompleted = count >= item.repeatCount;

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition space-y-4 ${
                isCompleted
                  ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40"
                  : "border-emerald-900/10 bg-card hover:border-emerald-600/30"
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 text-xs">
                <span className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  <span>{item.source}</span>
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground">
                    {t.repeatCount}: {item.repeatCount}x
                  </span>
                  <button
                    onClick={() => handleReset(item.id)}
                    className="p-1 rounded hover:bg-emerald-900/10 text-muted-foreground"
                    title={t.reset}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="py-2 text-right" dir="rtl">
                <p className="font-arabic font-bold text-2xl md:text-3xl text-emerald-950 dark:text-emerald-100 leading-widest">
                  {item.arabicText}
                </p>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed font-serif">
                {item.translation}
              </p>

              <div className="pt-2 flex items-center justify-between">
                {isCompleted ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{t.completed}</span>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-muted-foreground">
                    {count} / {item.repeatCount}
                  </span>
                )}

                <button
                  onClick={() => handleIncrement(item)}
                  disabled={isCompleted}
                  className={`px-6 py-2.5 rounded-2xl font-bold text-xs transition shadow-xs ${
                    isCompleted
                      ? "bg-emerald-900/20 text-emerald-700 cursor-not-allowed"
                      : "bg-emerald-800 text-white hover:bg-emerald-700"
                  }`}
                >
                  {isCompleted ? t.completed : `${t.count} (${count}/${item.repeatCount})`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
