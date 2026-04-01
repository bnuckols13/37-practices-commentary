import Link from "next/link";
import { getVerses } from "@/lib/data";

const GROUP_COLORS: Record<string, string> = {
  Foundation: "#4A5568",
  Bodhicitta: "#744210",
  "Adversity Training": "#7B341E",
  "Working with Mind": "#44337A",
  Emptiness: "#234E52",
  "Six Perfections": "#1A4731",
  "Daily Vigilance": "#3D3480",
};

const GROUPS = [
  "Foundation",
  "Bodhicitta",
  "Adversity Training",
  "Working with Mind",
  "Emptiness",
  "Six Perfections",
  "Daily Vigilance",
];

export default async function VersesPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group: activeGroup } = await searchParams;
  const verses = getVerses();
  const filtered = activeGroup
    ? verses.filter((v) => v.group === activeGroup)
    : verses;

  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
      <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1.5rem", marginBottom: "2.5rem" }}>
        <Link
          href="/verses"
          className="small-caps"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            color: !activeGroup ? "var(--accent)" : "var(--muted)",
            textDecoration: !activeGroup ? "underline" : "none",
            textUnderlineOffset: "3px",
          }}
        >
          All
        </Link>
        {GROUPS.map((g) => (
          <Link
            key={g}
            href={`/verses?group=${encodeURIComponent(g)}`}
            className="small-caps"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              color: activeGroup === g ? "var(--accent)" : "var(--muted)",
              textDecoration: activeGroup === g ? "underline" : "none",
              textUnderlineOffset: "3px",
            }}
          >
            {g}
          </Link>
        ))}
      </nav>

      {activeGroup && (
        <div
          style={{
            borderTop: `2px solid ${GROUP_COLORS[activeGroup] || "#888"}`,
            paddingTop: "1.25rem",
            marginBottom: "1rem",
            fontVariant: "small-caps",
            letterSpacing: "0.1em",
            fontSize: "0.7rem",
            color: "var(--muted)",
            fontFamily: "var(--font-serif)",
          }}
        >
          {activeGroup}
        </div>
      )}

      {filtered.map((v) => (
        <Link
          key={v.number}
          href={`/verses/${v.number}`}
          className="hover-accent"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1.25rem",
            padding: "0.6rem 0",
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
            {String(v.number).padStart(2, "0")}
          </span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", flex: 1 }}>
            {v.theme}
          </span>
          <span
            className="small-caps"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.65rem",
              color: "var(--muted)",
              opacity: 0.6,
            }}
          >
            {v.group}
          </span>
        </Link>
      ))}
    </div>
  );
}
