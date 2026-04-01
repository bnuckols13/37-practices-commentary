"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "37p_visited";

export default function ReadingProgress() {
  const [visited, setVisited] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setVisited(JSON.parse(raw));
    } catch {}
  }, []);

  const count = visited.length;
  const pct = Math.round((count / 37) * 100);

  return (
    <div style={{ marginTop: "1.25rem", width: "100%", maxWidth: "20rem", margin: "1.25rem auto 0" }}>
      <div
        style={{
          height: "1px",
          background: "var(--border)",
          borderRadius: "1px",
          overflow: "hidden",
          marginBottom: "0.5rem",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "var(--accent)",
            transition: "width 0.5s ease",
          }}
        />
      </div>
      {count > 0 && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--muted)",
            letterSpacing: "0.08em",
            textAlign: "center",
          }}
        >
          {count}/37 visited
        </p>
      )}
    </div>
  );
}
