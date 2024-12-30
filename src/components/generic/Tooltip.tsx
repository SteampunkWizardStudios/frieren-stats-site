"use client";

import { useState, useEffect, useRef } from "react";

type TooltipProps = {
  content: string | null;
};

export function Tooltip({ content }: TooltipProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLeftSide, setIsLeftSide] = useState(false);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsLeftSide(event.clientX > window.innerWidth / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipWidth(tooltipRef.current.offsetWidth);
    }
  }, [content]);

  if (!content) return null;

  return (
    <div
      ref={tooltipRef}
      className="fixed bg-slate-200 text-slate-700 border-4 border-slate-300 z-50 p-1"
      style={{
        top: position.y + 10,
        left: isLeftSide ? position.x - tooltipWidth - 10 : position.x + 10,
        borderRadius: "4px",
        pointerEvents: "none",
        visibility: tooltipWidth ? 'visible' : 'hidden', // to give it time to calculate width so it doesnt flicker
      }}
    >
      {content}
    </div>
  );
}