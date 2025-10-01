"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import { listByCategory, type Category } from "@/lib/nfts";
import { catLabel, CATEGORY_SLUGS, type Locale } from "@/lib/i18n";

const T = {
  title: { ar: "الفئة", en: "Category" },
  allCats: { ar: "كل الفئات", en: "All Categories" },
  filters: { ar: "تصفية حسب الشبكة", en: "Filter by network" },
  networks: { ar: "الشبكات", en: "Networks" },
  details: { ar: "عرض التفاصيل", en: "View details" },
  empty: { ar: "لا توجد عناصر مطابقة.", en: "No matching items." },
  badgeAll: { ar: "الكل", en: "All" },
  totalSupply: { ar: "الكمية الكلية", en: "Total Supply" },
  rarities: { ar: "الندرة", en: "Rarities" },
  categories: { ar: "التصنيفات", en: "Categories" },
  searchPlaceholder: { ar: "ابحث بالاسم…", en: "Search by name…" },
} as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatNumber(n: number, locale: Locale) {
  try {
    return new Intl.NumberFormat(locale).format(n);
  } catch {
    return String(n);
  }
}

const rarityColor: Record<string, string> = {
  common: "bg-gray-700/50 text-gray-100 border-gray-600/50",
  uncommon: "bg-emerald-700/50 text-emerald-100 border-emerald-600/50",
  rare: "bg-indigo-700/50 text-indigo-100 border-indigo-600/50",
  legendary: "bg-yellow-700/50 text-yellow-100 border-yellow-600/50",
  mythic: "bg-pink-700/50 text-pink-100 border-pink-600/50",
};

function NetworkBadge({ net }: { net: "Cardano" | "Base" }) {
  const isBase = net === "Base";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border",
        isBase
          ? "border-blue-400/40 bg-blue-500/10 text-blue-200"
          : "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
      )}
      title={net}
      aria-label={net}
    >
      <span className={cx("inline-block w-2 h-2 rounded-full", isBase ? "bg-blue-400" : "bg-emerald-400")} />
      {net}
    </span>
  );
}

function RarityChip({
  tier,
  label,
  percent,
  total,
  image,
  locale,
}: {
  tier: string;
  label?: string;
  percent?: number;
  total?: number;
  image?: string;
  locale: Locale;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 px-2 py-1 rounded-full border text-[11px]",
        rarityColor[tier] || "bg-gray-700/50 text-gray-100 border-gray-600/50"
      )}
      title={label || tier}
    >
      {image ? (
        <Image
          src={image}
          alt={label || tier}
          width={16}
          height={16}
          className="rounded-sm object-cover"
        />
      ) : (
        <span className="inline-block w-3 h-3 rounded-full bg-white/40" />
      )}
      <span className="capitalize">{label || tier}</span>
      {typeof percent === "number" && <span className="opacity-80">• {percent}%</span>}
      {typeof total === "number" && <span className="opacity-80">• {formatNumber(total, locale)}</span>}
    </span>
  );
}

