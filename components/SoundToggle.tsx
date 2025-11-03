"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load from localStorage
    const savedMuteState = localStorage.getItem("fc_sound_muted");
    if (savedMuteState !== null) {
      setIsMuted(savedMuteState === "true");
    }

    // Initialize audio
    if (typeof window !== "undefined") {
      const audio = new Audio("/audio/ambiance.mp3");
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Auto-play blocked
      });
    }

    localStorage.setItem("fc_sound_muted", String(isMuted));
  }, [isMuted]);

  const toggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full bg-anthracite/80 backdrop-blur-sm border border-gold/20",
        "hover:bg-anthracite hover:border-gold/40 transition-all"
      )}
      aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5 text-cream-white" />
      ) : (
        <Volume2 className="h-5 w-5 text-gold" />
      )}
    </Button>
  );
}

