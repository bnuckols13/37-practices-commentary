import { Suspense } from "react";
import { getVerses, getSeries } from "@/lib/data";
import SearchClient from "@/components/SearchClient";

export default function SearchPage() {
  // Pre-compute search corpus at build time
  const verses = getVerses().map((v) => ({
    id: `verse-${v.number}`,
    type: "verse" as const,
    number: v.number,
    title: `Practice ${v.number}: ${v.theme}`,
    group: v.group,
    text: `${v.rootText}\n${v.content}`,
    href: `/verses/${v.number}`,
  }));

  const transcripts = getSeries().flatMap((s) =>
    s.parts.map((p) => ({
      id: `${s.id}-${p.part}`,
      type: "transcript" as const,
      title: p.title,
      series: s.label,
      text: p.content,
      href: `/transcripts/${s.id}/${p.part}`,
      youtubeUrl: p.youtubeUrl,
    }))
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Full-Text Search</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        Search across all verse content and 155k+ words of teaching transcripts.
      </p>
      <Suspense fallback={<div className="text-sm" style={{ color: "var(--muted)" }}>Loading search...</div>}>
        <SearchClient verses={verses} transcripts={transcripts} />
      </Suspense>
    </div>
  );
}
