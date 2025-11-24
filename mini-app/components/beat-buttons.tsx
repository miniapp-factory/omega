"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BeatButtons() {
  const [selected, setSelected] = useState<number[]>([]);
  const labels = [
    "Foundation",
    "Action",
    "Accessory",
    "Control",
    "Debug",
    "Reset",
  ];

  const playBeat = (index: number) => {
    console.log(`Playing beat ${index + 1}`);
  };

  const combineBeats = (first: number, second: number) => {
    console.log(`Combining beats ${first + 1} and ${second + 1}`);
    // TODO: implement actual mixing logic and minting
  };

  const handleClick = (index: number) => {
    if (selected.length === 0) {
      setSelected([index]);
      playBeat(index);
    } else if (selected.length === 1 && selected[0] !== index) {
      combineBeats(selected[0], index);
      setSelected([]);
    } else {
      // clicking the same beat again resets selection
      setSelected([]);
    }
  };

  return (
    <div>
      <div className="bg-gray-800 text-green-400 p-2 rounded mb-2">
        Selected beats: {selected.map(i => labels[i]).join(', ')}
      </div>
      <div className="grid grid-cols-3 gap-2">
      {[...Array(6)].map((_, i) => (
        <Button
          key={i}
          variant={selected.includes(i) ? "secondary" : "outline"}
          onClick={() => handleClick(i)}
        >
          {labels[i]}
        </Button>
      ))}
    </div>
    </div>
  );
}
