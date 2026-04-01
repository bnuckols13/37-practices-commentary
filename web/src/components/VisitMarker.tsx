"use client";

import { useEffect } from "react";

const STORAGE_KEY = "37p_visited";

export default function VisitMarker({ verseNumber }: { verseNumber: number }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const visited: number[] = raw ? JSON.parse(raw) : [];
      if (!visited.includes(verseNumber)) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify([...visited, verseNumber])
        );
      }
    } catch {}
  }, [verseNumber]);

  return null;
}
