"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Search, Clock, User } from "lucide-react";

export function MobileBottomBar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-md border-t border-emerald-900/10 px-2 py-2 flex items-center justify-around text-[10px] font-semibold text-muted-foreground">
      <Link href="/" className="flex flex-col items-center gap-1 hover:text-emerald-800">
        <BookOpen className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <Link href="/quran" className="flex flex-col items-center gap-1 hover:text-emerald-800">
        <BookOpen className="h-4 w-4" />
        <span>Quran</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-1 hover:text-emerald-800">
        <Search className="h-4 w-4" />
        <span>Search</span>
      </Link>
      <Link href="/prayer-times" className="flex flex-col items-center gap-1 hover:text-emerald-800">
        <Clock className="h-4 w-4" />
        <span>Prayer</span>
      </Link>
      <Link href="/dashboard" className="flex flex-col items-center gap-1 hover:text-emerald-800">
        <User className="h-4 w-4" />
        <span>Account</span>
      </Link>
    </nav>
  );
}
