"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface VerseDoc {
  id: string;
  type: "verse";
  number: number;
  title: string;
  group: string;
  text: string;
  href: string;
}

interface TranscriptDoc {
  id: string;
  type: "transcript";
  title: string;
  series: string;
  text: string;
  href: string;
  youtubeUrl: string;
}

type Doc = VerseDoc | TranscriptDoc;

interface SearchResult {
  doc: Doc;
  snippets: string[];
  matchCount: number;
}

export default function SearchClient({
  verses,
  transcripts,
}: {
  verses: VerseDoc[];
  transcripts: TranscriptDoc[];
}) {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [filter, setFilter] = useState<"all" | "verse" | "transcript">("all");

  // Update query when URL params change
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q !== query) setQuery(q);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const allDocs = useMemo(() => [...verses, ...transcripts], [verses, transcripts]);

  const results = useMemo((): SearchResult[] => {
    if (!query || query.length < 2) return [];

    const re = new RegExp(escapeRegex(query), "gi");
    const matched: SearchResult[] = [];

    for (const doc of allDocs) {
      if (filter !== "all" && doc.type !== filter) continue;

      const text = doc.text;
      const allMatches = text.match(re);
      if (!allMatches || allMatches.length === 0) continue;

      // Extract snippets around matches
      const snippets: string[] = [];
      let m: RegExpExecArray | null;
      const snippetRe = new RegExp(escapeRegex(query), "gi");
      let count = 0;
      while ((m = snippetRe.exec(text)) !== null && count < 3) {
        const start = Math.max(0, m.index - 80);
        const end = Math.min(text.length, m.index + query.length + 80);
        let snippet = text.slice(start, end).replace(/\n/g, " ");
        if (start > 0) snippet = "..." + snippet;
        if (end < text.length) snippet = snippet + "...";
        snippets.push(snippet);
        count++;
      }

      matched.push({
        doc,
        snippets,
        matchCount: allMatches.length,
      });
    }

    matched.sort((a, b) => b.matchCount - a.matchCount);
    return matched.slice(0, 50);
  }, [query, allDocs, filter]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div>
      {/* Search input */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Search for a term, phrase, or concept..."
          className="flex-1 px-4 py-3 rounded-lg border text-sm"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}
          autoFocus
        />
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6">
        {(["all", "verse", "transcript"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1 rounded-full text-xs border cursor-pointer"
            style={{
              borderColor: filter === f ? "var(--accent)" : "var(--border)",
              background: filter === f ? "var(--accent)" : "transparent",
              color: filter === f ? "white" : "var(--muted)",
            }}
          >
            {f === "all" ? "All" : f === "verse" ? "Verses" : "Transcripts"}
          </button>
        ))}
      </div>

      {/* Results */}
      {query.length >= 2 && (
        <div className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </div>
      )}

      <div className="space-y-3">
        {results.map((r) => (
          <Link
            key={r.doc.id}
            href={r.doc.href}
            className="block rounded-lg p-4 border transition-colors"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background:
                    r.doc.type === "verse"
                      ? "var(--group-bodhicitta)"
                      : "var(--accent)",
                  color: "white",
                }}
              >
                {r.doc.type === "verse" ? "Verse" : "Transcript"}
              </span>
              <span className="font-medium text-sm">{r.doc.title}</span>
              <span className="text-xs ml-auto" style={{ color: "var(--muted)" }}>
                {r.matchCount} match{r.matchCount !== 1 ? "es" : ""}
              </span>
            </div>
            {r.snippets.map((snippet, i) => (
              <p key={i} className="text-xs leading-relaxed mb-1" style={{ color: "var(--muted)" }}>
                <HighlightedSnippet text={snippet} query={query} />
              </p>
            ))}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HighlightedSnippet({ text, query }: { text: string; query: string }) {
  const re = new RegExp(`(${escapeRegex(query)})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        re.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      )}
    </>
  );
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
