"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Verse, TranscriptSeries } from "@/lib/data";

interface Props {
  verses: Verse[];
  series: TranscriptSeries[];
}

type DocType = "verse" | "transcript";

interface Doc {
  id: string;
  type: DocType;
  title: string;
  href: string;
  text: string;
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSnippets(text: string, query: string, count = 2): string[] {
  const re = new RegExp(escapeRegex(query), "gi");
  const snippets: string[] = [];
  let match;
  while ((match = re.exec(text)) !== null && snippets.length < count) {
    const start = Math.max(0, match.index - 60);
    const end = Math.min(text.length, match.index + query.length + 60);
    snippets.push(
      (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "")
    );
  }
  return snippets;
}

export default function SearchClient({ verses, series }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [filter, setFilter] = useState<"all" | DocType>("all");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const docs = useMemo<Doc[]>(() => {
    const out: Doc[] = verses.map((v) => ({
      id: `verse-${v.number}`,
      type: "verse",
      title: `${v.number}. ${v.theme}`,
      href: `/verses/${v.number}`,
      text: v.rootText + " " + v.content,
    }));
    for (const s of series) {
      for (const p of s.parts) {
        out.push({
          id: `${s.id}-${p.part}`,
          type: "transcript",
          title: p.title,
          href: `/transcripts/${s.id}/${p.part}`,
          text: p.content,
        });
      }
    }
    return out;
  }, [verses, series]);

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const re = new RegExp(escapeRegex(query), "gi");
    return docs
      .filter((d) => filter === "all" || d.type === filter)
      .map((d) => ({ doc: d, count: (d.text.match(re) || []).length, snippets: getSnippets(d.text, query) }))
      .filter((r) => r.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);
  }, [docs, query, filter]);

  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--ink)",
          marginBottom: "2rem",
        }}
      >
        Search
      </h1>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--muted)",
          marginBottom: "1.5rem",
          letterSpacing: "0.04em",
        }}
      >
        Press ⌘K anywhere to search
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search practices and transcripts…"
        autoFocus
        style={{
          width: "100%",
          padding: "10px 0",
          fontFamily: "var(--font-serif)",
          fontSize: "1.1rem",
          border: "none",
          borderBottom: "1px solid var(--border)",
          outline: "none",
          background: "transparent",
          color: "var(--ink)",
          marginBottom: "1.5rem",
        }}
      />

      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
        {(["all", "verse", "transcript"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="small-caps"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: filter === f ? "var(--accent)" : "var(--muted)",
              padding: 0,
              textDecoration: filter === f ? "underline" : "none",
              textUnderlineOffset: "3px",
            }}
          >
            {f === "all" ? "All" : f === "verse" ? "Verses" : "Transcripts"}
          </button>
        ))}
        {query.length >= 2 && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--muted)",
              marginLeft: "auto",
              alignSelf: "center",
            }}
          >
            {results.length} result{results.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div>
        {results.map((r) => (
          <Link
            key={r.doc.id}
            href={r.doc.href}
            style={{
              display: "block",
              padding: "1rem 0",
              borderBottom: "1px solid var(--border-hairline)",
              textDecoration: "none",
              color: "var(--ink)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.0625rem",
                marginBottom: "0.25rem",
              }}
            >
              {r.doc.title}
            </div>
            {r.snippets.map((s, j) => (
              <p
                key={j}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.8125rem",
                  fontStyle: "italic",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  margin: "0.2rem 0 0",
                }}
              >
                {s}
              </p>
            ))}
            <span
              className="small-caps"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.6rem",
                color: "var(--muted)",
                opacity: 0.6,
                letterSpacing: "0.08em",
                marginTop: "0.3rem",
                display: "inline-block",
              }}
            >
              {r.doc.type} &middot; {r.count} match{r.count !== 1 ? "es" : ""}
            </span>
          </Link>
        ))}
        {query.length >= 2 && results.length === 0 && (
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "var(--muted)",
              paddingTop: "1rem",
            }}
          >
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
