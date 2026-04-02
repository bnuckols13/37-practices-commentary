import Link from "next/link";
import StructuralFrameworks from "@/components/StructuralFrameworks";

export default function ToolkitPage() {
  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>

      {/* Header */}
      <div className="prose">
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            marginBottom: "0.5rem",
          }}
        >
          Analytical Meditation Toolkit
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: 0 }}>
          A systematic approach to deep study and novel discovery within the 37 Practices —
          integrating structural analysis, cross-commentary tension, and direct meditation
          practice.
        </p>
      </div>

      {/* Layer index */}
      <div
        style={{
          borderTop: "1px solid var(--border-hairline)",
          borderBottom: "1px solid var(--border-hairline)",
          padding: "1.25rem 0",
          margin: "2rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {[
          { n: "1", label: "How to Read This Text — structural frameworks" },
          { n: "2", label: "Single-Verse Deep Dive Protocol" },
          { n: "3", label: "The Primary Hinge — v22 and what it changes" },
          { n: "4", label: "Cross-Commentary Inquiry Questions" },
          { n: "5", label: "7-Day Intensive Cycle" },
          { n: "6", label: "Novel Discovery Engine" },
          { n: "7", label: "Six Commentators, Six Lenses" },
        ].map(({ n, label }) => (
          <div key={n} style={{ display: "flex", gap: "1.25rem", alignItems: "baseline" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--muted)",
                opacity: 0.5,
                minWidth: "1rem",
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {n}
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.9rem",
                color: "var(--muted)",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ─── LAYER 1: Structural Frameworks ─── */}
      <div className="prose">
        <h2>Layer 1: How to Read This Text</h2>
        <p>
          Before meditating on individual verses, it matters{" "}
          <em>which map you carry</em>. Different teachers draw the structural lines in
          different places, and each cut changes what you&apos;re looking at when you read
          the same 37 verses. The comparison below shows six frameworks.
        </p>
        <p>
          The choice has practical consequences. The framework you inhabit determines which
          verse functions as center of gravity and which reads as preparation or coda. The
          Dalai Lama&apos;s reading, with its explicit hinge at v22, is the most structurally
          precise. The lojong reading, which centers the adversity practices, is the most
          useful when difficulty is what the practice currently has to work with. Choose your
          entry point before you start.
        </p>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <StructuralFrameworks />
      </div>

      {/* ─── LAYER 2: Single-Verse Protocol ─── */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />
        <h2>Layer 2: Single-Verse Deep Dive Protocol</h2>
        <p>For each of the 37 practices, work through these 7 angles in sequence:</p>
        <ol>
          <li>
            <strong>Literal</strong> — What does the verse actually say? What situation does it
            describe?
          </li>
          <li>
            <strong>Psychological</strong> — What mental pattern is being addressed? What
            cognitive distortion is being corrected?
          </li>
          <li>
            <strong>Relational</strong> — How does this practice change how you relate to others?
          </li>
          <li>
            <strong>Somatic</strong> — Where do you feel this practice in the body? What does the
            emotion it addresses feel like physically?
          </li>
          <li>
            <strong>Shadow</strong> — What part of you resists this practice? What would you lose
            by adopting it fully?
          </li>
          <li>
            <strong>Cross-commentary</strong> — How do the commentators differ on this verse? Use{" "}
            <Link href="/search" style={{ color: "var(--accent)" }}>
              search
            </Link>{" "}
            to find each teacher&apos;s take.
          </li>
          <li>
            <strong>Novel application</strong> — Where does this practice apply in your life right
            now in a way no commentator has described?
          </li>
        </ol>

        <h3>Structural meditations — relationships between practices</h3>

        <h3>
          The Escalation Sequence (
          <Link href="/verses?group=Adversity+Training" style={{ color: "var(--accent)" }}>
            Practices 12–18
          </Link>
          )
        </h3>
        <p>
          Each verse presents a worse situation than the last. Meditate on: what is the
          pattern? Why this order? What breaks in you as you move from &ldquo;robbed&rdquo;
          to &ldquo;beheaded&rdquo; to &ldquo;slandered&rdquo; to &ldquo;betrayed by your
          own child&rdquo;?
        </p>

        <h3>
          The Twin Dangers (
          <Link href="/verses/18" style={{ color: "var(--accent)" }}>18</Link>{" "}
          &amp;{" "}
          <Link href="/verses/19" style={{ color: "var(--accent)" }}>19</Link>)
        </h3>
        <p>
          Poverty/despair and fame/wealth are presented as equally dangerous. Which is YOUR
          greater danger? Which would destroy your practice faster?
        </p>

        <h3>
          The Paramita Sequence (
          <Link href="/verses?group=Six+Perfections" style={{ color: "var(--accent)" }}>
            Practices 25–30
          </Link>
          )
        </h3>
        <p>
          Why does he say generosity requires giving &ldquo;without hope of karmic
          results&rdquo;? This is radical — it negates even spiritual materialism. And notice
          the loop: v30&apos;s wisdom is the same view introduced in v22. The paramitas end
          where the ultimate bodhicitta section began.
        </p>
      </div>

      {/* ─── LAYER 3: The v22 Hinge ─── */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />
        <h2>Layer 3: The Primary Hinge — Practice 22</h2>
        <p>
          The Dalai Lama makes an explicit statement after v21 that almost no casual reader
          catches. Understanding it restructures how you read the entire text.
        </p>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        <HingeCard verse="After v21" label="The explicit division">
          <blockquote
            style={{
              borderLeft: "1px solid var(--border-hairline)",
              paddingLeft: "1rem",
              margin: "0 0 0.75rem",
              fontStyle: "italic",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: "var(--muted)",
            }}
          >
            &ldquo;The practices so far described relate to relative bodhicitta. Those that
            follow relate to absolute bodhicitta, the realizing of shunyata.&rdquo;
          </blockquote>
          This makes v22 the primary structural hinge of the entire 37 Practices — not the
          start of the paramitas (v25), as most readings assume. The text has two halves:
          ethical/motivational cultivation (v1–21), and wisdom-grounded cultivation (v22–37).
        </HingeCard>

        <HingeCard verse="v22" label="Space-like meditation — the view itself">
          <em>
            &ldquo;Appearances are one&apos;s own mind. From the beginning, mind&apos;s
            nature is free from the extremes of elaboration. Knowing this, not to engage the
            mind in subject-object duality is the bodhisattvas&apos; practice.&rdquo;
          </em>
          <br /><br />
          This is an instruction for a meditative shift, not an intellectual proposition.
          The Dalai Lama: &ldquo;In space-like meditation we meditate on shunyata,
          afterwards the idea is not to reject everything, but to see everything without
          exaggeration.&rdquo;
        </HingeCard>

        <HingeCard verse="v23–24" label="Illusion-like meditation — the view in action">
          V23 (pleasant objects like a summer rainbow — don&apos;t grasp) and v24 (suffering
          like a dream — don&apos;t reify) are not part of the paramita section proper. They
          are the behavioral expression of the view in v22: how you handle attraction and
          aversion <em>after</em> you&apos;ve seen through inherent existence.
          <br /><br />
          Meditate on: Can you hold a pleasant experience with the same quality of attention
          you&apos;d give to a rainbow — present, vivid, and not grasped? Can you meet
          suffering without adding the layer of &ldquo;this is absolutely real and absolutely
          bad&rdquo;?
        </HingeCard>

        <HingeCard verse="v25–30" label="The paramitas re-read from the view">
          Read v25–30 without v22 in view, and you get six techniques with the agent intact.
          Read them after sitting with v22, and each practice becomes a description of what
          generosity, patience, or wisdom looks like when the practitioner has stopped
          reifying herself. The three spheres mentioned in v30 — giver, receiver, gift — are
          not a formula to be learned. They circle back to the same recognition v22 introduced.
        </HingeCard>
      </div>

      {/* ─── LAYER 4: Cross-Commentary Inquiry ─── */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />
        <h2>Layer 4: Cross-Commentary Inquiry Questions</h2>
        <p>
          Questions designed to generate novel insight by holding multiple commentators in
          tension. These are not rhetorical — sit with each one in formal meditation.
        </p>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <InquiryCard number={1}>
          <Link href="/verses/11" style={{ color: "var(--accent)" }}>Practice 11</Link> says
          all suffering comes from self-cherishing.{" "}
          <Link href="/verses/22" style={{ color: "var(--accent)" }}>Practice 22</Link> says
          appearances are your own mind. If both are true simultaneously, what does that imply
          about the nature of suffering itself?
        </InquiryCard>

        <InquiryCard number={2}>
          The Dalai Lama says &ldquo;un-seeing is the supreme seeing.&rdquo; How does this
          relate to{" "}
          <Link href="/verses/36" style={{ color: "var(--accent)" }}>practice 36</Link>&apos;s
          instruction to constantly ask &ldquo;what is the state of my mind?&rdquo; Can you
          ask about your mind&apos;s state while in a state of un-seeing?
        </InquiryCard>

        <InquiryCard number={3}>
          Garchen Rinpoche says your job IS bodhisattva practice if the motivation is right.
          Tokme Zangpo wrote this in a cave. Is there a practice that genuinely cannot be done
          outside retreat? Or is the entire path available in daily life?
        </InquiryCard>

        <InquiryCard number={4}>
          Berzin distinguishes 4 types of desire: clinging, attachment, desire, craving. Take
          a single object of desire in your life and analyze: which of the four is actually
          operating? Does this distinction change your relationship to it?
        </InquiryCard>

        <InquiryCard number={5}>
          <Link href="/verses/20" style={{ color: "var(--accent)" }}>Practice 20</Link> says
          &ldquo;subduing one&apos;s own mind with the army of love and compassion.&rdquo;
          Army is a violent metaphor applied to non-violence. What does it mean to wage war on
          hatred using love as a weapon? Is there aggression in compassion?
        </InquiryCard>

        <InquiryCard number={6}>
          Dilgo Khyentse says suffering is &ldquo;medicine for arrogance.&rdquo; The Dalai
          Lama says &ldquo;happiness eats the fruit of our past merit.&rdquo; If happiness
          depletes merit and suffering builds it, what is the actual relationship between
          happiness and spiritual progress?
        </InquiryCard>

        <InquiryCard number={7}>
          Ringu Tulku says words don&apos;t inherently harm — interpretation does. But{" "}
          <Link href="/verses/34" style={{ color: "var(--accent)" }}>practice 34</Link> says
          abandon harsh speech. If the harm is in the listener&apos;s interpretation, why is
          the speaker responsible?
        </InquiryCard>

        <InquiryCard number={8}>
          Garchen Rinpoche treats bodhicitta as the organizing spine of all 37 verses —
          every verse is already about bodhicitta, even v1. The Dalai Lama divides the text
          into relative and ultimate sections. Can both be true? Is bodhicitta the container
          or the content?
        </InquiryCard>
      </div>

      {/* ─── LAYER 5: 7-Day Cycle ─── */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />
        <h2>Layer 5: The 7-Day Intensive Cycle</h2>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <DayCard day={1} title="Foundation" practices="1–9">
          Read all nine. Journal: What am I taking for granted about this human life? Where am
          I wasting it? Sit with the Triple Gem as clinical structure: Buddha as the doctor
          who diagnoses, Dharma as the medicine you must actually take, Sangha as the nurse
          who models recovery. Where are you refusing the treatment?
        </DayCard>
        <DayCard day={2} title="The Heart Turn" practices="10–11">
          Do tonglen meditation. Breathe in suffering, breathe out happiness. Journal: What
          happened in your body? What resisted?
        </DayCard>
        <DayCard day={3} title="The Gauntlet" practices="12–18">
          Read all seven adversity practices. Pick the one you find most impossible. Sit with
          it for 30 minutes. Journal: Why that one? What does your resistance reveal?
        </DayCard>
        <DayCard day={4} title="The Mirror" practices="19–20">
          Examine your relationship to praise and blame. Journal: When did praise last make
          you forget yourself? When did criticism last teach you something true?
        </DayCard>
        <DayCard day={5} title="The Hinge" practices="21–24">
          Read the Dalai Lama&apos;s commentary on v22 slowly. Attempt the space-like
          meditation he describes. Then sit with v23 and v24 as illusion-like practice — hold
          one pleasant experience and one difficult one within the same quality of non-grasping
          attention. Journal: What collapsed? What was left?
        </DayCard>
        <DayCard day={6} title="The Six Perfections" practices="25–30">
          For each paramita, identify one concrete action you can take today. Do them. Journal:
          Which felt natural? Which felt forced? Now re-read each verse holding v22 in
          mind — does the practice shift when the agent is not reified?
        </DayCard>
        <DayCard day={7} title="Vigilance &amp; Dedication" practices="31–37">
          Spend the day with practice 36 as your anchor: &ldquo;What is the state of my
          mind?&rdquo; Check in every hour. Journal: What patterns did you catch?
        </DayCard>
      </div>

      {/* ─── LAYER 6: Novel Discovery Engine ─── */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />
        <h2>Layer 6: The Novel Discovery Engine</h2>
        <p>To generate genuinely new insights that can help others:</p>
        <ol>
          <li>
            <strong>Comparative tension:</strong> Find two practices that seem to contradict
            each other. Sit with the contradiction until a third perspective emerges that holds
            both.
          </li>
          <li>
            <strong>Modern application mapping:</strong> What is the 2026 version of each
            situation? (e.g., Practice 14 about slander — what about social media? Practice 2
            about homeland — what about digital spaces you&apos;re attached to?)
          </li>
          <li>
            <strong>Cross-tradition bridges:</strong> How does each practice relate to concepts
            in other traditions? (e.g., Practice 11&apos;s exchange and relational
            psychotherapy&apos;s intersubjectivity)
          </li>
          <li>
            <strong>The body test:</strong> Which practices produce physical sensation when you
            read them? The body&apos;s response often reveals where the deepest work lies.
          </li>
          <li>
            <strong>The reversal test:</strong> What would the OPPOSITE of each practice look
            like? Sometimes seeing the anti-practice clarifies what the practice is really
            asking.
          </li>
          <li>
            <strong>The framework test:</strong> Read a single verse through each of the five
            structural frameworks above. Does it feel like renunciation practice, lojong
            training, a paramita, or an expression of the view? Does the practice change
            depending on the container?
          </li>
        </ol>
      </div>

      {/* ─── LAYER 7: Six Commentators ─── */}
      <div className="prose" style={{ marginTop: "3rem" }}>
        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />
        <h2>Layer 7: Six Commentators, Six Lenses</h2>
        <p>Each commentator brings a distinct interpretive framework. Knowing the lens helps you read what they&apos;re actually saying.</p>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <CommentatorCard
          name="HH Dalai Lama"
          lens="Lam-rim + relative/ultimate structure"
          unique="Makes the v22 hinge explicit. Triple Gem as doctor/medicine/nurse. Personal stories, humor, radical accessibility. Frames the text through graduated path — small, medium, large scope — and then subdivides the large scope into relative and ultimate bodhicitta with v22 as the explicit dividing line."
        />
        <CommentatorCard
          name="HE Garchen Rinpoche"
          lens="Bodhicitta as organizing spine"
          unique='Every verse is already about bodhicitta — even v1. Your job IS bodhisattva practice if the motivation is right. Karma as debt repayment. Bodhicitta divided into awareness mind (ground of open clarity) and realized mind (active service) — this is Mahamudra awareness + compassionate activity, not two sequential stages.'
        />
        <CommentatorCard
          name="Alexander Berzin"
          lens="Analytical precision"
          unique="4 types of desire carefully distinguished. Paramitas as mental states not external acts. Two-phase voidness meditation (space-like in sitting, illusion-like in action). The most philosophically rigorous commentary — use it when you need to be precise about what a term actually means."
        />
        <CommentatorCard
          name="Dilgo Khyentse Rinpoche"
          lens="Lojong and adversity as center"
          unique="Self-cherishing as THE root of samsara. Suffering as medicine for arrogance. Tonglen with vivid heart-light imagery. Centers the adversity section (v14–22) as the core of the text — preparation leads here, and paramitas elaborate from here."
        />
        <CommentatorCard
          name="Thubten Chodron"
          lens="Cognitive restructuring"
          unique="Mind-training as questioning thought patterns. First-person transformation narratives from Western students. The most accessible for people coming from a psychological rather than religious background."
        />
        <CommentatorCard
          name="Ringu Tulku"
          lens="Response over event"
          unique="Words don't inherently harm — interpretation does. Three dimensions of solitude (outer, inner, secret). Emptiness strengthens commitment rather than dissolving it. Emphasizes continuity between lojong and view — the adversity practices and v22 are not two phases but one movement."
        />
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function HingeCard({
  verse,
  label,
  children,
}: {
  verse: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border-hairline)",
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
        display: "flex",
        gap: "1.25rem",
      }}
    >
      <div style={{ flexShrink: 0, minWidth: "3.5rem", textAlign: "right", paddingTop: "0.1rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--accent)",
            letterSpacing: "0.04em",
            display: "block",
          }}
        >
          {verse}
        </span>
      </div>
      <div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--ink)",
            marginBottom: "0.5rem",
          }}
        >
          {label}
        </div>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.9375rem",
            lineHeight: 1.8,
            color: "var(--muted)",
            margin: 0,
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

function InquiryCard({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border-hairline)",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        display: "flex",
        gap: "1.25rem",
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--muted)",
          opacity: 0.5,
          minWidth: "1.5rem",
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {String(number).padStart(2, "0")}
      </span>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1rem",
          lineHeight: 1.75,
          color: "var(--ink)",
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}

function DayCard({
  day,
  title,
  practices,
  children,
}: {
  day: number;
  title: string;
  practices: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border-hairline)",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        display: "flex",
        gap: "1.25rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--muted)",
          opacity: 0.5,
          minWidth: "1.5rem",
          textAlign: "right",
          flexShrink: 0,
          paddingTop: "0.15rem",
        }}
      >
        {String(day).padStart(2, "0")}
      </span>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.75rem",
            marginBottom: "0.4rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1rem",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            {title}
          </span>
          <span
            className="small-caps"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.65rem",
              color: "var(--muted)",
              letterSpacing: "0.08em",
            }}
          >
            Practices {practices}
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "0.9375rem",
            lineHeight: 1.75,
            color: "var(--muted)",
            margin: 0,
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

function CommentatorCard({
  name,
  lens,
  unique,
}: {
  name: string;
  lens: string;
  unique: string;
}) {
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
          fontSize: "1rem",
          fontWeight: 500,
          color: "var(--ink)",
          marginBottom: "0.15rem",
        }}
      >
        {name}
      </div>
      <div
        className="small-caps"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "0.65rem",
          color: "var(--accent)",
          letterSpacing: "0.08em",
          marginBottom: "0.4rem",
        }}
      >
        {lens}
      </div>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "0.875rem",
          lineHeight: 1.7,
          color: "var(--muted)",
          margin: 0,
        }}
      >
        {unique}
      </p>
    </div>
  );
}
