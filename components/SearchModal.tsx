"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Item = {
  id: string;
  lang: "ar" | "en";
  title: string;
  summary?: string;
  tags?: string[];
  url: string;
};

export default function SearchModal({
  open, onClose
}: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Item[]>([]);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname() || "/en";
  const isAr = pathname.startsWith("/ar");

  // تحميل الفهرس أول مرة
  useEffect(() => {
    setMounted(true);
    fetch("/search-index.json")
      .then(r => r.json())
      .then((arr: Item[]) => setData(arr))
      .catch(() => setData([]));
  }, []);

  // فوكس تلقائي
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  // إغلاق بـ ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // فلترة حسب اللغة + البحث بسيط (includes)
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const scoped = data.filter(d => d.lang === (isAr ? "ar" : "en"));
    if (!query) return scoped.slice(0, 8);
    return scoped.filter(d => {
      const hay = [d.title, d.summary, ...(d.tags || [])].join(" ").toLowerCase();
      return hay.includes(query);
    }).slice(0, 20);
  }, [q, data, isAr]);

  if (!mounted) return null;
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* خلفية */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* الصندوق */}
      <div className={`absolute left-1/2 top-20 -translate-x-1/2 w-full max-w-2xl`}>
        <div className="rounded-xl border border-border bg-panel shadow-2xl overflow-hidden">
          {/* حقل البحث */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80" aria-hidden="true">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49L21.49 20zM9.5 14A4.5 4.5 0 1 1 14 9.5A4.5 4.5 0 0 1 9.5 14Z"/>
            </svg>
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={isAr ? "ابحث..." : "Search..."}
              className="w-full bg-transparent outline-none text-ink placeholder-gray-400"
              dir={isAr ? "rtl" : "ltr"}
            />
            <kbd className="text-xs opacity-80 border border-border rounded px-1 py-0.5">Esc</kbd>
          </div>

          {/* النتائج */}
          <ul className={`${isAr ? "text-right" : "text-left"} max-h-[60vh] overflow-auto`}>
            {results.length === 0 && (
              <li className="px-4 py-3 text-gray-400">
                {isAr ? "لا توجد نتائج" : "No results"}
              </li>
            )}
            {results.map((it) => (
              <li key={it.id} className="border-b border-border/60 last:border-none">
                <Link
                  href={it.url}
                  onClick={onClose}
                  className="block px-4 py-3 hover:bg-brand/10 transition"
                >
                  <div className="font-semibold text-ink">{it.title}</div>
                  {it.summary && <div className="text-sm text-gray-400 mt-0.5 line-clamp-2">{it.summary}</div>}
                  {it.tags?.length ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {it.tags.map((t) => (
                        <span key={t} className="text-xs text-ink/90 border border-border rounded px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}
