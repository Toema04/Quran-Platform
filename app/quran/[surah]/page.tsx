"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getSurahStartPage } from "@/lib/api/surah-pages";

export default function SurahRedirectPage({ params }: { params: Promise<{ surah: string }> }) {
  const resolvedParams = use(params);
  const surahNum = parseInt(resolvedParams.surah) || 1;
  const router = useRouter();

  useEffect(() => {
    const startPage = getSurahStartPage(surahNum);
    router.replace(`/quran/page/${startPage}`);
  }, [surahNum, router]);

  return (
    <div className="py-20 text-center text-sm font-semibold text-muted-foreground animate-pulse">
      Opening Surah Mushaf Page...
    </div>
  );
}
