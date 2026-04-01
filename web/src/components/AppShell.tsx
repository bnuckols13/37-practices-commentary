"use client";

import { useState, useEffect } from "react";
import MinimalNav from "./MinimalNav";
import CmdKModal from "./CmdKModal";

interface CorpusItem {
  id: string;
  type: "verse" | "transcript";
  title: string;
  href: string;
  preview: string;
}

interface Corpus {
  verses: CorpusItem[];
  transcripts: CorpusItem[];
}

interface Props {
  children: React.ReactNode;
  corpus: Corpus;
}

export default function AppShell({ children, corpus }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {children}
      <MinimalNav onSearchOpen={() => setSearchOpen(true)} />
      <CmdKModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        corpus={corpus}
      />
    </>
  );
}
