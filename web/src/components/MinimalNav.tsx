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

const NAV_LINKS = [
  { href: "/verses", label: "Verses" },
  { href: "/transcripts", label: "Transcripts" },
  { href: "/toolkit", label: "Toolkit" },
];

export default function MinimalNav({ onSearchOpen }: { onSearchOpen: () => void }) {
  const pathname = usePathname();
  const label = deriveLabel(pathname);

  return (
    <>
      {/* Persistent top nav — thin, not sticky */}
      <header
        style={{
          borderBottom: "1px solid var(--border-hairline)",
          padding: "0.875rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.9375rem",
            fontStyle: "italic",
            color: pathname === "/" ? "var(--accent)" : "var(--ink)",
            textDecoration: "none",
          }}
        >
          37 Practices
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="small-caps"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: pathname.startsWith(link.href) ? "var(--accent)" : "var(--muted)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={onSearchOpen}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              border: "1px solid var(--border)",
              borderRadius: "3px",
              padding: "2px 7px",
              cursor: "pointer",
              background: "transparent",
              color: "var(--muted)",
              letterSpacing: "0.04em",
            }}
          >
            ⌘K
          </button>
        </div>
      </header>

      {/* Bottom-left breadcrumb — only on inner pages */}
      {label && (
        <div
          className="fixed bottom-6 left-6 z-40"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.7rem",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
            37 Practices
          </Link>
          <span style={{ opacity: 0.35 }}>/</span>
          <span style={{ color: "var(--ink)" }}>{label}</span>
        </div>
      )}
    </>
  );
}
