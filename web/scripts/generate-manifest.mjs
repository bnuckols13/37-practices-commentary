#!/usr/bin/env node
// Reads the commentary/verses/ and source/transcripts-*/ dirs
// and produces a single manifest.json the Next.js app uses at build time.
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const OUT = path.resolve(import.meta.dirname, "../src/data");

fs.mkdirSync(OUT, { recursive: true });

// ── 1. Verse stubs ──────────────────────────────────────────────────────────
const versesDir = path.join(ROOT, "commentary/verses");
const verseFiles = fs
  .readdirSync(versesDir)
  .filter((f) => f.startsWith("verse-") && f.endsWith(".md"))
  .sort();

const ROOT_TEXT = {
  1: "At this time when the difficult-to-gain ship of leisure and fortune has been obtained, ceaselessly hearing, pondering and meditating day and night in order to liberate others and oneself from the ocean of cyclic existence is the bodhisattvas' practice.",
  2: "[The mind of] attachment to loved ones wavers like water. [The mind of] hatred of enemies burns like fire. [The mind of] ignorance that forgets what to adopt and what to discard is greatly obscured. Abandoning one's fatherland is the bodhisattvas' practice.",
  3: "When harmful places are abandoned, disturbing emotions gradually diminish. Being without distraction, virtuous endeavors naturally increase. Being clear-minded, certainty in the Dharma arises. Resorting to secluded places is the bodhisattvas' practice.",
  4: "Long-associated companions will part from each other. Wealth and possessions obtained with effort will be left behind. Consciousness, the guest, will cast aside the guesthouse of the body. Letting go of this life is the bodhisattvas' practice.",
  5: "When [evil companions] are associated with, the three poisons increase, the activities of listening, pondering and meditation decline, and love and compassion are extinguished. Abandoning evil companions is the bodhisattvas' practice.",
  6: "When [sublime spiritual friends] are relied upon, one's faults are exhausted and one's qualities increase like the waxing moon. Cherishing sublime spiritual friends even more than one's own body is the bodhisattvas' practice.",
  7: "What worldly god, himself also bound in the prison of cyclic existence, is able to protect others? Therefore, when refuge is sought, taking refuge in the undeceiving Triple Gem is the bodhisattvas' practice.",
  8: "The Subduer said that all the unbearable suffering of the three lower realms is the fruition of wrongdoing. Therefore, never committing negative deeds, even at peril to one's life, is the bodhisattvas' practice.",
  9: "The pleasure of the triple world, like a dewdrop on the tip of a blade of grass, is imperiled in a single moment. Striving for the supreme state of neverchanging liberation is the bodhisattvas' practice.",
  10: "When mothers who have been kind to one since beginningless time are suffering, what is the use of one's own happiness? Therefore, generating the mind of enlightenment in order to liberate limitless sentient beings is the bodhisattvas' practice.",
  11: "All suffering without exception comes from wishing for one's own happiness. The perfect buddhas arise from the altruistic mind. Therefore, completely exchanging one's own happiness for the suffering of others is the bodhisattvas' practice.",
  12: "Even if others, influenced by great desire, steal all one's wealth or have it stolen, dedicating to them one's body, possessions and virtues [accumulated in] the three times is the bodhisattvas' practice.",
  13: "Even if others cut off one's head when one is utterly blameless, taking upon oneself all their negative deeds by the power of compassion is the bodhisattvas' practice.",
  14: "Even if someone broadcasts throughout the billion worlds all sorts of offensive remarks about one, speaking in turn of that person's qualities with a loving mind is the bodhisattvas' practice.",
  15: "Even if, in the midst of a public gathering, someone exposes faults and speaks ill of one, humbly paying homage to that person, perceiving him as a spiritual friend, is the bodhisattvas' practice.",
  16: "Even if someone for whom one has cared as lovingly as his own child regards one as an enemy, to cherish that person as dearly as a mother does an ailing child is the bodhisattvas' practice.",
  17: "Even if, influenced by pride, an equal or inferior person treats one with contempt, respectfully placing him like a guru at the crown of one's head is the bodhisattvas' practice.",
  18: "Though one may have an impoverished life, always be disparaged by others, afflicted by dangerous illness and evil spirits, to be without discouragement and to take upon oneself all the misdeeds and suffering of beings is the bodhisattvas' practice.",
  19: "Though one may be famous and revered by many people or gain wealth like that of Vaishravana, having realized that worldly fortune is without essence, to be unconceited is the bodhisattvas' practice.",
  20: "If outer foes are destroyed while not subduing the enemy of one's own hatred, enemies will only increase. Therefore, subduing one's own mind with the army of love and compassion is the bodhisattvas' practice.",
  21: "However much sense pleasures are enjoyed, as [when drinking] salt water, craving still increases. Immediately abandoning whatever things give rise to clinging and attachment is the bodhisattvas' practice.",
  22: "Appearances are one's own mind. From the beginning, mind's nature is free from the extremes of elaboration. Knowing this, not to engage the mind in subject-object duality is the bodhisattvas' practice.",
  23: "When encountering pleasing sense objects, though they appear beautiful like a rainbow in summertime, not to regard them as real and to abandon clinging attachment is the bodhisattvas' practice.",
  24: "Diverse sufferings are like the death of a child in a dream. By apprehending illusory appearances as real, one becomes weary. Therefore, when encountering disagreeable circumstances, viewing them as illusory is the bodhisattvas' practice.",
  25: "If it is necessary to give away even one's body while aspiring to enlightenment, what need is there to mention external objects? Therefore, practicing generosity without hope of reciprocation or [positive] karmic results is the bodhisattvas' practice.",
  26: "If, lacking ethical conduct, one fails to achieve one's own purpose, the wish to accomplish others' purpose is laughable. Therefore, guarding ethics devoid of aspirations for worldly existence is the bodhisattvas' practice.",
  27: "To bodhisattvas who desire the wealth of virtue, all those who do harm are like a precious treasure. Therefore, cultivating patience devoid of hostility is the bodhisattvas' practice.",
  28: "Even hearers and solitary realizers, who accomplish only their own welfare, strive as if putting out a fire on their heads. Seeing this, taking up diligent effort \u2013 the source of good qualities \u2013 for the sake of all beings is the bodhisattvas' practice.",
  29: "Having understood that disturbing emotions are destroyed by insight possessed with tranquil abiding, to cultivate meditative concentration that perfectly transcends the four formless [absorptions] is the bodhisattvas' practice.",
  30: "If one lacks wisdom, it is impossible to attain perfect enlightenment through the [other] five perfections. Thus, cultivating skillful means with the wisdom that does not discriminate among the three spheres is the bodhisattvas' practice.",
  31: "If, having [merely] the appearance of a practitioner, one does not investigate one's own mistakes, it is possible to act contrary to the Dharma. Therefore, constantly examining one's own errors and abandoning them is the bodhisattvas' practice.",
  32: "If, influenced by disturbing emotions, one points out another bodhisattva's faults, oneself is diminished. Therefore, not speaking about the faults of those who have entered the Great Vehicle is the bodhisattvas' practice.",
  33: "Because the influence of gain and respect causes quarreling and the decline of the activities of listening, pondering and meditation, to abandon attachment to the households of friends, relations and benefactors is the bodhisattvas' practice.",
  34: "Because harsh words disturb others' minds and cause the bodhisattva's conduct to deteriorate, abandoning harsh speech that is unpleasant to others is the bodhisattvas' practice.",
  35: "When disturbing emotions are habituated, it is difficult to overcome them with antidotes. By arming oneself with the antidotal weapon of mindfulness, to destroy disturbing emotions such as desire the moment they first arise is the bodhisattvas' practice.",
  36: "In brief, whatever conduct one engages in, one should ask, \"What is the state of my mind?\" Accomplishing others' purpose through constantly maintaining mindfulness and awareness is the bodhisattvas' practice.",
  37: "In order to clear away the suffering of limitless beings, through the wisdom [realizing] the purity of the three spheres, to dedicate the virtue attained by making such effort for enlightenment is the bodhisattvas' practice.",
};

