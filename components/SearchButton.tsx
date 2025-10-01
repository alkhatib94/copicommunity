"use client";
import { useEffect } from "react";

export default function SearchButton({ onOpen }: { onOpen: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen]);

  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 rounded-md border border-border bg-panel hover:bg-brand/20 text-ink px-3 py-2 transition"
      aria-label="Open search (Ctrl/⌘+K)"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49L21.49 20zM9.5 14A4.5 4.5 0 1 1 14 9.5A4.5 4.5 0 0 1 9.5 14Z"/>
      </svg>
      <span className="text-sm opacity-90">Ask or search…</span>
      <kbd className="ml-2 text-xs opacity-80 border border-border rounded px-1 py-0.5">Ctrl</kbd>
      <kbd className="text-xs opacity-80 border border-border rounded px-1 py-0.5">K</kbd>
    </button>
  );
}
