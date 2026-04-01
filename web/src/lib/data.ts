import manifest from "@/data/manifest.json";

export interface Verse {
  number: number;
  slug: string;
  file: string;
  title: string;
  rootText: string;
  group: string;
  theme: string;
  content: string;
}

export interface TranscriptCue {
  time: number;
  text: string;
}

export interface TranscriptPart {
  part: number;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  wordCount: number;
  file: string;
  content: string;
  cues: TranscriptCue[];
}

export interface TranscriptSeries {
  id: string;
  label: string;
  parts: TranscriptPart[];
}

export function getVerses(): Verse[] {
  return manifest.verses;
}

export function getVerse(n: number): Verse | undefined {
  return manifest.verses.find((v: Verse) => v.number === n);
}

export function getSeries(): TranscriptSeries[] {
  return manifest.series;
}

export function getSeriesById(id: string): TranscriptSeries | undefined {
  return manifest.series.find((s: TranscriptSeries) => s.id === id);
}

export function getTranscriptPart(
  seriesId: string,
  partNum: number
): { series: TranscriptSeries; part: TranscriptPart } | undefined {
  const series = getSeriesById(seriesId);
  if (!series) return undefined;
  const part = series.parts.find((p: TranscriptPart) => p.part === partNum);
  if (!part) return undefined;
  return { series, part };
}

export const GROUP_COLORS: Record<string, string> = {
  Foundation: "var(--group-foundation)",
  Bodhicitta: "var(--group-bodhicitta)",
  "Adversity Training": "var(--group-adversity)",
  "Working with Mind": "var(--group-mind)",
  Emptiness: "var(--group-emptiness)",
  "Six Perfections": "var(--group-paramitas)",
  "Daily Vigilance": "var(--group-vigilance)",
};
