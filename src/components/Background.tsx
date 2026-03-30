"use client";

import React, { useEffect, useRef, useState } from "react";
import { GAME_CONFIG } from "@/lib/constants";

interface BackgroundProps {
  imageUrl?: string;
  canvasWidth?: number;
}

export default function Background({
  imageUrl = "/assets/city.jpg",
  canvasWidth = typeof window !== "undefined" ? window.innerWidth : 1920
}: BackgroundProps) {
  const positionRef = useRef(0);
  const [images, setImages] = useState<number[]>([0, 1, 2]);
  const requestRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(canvasWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (typeof window !== "undefined") {
        setWidth(window.innerWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const animate = () => {
      positionRef.current -= GAME_CONFIG.BACKGROUND_SCROLL_SPEED;
      
      if (positionRef.current <= -width) {
        positionRef.current += width;
        setImages(prev => {
          const newImages = [...prev.slice(1), prev[2] + 1];
          return newImages;
        });
      }
      
      setImages(prev => [...prev]);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [width]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
      {images.map((imgIndex, i) => (
        <div
          key={`${imgIndex}-${i}`}
          className="absolute top-0 h-full"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "auto 100%",
            backgroundRepeat: "repeat-x",
            left: i * width + positionRef.current,
            width: width,
          }}
        />
      ))}
    </div>
  );
}
