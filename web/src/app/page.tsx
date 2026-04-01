import { getVerses } from "@/lib/data";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";

export default function Home() {
  const verses = getVerses();

  return (
    <div>
      <header
        style={{
          textAlign: "center",
          padding: "5rem 1.5rem 3rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--ink)",
            marginBottom: "0.75rem",
            letterSpacing: "-0.01em",
          }}
        >
          The 37 Practices of Bodhisattvas
        </h1>
        <p
          className="small-caps"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.75rem",
            color: "var(--muted)",
            letterSpacing: "0.12em",
          }}
        >
          Gyalse Tokme Zangpo &middot; 1295–1369
        </p>
        <ReadingProgress />
      </header>

      <TableOfContents verses={verses} />
    </div>
  );
}
