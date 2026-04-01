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
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--muted)" }}>
        <Link href="/transcripts" className="hover:underline">
          Transcripts
        </Link>
        <span>/</span>
        <span>{series.label}</span>
        <span>/</span>
        <span>Part {part.part}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2">{part.title}</h1>
        <div className="flex items-center gap-4 text-sm" style={{ color: "var(--muted)" }}>
          <span>{part.wordCount.toLocaleString()} words</span>
          <span>&middot;</span>
          <span>{part.cues.length} timestamped segments</span>
        </div>
      </div>

      {/* Transcript viewer with embedded YouTube */}
      <TranscriptViewer
        content={part.content}
        youtubeId={part.youtubeId}
        cues={part.cues}
      />

      {/* Navigation */}
      <div
        className="flex justify-between items-center pt-6 mt-8 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        {prevPart ? (
          <Link
            href={`/transcripts/${seriesId}/${prevPart.part}`}
            className="text-sm hover:underline"
            style={{ color: "var(--accent)" }}
          >
            &larr; Part {prevPart.part}
          </Link>
        ) : (
          <span />
        )}
        {nextPart ? (
          <Link
            href={`/transcripts/${seriesId}/${nextPart.part}`}
            className="text-sm hover:underline"
            style={{ color: "var(--accent)" }}
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
