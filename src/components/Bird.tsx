import React, { useState } from "react";
import { GAME_CONFIG } from "@/lib/constants";

interface BirdProps {
  y: number;
  velocity: number;
}

export default function Bird({ y, velocity }: BirdProps) {
  const rotation = Math.min(Math.max(velocity * 4, -20), 90);
  const [imageLoaded, setImageLoaded] = useState(false);
  const spritePath = GAME_CONFIG.SPRITES.bird;

  return (
    <div
      className="absolute z-20 transition-none"
      style={{
        width: GAME_CONFIG.BIRD_WIDTH, // 38px includes beak extension
        height: GAME_CONFIG.BIRD_HEIGHT,
        transform: `translateY(${y}px) rotate(${rotation}deg)`,
      }}
    >
      {spritePath ? (
        <img
          src={spritePath}
          alt="Bird"
          className="absolute"
          style={{
            display: imageLoaded ? "block" : "none",
            width: "calc(100% + 6px)",
            height: "calc(100% + 4px)",
            left: "-3px",
            top: "-2px",
            objectFit: "cover",
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        />
      ) : null}
      {/* Fallback colored div */}
      <div
        className="w-full h-full bg-yellow-400 border-2 border-black rounded-full relative"
        style={{ display: spritePath && imageLoaded ? "none" : "block" }}
      >
        {/* Eye */}
        <div className="absolute top-1 right-2 w-2 h-2 bg-white border border-black rounded-full">
          <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-black rounded-full" />
        </div>
        {/* Wing */}
        <div className="absolute top-3 left-1 w-4 h-2 bg-yellow-600 border border-black rounded-full opacity-50" />
        {/* Beak */}
        <div className="absolute top-3 -right-1 w-3 h-2 bg-orange-500 border border-black rounded-sm" />
      </div>
    </div>
  );
}
