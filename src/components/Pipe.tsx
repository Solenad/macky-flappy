import React, { useState } from "react";
import { GAME_CONFIG } from "@/lib/constants";

interface PipeProps {
  x: number;
  topHeight: number;
  canvasHeight: number;
}

export default function Pipe({ x, topHeight, canvasHeight }: PipeProps) {
  const bottomPipeHeight = canvasHeight - topHeight - GAME_CONFIG.PIPE_GAP - GAME_CONFIG.GROUND_HEIGHT;
  const [imageLoaded, setImageLoaded] = useState(false);
  const spritePath = GAME_CONFIG.SPRITES.pipe;

  const pipeStyle: React.CSSProperties = {
    position: "absolute",
    left: x,
    width: GAME_CONFIG.PIPE_WIDTH,
    zIndex: 25,
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "fill",
    display: imageLoaded ? "block" : "none",
  };

  const fallbackStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: "green",
    display: spritePath && imageLoaded ? "none" : "block",
  };

  return (
    <>
      {/* Top Pipe */}
      <div style={{ ...pipeStyle, top: 0, height: topHeight }}>
        {spritePath && (
          <img
            src={spritePath}
            alt="Pipe"
            style={imgStyle}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        )}
        <div style={fallbackStyle} />
      </div>
      {/* Bottom Pipe */}
      <div style={{ ...pipeStyle, top: topHeight + GAME_CONFIG.PIPE_GAP, height: bottomPipeHeight }}>
        {spritePath && (
          <img
            src={spritePath}
            alt="Pipe"
            style={imgStyle}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        )}
        <div style={fallbackStyle} />
      </div>
    </>
  );
}
