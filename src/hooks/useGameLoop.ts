import { useState, useEffect, useCallback, useRef } from "react";
import { GameStatus, Bird, Pipe as PipeType } from "@/types/game";
import { GAME_CONFIG } from "@/lib/constants";

export default function useGameLoop(
  status: GameStatus,
  onGameOver: () => void,
  canvasHeight: number,
) {
  const [bird, setBird] = useState<Bird>({
    y: 250,
    velocity: 0,
    width: GAME_CONFIG.BIRD_WIDTH,
    height: GAME_CONFIG.BIRD_HEIGHT,
  });
  const [pipes, setPipes] = useState<PipeType[]>([]);
  const frameId = useRef<number | null>(null);
  const lastPipeSpawn = useRef<number>(0);

  const update = useCallback(() => {
    if (status !== "PLAYING") return;

    setBird((prevBird) => {
      const newVelocity = prevBird.velocity + GAME_CONFIG.GRAVITY;
      const newY = prevBird.y + newVelocity;

      // Floor/Ceiling collision
      if (
        newY + prevBird.height >= canvasHeight - GAME_CONFIG.GROUND_HEIGHT ||
        newY <= 0
      ) {
        onGameOver();
        return prevBird;
      }

      // Pipe Collision Logic (AABB)
      const birdX = 80; // This matches the padding/margin in your page.tsx
      for (const pipe of pipes) {
        const withinX =
          birdX + prevBird.width > pipe.x &&
          birdX < pipe.x + GAME_CONFIG.PIPE_WIDTH;
        if (withinX) {
          const hitTop = newY < pipe.topHeight;
          const hitBottom =
            newY + prevBird.height > pipe.topHeight + GAME_CONFIG.PIPE_GAP;
          if (hitTop || hitBottom) {
            onGameOver();
            return prevBird;
          }
        }
      }

      return { ...prevBird, y: newY, velocity: newVelocity };
    });

    // Move and Spawn Pipes
    setPipes((prevPipes) => {
      // Move existing pipes
      const movedPipes = prevPipes
        .map((p) => ({ ...p, x: p.x - GAME_CONFIG.PIPE_SPEED }))
        .filter((p) => p.x + GAME_CONFIG.PIPE_WIDTH > 0);

      // Spawn new pipe based on interval
      const now = Date.now();
      if (now - lastPipeSpawn.current > GAME_CONFIG.PIPE_SPAWN_RATE) {
        const minPipeHeight = 50;
        const maxPipeHeight =
          canvasHeight -
          GAME_CONFIG.GROUND_HEIGHT -
          GAME_CONFIG.PIPE_GAP -
          minPipeHeight;
        const randomHeight =
          Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) +
          minPipeHeight;

        lastPipeSpawn.current = now;
        return [
          ...movedPipes,
          { x: window.innerWidth, topHeight: randomHeight, passed: false },
        ];
      }

      return movedPipes;
    });

    frameId.current = requestAnimationFrame(update);
  }, [status, onGameOver, canvasHeight, pipes]);

  useEffect(() => {
    if (status === "PLAYING") {
      frameId.current = requestAnimationFrame(update);
    }
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, [status, update]);

  const flap = () =>
    setBird((prev) => ({ ...prev, velocity: GAME_CONFIG.JUMP_STRENGTH }));

  const resetBird = () => {
    setBird({
      y: 250,
      velocity: 0,
      width: GAME_CONFIG.BIRD_WIDTH,
      height: GAME_CONFIG.BIRD_HEIGHT,
    });
    setPipes([]);
  };

  return { bird, pipes, flap, resetBird };
}
