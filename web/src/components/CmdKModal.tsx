"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

interface CorpusItem {
  id: string;
  type: "verse" | "transcript";
  title: string;
  href: string;
  preview: string;
}

interface Corpus {
  verses: CorpusItem[];
  transcripts: CorpusItem[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  corpus: Corpus;
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function CmdKModal({ isOpen, onClose, corpus }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const allItems = useMemo(
    () => [...corpus.verses, ...corpus.transcripts],
    [corpus]
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query || query.length < 2) return allItems.slice(0, 12);
    const re = new RegExp(escapeRegex(query), "gi");
    return allItems
      .filter((item) => re.test(item.title) || re.test(item.preview))
      .slice(0, 20);
  }, [query, allItems]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{
        paddingTop: "15vh",
        background: "rgba(28, 24, 17, 0.55)",
        backdropFilter: "blur(3px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full mx-4 overflow-hidden"
        style={{
          maxWidth: "36rem",
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          boxShadow: "0 24px 64px rgba(28,24,17,0.22)",
        }}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search practices and transcripts…"
          style={{
            width: "100%",
            padding: "16px 20px",
            fontFamily: "var(--font-serif)",
            fontSize: "1.1rem",
            border: "none",
            borderBottom: "1px solid var(--border)",
            outline: "none",
            background: "transparent",
            color: "var(--ink)",
          }}
        />
        <div style={{ maxHeight: "58vh", overflowY: "auto" }}>
          {results.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                router.push(item.href);
                onClose();
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "11px 20px",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: i < results.length - 1 ? "1px solid var(--border)" : "none",
                cursor: "pointer",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--card)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.9375rem",
                  color: "var(--ink)",
                  marginBottom: "2px",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  fontStyle: "italic",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.preview}
              </div>
            </button>
          ))}
          {query.length >= 2 && results.length === 0 && (
            <p
              style={{
                padding: "16px 20px",
                color: "var(--muted)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
              }}
            >
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
        <div
          style={{
            padding: "8px 20px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "1rem",
          }}
        >
          {[
            { key: "↵", label: "select" },
            { key: "esc", label: "close" },
          ].map(({ key, label }) => (
            <span
              key={key}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--muted)",
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "3px",
                  padding: "1px 5px",
                }}
              >
                {key}
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
