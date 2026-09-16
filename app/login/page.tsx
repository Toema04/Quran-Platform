"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Lock, Mail, ArrowRight } from "lucide-react";
import { useSettings } from "@/providers/settings-provider";

export default function LoginPage() {
  const { t } = useSettings();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Logged in successfully (guest/local profile activated).");
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-6 shadow-lg">
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-emerald-800 text-white mx-auto flex items-center justify-center font-bold text-xl shadow-sm">
          ق
        </div>
        <h1 className="text-2xl font-serif font-bold text-foreground">Welcome Back</h1>
        <p className="text-xs text-muted-foreground">Sign in to sync your bookmarks, favorites, and reading streak.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-emerald-900/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-emerald-900/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-700 transition shadow-md flex items-center justify-center gap-2"
        >
          <span>Sign In</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="text-center text-xs text-muted-foreground pt-2 border-t">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-emerald-800 dark:text-emerald-300 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}