const THEMES = {
  1: { group: "Foundation", theme: "Precious Human Life" },
  2: { group: "Foundation", theme: "Renunciation" },
  3: { group: "Foundation", theme: "Solitude" },
  4: { group: "Foundation", theme: "Impermanence" },
  5: { group: "Foundation", theme: "Harmful Companions" },
  6: { group: "Foundation", theme: "Spiritual Friends" },
  7: { group: "Foundation", theme: "Refuge" },
  8: { group: "Foundation", theme: "Karma" },
  9: { group: "Foundation", theme: "Liberation" },
  10: { group: "Bodhicitta", theme: "Generating Awakening Mind" },
  11: { group: "Bodhicitta", theme: "Exchanging Self & Other" },
  12: { group: "Adversity Training", theme: "When Robbed" },
  13: { group: "Adversity Training", theme: "When Physically Harmed" },
  14: { group: "Adversity Training", theme: "When Slandered" },
  15: { group: "Adversity Training", theme: "When Publicly Humiliated" },
  16: { group: "Adversity Training", theme: "When Betrayed" },
  17: { group: "Adversity Training", theme: "When Treated with Contempt" },
  18: { group: "Adversity Training", theme: "In Poverty & Illness" },
  19: { group: "Working with Mind", theme: "In Fame & Wealth" },
  20: { group: "Working with Mind", theme: "Subduing Hatred" },
  21: { group: "Working with Mind", theme: "Abandoning Craving" },
  22: { group: "Emptiness", theme: "Mind's Nature" },
  23: { group: "Emptiness", theme: "Pleasant Appearances" },
  24: { group: "Emptiness", theme: "Disagreeable Circumstances" },
  25: { group: "Six Perfections", theme: "Generosity" },
  26: { group: "Six Perfections", theme: "Ethics" },
  27: { group: "Six Perfections", theme: "Patience" },
  28: { group: "Six Perfections", theme: "Diligence" },
  29: { group: "Six Perfections", theme: "Concentration" },
  30: { group: "Six Perfections", theme: "Wisdom" },
  31: { group: "Daily Vigilance", theme: "Self-Examination" },
  32: { group: "Daily Vigilance", theme: "Not Criticizing Others" },
  33: { group: "Daily Vigilance", theme: "Abandoning Attachment to Gain" },
  34: { group: "Daily Vigilance", theme: "Abandoning Harsh Speech" },
  35: { group: "Daily Vigilance", theme: "Applying Mindfulness" },
  36: { group: "Daily Vigilance", theme: "Constant Awareness" },
  37: { group: "Daily Vigilance", theme: "Dedication of Merit" },
};

