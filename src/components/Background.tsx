"use client";

import React from "react";

interface BackgroundProps {
  imageUrl?: string;
  scrollSpeed?: number;
}

export default function Background({ 
  imageUrl = "/assets/background.png",
  scrollSpeed = 4
}: BackgroundProps) {
  const animationDuration = 10 / scrollSpeed;

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div
        className="absolute inset-0 animate-scroll"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
          animationDuration: `${animationDuration}s`,
        }}
      />
    </div>
  );
}
