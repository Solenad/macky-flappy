import { useState, useEffect, useCallback, useRef } from "react";
import { GameStatus, Bird } from "@/types/game";
import { GAME_CONFIG } from "@/lib/constants";

export default function useGameLoop(
  status: GameStatus,
  onGameOver: () => void,
  canvasHeight: number,
) {
  const [bird, setBird] = useState<Bird>({
    y: (GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.BIRD_HEIGHT) / 2,
    velocity: 0,
    width: GAME_CONFIG.BIRD_WIDTH,
    height: GAME_CONFIG.BIRD_HEIGHT,
  });

  const frameId = useRef<number | null>(null);

  const updateRef = useRef<() => void>(() => {});

  useEffect(() => {
    updateRef.current = () => {
      if (status !== "PLAYING") return;

      setBird((prev) => {
        const newVelocity = prev.velocity + GAME_CONFIG.GRAVITY;
        const newY = prev.y + newVelocity;

        if (
          newY + prev.height >= canvasHeight - GAME_CONFIG.GROUND_HEIGHT ||
          newY <= 0
        ) {
          onGameOver();
          return prev;
        }

        return { ...prev, y: newY, velocity: newVelocity };
      });

      frameId.current = requestAnimationFrame(updateRef.current);
    };
  }, [status, onGameOver, canvasHeight]);

  useEffect(() => {
    if (status === "PLAYING") {
      frameId.current = requestAnimationFrame(updateRef.current);
    }
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, [status]);

  const flap = () => {
    setBird((prev) => ({ ...prev, velocity: GAME_CONFIG.JUMP_STRENGTH }));
  };

  const resetBird = () => {
    setBird({
      y: (GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.BIRD_HEIGHT) / 2,
      velocity: 0,
      width: GAME_CONFIG.BIRD_WIDTH,
      height: GAME_CONFIG.BIRD_HEIGHT,
    });
  };

  return { bird, flap, resetBird };
}