const verses = verseFiles.map((f) => {
  const match = f.match(/verse-(\d+)-(.+)\.md$/);
  const num = parseInt(match[1], 10);
  const slug = match[2];
  const content = fs.readFileSync(path.join(versesDir, f), "utf-8");
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/^Verse \d+\s*[—–-]\s*/, "") : slug;
  return {
    number: num,
    slug,
    file: f,
    title,
    rootText: ROOT_TEXT[num] || "",
    group: THEMES[num]?.group || "",
    theme: THEMES[num]?.theme || "",
    content,
  };
});

// ── 2. VTT parser ──────────────────────────────────────────────────────────
function parseVTT(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const blocks = raw.split(/\n\n+/);
  const cues = [];
  const seen = new Set();

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    // Find the timestamp line
    const tsLine = lines.find((l) => /^\d{2}:\d{2}:\d{2}/.test(l));
    if (!tsLine) continue;

    const tsMatch = tsLine.match(/^(\d{2}):(\d{2}):(\d{2})\.\d+/);
    if (!tsMatch) continue;

    const seconds = parseInt(tsMatch[1]) * 3600 + parseInt(tsMatch[2]) * 60 + parseInt(tsMatch[3]);

    // Get the text lines after the timestamp (strip VTT tags)
    const textLines = lines.slice(lines.indexOf(tsLine) + 1);
    const text = textLines
      .join(" ")
      .replace(/<[^>]+>/g, "")  // strip VTT tags like <c> </c>
      .replace(/\s+/g, " ")
      .trim();

    if (!text || seen.has(text)) continue;
    seen.add(text);

    cues.push({ time: seconds, text });
  }

  // Merge cues that are very close together into ~30-second chunks
  if (cues.length === 0) return [];

  const merged = [];
  let current = { time: cues[0].time, text: cues[0].text };

  for (let i = 1; i < cues.length; i++) {
    const c = cues[i];
    if (c.time - current.time < 30) {
      current.text += " " + c.text;
    } else {
      merged.push({ time: current.time, text: current.text.replace(/\s+/g, " ").trim() });
      current = { time: c.time, text: c.text };
    }
  }
  merged.push({ time: current.time, text: current.text.replace(/\s+/g, " ").trim() });

  return merged;
}

