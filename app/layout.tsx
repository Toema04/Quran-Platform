import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/providers/settings-provider";
import { AudioProvider } from "@/providers/audio-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { MobileBottomBar } from "@/components/navigation/mobile-bar";
import { AudioPlayerUI } from "@/components/audio/audio-player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holy Quran Platform — Read, Listen & Reflect",
  description: "A production-grade, peaceful Quran web application for reading, listening to recitations, studying Tafsir, tracking progress, and finding prayer times.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>
          <SettingsProvider>
            <AudioProvider>
              <Header />
              <main className="flex-1 px-4 md:px-8 py-6">{children}</main>
              <AudioPlayerUI />
              <Footer />
              <MobileBottomBar />
            </AudioProvider>
          </SettingsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
