"use client";

import { useEffect, useRef, useState } from "react";

interface Quote { price: number; percent_change_24h: number; }
interface Api {
  data: {
    COPI: { quote: { USD: Quote } };
    ETH:  { quote: { USD: Quote } };
    ADA:  { quote: { USD: Quote } };
  };
}

type Row = { symbol: "COPI" | "ETH" | "ADA"; price: number; change: number; logo: string };

export default function PriceTicker() {
  const [rows, setRows] = useState<Row[]>([]);
  const timerRef = useRef<number | null>(null);

  const load = async () => {
    try {
      const r = await fetch("/api/cmc-prices", { cache: "no-store" });
      const json: Api & { error?: string } = await r.json();
      if (json?.error) { console.error("API error:", json.error); return; }
      const d = json.data;
      setRows([
        { symbol: "COPI", price: d.COPI.quote.USD.price, change: d.COPI.quote.USD.percent_change_24h, logo: "/logos/copi.ico" },
        { symbol: "ETH",  price: d.ETH .quote.USD.price, change: d.ETH .quote.USD.percent_change_24h,  logo: "/logos/eth.svg"  },
        { symbol: "ADA",  price: d.ADA .quote.USD.price, change: d.ADA .quote.USD.percent_change_24h,  logo: "/logos/ada.svg"  },
      ]);
    } catch (e) {
      console.error("fetch prices failed", e);
    }
  };

  const start = () => { if (!timerRef.current) timerRef.current = window.setInterval(load, 5 * 60 * 1000); };
  const stop  = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

  useEffect(() => {
    load(); start();
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => { stop(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  if (rows.length === 0) return null;

  const fmt = (sym: Row["symbol"], v: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD",
      minimumFractionDigits: sym === "ETH" ? 2 : 4,
      maximumFractionDigits: sym === "ETH" ? 2 : 4,
    }).format(v);

  return (
    <div className="ticker-wrap fixed bottom-0 left-0 w-full z-50">
      {/* مسار واحد فقط */}
      <div className="marquee-track">
        {rows.map((c) => (
          <div key={c.symbol} className="ticker-item">
            <img src={c.logo} alt={c.symbol} className="w-5 h-5" />
            <span className="sym">{c.symbol}</span>
            <span className="price">{fmt(c.symbol, c.price)}</span>
            <span className={`chg ${c.change >= 0 ? "up" : "down"}`}>{c.change.toFixed(2)}%</span>
          </div>
        ))}
      </div>

      <div className="ticker-meta">
        <span className="dot" />
        <span className="label">Live</span>
      </div>
    </div>
  );
}
