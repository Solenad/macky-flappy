import React from "react";
import { GAME_CONFIG } from "@/lib/constants";

interface PipeProps {
  x: number;
  topHeight: number;
  canvasHeight: number;
}

export default function Pipe({ x, topHeight, canvasHeight }: PipeProps) {
  const bottomPipeHeight = canvasHeight - topHeight - GAME_CONFIG.PIPE_GAP - GAME_CONFIG.GROUND_HEIGHT;

  return (
    <>
      <div style={{ position: "absolute", left: x, top: 0, width: GAME_CONFIG.PIPE_WIDTH, height: topHeight, backgroundColor: "green", zIndex: 25 }} />
      <div style={{ position: "absolute", left: x, top: topHeight + GAME_CONFIG.PIPE_GAP, width: GAME_CONFIG.PIPE_WIDTH, height: bottomPipeHeight, backgroundColor: "green", zIndex: 25 }} />
    </>
  );
}
