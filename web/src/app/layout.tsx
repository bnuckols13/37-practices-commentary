import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { getVerses, getSeries } from "@/lib/data";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The 37 Practices of Bodhisattvas",
  description:
    "A study system for the Thirty-Seven Practices of Bodhisattvas by Gyalse Tokme Zangpo (1295–1369)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const verses = getVerses();
  const series = getSeries();

  const cmdkCorpus = {
    verses: verses.map((v) => ({
      id: `verse-${v.number}`,
      type: "verse" as const,
      title: `${v.number}. ${v.theme}`,
      href: `/verses/${v.number}`,
      preview: v.rootText.slice(0, 150),
    })),
    transcripts: series.flatMap((s) =>
      s.parts.map((p) => ({
        id: `${s.id}-${p.part}`,
        type: "transcript" as const,
        title: p.title,
        href: `/transcripts/${s.id}/${p.part}`,
        preview: (p.content || "").slice(0, 150),
      }))
    ),
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmMono.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-serif)", background: "var(--bg)", color: "var(--ink)" }}
      >
        <AppShell corpus={cmdkCorpus}>
          <main className="flex-1">
            {children}
          </main>
          <footer
            className="border-t"
            style={{ borderColor: "var(--border-hairline)", padding: "3rem 2rem" }}
          >
            <div
              className="text-center"
              style={{
                maxWidth: "32rem",
                margin: "0 auto",
                fontFamily: "var(--font-serif)",
                fontSize: "0.8125rem",
                lineHeight: 1.9,
                color: "var(--muted)",
              }}
            >
              <p
                className="small-caps"
                style={{ letterSpacing: "0.12em", fontSize: "0.7rem", marginBottom: "0.5rem" }}
              >
                Colophon
              </p>
              <p>
                <em>The Thirty-Seven Practices of Bodhisattvas</em>
                <br />
                composed by Gyalse Tokme Zangpo (1295–1369)
              </p>
            </div>
          </footer>
        </AppShell>
      </body>
    </html>
  );
}
