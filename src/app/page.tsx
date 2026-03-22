"use client";

import React, { useState, useEffect, useCallback } from "react";
// import BirdComponent from "@/src/components/Bird";
// import PipeComponent from "@/src/components/Pipe";
// import ScoreBoard from "@/src/components/UI/Score";
// import GameOver from "@/src/components/UI/GameOver";
import { GAME_CONFIG } from "@/src/lib/constants";

export default function FlappyBirdPage() {
  const [gameState, setGameState] = useState<GameStatus>("START");
  const [score, setScore] = useState(0);

  const handleJump = useCallback(() => {
    if (gameState === "START") {
      setGameState("PLAYING");
    }
    if (gameState === "PLAYING") {
      console.log("Flap!");
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") handleJump();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleJump]);

  return (
    <main
      className="relative flex h-screen w-full items-center justify-center bg-slate-900 overflow-hidden select-none"
      onClick={handleJump}
    >
      {/* Game Container: Fixed Aspect Ratio */}
      <div className="relative h-[600px] w-[400px] bg-sky-400 border-4 border-slate-700 shadow-2xl overflow-hidden">

        {gameState === "START" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/20 text-white">
            <h1 className="text-4xl font-bold mb-4">FLAPPY NEXT</h1>
            <p className="animate-bounce">Press Space or Click to Start</p>
          </div>
        )}

        {/* The Bird: Rendered based on Y-coordinate state */}

        {/* The Pipes: Mapped from an array of pipe objects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Example static pipe for layout visualization */}
        </div>

        {gameState === "GAME_OVER" && (
        )}

        {/* Ground Decor */}
        <div className="absolute bottom-0 w-full h-20 bg-emerald-500 border-t-4 border-emerald-700" />
      </div>
    </main>
  );
}
