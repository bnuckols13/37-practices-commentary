import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import { getVerses, getSeries } from "@/lib/data";

export default function SearchPage() {
  const verses = getVerses();
  const series = getSeries();

  return (
    <Suspense
      fallback={
        <div
          style={{
            maxWidth: "40rem",
            margin: "0 auto",
            padding: "3rem 1.5rem",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            color: "var(--muted)",
          }}
        >
          Loading…
        </div>
      }
    >
      <SearchClient verses={verses} series={series} />
    </Suspense>
  );
}
