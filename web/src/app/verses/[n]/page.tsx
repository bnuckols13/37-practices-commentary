import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getVerse, getVerses, GROUP_COLORS } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getVerses().map((v) => ({ n: String(v.number) }));
}

export default async function VersePage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const num = parseInt(n, 10);
  const verse = getVerse(num);
  if (!verse) notFound();

  const color = GROUP_COLORS[verse.group] || "var(--muted)";
  const prev = num > 1 ? getVerse(num - 1) : null;
  const next = num < 37 ? getVerse(num + 1) : null;

  // Extract content after the header (skip the template header lines)
  const contentBody = verse.content
    .split("\n")
    .slice(4) // skip title + metadata lines
    .join("\n")
    .trim();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--muted)" }}>
        <Link href="/verses" className="hover:underline">
          Verses
        </Link>
        <span>/</span>
        <span>Practice {verse.number}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
            style={{ background: color }}
          >
            {verse.number}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{verse.theme}</h1>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
              {verse.group}
            </span>
          </div>
        </div>
      </div>

      {/* Root text */}
      <section
        className="rounded-lg p-6 mb-8 border-l-4"
        style={{ borderColor: color, background: "var(--card)" }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted)" }}>
          Root Text
        </h2>
        <p className="text-lg leading-relaxed italic">{verse.rootText}</p>
      </section>

      {/* Commentary content from markdown */}
      <section className="prose mb-8">
        <h2>Commentary</h2>
        {contentBody ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentBody}</ReactMarkdown>
        ) : (
          <p style={{ color: "var(--muted)", fontStyle: "italic" }}>
            No commentary written yet. Edit{" "}
            <code className="text-xs">commentary/verses/{verse.file}</code> to add your notes.
          </p>
        )}
      </section>

      {/* Transcript search links */}
      <section
        className="rounded-lg p-5 mb-8 border"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <h2 className="text-sm font-semibold mb-3">Search Transcripts for This Practice</h2>
        <div className="flex flex-wrap gap-2">
          {getSearchTerms(verse).map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="px-3 py-1.5 rounded-full text-xs border hover:bg-amber-50 transition-colors"
              style={{ borderColor: "var(--border)" }}
            >
              &ldquo;{term}&rdquo;
            </Link>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        {prev ? (
          <Link href={`/verses/${prev.number}`} className="text-sm hover:underline" style={{ color: "var(--accent)" }}>
            &larr; {prev.number}. {prev.theme}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/verses/${next.number}`} className="text-sm hover:underline" style={{ color: "var(--accent)" }}>
            {next.number}. {next.theme} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

function getSearchTerms(verse: { number: number; theme: string; rootText: string }): string[] {
  const terms: string[] = [];

  // Use the theme as a search term
  terms.push(verse.theme.toLowerCase());

  // Extract key phrases from root text
  const keyPhrases: Record<number, string[]> = {
    1: ["precious human", "leisure and fortune", "hearing pondering meditating"],
    2: ["attachment", "hatred", "ignorance", "fatherland"],
    3: ["secluded places", "disturbing emotions"],
    4: ["impermanence", "letting go", "guesthouse of the body"],
    5: ["evil companions", "three poisons"],
    6: ["spiritual friends", "waxing moon"],
    7: ["refuge", "Triple Gem"],
    8: ["lower realms", "negative deeds"],
    9: ["liberation", "dewdrop"],
    10: ["bodhicitta", "mind of enlightenment", "sentient beings"],
    11: ["exchange self", "altruistic mind", "tonglen"],
    12: ["generosity", "steal", "dedicate"],
    13: ["compassion", "negative deeds"],
    14: ["slander", "offensive remarks", "loving mind"],
    15: ["humiliation", "spiritual friend"],
    16: ["betrayal", "ailing child"],
    17: ["contempt", "pride", "guru"],
    18: ["poverty", "illness", "discouragement"],
    19: ["fame", "wealth", "unconceited"],
    20: ["hatred", "love and compassion", "inner enemy"],
    21: ["craving", "salt water", "attachment"],
    22: ["mind's nature", "subject-object", "emptiness"],
    23: ["rainbow", "clinging", "illusion"],
    24: ["suffering", "illusory", "dream"],
    25: ["generosity", "giving"],
    26: ["ethical conduct", "ethics", "moral"],
    27: ["patience", "hostility", "precious treasure"],
    28: ["diligence", "effort"],
    29: ["concentration", "tranquil abiding", "insight"],
    30: ["wisdom", "three spheres", "skillful means"],
    31: ["self-examination", "mistakes"],
    32: ["faults", "criticizing", "Great Vehicle"],
    33: ["gain and respect", "attachment"],
    34: ["harsh speech", "harsh words"],
    35: ["mindfulness", "antidote", "disturbing emotions"],
    36: ["state of my mind", "awareness"],
    37: ["dedication", "merit", "enlightenment"],
  };

  if (keyPhrases[verse.number]) {
    terms.push(...keyPhrases[verse.number]);
  }

  return [...new Set(terms)].slice(0, 6);
}
