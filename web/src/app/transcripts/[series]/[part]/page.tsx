import Link from "next/link";
import { getSeries, getTranscriptPart } from "@/lib/data";
import { notFound } from "next/navigation";
import TranscriptViewer from "@/components/TranscriptViewer";

export function generateStaticParams() {
  const allParams: { series: string; part: string }[] = [];
  for (const s of getSeries()) {
    for (const p of s.parts) {
      allParams.push({ series: s.id, part: String(p.part) });
    }
  }
  return allParams;
}

export default async function TranscriptPartPage({
  params,
}: {
  params: Promise<{ series: string; part: string }>;
}) {
  const { series: seriesId, part: partStr } = await params;
  const partNum = parseInt(partStr, 10);
  const result = getTranscriptPart(seriesId, partNum);
  if (!result) notFound();

  const { series, part } = result;
  const prevPart = series.parts.find((p) => p.part === partNum - 1);
  const nextPart = series.parts.find((p) => p.part === partNum + 1);

  return (
    <div style={{ padding: "2.5rem 1.5rem 6rem", maxWidth: "72rem", margin: "0 auto" }}>
      <nav
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "0.75rem",
          color: "var(--muted)",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Link href="/transcripts" style={{ color: "var(--muted)", textDecoration: "none" }}>
          Transcripts
        </Link>
        <span style={{ opacity: 0.4 }}>/</span>
        <span>{series.label}</span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span>Part {part.part}</span>
      </nav>

      <header style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--ink)",
            marginBottom: "0.5rem",
          }}
        >
          {part.title}
        </h1>
        <p
          className="small-caps"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.65rem",
            color: "var(--muted)",
            letterSpacing: "0.1em",
          }}
        >
          {part.wordCount.toLocaleString()} words &middot; {part.cues.length} segments
        </p>
      </header>

      <TranscriptViewer
        content={part.content}
        youtubeId={part.youtubeId}
        cues={part.cues}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "1.5rem",
          marginTop: "3rem",
          borderTop: "1px solid var(--border-hairline)",
        }}
      >
        {prevPart ? (
          <Link
            href={`/transcripts/${seriesId}/${prevPart.part}`}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.875rem",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            &larr; Part {prevPart.part}
          </Link>
        ) : (
          <span />
        )}
        {nextPart ? (
          <Link
            href={`/transcripts/${seriesId}/${nextPart.part}`}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.875rem",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Part {nextPart.part} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
