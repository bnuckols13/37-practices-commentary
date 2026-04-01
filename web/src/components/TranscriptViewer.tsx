"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";

interface Cue {
  time: number;
  text: string;
}

interface Props {
  content: string;
  youtubeId?: string;
  cues?: Cue[];
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function TranscriptViewer({ content, youtubeId, cues = [] }: Props) {
  const [query, setQuery] = useState("");
  const [videoMode, setVideoMode] = useState<"hidden" | "top" | "pip">(
    youtubeId ? "top" : "hidden"
  );
  const [activeCueIdx, setActiveCueIdx] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const hasCues = cues.length > 0;
  const hasVideo = !!youtubeId;

  // Use cues for display if available, otherwise fall back to paragraph splitting
  const segments = useMemo(() => {
    if (hasCues) {
      return cues.map((c, i) => ({
        id: i,
        time: c.time,
        text: c.text,
      }));
    }
    return content
      .split(/\n\n+/)
      .map((p, i) => ({ id: i, time: -1, text: p.trim() }))
      .filter((s) => s.text);
  }, [content, cues, hasCues]);

  const matchCount = useMemo(() => {
    if (!query || query.length < 2) return 0;
    const re = new RegExp(escapeRegex(query), "gi");
    return segments.reduce((count, s) => {
      const matches = s.text.match(re);
      return count + (matches ? matches.length : 0);
    }, 0);
  }, [segments, query]);

  const seekTo = useCallback(
    (seconds: number, cueIdx: number) => {
      setActiveCueIdx(cueIdx);
      if (iframeRef.current && youtubeId) {
        // Use the YouTube iframe API postMessage
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "seekTo",
            args: [seconds, true],
          }),
          "*"
        );
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "playVideo",
            args: [],
          }),
          "*"
        );
      }
    },
    [youtubeId]
  );

  // Scroll active cue into view
  useEffect(() => {
    if (activeCueIdx !== null) {
      const el = document.getElementById(`cue-${activeCueIdx}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeCueIdx]);

  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&rel=0&modestbranding=1`
    : "";

  return (
    <div>
      {/* Video controls */}
      {hasVideo && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
            Video:
          </span>
          {(["top", "pip", "hidden"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setVideoMode(mode)}
              className="px-3 py-1 rounded-full text-xs border cursor-pointer transition-colors"
              style={{
                borderColor: videoMode === mode ? "var(--accent)" : "var(--border)",
                background: videoMode === mode ? "var(--accent)" : "transparent",
                color: videoMode === mode ? "white" : "var(--muted)",
              }}
            >
              {mode === "top" ? "Embedded" : mode === "pip" ? "Floating" : "Hidden"}
            </button>
          ))}
          {hasCues && (
            <span className="text-xs ml-auto" style={{ color: "var(--muted)" }}>
              Click any timestamp to seek
            </span>
          )}
        </div>
      )}

      {/* YouTube embed — top mode */}
      {hasVideo && videoMode === "top" && (
        <div className="mb-6 rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Teaching video"
            />
          </div>
        </div>
      )}

      {/* YouTube embed — PiP floating mode */}
      {hasVideo && videoMode === "pip" && (
        <div
          className="fixed bottom-4 right-4 z-50 rounded-lg overflow-hidden shadow-2xl border"
          style={{ width: 400, borderColor: "var(--border)" }}
        >
          <div className="relative" style={{ paddingBottom: "56.25%" }}>
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Teaching video"
            />
          </div>
          <button
            onClick={() => setVideoMode("hidden")}
            className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs cursor-pointer"
            style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
          >
            &times;
          </button>
        </div>
      )}

      {/* Search bar */}
      <div className="sticky top-12 z-10 py-3" style={{ background: "var(--background)" }}>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search within this transcript..."
            className="flex-1 px-4 py-2 rounded-lg border text-sm"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          />
          {query.length >= 2 && (
            <span className="text-xs flex-shrink-0" style={{ color: "var(--muted)" }}>
              {matchCount} match{matchCount !== 1 ? "es" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Transcript segments */}
      <div className="mt-4 space-y-1" ref={transcriptRef}>
        {segments.map((seg) => {
          const isActive = activeCueIdx === seg.id;
          const hasTimestamp = seg.time >= 0;

          // Search filtering
          if (query.length >= 2) {
            const re = new RegExp(`(${escapeRegex(query)})`, "gi");
            const matches = re.test(seg.text);

            if (!matches) {
              return (
                <div
                  key={seg.id}
                  id={`cue-${seg.id}`}
                  className="flex gap-3 py-1.5 opacity-20"
                >
                  {hasTimestamp && (
                    <span className="flex-shrink-0 w-14 text-xs pt-0.5 text-right" style={{ color: "var(--muted)" }}>
                      {formatTime(seg.time)}
                    </span>
                  )}
                  <p className="text-sm leading-relaxed m-0">{seg.text}</p>
                </div>
              );
            }

            const parts = seg.text.split(re);
            return (
              <div
                key={seg.id}
                id={`cue-${seg.id}`}
                className="flex gap-3 py-1.5 rounded-lg px-2 -mx-2"
                style={{
                  background: isActive ? "var(--card-hover)" : undefined,
                }}
              >
                {hasTimestamp && (
                  <button
                    onClick={() => seekTo(seg.time, seg.id)}
                    className="flex-shrink-0 w-14 text-xs pt-0.5 text-right cursor-pointer hover:underline font-mono"
                    style={{ color: "var(--accent)", background: "none", border: "none" }}
                  >
                    {formatTime(seg.time)}
                  </button>
                )}
                <p className="text-sm leading-relaxed m-0">
                  {parts.map((part, j) => {
                    const reTest = new RegExp(`(${escapeRegex(query)})`, "gi");
                    return reTest.test(part) ? (
                      <mark key={j}>{part}</mark>
                    ) : (
                      <span key={j}>{part}</span>
                    );
                  })}
                </p>
              </div>
            );
          }

          // Normal display
          return (
            <div
              key={seg.id}
              id={`cue-${seg.id}`}
              className="flex gap-3 py-1.5 rounded-lg px-2 -mx-2 transition-colors"
              style={{
                background: isActive ? "var(--card-hover)" : undefined,
              }}
            >
              {hasTimestamp && (
                <button
                  onClick={() => seekTo(seg.time, seg.id)}
                  className="flex-shrink-0 w-14 text-xs pt-0.5 text-right cursor-pointer hover:underline font-mono"
                  style={{ color: "var(--accent)", background: "none", border: "none", padding: 0 }}
                >
                  {formatTime(seg.time)}
                </button>
              )}
              <p className="text-sm leading-relaxed m-0">{seg.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
