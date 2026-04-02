"use client";

import { useState } from "react";
import Link from "next/link";

type TabId = "grid" | "khenpo" | "dalailama" | "bodhicitta" | "lojong" | "paramita" | "garchen";

const TABS: { id: TabId; label: string }[] = [
  { id: "grid", label: "Comparison grid" },
  { id: "khenpo", label: "Khenpo Sherab Sangpo" },
  { id: "dalailama", label: "HH Dalai Lama" },
  { id: "bodhicitta", label: "Relative / Ultimate pivot" },
  { id: "lojong", label: "Lojong reading" },
  { id: "paramita", label: "Paramita reading" },
  { id: "garchen", label: "Garchen Rinpoche" },
];

const FRAMEWORKS = [
  {
    name: "Khenpo Sherab Sangpo",
    src: "three-part structure",
    tab: "khenpo" as TabId,
    segments: [
      { pct: 29.7, verses: "v1–11", label: "Preliminary", color: 0 },
      { pct: 51.4, verses: "v12–30", label: "Main practices", color: 2 },
      { pct: 18.9, verses: "v31–37", label: "Integration", color: 4 },
    ],
  },
  {
    name: "Dalai Lama",
    src: "lam-rim three scopes",
    tab: "dalailama" as TabId,
    segments: [
      { pct: 21.6, verses: "v1–8", label: "Small scope", color: 0 },
      { pct: 2.7, verses: "v9", label: "Medium", color: 1 },
      { pct: 75.7, verses: "v10–37", label: "Large scope", color: 2 },
    ],
  },
  {
    name: "Dalai Lama",
    src: "relative vs ultimate bodhicitta",
    tab: "bodhicitta" as TabId,
    segments: [
      { pct: 56.8, verses: "v1–21", label: "Relative bodhicitta", color: 3 },
      { pct: 43.2, verses: "v22–37", label: "Absolute bodhicitta", color: 4 },
    ],
  },
  {
    name: "Dalai Lama",
    src: "space-like vs illusion-like",
    tab: "bodhicitta" as TabId,
    segments: [
      { pct: 56.8, verses: "v1–21", label: "Relative", color: 5 },
      { pct: 2.7, verses: "v22", label: "View", color: 4 },
      { pct: 5.4, verses: "v23–24", label: "Illusion-like", color: 3 },
      { pct: 35.1, verses: "v25–37", label: "Paramitas + conduct", color: 2 },
    ],
  },
  {
    name: "Lojong reading",
    src: "Dilgo Khyentse, Jampa Tegchok",
    tab: "lojong" as TabId,
    segments: [
      { pct: 24.3, verses: "v1–9", label: "Ground", color: 0 },
      { pct: 10.8, verses: "v10–13", label: "Aspiration", color: 1 },
      { pct: 24.3, verses: "v14–22", label: "Mind training ←", color: 6 },
      { pct: 21.6, verses: "v23–30", label: "Paramitas", color: 2 },
      { pct: 18.9, verses: "v31–37", label: "Conduct + ded.", color: 4 },
    ],
  },
  {
    name: "Paramita reading",
    src: "Sonam Rinchen, Khenpo Tsultrim Gyamtso",
    tab: "paramita" as TabId,
    segments: [
      { pct: 24.3, verses: "v1–9", label: "Renunciation", color: 0 },
      { pct: 35.1, verses: "v10–22", label: "Two bodhicittas", color: 1 },
      { pct: 21.6, verses: "v23–30", label: "Six paramitas ←", color: 7 },
      { pct: 18.9, verses: "v31–37", label: "Integration", color: 4 },
    ],
  },
  {
    name: "Karmapa",
    src: "Ogyen Trinley Dorje · view-ground-path-fruition",
    tab: "grid" as TabId,
    segments: [
      { pct: 18.9, verses: "v1–7", label: "Ground", color: 0 },
      { pct: 40.5, verses: "v8–21", label: "Path: relative", color: 3 },
      { pct: 2.7, verses: "v22", label: "View", color: 4 },
      { pct: 24.3, verses: "v23–34", label: "Path: ultimate", color: 2 },
      { pct: 13.5, verses: "v35–37", label: "Fruition", color: 5 },
    ],
  },
  {
    name: "Garchen Rinpoche",
    src: "bodhicitta as organizing spine",
    tab: "garchen" as TabId,
    segments: [
      { pct: 24.3, verses: "v1–9", label: "Foundation", color: 0 },
      { pct: 29.7, verses: "v10–18", label: "Aspiration bodhicitta", color: 3 },
      { pct: 18.9, verses: "v19–24", label: "Bodhicitta in action", color: 2 },
      { pct: 18.9, verses: "v25–30", label: "Paramitas", color: 7 },
      { pct: 8.1, verses: "v31–37", label: "Dedication", color: 4 },
    ],
  },
];

