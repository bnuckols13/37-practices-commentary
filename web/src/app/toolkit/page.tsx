import Link from "next/link";

export default function ToolkitPage() {
  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
      <div className="prose">
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            marginBottom: "1rem",
          }}
        >
          Analytical Meditation Toolkit
        </h1>
        <p style={{ color: "var(--muted)" }}>
          A systematic approach to deep study and novel discovery within the 37 Practices,
          integrating insights from six major commentators.
        </p>

        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />

        <h2>Layer 1: Single-Verse Deep Dive Protocol</h2>
        <p>For each of the 37 practices, work through these 7 angles:</p>
        <ol>
          <li>
            <strong>Literal</strong> &mdash; What does the verse actually say? What situation does it
            describe?
          </li>
          <li>
            <strong>Psychological</strong> &mdash; What mental pattern is being addressed? What
            cognitive distortion is being corrected?
          </li>
          <li>
            <strong>Relational</strong> &mdash; How does this practice change how you relate to
            others?
          </li>
          <li>
            <strong>Somatic</strong> &mdash; Where do you feel this practice in the body? What does
            the emotion it addresses feel like physically?
          </li>
          <li>
            <strong>Shadow</strong> &mdash; What part of you resists this practice? What would you
            lose by adopting it fully?
          </li>
          <li>
            <strong>Cross-commentary</strong> &mdash; How do the commentators differ on this verse?
            Use{" "}
            <Link href="/search" style={{ color: "var(--accent)" }}>
              search
            </Link>{" "}
            to find each teacher&apos;s take.
          </li>
          <li>
            <strong>Novel application</strong> &mdash; Where does this practice apply in your life
            right now in a way no commentator has described?
          </li>
        </ol>

        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />

        <h2>Layer 2: Structural Analysis Meditations</h2>
        <p>These are meditations on the <em>relationships between</em> practices:</p>

        <h3>
          The Escalation Sequence (
          <Link href="/verses?group=Adversity+Training" style={{ color: "var(--accent)" }}>
            Practices 12&ndash;18
          </Link>
          )
        </h3>
        <p>
          Each verse presents a worse situation than the last. Meditate on: what is the pattern? Why
          this order? What breaks in you as you move from &ldquo;robbed&rdquo; to
          &ldquo;beheaded&rdquo; to &ldquo;slandered&rdquo; to &ldquo;betrayed by your own
          child&rdquo;?
        </p>

        <h3>
          The Twin Dangers (
          <Link href="/verses/18" style={{ color: "var(--accent)" }}>
            18
          </Link>{" "}
          &amp;{" "}
          <Link href="/verses/19" style={{ color: "var(--accent)" }}>
            19
          </Link>
          )
        </h3>
        <p>
          Poverty/despair and fame/wealth are presented as equally dangerous. Meditate on: which is
          YOUR greater danger? Which would actually destroy your practice faster?
        </p>

        <h3>
          The Bridge Verse (
          <Link href="/verses/21" style={{ color: "var(--accent)" }}>
            Practice 21
          </Link>
          )
        </h3>
        <p>
          Salt water. This is the last &ldquo;relative&rdquo; practice before emptiness teachings
          begin. Why does Tokme Zangpo place craving here, as the gateway to emptiness? What does
          craving have to do with the nature of mind?
        </p>

        <h3>
          The Paramita Sequence (
          <Link href="/verses?group=Six+Perfections" style={{ color: "var(--accent)" }}>
            Practices 25&ndash;30
          </Link>
          )
        </h3>
        <p>
          Why does he say generosity requires giving &ldquo;without hope of karmic results&rdquo;?
          This is radical &mdash; it negates even spiritual materialism.
        </p>

        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />

        <h2>Layer 3: Cross-Commentary Inquiry Questions</h2>
        <p>Questions designed to generate novel insight by holding multiple commentators in tension:</p>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <InquiryCard number={1}>
          <Link href="/verses/11" style={{ color: "var(--accent)" }}>Practice 11</Link> says all
          suffering comes from self-cherishing.{" "}
          <Link href="/verses/22" style={{ color: "var(--accent)" }}>Practice 22</Link> says
          appearances are your own mind. If both are true simultaneously, what does that imply about
          the nature of suffering itself?
        </InquiryCard>

        <InquiryCard number={2}>
          The Dalai Lama says &ldquo;un-seeing is the supreme seeing.&rdquo; How does this relate to{" "}
          <Link href="/verses/36" style={{ color: "var(--accent)" }}>practice 36</Link>&apos;s
          instruction to constantly ask &ldquo;what is the state of my mind?&rdquo; Can you ask
          about your mind&apos;s state while in a state of un-seeing?
        </InquiryCard>

        <InquiryCard number={3}>
          Garchen Rinpoche says your job is bodhisattva practice. Tokme Zangpo wrote this in a cave.
          Is there a practice that genuinely cannot be done outside retreat? Or is the entire path
          available in daily life?
        </InquiryCard>

        <InquiryCard number={4}>
          Berzin distinguishes 4 types of desire: clinging, attachment, desire, craving. Take a
          single object of desire in your life and analyze: which of the four is actually operating?
          Does this distinction change your relationship to it?
        </InquiryCard>

        <InquiryCard number={5}>
          <Link href="/verses/20" style={{ color: "var(--accent)" }}>Practice 20</Link> says
          &ldquo;subduing one&apos;s own mind with the army of love and compassion.&rdquo; Army is a
          violent metaphor applied to non-violence. What does it mean to wage war on hatred using
          love as a weapon? Is there aggression in compassion?
        </InquiryCard>

        <InquiryCard number={6}>
          Dilgo Khyentse says suffering is &ldquo;medicine for arrogance.&rdquo; The Dalai Lama says
          &ldquo;happiness eats the fruit of our past merit.&rdquo; If happiness depletes merit and
          suffering builds it, what is the actual relationship between happiness and spiritual
          progress?
        </InquiryCard>

        <InquiryCard number={7}>
          Ringu Tulku says words don&apos;t inherently harm &mdash; interpretation does. But{" "}
          <Link href="/verses/34" style={{ color: "var(--accent)" }}>practice 34</Link> says abandon
          harsh speech. If the harm is in the listener&apos;s interpretation, why is the speaker
          responsible?
        </InquiryCard>
      </div>

      <div className="prose" style={{ marginTop: "2rem" }}>
        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />
        <h2>Layer 4: The 7-Day Intensive Cycle</h2>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <DayCard day={1} title="Foundation" practices="1-9">
          Read all nine. Journal: What am I taking for granted about this human life? Where am I
          wasting it?
        </DayCard>
        <DayCard day={2} title="The Heart Turn" practices="10-11">
          Do tonglen meditation. Breathe in suffering, breathe out happiness. Journal: What happened
          in your body? What resisted?
        </DayCard>
        <DayCard day={3} title="The Gauntlet" practices="12-18">
          Read all seven adversity practices. Pick the one you find most impossible. Sit with it for
          30 minutes. Journal: Why that one? What does your resistance reveal?
        </DayCard>
        <DayCard day={4} title="The Mirror" practices="19-20">
          Examine your relationship to praise and blame. Journal: When did praise last make you
          forget yourself? When did criticism last teach you something true?
        </DayCard>
        <DayCard day={5} title="Emptiness" practices="21-24">
          Read the Dalai Lama&apos;s commentary on practice 22 slowly. Attempt the &ldquo;space-like
          meditation&rdquo; he describes. Journal: What collapsed? What was left?
        </DayCard>
        <DayCard day={6} title="The Six Perfections" practices="25-30">
          For each paramita, identify one concrete action you can take today. Do them. Journal: Which
          felt natural? Which felt forced?
        </DayCard>
        <DayCard day={7} title="Vigilance &amp; Dedication" practices="31-37">
          Spend the day with practice 36 as your anchor: &ldquo;What is the state of my mind?&rdquo;
          Check in every hour. Journal: What patterns did you catch?
        </DayCard>
      </div>

      <div className="prose" style={{ marginTop: "2rem" }}>
        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />
        <h2>Layer 5: The Novel Discovery Engine</h2>
        <p>To generate genuinely new insights that can help others:</p>
        <ol>
          <li>
            <strong>Comparative tension:</strong> Find two practices that seem to contradict each
            other. Sit with the contradiction until a third perspective emerges that holds both.
          </li>
          <li>
            <strong>Modern application mapping:</strong> What is the 2026 version of each situation?
            (e.g., Practice 14 about slander &mdash; what about social media? Practice 2 about homeland
            &mdash; what about digital spaces you&apos;re attached to?)
          </li>
          <li>
            <strong>Cross-tradition bridges:</strong> How does each practice relate to concepts in
            other traditions? (e.g., Practice 11&apos;s exchange and relational psychotherapy&apos;s
            intersubjectivity)
          </li>
          <li>
            <strong>The body test:</strong> Which practices produce physical sensation when you read
            them? The body&apos;s response often reveals where the deepest work lies.
          </li>
          <li>
            <strong>The reversal test:</strong> What would the OPPOSITE of each practice look like?
            Sometimes seeing the anti-practice clarifies what the practice is really asking.
          </li>
        </ol>

        <hr style={{ borderColor: "var(--border-hairline)", margin: "2rem 0" }} />
        <h2>Six Commentators, Six Lenses</h2>
        <p>Each commentator brings a distinct interpretive framework:</p>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <CommentatorCard
          name="HH Dalai Lama"
          lens="Compassion-as-practice"
          unique="Personal stories, humor, radical accessibility. Teaching: even the very old should not lose heart."
        />
        <CommentatorCard
          name="HE Garchen Rinpoche"
          lens="Work-as-path"
          unique="Your job IS bodhisattva practice if motivation is right. Karma as debt repayment. Mandala offering for ego-reduction."
        />
        <CommentatorCard
          name="Alexander Berzin"
          lens="Analytical precision"
          unique="4 types of desire distinguished. Paramitas as mental states not external acts. Two-phase voidness meditation."
        />
        <CommentatorCard
          name="Dilgo Khyentse Rinpoche"
          lens="Vajrayana integration"
          unique="Self-cherishing as THE root of samsara. Suffering as medicine for arrogance. Tonglen with vivid heart-light imagery."
        />
        <CommentatorCard
          name="Thubten Chodron"
          lens="Cognitive therapy"
          unique="Mind-training as questioning thought patterns. First-person transformation narratives from Western students."
        />
        <CommentatorCard
          name="Ringu Tulku"
          lens="Response over event"
          unique="Words don't inherently harm — interpretation does. Three dimensions of solitude. Emptiness strengthens commitment."
        />
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
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.4rem" }}>
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
