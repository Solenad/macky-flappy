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
      className="relative flex h-screen w-full items-center justify-center bg-slate-900 select-none"
      onClick={handleInteraction}
    >
      {/* Game Container */}
      <div
        className="relative overflow-hidden bg-sky-400 border-4 border-slate-700 shadow-2xl"
        style={{
          width: GAME_CONFIG.CANVAS_WIDTH,
          height: GAME_CONFIG.CANVAS_HEIGHT,
        }}
      >
        {gameState === "START" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/30 text-white">
            <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">
              Flappy Macky
            </h1>
            <p className="animate-pulse">Click or Space to Fly</p>
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-red-500/40 text-white">
            <h2 className="text-5xl font-black mb-2">CRASHED!</h2>
            <button
              className="bg-white text-slate-900 px-6 py-2 font-bold rounded-lg hover:bg-slate-200 transition"
              onClick={handleInteraction}
            >
              Try Again
            </button>
          </div>
        )}

        <Bird y={bird.y} velocity={bird.velocity} />

        {/* Ground */}
        <div className="absolute bottom-0 w-full h-20 bg-emerald-500 border-t-4 border-emerald-700 z-20" />
      </div>
    </main>
  );
}
