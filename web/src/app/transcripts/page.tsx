import Link from "next/link";
import { getSeries } from "@/lib/data";

export default function TranscriptsPage() {
  const series = getSeries();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Transcript Browser</h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        Browse teaching transcripts by series. Click any session to read the full transcript with search.
      </p>

      <div className="space-y-8">
        {series.map((s) => {
          const totalWords = s.parts.reduce((sum, p) => sum + p.wordCount, 0);
          return (
            <section key={s.id}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{s.label}</h2>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {s.parts.length} sessions &middot;{" "}
                  {Math.round(totalWords / 1000)}k words total
                </p>
              </div>
              <div className="space-y-2">
                {s.parts.map((p) => (
                  <Link
                    key={p.part}
                    href={`/transcripts/${s.id}/${p.part}`}
                    className="flex items-center gap-4 rounded-lg p-4 border transition-colors"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--card)",
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "var(--accent)" }}
                    >
                      {p.part}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm truncate">
                        {p.title}
                      </div>
                      <div className="text-xs" style={{ color: "var(--muted)" }}>
                        {p.wordCount.toLocaleString()} words
                      </div>
                    </div>
                    {p.youtubeUrl && (
                      <span
                        className="text-xs px-2 py-1 rounded border flex-shrink-0"
                        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                      >
                        YouTube
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
