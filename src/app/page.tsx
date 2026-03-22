"use client";

import React, { useState, useEffect, useCallback } from "react";
import Bird from "@/components/Bird";
import { useControls } from "@/hooks/useControls";
import { useGameLoop } from "@/hooks/useGameLoop";
import { GAME_CONFIG } from "@/lib/constants";
import { GameStatus } from "@/types/game";

export default function FlappyBirdPage() {
  const [gameState, setGameState] = useState<GameStatus>("START");
  const [score, setScore] = useState(0);
  const initialY = (GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.BIRD_HEIGHT) / 2;

  const onGameOver = () => setGameState("GAME_OVER");

  const { bird, flap, resetBird } = useGameLoop(gameState, onGameOver);

  // Trigger jump or start game
  const handleInteraction = () => {
    if (gameState === "START" || gameState === "GAME_OVER") {
      resetBird();
      setGameState("PLAYING");
    } else {
      flap();
    }
  };

  useControls(handleInteraction);

  return (
    <main
      className="relative flex h-screen w-screen items-center justify-center bg-slate-900 select-none"
      onClick={handleInteraction}
    >
      {/* Game Container */}
      <div
        className="relative overflow-hidden bg-sky-400 border-4 border-slate-700 shadow-2xl"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {gameState === "START" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/30 text-white">
            <h1 className="text-[clamp(4rem,20vw,15rem)] tracking-widest font-black mb-4 uppercase tracking-tighter">
              Flappy Macky
            </h1>
            <p className="text-[clamp(2.5rem,8vw,5rem)] tracking-wider animate-pulse">
              Click or Space to Fly
            </p>
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-red-500/40 text-white">
            <h2 className="text-[clamp(4rem,20vw,15rem)] tracking-widest font-black mb-2">
              CRASHED!
            </h2>
            <button
              className="text-[clamp(1rem,6vw,3rem)] bg-white text-slate-900 px-6 py-2 font-bold rounded-lg hover:bg-slate-200 transition"
              onClick={handleInteraction}
            >
              Try Again
            </button>
          </div>
        )}

        {/* The Bird: Now using real state from our hook! */}
        <Bird y={bird.y} velocity={bird.velocity} />

        {/* Ground */}
        <div className="absolute bottom-0 w-full h-20 bg-emerald-500 border-t-4 border-emerald-700 z-20" />
      </div>
    </main>
  );
}
