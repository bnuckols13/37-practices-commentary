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
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type VideoMode = "side" | "pip" | "hidden";

export default function TranscriptViewer({
  content,
  youtubeId,
  cues = [],
}: Props) {
  const [query, setQuery] = useState("");
  const [videoMode, setVideoMode] = useState<VideoMode>(
    youtubeId ? "side" : "hidden"
  );
  const [activeCueIdx, setActiveCueIdx] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const hasCues = cues.length > 0;
  const hasVideo = !!youtubeId;

  const segments = useMemo(() => {
    if (hasCues) {
      return cues.map((c, i) => ({ id: i, time: c.time, text: c.text }));
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
      const m = s.text.match(re);
      return count + (m ? m.length : 0);
    }, 0);
  }, [segments, query]);

  const seekTo = useCallback(
    (seconds: number, cueIdx: number) => {
      setActiveCueIdx(cueIdx);
      if (iframeRef.current && youtubeId) {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "seekTo", args: [seconds, true] }),
          "*"
        );
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*"
        );
      }
    },
    [youtubeId]
  );

  useEffect(() => {
    if (activeCueIdx !== null) {
      const el = document.getElementById(`cue-${activeCueIdx}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeCueIdx]);

  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&rel=0&modestbranding=1`
    : "";

  const transcriptContent = (
    <div>
      <div
        className="sticky"
        style={{ top: 0, zIndex: 10, padding: "0.75rem 0", background: "var(--bg)" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this transcript…"
            style={{
              flex: 1,
              padding: "8px 0",
              fontFamily: "var(--font-serif)",
              fontSize: "0.9375rem",
              border: "none",
              borderBottom: "1px solid var(--border)",
              outline: "none",
              background: "transparent",
              color: "var(--ink)",
            }}
          />
          {query.length >= 2 && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--muted)",
                flexShrink: 0,
              }}
            >
              {matchCount} match{matchCount !== 1 ? "es" : ""}
            </span>
          )}
        </div>
      </div>

      {hasVideo && videoMode !== "side" && (
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          {(["side", "pip", "hidden"] as VideoMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setVideoMode(mode)}
              className="small-caps"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: videoMode === mode ? "var(--accent)" : "var(--muted)",
                padding: 0,
                textDecoration: videoMode === mode ? "underline" : "none",
                textUnderlineOffset: "3px",
              }}
            >
              {mode === "side" ? "Side" : mode === "pip" ? "Float" : "Hidden"}
            </button>
          ))}
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        {segments.map((seg) => {
          const isActive = activeCueIdx === seg.id;
          const hasTimestamp = seg.time >= 0;

          if (query.length >= 2) {
            const re = new RegExp(`(${escapeRegex(query)})`, "gi");
            const matches = re.test(seg.text);

            if (!matches) {
              return (
                <div
                  key={seg.id}
                  id={`cue-${seg.id}`}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "0.375rem 0",
                    opacity: 0.18,
                  }}
                >
                  {hasTimestamp && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--muted)",
                        flexShrink: 0,
                        minWidth: "3rem",
                        textAlign: "right",
                        paddingTop: "0.2rem",
                      }}
                    >
                      {formatTime(seg.time)}
                    </span>
                  )}
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.75, margin: 0 }}>
                    {seg.text}
                  </p>
                </div>
              );
            }

            const parts = seg.text.split(re);
            return (
              <div
                key={seg.id}
                id={`cue-${seg.id}`}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "0.375rem 0.5rem",
                  marginLeft: "-0.5rem",
                  marginRight: "-0.5rem",
                  background: isActive ? "var(--card)" : undefined,
                  borderRadius: "2px",
                }}
              >
                {hasTimestamp && (
                  <button
                    onClick={() => seekTo(seg.time, seg.id)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--accent)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      flexShrink: 0,
                      minWidth: "3rem",
                      textAlign: "right",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.textDecoration = "underline")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.textDecoration = "none")}
                  >
                    {formatTime(seg.time)}
                  </button>
                )}
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.75, margin: 0 }}>
                  {parts.map((part, j) => {
                    const t = new RegExp(`(${escapeRegex(query)})`, "gi");
                    return t.test(part) ? <mark key={j}>{part}</mark> : <span key={j}>{part}</span>;
                  })}
                </p>
              </div>
            );
          }

          return (
            <div
              key={seg.id}
              id={`cue-${seg.id}`}
              style={{
                display: "flex",
                gap: "1rem",
                padding: "0.375rem 0.5rem",
                marginLeft: "-0.5rem",
                marginRight: "-0.5rem",
                background: isActive ? "var(--card)" : undefined,
                borderRadius: "2px",
                transition: "background 0.2s",
              }}
            >
              {hasTimestamp && (
                <button
                  onClick={() => seekTo(seg.time, seg.id)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--accent)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    minWidth: "3rem",
                    textAlign: "right",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.textDecoration = "underline")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.textDecoration = "none")}
                >
                  {formatTime(seg.time)}
                </button>
              )}
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", lineHeight: 1.75, margin: 0 }}>
                {seg.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      {hasVideo && videoMode === "pip" && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 50,
            width: "380px",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "0 16px 48px rgba(28,24,17,0.24)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ position: "relative", paddingBottom: "56.25%" }}>
            <iframe
              ref={iframeRef}
              src={embedUrl}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Teaching video"
            />
          </div>
          <button
            onClick={() => setVideoMode("hidden")}
            style={{
              position: "absolute",
              top: "0.375rem",
              right: "0.375rem",
              width: "1.5rem",
              height: "1.5rem",
              borderRadius: "50%",
              background: "rgba(28,24,17,0.65)",
              color: "var(--bg)",
              border: "none",
              cursor: "pointer",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &times;
          </button>
        </div>
      )}

      {hasVideo && videoMode === "side" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <div>{transcriptContent}</div>
          <div style={{ position: "sticky", top: "2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              {(["side", "pip", "hidden"] as VideoMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setVideoMode(mode)}
                  className="small-caps"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: videoMode === mode ? "var(--accent)" : "var(--muted)",
                    padding: 0,
                    textDecoration: videoMode === mode ? "underline" : "none",
                    textUnderlineOffset: "3px",
                  }}
                >
                  {mode === "side" ? "Side" : mode === "pip" ? "Float" : "Hide"}
                </button>
              ))}
            </div>
            <div style={{ paddingBottom: "56.25%", position: "relative", borderRadius: "4px", overflow: "hidden" }}>
              <iframe
                ref={iframeRef}
                src={embedUrl}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Teaching video"
              />
            </div>
            {hasCues && (
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--muted)",
                  marginTop: "0.5rem",
                  letterSpacing: "0.04em",
                }}
              >
                Click timestamp to seek
              </p>
            )}
          </div>
        </div>
      ) : (
        transcriptContent
      )}
    </div>
  );
}
