import React from "react";

interface ScoreProps {
  score: string | number;
}

export default function Score({ score }: ScoreProps) {
  const displayScore = String(score).replace(/0/g, "O");
  return (
    <div className="relative top-4 left-4 flex flex-row items-center text-[clamp(2rem,5vw,3rem)] font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-sans">
      <span>Score: </span>
      <span>{displayScore}</span>
    </div>
  );
}
