# Handoff: Dynamic study system — 37 Practices project

**For:** Claude Code (or any coding agent)  
**Repo root:** `/Users/briannuckols/37-practices-commentary`  
**User goal:** A **dynamic study system** that makes the existing transcripts and verse commentary scaffold easy to navigate, study from, and extend—not a static PDF.

---

## 1. What already exists (do not lose)

| Asset | Location | Notes |
|--------|----------|--------|
| **Root text commentary stubs** | `commentary/verses/verse-01-*.md` … `verse-37-*.md` | One file per practice; sections: Summary, Commentary, Cross-references. |
| **Scratch draft** | `commentary/00-draft.md` | |
| **Khenpo Sherab Sangpo transcripts** | `source/transcripts-playlist/` | 11 parts, `transcript-part-NN-autocaption.txt` + `part-NN-*.en.vtt`. Index: `README.md`. ~37k words. |
| **Garchen Rinpoche et al. Arizona 2020** | `source/transcripts-garchen-arizona-2020/` | 7 sessions, same naming pattern. ~118k words. Index: `README.md`. |
| **Project README** | `README.md` | Playlists, verse index, workflow. |
| **Git** | `main` | User expects versioned work. |

**Data characteristics**

- Transcripts are **flattened prose** (YouTube auto-captions, cleaned). They are **not** sentence-aligned to verse numbers; mapping verse ↔ transcript is **fuzzy** and may need search, manual tags, or LLM-assisted chunking later.
- **WebVTT** files exist if the app needs **timestamps** (jump to time in YouTube embed).

**Playlists (reference)**

- Khenpo: `https://www.youtube.com/playlist?list=PLaAW1H5vg2nHHpesQGHhUyu-l1Xa56nhf`
- Garchen 2020: `https://www.youtube.com/playlist?list=PLcvNsUJcv64gOg5Yb-g0NH3-QTmV7Gxev`

---

## 2. Suggested product direction (implementer fills in with user)

Build a **small web app or local app** that can evolve. Core ideas:

1. **Verse hub:** List 1–37; each row opens the corresponding `verse-NN-*.md` (rendered) plus links to “related transcript search” for that verse’s keywords.
2. **Transcript browser:** Pick series (Khenpo / Garchen), pick part, render text with **search** (and optional regex). Highlight matches.
3. **YouTube integration:** From a part, open the correct playlist video URL (IDs are in each folder’s `README.md` or derivable from filenames / headers inside `transcript-part-NN-autocaption.txt`).
4. **User progress (dynamic):** Persist per-verse status (e.g. not started / reading / reviewed) and last session—localStorage, SQLite, or a simple JSON file in the repo (user preference).
5. **Optional later:** Spaced repetition of short prompts; flashcards from user’s own notes in `commentary/verses/`; RAG over transcripts (user’s API keys).

**Non-goals for v1:** Perfect automatic alignment of every verse to transcript timestamps without human review.

---

## 3. Technical constraints (confirm with user)

- **Stack:** Open—Next.js, Astro, SvelteKit, or plain Vite+React are all fine. Prefer **static-friendly** if hosting is GitHub Pages.
- **Where it runs:** Likely **local-first** (localhost) with optional deploy.
- **Markdown:** Treat `commentary/verses/*.md` as **source of truth**; app can read from disk at dev time or copy at build time.

---

## 4. Implementation milestones (suggested)

**M1 — Shell**

- New `app/` or `web/` subfolder with README; `npm`/`pnpm` scripts; load verse list from filesystem or a generated `manifest.json`.

**M2 — Read routes**

- Route `/verses` and `/verses/:n` rendering markdown (e.g. `react-markdown` or MDX).
- Route `/transcripts/:series/:part` loading the right `.txt` file.

**M3 — Search**

- Client-side full-text search across one series or both (consider `flexsearch` or `minisearch` for large Garchen files).

**M4 — Progress**

- Simple persisted model: `{ verse: number, status: string, updatedAt: string }[]`.

**M5 — Polish**

- Deep link to YouTube with `t=` if you parse VTT or add a manual `timestamps.json` per part later.

---

## 5. Open questions for the user (agent should ask once)

1. Deploy publicly or **offline/local only**?
2. Prefer **single-page** tool or **multi-route** site?
3. Should user notes stay **only in markdown files** or also in a **database**?
4. Any **accessibility** or **mobile** priority?

---

## 6. Success criteria

- A student can open the study system, pick **verse 12**, read the stub (and later their notes), jump to **transcript search** for “exchange” / “self and others,” and open the **right video** without hunting paths manually.
- No duplication of the canonical transcript files; **link or read** from `source/…`.

---

## 7. First commands for the agent

```bash
cd /Users/briannuckols/37-practices-commentary
git status
ls -la source/transcripts-playlist commentary/verses
```

Read `README.md` and both `source/*/README.md` index files, then scaffold the app per section 4.

---

*Generated for handoff; adjust scope with the user before large refactors.*
