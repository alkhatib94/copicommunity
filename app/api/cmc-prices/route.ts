import { NextResponse } from "next/server";

const CACHE_TTL_MS = 5 * 60 * 1000; // خمس دقايق
let lastJSON: any = null;
let lastAt = 0;
let inflight: Promise<any> | null = null;

async function fetchCMC() {
  const r = await fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=COPI,ETH,ADA&convert=USD",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY || "",
        Accept: "application/json",
      },
      // IMPORTANT: لا تستخدم no-store هنا لأننا نعمل كاش بأنفسنا
      cache: "no-store",
    }
  );

  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`CMC error ${r.status}: ${txt}`);
  }
  return r.json();
}

export async function GET() {
  const now = Date.now();

  // استخدم الكاش إن كان جديد (≤5 دقائق)
  if (lastJSON && now - lastAt < CACHE_TTL_MS) {
    const res = NextResponse.json({ source: "cache", ...lastJSON });
    res.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res;
  }

  // دمج الطلبات المتوازية في طلب واحد
  if (!inflight) {
    inflight = fetchCMC()
      .then((data) => {
        lastJSON = {
          updatedAt: now,
          data: {
            COPI: data.data.COPI,
            ETH: data.data.ETH,
            ADA: data.data.ADA,
          },
        };
        lastAt = now;
        return lastJSON;
      })
      .catch((e) => {
        // عند الفشل: أعِد الكاش القديم إن وُجد
        const fallback = lastJSON
          ? lastJSON
          : {
              updatedAt: now,
              data: {
                COPI: { quote: { USD: { price: 0.02, percent_change_24h: 0.5 } } },
                ETH: { quote: { USD: { price: 3500, percent_change_24h: -1.2 } } },
                ADA: { quote: { USD: { price: 0.45, percent_change_24h: 0.8 } } },
              },
              error: e.message || "fetch failed",
            };
        return fallback;
      })
      .finally(() => {
        inflight = null;
      });
  }

  const json = await inflight;
  const res = NextResponse.json({ source: "api", ...json });
  res.headers.set("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
  return res;
}
