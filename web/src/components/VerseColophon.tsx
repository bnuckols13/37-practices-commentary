export default function VerseColophon() {
  return (
    <aside
      style={{
        maxWidth: "34rem",
        margin: "4rem auto 2rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--border-hairline)",
        fontFamily: "var(--font-serif)",
        fontSize: "0.8125rem",
        color: "var(--muted)",
        lineHeight: 1.85,
      }}
    >
      <p
        className="small-caps"
        style={{
          letterSpacing: "0.1em",
          fontSize: "0.7rem",
          marginBottom: "0.75rem",
        }}
      >
        Sources &amp; Attribution
      </p>
      <p>
        Root text from <em>The Thirty-Seven Practices of Bodhisattvas</em> by Gyalse
        Tokme Zangpo (rGyal sras Thogs med bzang po, 1295–1369).
      </p>
      <p>
        Commentaries: HH the Dalai Lama &middot; HE Garchen Rinpoche &middot; Khenpo
        Sherab Sangpo &middot; Alexander Berzin &middot; Dilgo Khyentse Rinpoche
        &middot; Thubten Chodron &middot; Ringu Tulku
      </p>
    </aside>
  );
}
