import React from "react";
import { GAME_CONFIG } from "@/lib/constants";

interface PipeProps {
  x: number;
  topHeight: number;
}

export default function Pipe({ x, topHeight }: PipeProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute bg-emerald-600 border-x-4 border-b-4 border-emerald-900 rounded-b-lg"
        style={{
          width: GAME_CONFIG.PIPE_WIDTH,
          height: topHeight,
          left: x,
          top: 0,
        }}
      />
      <div
        className="absolute bg-emerald-600 border-x-4 border-t-4 border-emerald-900 rounded-t-lg"
        style={{
          width: GAME_CONFIG.PIPE_WIDTH,
          left: x,
          top: topHeight + GAME_CONFIG.PIPE_GAP,
          bottom: GAME_CONFIG.GROUND_HEIGHT,
        }}
      />
    </div>
  );
}
