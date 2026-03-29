import React from "react";

interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps) {
  return (
    <div className="absolute top-4 left-4 text-[clamp(2rem,8vw,4rem)] font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      {score}
    </div>
  );
}
