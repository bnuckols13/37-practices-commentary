"use client";

import { useState } from "react";
import Link from "next/link";

type TabId = "grid" | "dalailama" | "bodhicitta" | "lojong" | "paramita";

const TABS: { id: TabId; label: string }[] = [
  { id: "grid", label: "Comparison grid" },
  { id: "dalailama", label: "HH Dalai Lama" },
  { id: "bodhicitta", label: "Relative / Ultimate pivot" },
  { id: "lojong", label: "Lojong reading" },
  { id: "paramita", label: "Paramita reading" },
];

// Proportional bar segments for the grid view
const FRAMEWORKS = [
  {
    name: "Dalai Lama — lam-rim three scopes",
    src: "explicit in commentary text",
    tab: "dalailama" as TabId,
    segments: [
      { pct: 21.6, label: "small scope v1–8", color: 0 },
      { pct: 2.7, label: "v9", color: 1 },
      { pct: 75.7, label: "large scope — bodhicitta v10–37", color: 2 },
    ],
  },
  {
    name: "Dalai Lama — relative vs ultimate bodhicitta",
    src: "explicit at v22",
    tab: "bodhicitta" as TabId,
    segments: [
      { pct: 56.8, label: "relative bodhicitta v1–21", color: 3 },
      { pct: 43.2, label: "absolute bodhicitta / shunyata v22–37", color: 4 },
    ],
  },
  {
    name: "Dalai Lama — space-like vs illusion-like",
    src: "subdivision of ultimate section",
    tab: "bodhicitta" as TabId,
    segments: [
      { pct: 56.8, label: "relative v1–21", color: 5 },
      { pct: 2.7, label: "v22", color: 4 },
      { pct: 5.4, label: "v23–24", color: 3 },
      { pct: 35.1, label: "paramitas + conduct v25–37", color: 2 },
    ],
  },
  {
    name: "Lojong reading — Dilgo Khyentse, Jampa Tegchok",
    src: "adversity as core",
    tab: "lojong" as TabId,
    segments: [
      { pct: 24.3, label: "ground v1–9", color: 0 },
      { pct: 10.8, label: "aspiration v10–13", color: 1 },
      { pct: 24.3, label: "mind training v14–22 ← center", color: 6 },
      { pct: 21.6, label: "paramitas v23–30", color: 2 },
      { pct: 18.9, label: "conduct + ded. v31–37", color: 4 },
    ],
  },
  {
    name: "Paramita reading — Sonam Rinchen, Khenpo Tsultrim Gyamtso",
    src: "six perfections as spine",
    tab: "paramita" as TabId,
    segments: [
      { pct: 24.3, label: "renunciation v1–9", color: 0 },
      { pct: 35.1, label: "two bodhicittas v10–22", color: 1 },
      { pct: 21.6, label: "six paramitas v23–30 ← center", color: 7 },
      { pct: 18.9, label: "integration v31–37", color: 4 },
    ],
  },
  {
    name: "Karmapa (Ogyen Trinley Dorje) — view-ground-path-fruition",
    src: "Kagyu framing",
    tab: "grid" as TabId,
    segments: [
      { pct: 18.9, label: "ground v1–7", color: 0 },
      { pct: 40.5, label: "path: relative bodhicitta v8–21", color: 3 },
      { pct: 2.7, label: "v22", color: 4 },
      { pct: 24.3, label: "path: ultimate v23–34", color: 2 },
      { pct: 13.5, label: "fruition v35–37", color: 5 },
    ],
  },
];

// 8 muted semantic colors that work with the parchment palette
const COLORS = [
  { bg: "#EAF0F4", fg: "#2A4A5E" },  // slate-blue
  { bg: "#E8EEF8", fg: "#243A6B" },  // indigo
  { bg: "#EDE8F8", fg: "#3C2E7A" },  // violet
  { bg: "#F5EAE3", fg: "#6B2D0F" },  // terracotta
  { bg: "#F5EDDA", fg: "#5A3306" },  // ochre
  { bg: "#EDEBE3", fg: "#3D3C35" },  // stone
  { bg: "#F5E8E8", fg: "#6B1F1F" },  // rose
  { bg: "#E8F0E3", fg: "#274A0F" },  // sage
];

function PivotCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border-hairline)",
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "0.9375rem",
          fontWeight: 500,
          color: "var(--ink)",
          marginBottom: "0.6rem",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "0.9rem",
          color: "var(--muted)",
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function BlockQuote({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderLeft: "1px solid var(--border-hairline)",
        paddingLeft: "1rem",
        margin: "0.75rem 0 0",
        fontStyle: "italic",
        fontSize: "0.875rem",
        lineHeight: 1.7,
        color: "var(--muted)",
      }}
    >
      {children}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="small-caps"
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--muted)",
        padding: 0,
        marginTop: "1rem",
        display: "block",
      }}
    >
      ← back to grid
    </button>
  );
}

export default function StructuralFrameworks() {
  const [activeTab, setActiveTab] = useState<TabId>("grid");

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 1.25rem",
          marginBottom: "1.75rem",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="small-caps"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: activeTab === tab.id ? "var(--accent)" : "var(--muted)",
              textDecoration: activeTab === tab.id ? "underline" : "none",
              textUnderlineOffset: "3px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* GRID VIEW */}
      {activeTab === "grid" && (
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--muted)",
              letterSpacing: "0.04em",
              marginBottom: "1.25rem",
            }}
          >
            v1 ←————————————————————————————→ v37 &nbsp;·&nbsp; width proportional to verse count
          </p>

          {FRAMEWORKS.map((fw, fi) => (
            <div key={fi} style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.8rem",
                  color: "var(--ink)",
                  marginBottom: "0.35rem",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontWeight: 500 }}>{fw.name}</span>
                <span
                  className="small-caps"
                  style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.07em" }}
                >
                  {fw.src}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "2px",
                  height: "2rem",
                  cursor: fw.tab !== "grid" ? "pointer" : "default",
                }}
                onClick={() => fw.tab !== "grid" && setActiveTab(fw.tab)}
                title={fw.tab !== "grid" ? `View ${TABS.find((t) => t.id === fw.tab)?.label}` : undefined}
              >
                {fw.segments.map((seg, si) => {
                  const c = COLORS[seg.color];
                  return (
                    <div
                      key={si}
                      style={{
                        width: `${seg.pct}%`,
                        background: c.bg,
                        borderRadius: "3px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          color: c.fg,
                          padding: "0 4px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {seg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.8rem",
              fontStyle: "italic",
              color: "var(--muted)",
              marginTop: "1rem",
            }}
          >
            Click any bar to read that framework in detail.
          </p>
        </div>
      )}

      {/* DALAI LAMA VIEW */}
      {activeTab === "dalailama" && (
        <div>
          <PivotCard title="Three-scope lam-rim structure — HH Dalai Lama">
            The Dalai Lama's commentary makes explicit what other readings leave implicit: the text
            tracks the classic Tibetan <em style={{ color: "var(--ink)" }}>lam-rim</em> graduated
            path, dividing practitioners by the scope of their aspiration. He says after v8:
            <BlockQuote>
              "Up to this point the path for the man of smallest scope has been explained. What
              follows concerns the man of medium scope."
            </BlockQuote>
            At v10 the large scope begins with the arising of bodhicitta.
          </PivotCard>

          <PivotCard title="Small scope — v1–8">
            <em style={{ color: "var(--ink)" }}>Renunciation and foundation.</em> The practitioner
            recognizes precious human birth (v1), abandons attachments to home and bad companions
            (v2–5), finds a good teacher (v6), takes refuge (v7), and commits to avoiding negative
            karma (v8). The aim is avoiding the lower realms — motivation is still self-oriented.
            <br /><br />
            The Triple Gem here carries a clinical structure:{" "}
            <em style={{ color: "var(--ink)" }}>
              Buddha as the doctor who diagnoses, Dharma as the medicine you must actually take,
              Sangha as the nurse who models recovery.
            </em>{" "}
            Taking refuge is not passive — it is committing to the treatment.
          </PivotCard>

          <PivotCard title="Medium scope — v9 (a single verse)">
            <em style={{ color: "var(--ink)" }}>Aspiration for personal liberation.</em> Only v9
            covers this scope — the recognition that even a fortunate human rebirth is impermanent,
            and the turn toward nirvana. The brevity is deliberate: personal liberation is legitimate
            but insufficient.
            <BlockQuote>
              "We sacrifice our temporary happiness for nirvana. This is reasonable, for the two
              cannot in fact be compared. In the same way, for the happiness of other sentient beings
              we sacrifice our own."
            </BlockQuote>
          </PivotCard>

          <PivotCard title="Large scope — v10–37">
            <em style={{ color: "var(--ink)" }}>Bodhicitta in all its forms.</em> Everything from
            the recognition of all beings as mothers (v10) through dedication free of the three
            spheres (v37) belongs here. The large scope subdivides into aspiration bodhicitta, lojong
            training, and the ultimate view — but all of it operates from the frame of seeking
            buddhahood for all beings.
            <BlockQuote>
              "There are two intentions: 1) the wish to help other sentient beings; 2) to achieve
              buddhahood for this. The state of mind of bodhicitta is brought about by these two
              intentions."
            </BlockQuote>
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}

      {/* RELATIVE / ULTIMATE PIVOT */}
      {activeTab === "bodhicitta" && (
        <div>
          <PivotCard title="The relative / ultimate bodhicitta division — the primary structural hinge">
            The Dalai Lama makes a rare explicit statement after v21 that almost no casual reader
            catches:
            <BlockQuote>
              "The practices so far described relate to relative bodhicitta. Those that follow relate
              to absolute bodhicitta, the realizing of shunyata."
            </BlockQuote>
            This places{" "}
            <em style={{ color: "var(--ink)" }}>the primary structural hinge at v22</em>, not at
            the start of the paramitas (v25). The text has two large halves: a relative bodhicitta
            half (v1–21) and an ultimate bodhicitta half (v22–37). Most casual readings miss this
            entirely.
          </PivotCard>

          <PivotCard title="V22 — the pivot verse (space-like meditation)">
            <em style={{ fontStyle: "italic", color: "var(--muted)" }}>
              "Appearances are one's own mind. From the beginning, mind's nature is free from the
              extremes of elaboration. Knowing this, not to engage the mind in subject-object duality
              is the bodhisattvas' practice."
            </em>
            <BlockQuote>
              "In space-like meditation we meditate on shunyata, afterwards the idea is not to reject
              everything, but to see everything without exaggeration." — Dalai Lama
            </BlockQuote>
            This is direct recognition of the non-inherent existence of phenomena. Not an
            intellectual proposition — an instruction for a meditative shift.
          </PivotCard>

          <PivotCard title="V23–24 — illusion-like meditation (post-shunyata behavior)">
            <em style={{ color: "var(--ink)" }}>Two modes of shunyata in action.</em> V23 (pleasant
            objects like a summer rainbow — don&apos;t grasp) and v24 (suffering like a dream —
            don&apos;t reify) are not part of the paramita section proper. They are the{" "}
            <em style={{ color: "var(--ink)" }}>
              behavioral expression of the view in v22
            </em>
            : how you handle attraction and aversion once you&apos;ve seen through inherent
            existence.
            <BlockQuote>
              "The purpose of realizing shunyata is to know the proper way of coping with
              existence… to stop this exaggeration of the object by ignorance." — Dalai Lama
            </BlockQuote>
            V23–24 are the bridge between the view (v22) and the paramitas (v25+).
          </PivotCard>

          <PivotCard title="Why this matters for practice">
            Most readings treat v22 as one verse among many in the lojong section. The Dalai
            Lama&apos;s framework reveals it as the pivot of the entire text. Everything before is{" "}
            <em style={{ color: "var(--ink)" }}>ethical and motivational</em> cultivation.
            Everything after is{" "}
            <em style={{ color: "var(--ink)" }}>wisdom-grounded</em> cultivation. The paramitas
            (v25–30) are not a new section — they&apos;re the six perfections held within the space
            of non-dual awareness. Without this pivot, the paramitas look like techniques. With it,
            they look like expressions of view.
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}

      {/* LOJONG READING */}
      {activeTab === "lojong" && (
        <div>
          <PivotCard title="Lojong reading — Dilgo Khyentse Rinpoche, Geshe Jampa Tegchok">
            The lojong tradition reads the text&apos;s center of gravity as{" "}
            <em style={{ color: "var(--ink)" }}>v14–22</em> — the nine adversity practices. In this
            framing, v1–13 is preparation and v23–37 is elaboration, but the text&apos;s distinctive
            contribution is the crucible of difficult-circumstance practice. Dilgo Khyentse&apos;s{" "}
            <em>Heart of Compassion</em> and Jampa Tegchok&apos;s{" "}
            <em>Transforming Adversity</em> both organize their commentary to foreground this
            section.
          </PivotCard>

          <PivotCard title="The nine adversity cases (v14–22)">
            The lojong reading sees a deliberate escalation in difficulty:
            <br />
            <br />
            <em style={{ color: "var(--ink)" }}>v14</em> — slander in public &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>v15</em> — public shaming &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>v16</em> — betrayal by a beloved &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>v17</em> — contempt from an inferior &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>v18</em> — extreme poverty &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>v19</em> — extreme wealth &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>v20</em> — inner vs outer enemies &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>v21</em> — craving as salt water &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>v22</em> — the view that dissolves the self
            that suffers
            <BlockQuote>
              Each scenario is not just a difficult situation — it is a complete practice
              instruction. The verse doesn&apos;t say "endure this." It says "this is the
              bodhisattvas&apos; practice" — the adversity is the practice, not an obstacle to it.
            </BlockQuote>
          </PivotCard>

          <PivotCard title="Why v22 functions differently in this reading">
            In the lojong reading, v22 is the{" "}
            <em style={{ color: "var(--ink)" }}>resolution</em> of the adversity section rather
            than a pivot to ultimate teaching. If all nine adversities have been met with compassion
            and non-retaliation, v22 reveals why this was possible: the mind that suffers is not
            ultimately findable. The lojong and the view are not two phases — the view is what
            lojong practice has been cultivating all along. Dilgo Khyentse emphasizes this
            continuity strongly.
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}

      {/* PARAMITA READING */}
      {activeTab === "paramita" && (
        <div>
          <PivotCard title="Paramita reading — Geshe Sonam Rinchen, Khenpo Tsultrim Gyamtso">
            The Gelug and some Kagyu commentaries organize the text around the six paramitas as the
            spine of Mahayana practice. In this reading, everything prior to v25 builds the basis:
            renunciation (v1–9) → aspiration and action bodhicitta (v10–22) → the six perfections
            proper (v25–30). V23–24 are often included as "view preludes." The subsequent conduct
            practices (v31–36) are the paramitas expressed in daily life.
          </PivotCard>

          <PivotCard title="The compression problem — one verse per paramita">
            Compared to Shantideva&apos;s <em>Bodhicaryavatara</em>, which gives full chapters to
            each paramita, the 37 Practices compresses each to a single verse. The paramita reading
            treats this not as incompleteness but as deliberate aphorism — mnemonics for
            practitioners who already have the long-form teachings.
            <br /><br />
            <em style={{ color: "var(--ink)" }}>Generosity</em> (v25): give even your body &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>Ethics</em> (v26): without ethics, helping others
            is laughable &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>Patience</em> (v27): enemies are precious
            treasures &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>Diligence</em> (v28): even Hinayanists strive
            urgently &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>Meditation</em> (v29): insight needs samadhi
            &nbsp;·&nbsp;{" "}
            <em style={{ color: "var(--ink)" }}>Wisdom</em> (v30): without prajna, the other five
            don&apos;t reach buddhahood
          </PivotCard>

          <PivotCard title="The wisdom verse (v30) as culmination — and the loop back to v22">
            In the paramita reading, v30 is the capstone:{" "}
            <em>
              "Cultivating skillful means with the wisdom that does not discriminate among the three
              spheres."
            </em>{" "}
            The other five paramitas are perfected when held by prajna free from the three spheres
            (giver, receiver, gift). This creates a subtle loop: the wisdom that completes the
            paramitas is the same view introduced in v22. The text circles back on itself —{" "}
            <em style={{ color: "var(--ink)" }}>the end points to the middle.</em>
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}
    </div>
  );
}