const COLORS = [
  { bg: "#E8EEF5", fg: "#243A6B" },  // slate
  { bg: "#ECE8F5", fg: "#3C2A72" },  // violet
  { bg: "#EDE8F0", fg: "#3C2E62" },  // plum
  { bg: "#F5EAE3", fg: "#6B2D0F" },  // sienna
  { bg: "#F5F0E3", fg: "#5A4010" },  // amber
  { bg: "#E8EDE8", fg: "#2A4A2A" },  // sage
  { bg: "#F5E8E8", fg: "#6B1F1F" },  // rose
  { bg: "#E8F0E8", fg: "#1F4A2A" },  // forest
];

function PivotCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: "1.25rem", paddingBottom: "1.25rem" }}>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)", marginBottom: "0.6rem" }}>
        {title}
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}

function BlockQuote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "1px solid var(--border-hairline)", paddingLeft: "1rem", margin: "0.75rem 0 0", fontStyle: "italic", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted)" }}>
      {children}
    </div>
  );
}

function TranscriptBadge({ series, part }: { series: string; part: number }) {
  return (
    <Link
      href={`/transcripts/${series}/${part}`}
      className="small-caps"
      style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.06em", color: "var(--accent)", textDecoration: "none", border: "1px solid var(--border)", borderRadius: "2px", padding: "1px 6px", marginLeft: "0.5rem", verticalAlign: "middle" }}
    >
      transcript ↗
    </Link>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="small-caps" style={{ fontFamily: "var(--font-serif)", fontSize: "0.65rem", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 0, marginTop: "1rem", display: "block" }}>
      ← back to grid
    </button>
  );
}

