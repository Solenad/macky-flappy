"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { GAME_CONFIG } from "@/lib/constants";

interface BackgroundProps {
  imageUrl?: string;
}

export default function Background({
  imageUrl = "/assets/city.jpg"
}: BackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const updatePosition = () => {
      const viewportWidth = window.innerWidth;
      const speedPercent = (GAME_CONFIG.BACKGROUND_SCROLL_SPEED / viewportWidth) * 100;
      
      positionRef.current -= speedPercent;
      
      // Reset when scrolled one image width (50% of wrapper)
      if (positionRef.current <= -50) {
        positionRef.current += 50;
      }
      
      // Direct DOM update - no React re-render
      if (wrapperRef.current) {
        wrapperRef.current.style.setProperty('--bg-position', `${positionRef.current}%`);
      }
      
      requestRef.current = requestAnimationFrame(updatePosition);
    };
    
    requestRef.current = requestAnimationFrame(updatePosition);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div ref={wrapperRef} className="bg-scroll-wrapper" style={{ '--bg-position': '0%' } as React.CSSProperties}>
        <div className="bg-image-wrapper">
          <Image 
            src={imageUrl} 
            fill 
            alt="Background" 
            sizes="100vw"
            priority
          />
        </div>
        <div className="bg-image-wrapper">
          <Image 
            src={imageUrl} 
            fill 
            alt="Background" 
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
