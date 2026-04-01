"use client";

import { useState, useRef, useCallback } from "react";

interface Props {
  rootText: string;
  children: React.ReactNode;
}

export default function RootTextTooltip({ rootText, children }: Props) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.innerWidth < 640) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clampedX = Math.min(x + 14, rect.width - 240);
    setPos({ x: Math.max(0, clampedX), y: y + 16 });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.innerWidth >= 640) setVisible(true);
      }}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {visible && (
        <div
          style={{
            position: "absolute",
            left: pos.x,
            top: pos.y,
            zIndex: 30,
            maxWidth: "18rem",
            padding: "10px 14px",
            background: "var(--ink)",
            color: "var(--bg)",
            borderRadius: "4px",
            fontFamily: "var(--font-serif)",
            fontSize: "0.8125rem",
            fontStyle: "italic",
            lineHeight: 1.65,
            pointerEvents: "none",
            boxShadow: "0 4px 24px rgba(28,24,17,0.28)",
          }}
        >
          {rootText}
        </div>
      )}
    </div>
  );
}
