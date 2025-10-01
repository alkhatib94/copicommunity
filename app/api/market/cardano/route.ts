// app/api/market/cardano/route.ts
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

/**
 * GET /api/market/cardano?policyId=...&debug=1
 *
 * يعتمد على Maestro لإحضار floor (إن توفر)،
 * ويحسب total supply عبر paginate على policy (باستخدام Maestro أيضاً).
 *
 * البيئة المطلوبة:
 *  - MAESTRO_API_KEY=xxxx
 *  - MAESTRO_NETWORK=mainnet  (أو preprod حسب شبكتك)
 *  - اختياري: MAESTRO_BASE=https://api.gomaestro.org  (لو اختلف الدومين)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const policyId = searchParams.get("policyId");
  const debug = searchParams.get("debug") === "1";

  if (!policyId) {
    return NextResponse.json({ error: "policyId required" }, { status: 400 });
  }

  const API_KEY = process.env.MAESTRO_API_KEY;
  const NETWORK = process.env.MAESTRO_NETWORK || "mainnet";
  const BASE = process.env.MAESTRO_BASE || "https://api.gomaestro.org";

  if (!API_KEY) {
    return NextResponse.json(
      { error: "Missing MAESTRO_API_KEY" },
      { status: 500 }
    );
  }

  const headers: Record<string, string> = {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`, // Maestro يستخدم Bearer token
  };

  // ============ 1) احسب total supply عبر paginate ============
  // ملاحظة: المسار أدناه شائع لدى Maestro لجلب أصول تحت policy.
  // إن كان مشروعك على preprod، غير NETWORK لـ "preprod".
  async function fetchTotalSupply(): Promise<number | null> {
    try {
      let page = 1;
      const count = 100;
      let total = 0;

      while (true) {
        const url = `${BASE}/v1/${NETWORK}/nft/policy/${policyId}/assets?page=${page}&count=${count}`;
        const r = await fetch(url, { headers, next: { revalidate: 300 } });
        const txt = await r.text();
        if (!r.ok) {
          // لو فشل endpoint هذا، نرجع null (مش أساسي للفلوور)
          // وضع debug يرجّع البودي لمساعدتك على ضبط الـ endpoint إن لزم
          if (debug) console.error("supply error:", r.status, txt);
          return null;
        }
        const arr = JSON.parse(txt);
        if (!Array.isArray(arr)) return null;

        total += arr.length;
        if (arr.length < count) break; // انتهت الصفحات
        page += 1;
        if (page > 200) break; // حمايوي
      }
      return total;
    } catch (e) {
      if (debug) console.error("supply exception:", e);
      return null;
    }
  }

  // ============ 2) جيب floor من Maestro ============
  // نجرّب أكثر من مسار شائع (تختلف بحسب إصدار/خطة Maestro).
  // أول مسار: إحصاءات مجموعة (collection) عبر policy:
  const floorCandidates: string[] = [
    // مثال شائع: إحصاءات مجموعة NFT (قد ترجّع { total: { floor_price: { value, currency } } })
    `${BASE}/v1/${NETWORK}/market/nft/collections/${policyId}/stats`,

    // بدائل محتملة لدى بعض الإعدادات/الإصدارات:
    `${BASE}/v1/${NETWORK}/nft/collections/${policyId}/stats`,
    `${BASE}/v1/${NETWORK}/nft/policy/${policyId}/stats`,
  ];

  async function fetchFloor(): Promise<{ floor: number | null; currency: string }>{
    for (const url of floorCandidates) {
      try {
        const r = await fetch(url, { headers, next: { revalidate: 60 } });
        const txt = await r.text();
        if (!r.ok) {
          if (debug) console.warn("floor endpoint failed:", url, r.status, txt);
          continue;
        }
        const j = JSON.parse(txt);

        // نحاول نكتشف الحقول الأكثر شيوعًا
        const floor =
          j?.total?.floor_price?.value ??
          j?.stats?.floor_price ??
          j?.floor_price ??
          null;

        const currency =
          j?.total?.floor_price?.currency ??
          j?.stats?.currency ??
          "ADA";

        if (floor != null) {
          return { floor: typeof floor === "number" ? floor : Number(floor), currency };
        }
      } catch (e) {
        if (debug) console.warn("floor endpoint exception:", url, e);
        continue;
      }
    }
    return { floor: null, currency: "ADA" };
  }

  // نفذ الطلبيتين بالتوازي لسرعة أفضل
  const [supply, floorObj] = await Promise.all([fetchTotalSupply(), fetchFloor()]);

  return NextResponse.json({
    source: "maestro",
    currency: floorObj.currency,
    floor: floorObj.floor,          // ممكن ترجع null إذا ما توفرت لدى خطتك/المسار
    supply: supply ?? undefined,    // نرجّع undefined لو فشلنا بحسابها
  });
}
