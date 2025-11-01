import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const stored = localStorage.getItem("sinceNow-sound");
    return stored !== "false";
  });

  useEffect(() => {
    localStorage.setItem("sinceNow-sound", soundEnabled.toString());
  }, [soundEnabled]);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setSoundEnabled(!soundEnabled)}
      className="rounded-full"
      data-testid="button-sound-toggle"
    >
      {soundEnabled ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle sound</span>
    </Button>
  );
}

export function useSoundEnabled() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const stored = localStorage.getItem("sinceNow-sound");
    return stored !== "false";
  });

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("sinceNow-sound");
      setSoundEnabled(stored !== "false");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return soundEnabled;
}

export function playMilestoneSound() {
  const soundEnabled = localStorage.getItem("sinceNow-sound") !== "false";
  if (!soundEnabled) return;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}
