"use client";

import React, { useState, useEffect, useCallback } from "react";
import Bird from "@/components/Bird";
import Pipe from "@/components/Pipe";
import Score from "@/components/ui/Score";
import { useControls } from "@/hooks/useControls";
import useGameLoop from "@/hooks/useGameLoop";
import { GAME_CONFIG } from "@/lib/constants";
import { GameStatus } from "@/types/game";

export default function FlappyBirdPage() {
  const [gameState, setGameState] = useState<GameStatus>("START");
  const [canvasHeight, setCanvasHeight] = useState(
    typeof window !== "undefined"
      ? window.innerHeight
      : GAME_CONFIG.CANVAS_HEIGHT + 100,
  );
  const [canvasWidth, setCanvasWidth] = useState(
    typeof window !== "undefined"
      ? window.innerWidth
      : GAME_CONFIG.CANVAS_WIDTH,
  );

  useEffect(() => {
    const handleResize = () => {
      setCanvasHeight(window.innerHeight);
      setCanvasWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  });

  const onGameOver = useCallback(() => setGameState("GAME_OVER"), []);

  const { bird, flap, pipes, resetBird, score } = useGameLoop(
    gameState,
    onGameOver,
    canvasHeight,
    canvasWidth,
  );

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
        {gameState === "PLAYING" && (
          <div className="sm:pl-50 pl-20">
            <Bird y={bird.y} velocity={bird.velocity} />
          </div>
        )}
        <Score score={score} />
        {pipes.map(
          (pipe, index) =>
            console.log(
              "Rendering pipe:",
              pipe.x,
              pipe.topHeight,
              canvasHeight,
            ) || (
              <Pipe
                key={index}
                x={pipe.x}
                topHeight={pipe.topHeight}
                canvasHeight={canvasHeight}
              />
            ),
        )}
        {/* Ground */}
        <div
          className={`absolute bottom-0 w-full  bg-emerald-500 border-t-4 border-emerald-700 z-20`}
          style={{ height: GAME_CONFIG.GROUND_HEIGHT + "px" }}
        />
      </div>
    </main>
  );
}
