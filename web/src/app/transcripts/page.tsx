import Link from "next/link";
import { getSeries } from "@/lib/data";

export default function TranscriptsPage() {
  const series = getSeries();

  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--ink)",
          marginBottom: "0.75rem",
        }}
      >
        Teaching Transcripts
      </h1>
      <p
        className="small-caps"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "0.7rem",
          color: "var(--muted)",
          letterSpacing: "0.1em",
          marginBottom: "3rem",
        }}
      >
        {series.reduce((n, s) => n + s.parts.length, 0)} sessions &middot;{" "}
        {Math.round(
          series.reduce(
            (n, s) => n + s.parts.reduce((pn, p) => pn + p.wordCount, 0),
            0
          ) / 1000
        )}
        k words
      </p>

      {series.map((s) => (
        <section key={s.id} style={{ marginBottom: "3rem" }}>
          <div
            style={{
              borderTop: "1px solid var(--border-hairline)",
              paddingTop: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "var(--ink)",
                marginBottom: "0.25rem",
              }}
            >
              {s.label}
            </h2>
            <p
              className="small-caps"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.65rem",
                color: "var(--muted)",
                letterSpacing: "0.09em",
              }}
            >
              {s.parts.length} sessions &middot;{" "}
              {Math.round(
                s.parts.reduce((n, p) => n + p.wordCount, 0) / 1000
              )}
              k words
            </p>
          </div>
          {s.parts.map((p) => (
            <Link
              key={p.part}
              href={`/transcripts/${s.id}/${p.part}`}
              className="hover-accent"
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1.25rem",
                padding: "0.55rem 0",
                borderBottom: "1px solid var(--border-hairline)",
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
                {String(p.part).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.0625rem",
                  flex: 1,
                }}
              >
                {p.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--muted)",
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              >
                {p.wordCount.toLocaleString()}w
              </span>
            </Link>
          ))}
        </section>
      ))}
    </div>
  );
}
