import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "37 Practices Study System",
  description:
    "A dynamic study system for The Thirty-Seven Practices of Bodhisattvas by Gyalse Tokme Zangpo",
};

function Nav() {
  return (
    <nav className="border-b sticky top-0 z-50" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-6 text-sm">
        <Link
          href="/"
          className="font-semibold text-base"
          style={{ color: "var(--accent)" }}
        >
          37 Practices
        </Link>
        <Link href="/verses" className="hover:underline" style={{ color: "var(--muted)" }}>
          Verses
        </Link>
        <Link href="/transcripts" className="hover:underline" style={{ color: "var(--muted)" }}>
          Transcripts
        </Link>
        <Link href="/search" className="hover:underline" style={{ color: "var(--muted)" }}>
          Search
        </Link>
        <Link href="/toolkit" className="hover:underline" style={{ color: "var(--muted)" }}>
          Toolkit
        </Link>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <footer className="border-t py-4 text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          Based on <em>The 37 Practices of Bodhisattvas</em> by Gyalse Tokme Zangpo (1295-1369)
        </footer>
      </body>
    </html>
  );
}
