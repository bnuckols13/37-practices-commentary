"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function deriveLabel(pathname: string): string | null {
  if (pathname === "/") return null;
  if (pathname.startsWith("/verses/") && pathname !== "/verses") {
    const n = pathname.split("/").pop();
    return n ? `Practice ${n}` : "Verses";
  }
  if (pathname === "/verses") return "Verses";
  if (pathname.startsWith("/transcripts/") && pathname.split("/").length > 3) return "Transcript";
  if (pathname === "/transcripts") return "Transcripts";
  if (pathname === "/search") return "Search";
  if (pathname === "/toolkit") return "Toolkit";
  return null;
}

export default function MinimalNav({ onSearchOpen }: { onSearchOpen: () => void }) {
  const pathname = usePathname();
  const label = deriveLabel(pathname);

  return (
    <nav
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3"
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "0.75rem",
        color: "var(--muted)",
      }}
    >
      <Link
        href="/"
        style={{
          color: pathname === "/" ? "var(--accent)" : "var(--muted)",
          textDecoration: "none",
        }}
      >
        37 Practices
      </Link>
      {label && (
        <>
          <span style={{ opacity: 0.35 }}>/</span>
          <span style={{ color: "var(--ink)" }}>{label}</span>
        </>
      )}
      <button
        onClick={onSearchOpen}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          border: "1px solid var(--border)",
          borderRadius: "3px",
          padding: "2px 7px",
          cursor: "pointer",
          background: "var(--bg)",
          color: "var(--muted)",
          letterSpacing: "0.04em",
          marginLeft: "0.25rem",
        }}
      >
        ⌘K
      </button>
    </nav>
  );
}