export default function CategoryPage({
  params,
}: {
  params: { locale: Locale; category: string };
}) {
  const { locale } = params;
  const category = params.category as Category;
  if (!CATEGORY_SLUGS.includes(category as any)) return notFound();

  const dir: "rtl" | "ltr" = locale === "ar" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";
  const sp = useSearchParams();

  const catTitle = catLabel(category, locale);

  const net = sp.get("net"); // "cardano" | "base" | null
  const q = (sp.get("q") || "").trim().toLowerCase();

  let items = listByCategory(category);
  if (net === "cardano") items = items.filter((i) => i.networks.includes("Cardano"));
  if (net === "base") items = items.filter((i) => i.networks.includes("Base"));
  if (q) {
    items = items.filter((i) => {
      const ar = (i.name.ar || "").toLowerCase();
      const en = (i.name.en || "").toLowerCase();
      return ar.includes(q) || en.includes(q);
    });
  }

  const counts = CATEGORY_SLUGS.reduce<Record<Category, number>>((acc, c) => {
    acc[c as Category] = listByCategory(c as Category).length;
    return acc;
  }, {} as Record<Category, number>);

  const withLocale = (href: string) => `/${locale}${href}`;

  const buildHref = (
    base: string,
    overrides?: { net?: string | null; q?: string | null }
  ) => {
    const p = new URLSearchParams();
    const netVal = overrides?.net === undefined ? net : overrides.net;
    const qVal = overrides?.q === undefined ? q : (overrides.q || "");
    if (netVal) p.set("net", netVal);
    if (qVal) p.set("q", qVal);
    const s = p.toString();
    return s ? `${base}?${s}` : base;
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8" dir={dir}>
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className={isRTL ? "text-right" : "text-left"}>
          <div className="text-sm text-gray-400">
            <Link href={withLocale("/nfts")} className="hover:underline">
              {T.allCats[locale]}
            </Link>{" "}
            / <span className="capitalize">{catTitle}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 mt-1">
            {T.title[locale]} - {catTitle}
          </h1>
        </div>

        {/* محوّل اللغة اليدوي (AR/EN) — مُعلّق حسب طلبك */}
        {/*
        <div className="flex items-center gap-2">
          <Link
            href={buildHref(`/ar/nfts/${category}`)}
            className={cx(
              "px-3 py-1 rounded-md border",
              locale === "ar" ? "border-yellow-400 text-yellow-300" : "border-border text-gray-300 hover:text-white"
            )}
            aria-label="Arabic"
          >
            AR
          </Link>
          <Link
            href={buildHref(`/en/nfts/${category}`)}
            className={cx(
              "px-3 py-1 rounded-md border",
              locale === "en" ? "border-yellow-400 text-yellow-300" : "border-border text-gray-300 hover:text-white"
            )}
            aria-label="English"
          >
            EN
          </Link>
        </div>
        */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ===== Sidebar ===== */}
        <aside className="md:col-span-3">
          <div className="rounded-2xl border border-border/60 bg-black/30 p-4 mb-4">
            <h3 className="text-base font-semibold mb-3">{T.categories[locale]}</h3>
            <nav className="flex flex-col gap-2">
              {CATEGORY_SLUGS.map((c) => {
                const active = c === category;
                return (
                  <Link
                    key={c}
                    href={buildHref(withLocale(`/nfts/${c}`))}
                    className={cx(
                      "flex items-center justify-between px-3 py-2 rounded-lg border transition",
                      active
                        ? "border-yellow-400/70 bg-yellow-500/10 text-yellow-200"
                        : "border-border/50 text-gray-300 hover:bg-white/5 hover:text-white"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span>{catLabel(c, locale)}</span>
                    <span className="text-xs opacity-70">{counts[c as Category]}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="rounded-2xl border border-border/60 bg-black/30 p-4 space-y-3">
            <h3 className="text-base font-semibold">{T.filters[locale]}</h3>

            {/* البحث */}
            <form action={withLocale(`/nfts/${category}`)} className="flex">
              {net && <input type="hidden" name="net" value={net} />}
              <input
                name="q"
                defaultValue={q}
                placeholder={T.searchPlaceholder[locale]}
                className="flex-1 rounded-l-md border border-border/60 bg-black/40 px-3 py-2 text-sm text-gray-100 outline-none focus:ring-1 focus:ring-yellow-500/60"
                aria-label="Search"
              />
              <button
                type="submit"
                className="rounded-r-md border border-l-0 border-border/60 bg-black/40 px-3 text-sm text-gray-200 hover:text-yellow-300"
                aria-label="Search"
              >
                🔎
              </button>
            </form>

            {/* فلاتر الشبكات */}
            <div className="flex flex-wrap gap-2">
              <Link
                href={buildHref(withLocale(`/nfts/${category}`), { net: null })}
                className={cx(
                  "text-xs px-3 py-1 rounded-full border",
                  !net ? "border-yellow-400/70 text-yellow-200" : "border-border/50 text-gray-300 hover:text-white"
                )}
              >
                {T.badgeAll[locale]}
              </Link>
              <Link
                href={buildHref(withLocale(`/nfts/${category}`), { net: "cardano" })}
                className={cx(
                  "text-xs px-3 py-1 rounded-full border",
                  net === "cardano" ? "border-yellow-400/70 text-yellow-200" : "border-border/50 text-gray-300 hover:text-white"
                )}
              >
                Cardano
              </Link>
              <Link
                href={buildHref(withLocale(`/nfts/${category}`), { net: "base" })}
                className={cx(
                  "text-xs px-3 py-1 rounded-full border",
                  net === "base" ? "border-yellow-400/70 text-yellow-200" : "border-border/50 text-gray-300 hover:text-white"
                )}
              >
                Base
              </Link>
            </div>
          </div>
        </aside>

        {/* ===== Grid ===== */}
        <main className="md:col-span-9">
          {items.length === 0 ? (
            <div className="rounded-xl border border-border/60 bg-black/30 p-6 text-center text-gray-300">
              {T.empty[locale]}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {items.map((nft) => {
                const rarities = nft.rarities?.slice(0, 3) ?? [];
                const arrow = locale === "ar" ? "←" : "→";
                return (
                  <Link
                    key={nft.slug}
                    href={withLocale(`/nfts/${nft.category}/${nft.slug}`)}
                    className="group rounded-2xl overflow-hidden border border-border/60 bg-black/30 hover:border-yellow-400/60 transition focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    aria-label={`${nft.name[locale] ?? nft.name.en} – ${T.details[locale]}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-black/40">
                      <Image
                        src={nft.image}
                        alt={nft.name.en}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-base md:text-lg font-semibold text-white">
                          {nft.name[locale] ?? nft.name.en}
                        </h4>
                        <span className="text-xs text-gray-400">
                          {catLabel(nft.category, locale)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-400">{T.networks[locale]}:</span>
                        {nft.networks.map((n) => (
                          <NetworkBadge key={n} net={n} />
                        ))}
                      </div>

                      {typeof nft.totalSupply === "number" && (
                        <div className="text-xs text-gray-300">
                          <span className="opacity-70">{T.totalSupply[locale]}: </span>
                          <span className="font-medium text-gray-100">
                            {formatNumber(nft.totalSupply, locale)}
                          </span>
                        </div>
                      )}

                      {rarities.length > 0 && (
                        <div className="mt-1 flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-400">{T.rarities[locale]}:</span>
                          {rarities.map((r, idx) => (
                            <RarityChip
                              key={`${r.tier}-${idx}`}
                              tier={r.tier}
                              label={r.label}
                              percent={r.percent}
                              total={r.total}
                              image={r.image}
                              locale={locale}
                            />
                          ))}
                          {nft.rarities && nft.rarities.length > 3 && (
                            <span className="text-[11px] text-gray-400">+{nft.rarities.length - 3}</span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        {T.details[locale]}{" "}
                        <span className="text-yellow-300 group-hover:translate-x-0.5 transition">{arrow}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
