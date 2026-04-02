import StructuralFrameworks from "@/components/StructuralFrameworks";

export const metadata = {
  title: "Structural Frameworks — 37 Practices",
  description:
    "How different teachers structure the 37 Practices — six frameworks compared, with direct quotes from transcripts and commentaries.",
};

export default function FrameworksPage() {
  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--ink)",
            marginBottom: "0.5rem",
          }}
        >
          Structural Frameworks
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.9375rem",
            color: "var(--muted)",
            lineHeight: 1.75,
            maxWidth: "36rem",
          }}
        >
          Different teachers make different cuts through the same 37 verses. Each cut reveals
          a different organizing logic. The frameworks below are not scholarly projections but
          structural claims made explicitly by the teachers themselves, including direct quotes
          from the{" "}
          <span style={{ fontStyle: "italic" }}>
            Khenpo Sherab Sangpo teaching series
          </span>{" "}
          and the{" "}
          <span style={{ fontStyle: "italic" }}>
            Garchen Rinpoche Arizona retreat
          </span>
          .
        </p>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.875rem",
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: "36rem",
            marginTop: "0.75rem",
            fontStyle: "italic",
          }}
        >
          The disagreements between frameworks are worth sitting with: which verse you treat
          as the center of gravity determines which verses read as setup and which read as elaboration.
        </p>
      </header>

      <StructuralFrameworks />

      <div
        style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border-hairline)",
          fontFamily: "var(--font-serif)",
          fontSize: "0.8125rem",
          color: "var(--muted)",
          lineHeight: 1.8,
        }}
      >
        <p
          className="small-caps"
          style={{ letterSpacing: "0.1em", fontSize: "0.7rem", marginBottom: "0.75rem" }}
        >
          How to use this
        </p>
        <p>
          Before beginning the{" "}
          <a href="/toolkit" style={{ color: "var(--accent)" }}>
            Analytical Meditation Toolkit
          </a>
          , choose the framework that fits where you are: the Khenpo three-part structure
          gives you a clear sequential map; the Dalai Lama&apos;s lam-rim situates each
          verse within the scope of aspiration; the relative/ultimate pivot makes v22 the
          hinge everything else turns on; the lojong reading puts adversity at the center;
          the paramita reading uses the six perfections as spine; Garchen&apos;s frame makes
          bodhicitta the organizing principle of every verse from the first.
        </p>
        <p>
          Then, after sustained study, read a single verse through all six frameworks in
          sequence. The verse will not be the same verse by the end.
        </p>
      </div>
    </div>
  );
}
