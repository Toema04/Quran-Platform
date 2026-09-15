"use client";

import React from "react";
import Link from "next/link";
import { User, Mail, Shield, Settings } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-6 shadow-xs text-center">
        <div className="h-20 w-20 rounded-full bg-emerald-800 text-white mx-auto flex items-center justify-center font-bold text-3xl shadow-md">
          ق
        </div>

        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Quran Companion User</h1>
          <p className="text-xs text-muted-foreground">Local Session Active</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4 border-t">
          <div className="p-4 rounded-2xl bg-emerald-900/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" /> Email
            </span>
            <p className="text-sm font-semibold text-foreground">guest@quranplatform.com</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
              <Shield className="h-3 w-3" /> Sync Status
            </span>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Local Persistence</p>
          </div>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/settings"
            className="px-5 py-2.5 rounded-2xl bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-700 transition flex items-center gap-1.5"
          >
            <Settings className="h-4 w-4" />
            <span>Manage Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
