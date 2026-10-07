"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

export type AudioTrack = {
  surahNumber: number;
  ayahNumber: number;
  surahName?: string;
  audioUrl: string;
};

type AudioContextType = {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  playbackSpeed: number;
  repeatMode: "none" | "ayah" | "surah";
  audioError: string | null;
  playTrack: (track: AudioTrack) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setRepeatMode: (mode: "none" | "ayah" | "surah") => void;
  setNextTrackHandler: (handler: () => void) => void;
  clearError: () => void;
};

const AudioContext = createContext<AudioContextType>({
  currentTrack: null,
  isPlaying: false,
  playbackSpeed: 1,
  repeatMode: "none",
  audioError: null,
  playTrack: () => {},
  pauseTrack: () => {},
  togglePlay: () => {},
  setSpeed: () => {},
  setRepeatMode: () => {},
  setNextTrackHandler: () => {},
  clearError: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [repeatMode, setRepeatMode] = useState<"none" | "ayah" | "surah">("none");
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nextHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleEnded = () => {
      if (repeatMode === "ayah" && audio) {
        audio.currentTime = 0;
        audio.play();
      } else if (nextHandlerRef.current) {
        nextHandlerRef.current();
      } else {
        setIsPlaying(false);
      }
    };

    const handleError = (e: Event) => {
      console.error("Audio playback error event:", e);
      setIsPlaying(false);
      setAudioError("Audio is currently unavailable for this reciter. Please try another reciter.");
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, [repeatMode]);

  const playTrack = (track: AudioTrack) => {
    if (!audioRef.current) return;
    setAudioError(null);
    setCurrentTrack(track);
    audioRef.current.src = track.audioUrl;
    audioRef.current.playbackRate = playbackSpeed;

    audioRef.current.play().catch((err) => {
      console.error("Audio play error:", err);
      setIsPlaying(false);
      setAudioError("Unable to play audio. Please check network connection or try another reciter.");
    });
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (currentTrack) {
      audioRef.current.play().catch((err) => {
        console.error("Audio resume error:", err);
        setIsPlaying(false);
        setAudioError("Unable to resume audio playback.");
      });
      setIsPlaying(true);
    }
  };

  const setSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const setNextTrackHandler = (handler: () => void) => {
    nextHandlerRef.current = handler;
  };

  const clearError = () => setAudioError(null);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playbackSpeed,
        repeatMode,
        audioError,
        playTrack,
        pauseTrack,
        togglePlay,
        setSpeed,
        setRepeatMode,
        setNextTrackHandler,
        clearError,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
