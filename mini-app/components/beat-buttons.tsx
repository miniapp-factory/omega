"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export default function BeatButtons() {
  const [selected, setSelected] = useState<number[]>([]);
  const [composition, setComposition] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioElements = useRef<Record<number, HTMLAudioElement>>({});
  const labels = [
    "{",   // Kick/Bass Drum
    ";",   // Snare/Rhythm
    "//",   // Hi‑Hat/Effect
    "!",   // Reset/Clear
  ];


  // Placeholder audio files located in /public
  const audioMap: Record<number, string> = {
    0: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    1: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    2: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  };
  const playBeat = (index: number) => {
    const src = audioMap[index];
    if (!src) return;
    let audio = audioElements.current[index];
    if (!audio) {
      audio = new Audio(src);
      audioElements.current[index] = audio;
    }
    audio.play();
  };

  const handleClick = (index: number) => {
    if (index === 3) { // Reset/Clear button
      setComposition("");
      setSelected([]);
      return;
    }
    // Pre‑initialize audio for the first user click on a symbol button
    if (index < 3 && !audioElements.current[index]) {
      const src = audioMap[index];
      if (src) {
        audioElements.current[index] = new Audio(src);
      }
    }
    setSelected([index]);
    setComposition(prev => prev + labels[index] + " ");
  };

  const handleExecute = async () => {
    if (isPlaying || !composition.trim()) return;
    setIsPlaying(true);
    const symbols = composition.trim().match(/(\{|\;|\/\/|!)/g) ?? [];
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
      <div className="bg-black text-green-400 p-4 rounded mt-16 mb-4 w-full h-[60vh] overflow-auto font-mono whitespace-pre-wrap">
        {composition || <span className="text-gray-500">No beats yet.</span>}
      </div>
      <div className="fixed top-0 left-0 w-full flex justify-center gap-2 p-2 bg-black z-10">
        {[...Array(4)].map((_, i) => (
          <Button
            key={i}
            variant={selected.includes(i) ? "secondary" : "outline"}
            onClick={() => handleClick(i)}
            className="border-emerald-600 bg-black w-10 h-10"
          >
            {labels[i]}
          </Button>
        ))}
        <Button
          variant="default"
          className="border-emerald-600 bg-black w-10 h-10"
          onClick={handleExecute}
          disabled={isPlaying || !composition.trim()}
        >
          {'>'}
        </Button>
      </div>
    </div>
  );
}
