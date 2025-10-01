"use client";

import { useState } from "react";
import { NETWORK_ICONS } from "@/lib/icons";
type Props = {
  locale: "ar" | "en";
  network: "Cardano" | "Base";
  label: string;
  value: string;
};

const EXPLORER = {
  Base: (addr: string) => `https://basescan.org/address/${addr}`,
  Cardano: (pid: string) => `https://cexplorer.io/policy/${pid}`,
};

function short(v: string, left = 12, right = 6) {
  if (!v) return "";
  return v.length > left + right + 1 ? `${v.slice(0, left)}…${v.slice(-right)}` : v;
}

export default function AddressField({ locale, network, label, value }: Props) {
  const [revealed, setRevealed] = useState(false);
  const explorer = network === "Base" ? EXPLORER.Base(value) : EXPLORER.Cardano(value);
  const copyLabel = locale === "ar" ? "نسخ" : "Copy";
  const showLabel = revealed ? (locale === "ar" ? "إخفاء" : "Hide") : (locale === "ar" ? "إظهار" : "Show");
  const viewLabel = locale === "ar" ? "عرض على المستكشف" : "View on explorer";

  return (
    <div className="flex items-center flex-wrap gap-2">
      <span className="inline-flex items-center gap-2 text-sm text-gray-200">
        <img
  src={NETWORK_ICONS[network]}
  alt={network}
  width={24}   // 👈 حجم أكبر
  height={24}
  className="opacity-90"
/>
        <b>{label}</b>
      </span>

      <code className="px-2 py-1 rounded-md bg-black/40 border border-border/60 text-gray-200">
        {revealed ? value : short(value)}
      </code>

      <button
        type="button"
        className="text-xs px-2 py-1 rounded-md border border-border/60 hover:border-yellow-400/60 text-gray-300 hover:text-yellow-200 transition"
        onClick={() => navigator.clipboard.writeText(value)}
      >
        {copyLabel}
      </button>

      <button
        type="button"
        className="text-xs px-2 py-1 rounded-md border border-border/60 hover:border-yellow-400/60 text-gray-300 hover:text-yellow-200 transition"
        onClick={() => setRevealed((s) => !s)}
      >
        {showLabel}
      </button>

      <a
        href={explorer}
        target="_blank"
        className="text-xs px-2 py-1 rounded-md border border-border/60 hover:border-yellow-400/60 text-gray-300 hover:text-yellow-200 transition"
      >
        {viewLabel}
      </a>
    </div>
  );
}
