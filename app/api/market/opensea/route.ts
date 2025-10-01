import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const contract = searchParams.get("contract") || undefined;
  const slug = searchParams.get("slug") || undefined;
  const debug = searchParams.get("debug") === "1";
  if (!contract && !slug) {
    return NextResponse.json({ error: "contract or slug required" }, { status: 400 });
  }

  const key = process.env.OPENSEA_API_KEY; // اختياري لكن مفيد
  const headers: Record<string, string> = { accept: "application/json" };
  if (key) headers["x-api-key"] = key;

  // نفضّل مسار الـ collection slug لأنه هو اللي كان يرجّع 404 لما استخدمنا عقد Base
  const url = slug
    ? `https://api.opensea.io/api/v2/collections/${slug}/stats`
    : `https://api.opensea.io/api/v2/chain/base/contract/${contract}/stats`;

  try {
    const r = await fetch(url, { headers, next: { revalidate: 60 } });
    const text = await r.text();
    if (!r.ok) {
      return NextResponse.json(
        { source: "opensea", floor: null, currency: "ETH", status: r.status, body: debug ? text : undefined },
        { status: 502 }
      );
    }
    const j = JSON.parse(text);

    const floor =
      j?.total?.floor_price?.value ??
      j?.stats?.floor_price ??
      j?.floor_price ??
      null;

    const currency = j?.total?.floor_price?.currency ?? "ETH";
    return NextResponse.json({ source: "opensea", floor, currency });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "fetch error" }, { status: 500 });
  }
}
