import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getVerses, getVerse } from "@/lib/data";
import { notFound } from "next/navigation";
import VisitMarker from "@/components/VisitMarker";
import VerseColophon from "@/components/VerseColophon";

export function generateStaticParams() {
  return getVerses().map((v) => ({ n: String(v.number) }));
}

const GROUP_COLORS: Record<string, string> = {
  Foundation: "#4A5568",
  Bodhicitta: "#744210",
  "Adversity Training": "#7B341E",
  "Working with Mind": "#44337A",
  Emptiness: "#234E52",
  "Six Perfections": "#1A4731",
  "Daily Vigilance": "#3D3480",
};

function stripH1(content: string): string {
  return content.replace(/^#\s+.+\n?/m, "").trim();
}

export default async function VersePage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const num = parseInt(n, 10);
  const verse = getVerse(num);
  if (!verse) notFound();

  const allVerses = getVerses();
  const prev = allVerses.find((v) => v.number === num - 1);
  const next = allVerses.find((v) => v.number === num + 1);

  const groupColor = GROUP_COLORS[verse.group] || "var(--muted)";
  const body = stripH1(verse.content);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <div
        className="ghosted-number"
        style={{
          top: "-0.15em",
          right: "-0.05em",
        }}
        aria-hidden="true"
      >
        {verse.number}
      </div>

      <div style={{ height: "2px", background: groupColor, width: "100%" }} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "52rem",
          margin: "0 auto",
          padding: "2.5rem 1.5rem 2rem",
        }}
      >
        <nav
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.75rem",
            color: "var(--muted)",
            marginBottom: "3rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Link href="/verses" style={{ color: "var(--muted)", textDecoration: "none" }}>
            Verses
          </Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{verse.number}</span>
        </nav>

        <header style={{ textAlign: "center", paddingBottom: "2.5rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--ink)",
              lineHeight: 1.25,
              marginBottom: "0.75rem",
            }}
          >
            {verse.theme}
          </h1>
          <p
            className="small-caps"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.7rem",
              color: "var(--muted)",
              letterSpacing: "0.12em",
            }}
          >
            Practice {verse.number} &middot; {verse.group}
          </p>
        </header>

        <section
          style={{
            maxWidth: "36rem",
            margin: "0 auto 1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              fontStyle: "italic",
              lineHeight: 1.75,
              color: "var(--ink)",
            }}
          >
            {verse.rootText}
          </p>
        </section>

        <div
          style={{
            borderTop: "1px solid var(--border-hairline)",
            maxWidth: "12rem",
            margin: "2rem auto",
          }}
        />

        <div style={{ maxWidth: "34rem", margin: "0 auto" }}>
          {body ? (
            <div className="prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </div>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--muted)",
                textAlign: "center",
                padding: "2rem 0",
              }}
            >
              Commentary forthcoming.
            </p>
          )}
        </div>

        <VerseColophon />

        <div
          style={{
            maxWidth: "34rem",
            margin: "2rem auto 0",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-hairline)",
          }}
        >
          <p
            className="small-caps"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.65rem",
              color: "var(--muted)",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
            }}
          >
            Search in Transcripts
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[verse.theme, verse.group, `practice ${verse.number}`].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.8125rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "2px 10px",
                }}
              >
                {term}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            maxWidth: "34rem",
            margin: "3rem auto 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-hairline)",
          }}
        >
          {prev ? (
            <Link
              href={`/verses/${prev.number}`}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.875rem",
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              &larr; {prev.number}. {prev.theme}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/verses/${next.number}`}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.875rem",
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              {next.number}. {next.theme} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

      <VisitMarker verseNumber={verse.number} />
    </div>
  );
}
