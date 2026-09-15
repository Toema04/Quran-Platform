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
  playTrack: (track: AudioTrack) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setRepeatMode: (mode: "none" | "ayah" | "surah") => void;
  setNextTrackHandler: (handler: () => void) => void;
};

const AudioContext = createContext<AudioContextType>({
  currentTrack: null,
  isPlaying: false,
  playbackSpeed: 1,
  repeatMode: "none",
  playTrack: () => {},
  pauseTrack: () => {},
  togglePlay: () => {},
  setSpeed: () => {},
  setRepeatMode: () => {},
  setNextTrackHandler: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [repeatMode, setRepeatMode] = useState<"none" | "ayah" | "surah">("none");

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

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [repeatMode]);

  const playTrack = (track: AudioTrack) => {
    if (!audioRef.current) return;
    setCurrentTrack(track);
    audioRef.current.src = track.audioUrl;
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.play();
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
      audioRef.current.play();
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

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playbackSpeed,
        repeatMode,
        playTrack,
        pauseTrack,
        togglePlay,
        setSpeed,
        setRepeatMode,
        setNextTrackHandler,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
