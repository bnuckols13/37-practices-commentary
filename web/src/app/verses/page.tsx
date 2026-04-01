import Link from "next/link";
import { getVerses, GROUP_COLORS } from "@/lib/data";

export default async function VersesPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: filterGroup } = await searchParams;
  const allVerses = getVerses();
  const groups = [...new Set(allVerses.map((v) => v.group))];
  const verses = filterGroup
    ? allVerses.filter((v) => v.group === filterGroup)
    : allVerses;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">The 37 Practices</h1>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        Click any verse to read its root text, commentary stub, and search related transcripts.
      </p>

      {/* Group filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/verses"
          className="px-3 py-1 rounded-full text-xs border"
          style={{
            borderColor: !filterGroup ? "var(--accent)" : "var(--border)",
            background: !filterGroup ? "var(--accent)" : "transparent",
            color: !filterGroup ? "white" : "var(--muted)",
          }}
        >
          All
        </Link>
        {groups.map((g) => {
          const active = filterGroup === g;
          const color = GROUP_COLORS[g] || "var(--muted)";
          return (
            <Link
              key={g}
              href={`/verses?group=${encodeURIComponent(g)}`}
              className="px-3 py-1 rounded-full text-xs border"
              style={{
                borderColor: active ? color : "var(--border)",
                background: active ? color : "transparent",
                color: active ? "white" : "var(--muted)",
              }}
            >
              {g}
            </Link>
          );
        })}
      </div>

      {/* Verse list */}
      <div className="space-y-2">
        {verses.map((v) => {
          const color = GROUP_COLORS[v.group] || "var(--muted)";
          return (
            <Link
              key={v.number}
              href={`/verses/${v.number}`}
              className="block rounded-lg p-4 border transition-colors"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: color }}
                >
                  {v.number}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{v.theme}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${color}15`, color }}
                    >
                      {v.group}
                    </span>
                  </div>
                  <p
                    className="text-sm line-clamp-2"
                    style={{ color: "var(--muted)" }}
                  >
                    {v.rootText}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
