"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RootTextTooltip from "./RootTextTooltip";
import type { Verse } from "@/lib/data";

const STORAGE_KEY = "37p_visited";

const GROUP_COLORS: Record<string, string> = {
  Foundation: "#4A5568",
  Bodhicitta: "#744210",
  "Adversity Training": "#7B341E",
  "Working with Mind": "#44337A",
  Emptiness: "#234E52",
  "Six Perfections": "#1A4731",
  "Daily Vigilance": "#3D3480",
};

interface Props {
  verses: Verse[];
}

export default function TableOfContents({ verses }: Props) {
  const [visited, setVisited] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setVisited(new Set(JSON.parse(raw) as number[]));
    } catch {}
  }, []);

  const groups: string[] = [];
  const byGroup: Record<string, Verse[]> = {};
  for (const v of verses) {
    if (!byGroup[v.group]) {
      groups.push(v.group);
      byGroup[v.group] = [];
    }
    byGroup[v.group].push(v);
  }

  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      {groups.map((group) => (
        <div key={group}>
          <div
            style={{
              borderTop: `2px solid ${GROUP_COLORS[group] || "#888"}`,
              paddingTop: "2rem",
              paddingBottom: "0.5rem",
              marginTop: "2rem",
              fontVariant: "small-caps",
              letterSpacing: "0.1em",
              fontSize: "0.7rem",
              color: "var(--muted)",
              fontFamily: "var(--font-serif)",
            }}
          >
            {group}
          </div>
          {byGroup[group].map((v) => (
            <RootTextTooltip key={v.number} rootText={v.rootText}>
              <Link
                href={`/verses/${v.number}`}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1.25rem",
                  padding: "0.6rem 0",
                  borderBottom: "1px solid var(--border-hairline)",
                  textDecoration: "none",
                  color: "var(--ink)",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--muted)",
                    opacity: 0.5,
                    minWidth: "1.75rem",
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {String(v.number).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.0625rem",
                    flex: 1,
                  }}
                >
                  {v.theme}
                </span>
                {visited.has(v.number) && (
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      opacity: 0.45,
                      flexShrink: 0,
                    }}
                  />
                )}
              </Link>
            </RootTextTooltip>
          ))}
        </div>
      ))}
    </div>
  );
}
