"use client";
import { useEffect, useState } from "react";

type Props = {
  locale: "ar" | "en";
  policyId?: string;         // Cardano
  openseaContract?: string;  // Base
  openseaSlug?: string;      // Base (مُفضّل)
  links?: { marketCardano?: string; marketBase?: string };
};

export default function MarketPrice({
  locale,
  policyId,
  openseaContract,
  openseaSlug,
  links,
}: Props) {
  // ⛔️ موقّف مؤقتًا. لتفعيل القسم غيّر المتغيّر في .env.local إلى true
  if (process.env.NEXT_PUBLIC_SHOW_MARKET_PRICE !== "true") return null;

  const [ada, setAda] = useState<number | null>(null);
  const [eth, setEth] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Cardano
      if (policyId) {
        try {
          const r = await fetch(`/api/market/cardano?policyId=${policyId}`);
          const j = await r.json();
          if (!cancelled) setAda(j.floor ?? null);
        } catch {
          if (!cancelled) setAda(null);
        }
      }

      // Base (OpenSea)
      if (openseaSlug || openseaContract) {
        const qs = openseaSlug
          ? `slug=${encodeURIComponent(openseaSlug)}`
          : `contract=${encodeURIComponent(openseaContract as string)}`;
        try {
          const r = await fetch(`/api/market/opensea?${qs}`);
          const j = await r.json();
          if (!cancelled) setEth(j.floor ?? null);
        } catch {
          if (!cancelled) setEth(null);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [policyId, openseaContract, openseaSlug]);

  const T = {
    currentPrice: { ar: "السعر الحالي", en: "Current Price" },
    cardano: { ar: "كردانو:", en: "Cardano:" },
    base: { ar: "بيز:", en: "Base:" },
    view: { ar: "عرض", en: "View" },
    dash: "-",
  } as const;

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-white">{T.currentPrice[locale]}</h3>

      <div className="flex items-center gap-2">
        <span className="w-24 opacity-80">{T.cardano[locale]}</span>
        <b>{ada != null ? `${ada} ADA` : T.dash}</b>
        {links?.marketCardano && (
          <a
            href={links.marketCardano}
            target="_blank"
            className="text-xs ms-2 px-2 py-1 rounded-md border border-border/60 hover:border-yellow-400/60 text-gray-300 hover:text-yellow-200 transition"
          >
            {T.view[locale]}
          </a>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="w-24 opacity-80">{T.base[locale]}</span>
        <b>{eth != null ? `${eth} ETH` : T.dash}</b>
        {links?.marketBase && (
          <a
            href={links.marketBase}
            target="_blank"
            className="text-xs ms-2 px-2 py-1 rounded-md border border-border/60 hover:border-yellow-400/60 text-gray-300 hover:text-yellow-200 transition"
          >
            {T.view[locale]}
          </a>
        )}
      </div>
    </div>
  );
}
