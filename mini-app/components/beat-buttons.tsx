"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BeatButtons() {
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActive(index);
    // placeholder for playing beat
    console.log(`Playing beat ${index + 1}`);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {[...Array(6)].map((_, i) => (
        <Button
          key={i}
          variant={active === i ? "secondary" : "outline"}
          onClick={() => handleClick(i)}
        >
          Beat {i + 1}
        </Button>
      ))}
    </div>
  );
}
