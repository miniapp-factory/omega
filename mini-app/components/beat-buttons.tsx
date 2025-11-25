"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BeatButtons() {
  const [selected, setSelected] = useState<number[]>([]);
  const [composition, setComposition] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const labels = [
    "{",   // Kick/Bass Drum
    ";",   // Snare/Rhythm
    "//",   // Hi‑Hat/Effect
    "!",   // Reset/Clear
  ];


  // Placeholder audio files located in /public
  const audioMap: Record<number, string> = {
    0: "https://s3.amazonaws.com/freecodecamp/drums/Punchy_Kick_1.mp3",
    1: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    2: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  };
  const playBeat = (index: number) => {
    const src = audioMap[index];
    if (src) {
      const audio = new Audio(src);
      audio.play();
    }
  };

  const handleClick = (index: number) => {
    if (index === 3) { // Reset/Clear button
      setComposition("");
      setSelected([]);
      return;
    }
    setSelected([index]);
    setComposition(prev => prev + labels[index] + " ");
  };

  const handleExecute = async () => {
    if (isPlaying || !composition.trim()) return;
    setIsPlaying(true);
    const symbols = composition.trim().split(/\s+/);
    for (const sym of symbols) {
      const idx = labels.indexOf(sym);
      if (idx !== -1) {
        playBeat(idx);
        await new Promise(res => setTimeout(res, 600)); // 600ms between beats
      }
    }
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-900 text-green-400 p-4 rounded mb-4 w-full h-3/5 overflow-auto font-mono">
        {composition || <span className="text-gray-500">No beats yet.</span>}
      </div>
      <div className="grid grid-cols-4 gap-2 h-2/5">
        {[...Array(4)].map((_, i) => (
          <Button
            key={i}
            variant={selected.includes(i) ? "secondary" : "outline"}
            onClick={() => handleClick(i)}
          >
            {labels[i]}
          </Button>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          variant="default"
          className="w-full h-12"
          onClick={handleExecute}
          disabled={isPlaying || !composition.trim()}
        >
          RUN
        </Button>
      </div>
    </div>
  );
}