// ── 3. Transcript series ────────────────────────────────────────────────────
function parseTranscriptSeries(dirName, label) {
  const dir = path.join(ROOT, "source", dirName);
  if (!fs.existsSync(dir)) return null;

  const readmeContent = fs.readFileSync(path.join(dir, "README.md"), "utf-8");

  // Parse video links from README table
  const rows = readmeContent.split("\n").filter((l) => l.startsWith("|") && /^\|\s*\d/.test(l));

  const parts = [];
  for (const row of rows) {
    const cells = row.split("|").map((c) => c.trim()).filter(Boolean);
    const partNum = parseInt(cells[0], 10);
    const linkMatch = cells[1]?.match(/\[(.+?)\]\((https:\/\/www\.youtube\.com\/watch\?v=([^)]+))\)/);
    const wordCount = parseInt(cells[2], 10) || 0;
    const fileMatch = cells[3]?.match(/`(.+?)`/);

    const transcriptFile = fileMatch ? fileMatch[1] : `transcript-part-${String(partNum).padStart(2, "0")}-autocaption.txt`;
    const transcriptPath = path.join(dir, transcriptFile);
    const transcriptContent = fs.existsSync(transcriptPath) ? fs.readFileSync(transcriptPath, "utf-8") : "";

    // Parse VTT for timestamped cues
    const videoId = linkMatch ? linkMatch[3] : "";
    const vttFile = fs.readdirSync(dir).find(
      (f) => f.startsWith(`part-${String(partNum).padStart(2, "0")}-`) && f.endsWith(".en.vtt")
    );
    const cues = vttFile ? parseVTT(path.join(dir, vttFile)) : [];

    parts.push({
      part: partNum,
      title: linkMatch ? linkMatch[1] : `Part ${partNum}`,
      youtubeUrl: linkMatch ? linkMatch[2] : "",
      youtubeId: videoId,
      wordCount,
      file: transcriptFile,
      content: transcriptContent,
      cues,
    });
  }

  return { id: dirName, label, parts };
}

const series = [
  parseTranscriptSeries("transcripts-playlist", "Khenpo Sherab Sangpo"),
  parseTranscriptSeries("transcripts-garchen-arizona-2020", "Garchen Rinpoche — Arizona 2020"),
].filter(Boolean);

// ── 4. Write manifest ───────────────────────────────────────────────────────
const manifest = { verses, series };

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(
  `✅ manifest.json: ${verses.length} verses, ${series.length} series (${series.map((s) => s.parts.length + " parts").join(", ")})`
);
