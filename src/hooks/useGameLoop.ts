import { useState, useEffect, useCallback, useRef } from "react";
import { GameStatus, Bird, Pipe as PipeType } from "@/types/game";
import { GAME_CONFIG } from "@/lib/constants";

export default function useGameLoop(
  status: GameStatus,
  onGameOver: () => void,
  canvasHeight: number,
  canvasWidth: number,
) {
  const [bird, setBird] = useState<Bird>({
    y: 250,
    velocity: 0,
    width: GAME_CONFIG.BIRD_WIDTH,
    height: GAME_CONFIG.BIRD_HEIGHT,
  });
  const [pipes, setPipes] = useState<PipeType[]>([]);
  const [score, setScore] = useState(0);
  const frameId = useRef<number | null>(null);
  const lastPipeSpawn = useRef<number>(0);

  // Refs to hold latest values for use in update function without causing stale closures
  const canvasWidthRef = useRef(canvasWidth);
  const canvasHeightRef = useRef(canvasHeight);
  const birdRef = useRef<Bird>(bird);
  const pipesRef = useRef<PipeType[]>(pipes);

  // Keep refs in sync with state and props
  useEffect(() => {
    canvasWidthRef.current = canvasWidth;
  }, [canvasWidth]);

  useEffect(() => {
    canvasHeightRef.current = canvasHeight;
  }, [canvasHeight]);

  useEffect(() => {
    birdRef.current = bird;
  }, [bird]);

  useEffect(() => {
    pipesRef.current = pipes;
  }, [pipes]);

  const update = useCallback(() => {
    if (status !== "PLAYING") return;

    // Bird physics and collision
    setBird((prevBird) => {
      const newVelocity = prevBird.velocity + GAME_CONFIG.GRAVITY;
      const newY = prevBird.y + newVelocity;

      // Floor/Ceiling collision
      if (
        newY + prevBird.height >= canvasHeightRef.current - GAME_CONFIG.GROUND_HEIGHT ||
        newY <= 0
      ) {
        onGameOver();
        return prevBird;
      }

      // Pipe Collision Logic (AABB) using ref for latest pipes
      const birdX = 50; // Matches padding/margin in page.tsx
      for (const pipe of pipesRef.current) {
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

      const updatedBird = { ...prevBird, y: newY, velocity: newVelocity };
      birdRef.current = updatedBird;
      return updatedBird;
    });

    // Move and Spawn Pipes
    setPipes(() => {
      // Use ref instead of prevPipes since ref always has latest value
      const currentPipes = pipesRef.current;

      // Move existing pipes
      const movedPipes = currentPipes
        .map((p) => ({ ...p, x: p.x - GAME_CONFIG.PIPE_SPEED }))
        .filter((p) => p.x + GAME_CONFIG.PIPE_WIDTH > 0);

      // Spawn new pipe based on interval
      const now = Date.now();
      if (now - lastPipeSpawn.current > GAME_CONFIG.PIPE_SPAWN_RATE) {
        const minPipeHeight = 50;
        const maxPipeHeight =
          canvasHeightRef.current -
          GAME_CONFIG.GROUND_HEIGHT -
          GAME_CONFIG.PIPE_GAP -
          minPipeHeight;
        const randomHeight =
          Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) +
          minPipeHeight;

        lastPipeSpawn.current = now;
        const newPipe = {
          x: canvasWidthRef.current,
          topHeight: randomHeight,
          width: GAME_CONFIG.PIPE_WIDTH,
          passed: false,
        };
        const updatedPipes = [...movedPipes, newPipe];
        pipesRef.current = updatedPipes;
        console.log("SPAWNING: returning pipes:", updatedPipes.map(p => p.x));
        return updatedPipes;
      }

      // Check for scoring - bird has passed a pipe
      const scoredPipes = movedPipes.map((pipe) => {
        // If bird has passed this pipe and we haven't scored it yet
        if (!pipe.passed) {
          const birdX = 50; // Matches padding/margin in page.tsx
          if (birdX > pipe.x + GAME_CONFIG.PIPE_WIDTH) {
            // Bird has passed this pipe
            return { ...pipe, passed: true };
          }
        }
        return pipe;
      });

      // Update score based on newly passed pipes
      const newlyScored = scoredPipes.filter((pipe) => pipe.passed);
      if (newlyScored.length > 0) {
        setScore((prevScore) => prevScore + newlyScored.length);
      }

      pipesRef.current = scoredPipes;
      console.log("NOT SPAWNING: returning pipes:", scoredPipes.map(p => p.x));
      return scoredPipes;
    });

    frameId.current = requestAnimationFrame(update);
  }, [status, onGameOver]);

  useEffect(() => {
    if (status === "PLAYING") {
      frameId.current = requestAnimationFrame(update);
    }
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, [status, update]);

  const flap = () => {
    setBird((prev) => {
      const updated = { ...prev, velocity: GAME_CONFIG.JUMP_STRENGTH };
      birdRef.current = updated;
      return updated;
    });
  };

  const resetBird = () => {
    const initialBird = {
      y: 250,
      velocity: 0,
      width: GAME_CONFIG.BIRD_WIDTH,
      height: GAME_CONFIG.BIRD_HEIGHT,
    };
    setBird(initialBird);
    birdRef.current = initialBird;
    setPipes([]);
    pipesRef.current = [];
    setScore(0);
    lastPipeSpawn.current = 0; // Reset pipe spawn timer
  };

  return { bird, pipes, flap, resetBird, score };
}