export default function StructuralFrameworks() {
  const [activeTab, setActiveTab] = useState<TabId>("grid");

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0",
        marginBottom: "2rem",
        borderBottom: "1px solid var(--border-hairline)",
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="small-caps"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab.id ? "1.5px solid var(--ink)" : "1.5px solid transparent",
              cursor: "pointer",
              padding: "0.5rem 0.85rem 0.5rem 0",
              marginBottom: "-1px",
              color: activeTab === tab.id ? "var(--ink)" : "var(--muted)",
              transition: "color 0.15s",
              fontWeight: activeTab === tab.id ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── GRID VIEW ── */}
      {activeTab === "grid" && (
        <div>
          {/* Intro line */}
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            color: "var(--muted)",
            letterSpacing: "0.04em",
            marginBottom: "1.5rem",
            opacity: 0.7,
          }}>
            Each bar spans v1 to v37 proportionally. Click any row to read that framework in depth. The pivot at v22 is where most frameworks diverge.
          </p>

          {/* Verse ruler */}
          <div style={{ display: "flex", marginBottom: "1.5rem" }}>
            {/* Name column spacer */}
            <div style={{ flexShrink: 0, width: "9rem" }} />
            {/* Ruler */}
            <div style={{ flex: 1, position: "relative", height: "2rem" }}>
              {/* Baseline */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "var(--border-hairline)",
              }} />
              {/* Tick marks at key verses */}
              {[
                { v: 1, label: "v1" },
                { v: 9, label: "v9" },
                { v: 10, label: "v10" },
                { v: 22, label: "v22", accent: true },
                { v: 25, label: "v25" },
                { v: 31, label: "v31" },
                { v: 37, label: "v37" },
              ].map(({ v, label, accent }) => {
                const pct = ((v - 1) / 36) * 100;
                return (
                  <div
                    key={v}
                    style={{
                      position: "absolute",
                      left: `${pct}%`,
                      bottom: 0,
                      transform: "translateX(-50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.52rem",
                      color: accent ? "var(--accent)" : "var(--muted)",
                      opacity: accent ? 1 : 0.55,
                      marginBottom: "3px",
                      fontWeight: accent ? 600 : 400,
                    }}>
                      {label}
                    </span>
                    <div style={{
                      width: accent ? "2px" : "1px",
                      height: accent ? "8px" : "5px",
                      background: accent ? "var(--accent)" : "var(--border-hairline)",
                    }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Framework rows */}
          {FRAMEWORKS.map((fw, fi) => {
            const canNavigate = fw.tab !== "grid";
            // v22 position as a percentage across the bar area
            const v22pct = (21 / 36) * 100;
            return (
              <div
                key={fi}
                onClick={() => canNavigate && setActiveTab(fw.tab)}
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  marginBottom: "0.85rem",
                  cursor: canNavigate ? "pointer" : "default",
                  borderRadius: "4px",
                  padding: "0.5rem 0",
                }}
                className={canNavigate ? "framework-row" : ""}
              >
                {/* Name column */}
                <div style={{
                  flexShrink: 0,
                  width: "9rem",
                  paddingRight: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "var(--ink)",
                    lineHeight: 1.3,
                    display: "block",
                  }}>
                    {fw.name}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.65rem",
                    fontStyle: "italic",
                    color: "var(--muted)",
                    lineHeight: 1.3,
                    display: "block",
                    marginTop: "1px",
                  }}>
                    {fw.src}
                  </span>
                </div>

                {/* Bar column */}
                <div style={{ flex: 1, position: "relative" }}>
                  {/* v22 vertical guide line */}
                  <div style={{
                    position: "absolute",
                    left: `${v22pct}%`,
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    background: "var(--accent)",
                    opacity: 0.15,
                    zIndex: 2,
                    pointerEvents: "none",
                  }} />

                  {/* Segments */}
                  <div style={{ display: "flex", gap: "2px", height: "52px" }}>
                    {fw.segments.map((seg, si) => {
                      const c = COLORS[seg.color];
                      return (
                        <div
                          key={si}
                          style={{
                            flex: `0 0 calc(${seg.pct}% - 1px)`,
                            background: c.bg,
                            borderRadius: "3px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "0 6px",
                            overflow: "hidden",
                            minWidth: 0,
                          }}
                        >
                          {/* Verse range */}
                          <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.5rem",
                            color: c.fg,
                            opacity: 0.75,
                            letterSpacing: "0.02em",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "clip",
                            display: "block",
                          }}>
                            {seg.verses}
                          </span>
                          {/* Section label */}
                          <span style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "0.58rem",
                            color: c.fg,
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "block",
                            marginTop: "2px",
                          }}>
                            {seg.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigate hint */}
                {canNavigate && (
                  <div style={{
                    flexShrink: 0,
                    width: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      color: "var(--muted)",
                      opacity: 0.4,
                    }}>
                      →
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer note */}
          <p style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.8rem",
            fontStyle: "italic",
            color: "var(--muted)",
            marginTop: "1.5rem",
            lineHeight: 1.7,
          }}>
            Each framework is a structural claim made explicitly by the teacher, or traceable from their commentary. None of them is a scholarly projection. The disagreements between them are worth sitting with.
          </p>
        </div>
      )}

      {/* ── KHENPO SHERAB SANGPO ── */}
      {activeTab === "khenpo" && (
        <div>
          <PivotCard title="Three-part structure — Khenpo Sherab Sangpo">
            Khenpo opens his 11-part teaching series by announcing an explicit three-part architecture before teaching a single verse. His own teachers always gave the summary before the verse-by-verse teaching, so the student could hold the map while walking the territory. He situates the text immediately within the full Mahayana curriculum:
            <BlockQuote>
              "This text summarizes the entire bodhisattva path and offers excellent instructions for Mahayana practice."
            </BlockQuote>
            This claim establishes the stakes. The 37 verses are not a supplement to the Mahayana path. They <em style={{ color: "var(--ink)" }}>are</em> the path in compressed form. Khenpo adds a biographical note that reveals how foundational the text is in traditional Tibetan education:
            <BlockQuote>
              "I memorized this text when I was 11 years old."
            </BlockQuote>
            Memorized at 11, before any of the commentaries were studied. Students who memorized this text at 11 encounter the long commentaries as elaborations of something they already carry. The verses settle into the body before the doctrine settles into the intellect.
            <BlockQuote>
              "So it has three main principles. First, cultivating the motivation to follow the bodhisattva path. Second, engaging in the specific trainings of the bodhisattva path. And third, integrating those practices into your life."
            </BlockQuote>
            <TranscriptBadge series="transcripts-playlist" part={1} />
          </PivotCard>

          <PivotCard title="Preliminary — v1–11: Motivation and foundation">
            <BlockQuote>
              "The first few verses emphasize renouncing worldly attachments. They encourage practitioners to reflect on the nature of life such as the suffering of samsara, benefits of seeking liberation for the sake of all sentient beings."
            </BlockQuote>
            Verses 1–11 are not merely preparatory in the sense of "getting ready." They are the active clearing of impediments: severing worldly ties, generating refuge, establishing bodhicitta as the motivational ground. Without this ground, the adversity practices of v12–18 become mere stoicism rather than transformation.
          </PivotCard>

          <PivotCard title="Main practices — v12–30: Six perfections through adversity">
            <BlockQuote>
              "The following verses describe the specific practices a bodhisattva should cultivate. They explain how to overcome negative emotions and how to use difficult situations — including harm caused by others — as opportunities to cultivate the six perfections."
            </BlockQuote>
            Khenpo explicitly organizes v12–30 around the six paramitas. The adversity section (v12–18) is not a separate thematic block but the crucible in which the paramitas are trained. Difficult circumstances are the curriculum.
            <BlockQuote>
              "Every harm is like a precious treasure… for bodhisattvas, difficulties are not seen as obstacles but as opportunities to cultivate patience."
            </BlockQuote>
            <TranscriptBadge series="transcripts-playlist" part={6} />
          </PivotCard>

          <PivotCard title="Verse 22 — explicit hinge announcement">
            This is the most analytically significant moment in all 18 transcript sessions. In Part 7, Khenpo stops and explicitly announces the structural transition:
            <BlockQuote>
              "The main topics presented in this 37 Practices text is about relative and ultimate bodhicitta. And up until now we have had a profound explanation of relative bodhicitta — which is taking on the suffering of others, exchanging yourself with others, and correct engaging in post-meditation practice. Now here we are going to start with the teachings on ultimate bodhicitta. The 22nd verse explains the practice of ultimate bodhicitta."
            </BlockQuote>
            <TranscriptBadge series="transcripts-playlist" part={7} />
            The Dalai Lama reaches the same structural conclusion independently. He states it directly, not by inference from surrounding content.
          </PivotCard>

          <PivotCard title="Integration — v31–37: Ultimate view + dedication">
            <BlockQuote>
              "The final verses focus on how to follow the bodhisattva path — like practicing the union of bodhicitta and emptiness, which is the heart essence of the bodhisattva journey."
            </BlockQuote>
            The final section integrates everything: the motivation from v1–11, the training from v12–30, now held within the wisdom introduced at v22. The dedication verse (v37) seals the merit and perpetuates it until enlightenment.
            <BlockQuote>
              "These 37 practices do not come naturally to us. Without mindfulness and awareness, we will not be able to do them. The nature of our being tends to manifest in negative actions due to our habits. The only way to transform these habits is to engage in these 37 practices with effort and diligence."
            </BlockQuote>
            <TranscriptBadge series="transcripts-playlist" part={11} />
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}

      {/* ── DALAI LAMA ── */}
      {activeTab === "dalailama" && (
        <div>
          <PivotCard title="Three-scope lam-rim structure — HH Dalai Lama">
            The Dalai Lama's commentary makes explicit what other readings leave implicit: the text tracks the classic Tibetan <em style={{ color: "var(--ink)" }}>lam-rim</em> graduated path, dividing practitioners by the scope of their aspiration.
            <BlockQuote>
              "Up to this point the path for the man of smallest scope has been explained. What follows concerns the man of medium scope."
            </BlockQuote>
            At v10 the large scope begins with the arising of bodhicitta.
          </PivotCard>

          <PivotCard title="Small scope — v1–8">
            <em style={{ color: "var(--ink)" }}>Renunciation and foundation.</em> Precious human birth (v1), abandons attachments (v2–5), finds a good teacher (v6), takes refuge (v7), avoids negative karma (v8). Motivation is still self-oriented: avoiding the lower realms.
            <br /><br />
            The Triple Gem here carries a clinical structure: <em style={{ color: "var(--ink)" }}>Buddha as the doctor who diagnoses, Dharma as the medicine you must actually take, Sangha as the nurse who models recovery.</em> Taking refuge is not passive. It is committing to the treatment.
          </PivotCard>

          <PivotCard title="Medium scope — v9 (a single verse)">
            Only v9 covers this scope: the turn toward nirvana. The brevity is deliberate. Personal liberation is legitimate but insufficient.
            <BlockQuote>
              "We sacrifice our temporary happiness for nirvana. This is reasonable, for the two cannot in fact be compared. In the same way, for the happiness of other sentient beings we sacrifice our own."
            </BlockQuote>
          </PivotCard>

          <PivotCard title="Large scope — v10–37">
            Everything from v10 through v37. Subdivides into aspiration bodhicitta, lojong training, and the ultimate view; all of it operates from the frame of seeking buddhahood for all beings.
            <BlockQuote>
              "There are two intentions: 1) the wish to help other sentient beings; 2) to achieve buddhahood for this. The state of mind of bodhicitta is brought about by these two intentions."
            </BlockQuote>
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}

      {/* ── RELATIVE / ULTIMATE PIVOT ── */}
      {activeTab === "bodhicitta" && (
        <div>
          <PivotCard title="The primary structural hinge — confirmed by two independent sources">
            Both the Dalai Lama's written commentary and Khenpo Sherab Sangpo's transcript series mark v22 as the boundary between relative and ultimate bodhicitta. Neither is inferring it from surrounding content. Both state it directly.
            <br /><br />
            <strong style={{ fontFamily: "var(--font-serif)", color: "var(--ink)", fontSize: "0.875rem" }}>Dalai Lama (written commentary, after v21):</strong>
            <BlockQuote>
              "The practices so far described relate to relative bodhicitta. Those that follow relate to absolute bodhicitta, the realizing of shunyata."
            </BlockQuote>
            <strong style={{ fontFamily: "var(--font-serif)", color: "var(--ink)", fontSize: "0.875rem" }}>Khenpo Sherab Sangpo (transcript, Part 7):</strong>
            <BlockQuote>
              "Up until now we have had a profound explanation of relative bodhicitta… Now here we are going to start with the teachings on ultimate bodhicitta. The 22nd verse explains the practice of ultimate bodhicitta."
            </BlockQuote>
            <TranscriptBadge series="transcripts-playlist" part={7} />
          </PivotCard>

          <PivotCard title="V22 — space-like meditation">
            <em style={{ fontStyle: "italic", color: "var(--muted)" }}>
              "Appearances are one's own mind. From the beginning, mind's nature is free from the extremes of elaboration. Knowing this, not to engage the mind in subject-object duality is the bodhisattvas' practice."
            </em>
            <BlockQuote>
              "In space-like meditation we meditate on shunyata, afterwards the idea is not to reject everything, but to see everything without exaggeration." — Dalai Lama
            </BlockQuote>
            Direct recognition of the non-inherent existence of phenomena. An instruction for a meditative shift, not an intellectual proposition.
          </PivotCard>

          <PivotCard title="V23–24 — illusion-like meditation (post-shunyata behavior)">
            V23 takes a summer rainbow as its image for pleasant objects: vivid, present, nothing to hold. V24 takes a dream as its image for suffering: real in the moment, without substance. Both are the behavioral expression of the view in v22, showing how you handle attraction and aversion once you've seen through inherent existence.
            <BlockQuote>
              "The purpose of realizing shunyata is to know the proper way of coping with existence… to stop this exaggeration of the object by ignorance." — Dalai Lama
            </BlockQuote>
            V23–24 are the bridge between the view (v22) and the paramitas (v25+).
          </PivotCard>

          <PivotCard title="Why this matters for every practice before v22">
            Most readings treat v22 as one verse among many. The confirmed hinge changes the whole picture. The verses before v22 train the ground: motivation, exchange of self and other, adversity as curriculum. The verses after operate from a different register. The paramitas are six perfections practiced by someone who has stopped reifying the agent, the recipient, and the act. Read v25–30 without v22 in view, and you have six techniques. Read them after sitting with v22, and each one describes what a perfection looks like when the practitioner has stopped taking herself to be ultimately real.
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}

      {/* ── LOJONG READING ── */}
      {activeTab === "lojong" && (
        <div>
          <PivotCard title="Lojong reading — Dilgo Khyentse Rinpoche, Geshe Jampa Tegchok">
            The lojong tradition reads the text's center of gravity as <em style={{ color: "var(--ink)" }}>v14–22</em>, the adversity practices. V1–13 is preparation; v23–37 is elaboration. The text's distinctive contribution is the crucible of difficult-circumstance practice.
          </PivotCard>

          <PivotCard title="The nine adversity cases (v14–22)">
            Deliberate escalation in difficulty:
            <br /><br />
            <em style={{ color: "var(--ink)" }}>v14</em> — slander in public &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>v15</em> — public shaming &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>v16</em> — betrayal by beloved &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>v17</em> — contempt from inferior &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>v18</em> — extreme poverty &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>v19</em> — extreme wealth &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>v20</em> — inner vs outer enemies &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>v21</em> — craving as salt water &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>v22</em> — the view that dissolves the self that suffers
            <BlockQuote>
              Each scenario is not just a difficult situation — it is a complete practice instruction. The verse doesn't say "endure this." It says "this is the bodhisattvas' practice" — the adversity is the practice, not an obstacle to it.
            </BlockQuote>
            Khenpo parses v18's "evil spirits" into two categories: inner obstacles like fear, doubt, jealousy, and wrong views, and outer obstacles like illness, poverty, and difficult people. The verse makes no distinction between them.
            <TranscriptBadge series="transcripts-playlist" part={6} />
          </PivotCard>

          <PivotCard title="Why v22 functions differently in this reading">
            In the lojong reading, v22 <em style={{ color: "var(--ink)" }}>resolves</em> the adversity section rather than pivoting to a new subject. When you have met all nine adversities with compassion, v22 explains why this was possible: the mind that suffers is not ultimately findable. The lojong and the view are not two phases of the path. Lojong practice has been pointing at the view from the start.
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}

      {/* ── PARAMITA READING ── */}
      {activeTab === "paramita" && (
        <div>
          <PivotCard title="Paramita reading — Geshe Sonam Rinchen, Khenpo Tsultrim Gyamtso">
            Organizes around the six paramitas as the spine of Mahayana practice. Everything prior to v25 builds the basis: renunciation (v1–9) → aspiration and action bodhicitta (v10–22) → six perfections (v25–30). V23–24 are "view preludes." Conduct practices (v31–36) are the paramitas in daily life.
            <br /><br />
            Note: Khenpo Sherab Sangpo's transcript reading partially overlaps this. He also organizes v12–30 around the six perfections, but places the adversity section as the <em style={{ color: "var(--ink)" }}>training ground</em> for them rather than treating v25–30 as a discrete paramita block.
          </PivotCard>

          <PivotCard title="The compression problem — one verse per paramita">
            Compared to Shantideva's <em>Bodhicaryavatara</em>, which gives full chapters to each paramita, the 37 Practices compresses each to a single verse. These are mnemonics for practitioners who already have the long-form teachings.
            <br /><br />
            <em style={{ color: "var(--ink)" }}>Generosity</em> (v25): give even your body &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>Ethics</em> (v26): without ethics, helping others is laughable &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>Patience</em> (v27): enemies are precious treasures &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>Diligence</em> (v28): even Hinayanists strive urgently &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>Meditation</em> (v29): insight needs samadhi &nbsp;·&nbsp; <em style={{ color: "var(--ink)" }}>Wisdom</em> (v30): without prajna the other five don't reach buddhahood
            <br /><br />
            Khenpo offers a decisive reframe of the first paramita that changes how all six are understood:
            <BlockQuote>
              "The essence of the perfection of generosity is about realization of nonattachment."
            </BlockQuote>
            This reverses the conventional reading. Generosity is not primarily <em style={{ color: "var(--ink)" }}>giving</em>. It is the <em style={{ color: "var(--ink)" }}>dissolution of the grasper who clings</em>. When nonattachment is realized, generosity is what naturally follows. The perfection is not the act but the view it comes from. This connects v25 directly to the wisdom of v22: paramitas held within non-dual awareness are not techniques. They are expressions of what is already present when self-grasping is released.
          </PivotCard>

          <PivotCard title="The wisdom verse (v30) as culmination — and the loop back to v22">
            V30: <em>"Cultivating skillful means with the wisdom that does not discriminate among the three spheres."</em> The other five paramitas are perfected when held by prajna free from the three spheres (giver, receiver, gift). This wisdom is the same view introduced in v22. The text circles back. <em style={{ color: "var(--ink)" }}>V30 points to v22.</em>
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}

      {/* ── GARCHEN RINPOCHE ── */}
      {activeTab === "garchen" && (
        <div>
          <PivotCard title="Garchen Rinpoche — bodhicitta as organizing spine (Arizona retreat 2020)">
            Unlike Khenpo's announced three-part framework, Garchen's structural principle is implicit and more radical: <em style={{ color: "var(--ink)" }}>every verse is already about bodhicitta, even v1</em>. The precious human life is precious because it enables us to ceaselessly liberate others. "Others" comes first from the very opening line.
            <br /><br />
            Garchen opens his retreat by reciting the root text verses as prayer before analyzing them. Structure emerges from embodied transmission, not conceptual pre-announcement.
            <BlockQuote>
              "Having now gained this great ship of freedom and fortune, so difficult to find, in order to free yourself and others from the ocean of cyclic existence, listen, reflect and meditate day and night without distraction — this is the way of a bodhisattva."
            </BlockQuote>
            <TranscriptBadge series="transcripts-garchen-arizona-2020" part={1} />
          </PivotCard>

          <PivotCard title="Bodhicitta divided into two — a non-standard reading">
            At v10, Garchen makes his structural key explicit. But his division is different from the standard aspiration/action bodhicitta:
            <BlockQuote>
              "Bodhicitta is divided into two: awareness mind and realized mind. Awareness means to remain in tranquility, having eliminated selfishness. Realized means having achieved the mind to work for the benefit of all sentient beings."
            </BlockQuote>
            This is not the standard aspiration/action distinction. Garchen's "awareness" is closer to the ground of mind, resting in open clarity free of self-grasping. His "realized" is the active expression of that ground in compassionate service. The two are <em style={{ color: "var(--ink)" }}>Mahamudra awareness + compassionate activity</em>, not two sequential stages.
          </PivotCard>

          <PivotCard title="The text as transmission object — an extraordinary claim">
            Garchen makes a claim about the text itself that no other commentator makes:
            <BlockQuote>
              "This little booklet is very important, because if you have read it once, it's the same as having read the Kanjur… This book also contains a mantra by sight where one only needs to have seen it then one can be liberated."
            </BlockQuote>
            And: <em style={{ color: "var(--ink)" }}>"Whether I am here or not, you must know that this book is me. This book represents me. In future after my death, when you see this book you are seeing me. There is no difference."</em>
            <br /><br />
            This is a Vajrayana doctrine of the text as lama. The book carries blessing through contact, not just through intellectual understanding. It reframes what you are doing when you study these 37 verses.
            <TranscriptBadge series="transcripts-garchen-arizona-2020" part={2} />
          </PivotCard>

          <PivotCard title="Multi-teacher validation — structure as universal truth">
            Garchen's retreat features three authorized teachers across 7 sessions: Garchen Rinpoche (Parts 1–2, 4–6), Drupon Rinchen Dorje (Part 3), and Khenpo Tenzin (Part 7). Multiple authentic teachers teaching the same text validates its content as universal truth rather than single-perspective interpretation.
            <br /><br />
            The methodological implication: any reading that depends entirely on one teacher's framing is incomplete. The frameworks on this page represent at least five distinct structural visions of the same 37 verses. Each one becomes a different text.
          </PivotCard>

          <BackButton onClick={() => setActiveTab("grid")} />
        </div>
      )}
    </div>
  );
}
