import Link from "next/link";
import { getVerses, getSeries, GROUP_COLORS } from "@/lib/data";

export default function Home() {
  const verses = getVerses();
  const series = getSeries();
  const groups = [...new Set(verses.map((v) => v.group))];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-8">
        <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--accent)" }}>
          The 37 Practices of Bodhisattvas
        </h1>
        <p className="text-lg" style={{ color: "var(--muted)" }}>
          A dynamic study system for deep analytical meditation
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          by Gyalse Tokme Zangpo &middot; with commentaries by HH Dalai Lama,
          HE Garchen Rinpoche, Khenpo Sherab Sangpo &amp; more
        </p>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <StatCard label="Verses" value="37" />
        <StatCard label="Transcript Series" value={String(series.length)} />
        <StatCard
          label="Total Words"
          value={Math.round(
            series.reduce((sum, s) => sum + s.parts.reduce((ps, p) => ps + p.wordCount, 0), 0) / 1000
          ) + "k"}
        />
        <StatCard label="Practice Groups" value={String(groups.length)} />
      </section>

      {/* Groups overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Practice Groups</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const groupVerses = verses.filter((v) => v.group === group);
            const color = GROUP_COLORS[group] || "var(--muted)";
            return (
              <Link
                key={group}
                href={`/verses?group=${encodeURIComponent(group)}`}
                className="rounded-lg p-4 border transition-colors"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--card)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ background: color }}
                  />
                  <span className="font-medium">{group}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Practices {groupVerses[0].number}
                  {groupVerses.length > 1 && `\u2013${groupVerses[groupVerses.length - 1].number}`}
                  {" \u00b7 "}
                  {groupVerses.length} verse{groupVerses.length !== 1 && "s"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick links */}
      <section className="grid gap-4 sm:grid-cols-3">
        <QuickLink href="/verses" title="Browse Verses" desc="All 37 practices with root text and commentary stubs" />
        <QuickLink href="/transcripts" title="Transcript Browser" desc="155k+ words from Khenpo Sherab Sangpo and Garchen Rinpoche" />
        <QuickLink href="/search" title="Full-Text Search" desc="Search across all transcripts and verse content" />
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg p-4 border"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <div className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
        {value}
      </div>
      <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
        {label}
      </div>
    </div>
  );
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg p-5 border transition-colors block"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {desc}
      </p>
    </Link>
  );
}
