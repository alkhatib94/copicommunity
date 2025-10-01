import { notFound } from "next/navigation";
import Link from "next/link";
import MarketPrice from "@/components/MarketPrice";
import AddressField from "@/components/AddressField";
import { getNFTBySlug, type Category } from "@/lib/nfts";
import { NETWORK_ICONS } from "@/lib/icons";
import { catLabel } from "@/lib/i18n"; // ✅ جديد

type Locale = "ar" | "en";

const T = {
  collection: { ar: "المجموعة", en: "Collection" },
  category: { ar: "الفئة", en: "Category" },
  description: { ar: "الوصف", en: "Description" },
  totalSupply: { ar: "الكمية الكلية", en: "Total Supply" },
  utility: { ar: "الفائدة واللإستخدامات", en: "Utility" },
  rarities: { ar: "الندرات", en: "Rarities" },
  mintDate: { ar: "تاريخ السك", en: "Mint Date" },
  mintPrice: { ar: "سعر السك", en: "Mint Price" },
  networks: { ar: "الشبكات", en: "Networks" },
  identifiers: { ar: "العقود الذكية", en: "Contracts" },

  contract: { ar: "العقد الذكي", en: "Contract (Base)" },
  policyId: { ar: "معرّف السياسة على كردانو", en: "Policy ID (Cardano)" },

  links: { ar: "روابط", en: "Links" },
  mint: { ar: "صفحة السك", en: "Mint" },
  market: { ar: "المتجر", en: "Market" },
  marketBase: { ar: "سوق بيز", en: "Base Market" },
  marketCardano: { ar: "سوق كردانو", en: "Cardano Market" },
  currentPrice: { ar: "السعر الحالي", en: "Current Price" },
  backToCat: { ar: "رجوع للفئة", en: "Back to category" },

  readMoreCustomDome: {
    ar: "اقرأ المزيد عن القبب المخصصة",
    en: "Read more about custom Dome",
  },
  readMorelands: {
    ar: "اقرأ المزيد عن الأراضي",
    en: "Read more about lands",
  },
  readMoreFileNodes: {
    ar: "اقرأ المزيد عن عقد الملفات",
    en: "Read more about file Nodes",
  },
} as const;

// بادجات صغيرة (قديمة)
const rarityColor: Record<string, string> = {
  common: "bg-gray-700/60 text-gray-100",
  uncommon: "bg-emerald-700/60 text-emerald-100",
  rare: "bg-indigo-700/60 text-indigo-100",
  legendary: "bg-yellow-700/60 text-yellow-100",
  mythic: "bg-pink-700/60 text-pink-100",
};

// ألوان صناديق الندرات الكبيرة
const rarityBoxColor: Record<string, string> = {
  common:    "bg-gray-900/40  border-gray-600/50  text-gray-100",
  uncommon:  "bg-emerald-900/20 border-emerald-500/50 text-emerald-100",
  rare:      "bg-indigo-900/20  border-indigo-500/50  text-indigo-100",
  legendary: "bg-amber-900/20   border-amber-400/60   text-amber-100",
  mythic:    "bg-pink-900/20    border-pink-500/50    text-pink-100",
};

function formatNumber(n: number, locale: Locale) {
  try {
    return new Intl.NumberFormat(locale).format(n);
  } catch {
    return String(n);
  }
}

function Section({
  title,
  children,
  dir,
}: {
  title: string;
  children: React.ReactNode;
  dir: "rtl" | "ltr";
}) {
  return (
    <section className="rounded-xl border border-border/60 bg-black/30 p-5">
      <h2 className="text-lg font-semibold text-white mb-3" dir={dir}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatCard({
  label,
  value,
  icon,
  dir,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  dir: "rtl" | "ltr";
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-black/20 p-4">
      <div className="flex items-center gap-3" dir={dir}>
        {icon ? <div className="opacity-80">{icon}</div> : null}
        <div>
          <div className="text-sm text-gray-400">{label}</div>
          <div className="text-base font-medium text-gray-100">
            {value || "—"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NFTDetailsPage({
  params,
}: {
  params: { locale: Locale; category: Category; slug: string };
}) {
  const { locale, category, slug } = params;
  const nft = getNFTBySlug(category, slug);
  if (!nft) return notFound();

  const SHOW_MARKET =
    process.env.NEXT_PUBLIC_SHOW_MARKET_PRICE === "true";

  const dir: "rtl" | "ltr" = locale === "ar" ? "rtl" : "ltr";
  const align = dir === "rtl" ? "text-right" : "text-left";
  const rowDir = dir === "rtl" ? "md:flex-row-reverse" : "md:flex-row";

  // -------- Utility bullets ----------
  const utilityText = nft.utility?.[locale] || "";
  const utilityLines = utilityText
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^•\s?/, ""));

  // ✅ اسم الفئة مترجم للاستخدام في الـ breadcrumb
  const categoryLabel = catLabel(category, locale);

  return (
    <div className="container mx-auto px-6 py-10" dir={dir}>
      {/* Breadcrumb */}
      <div className={`mb-6 text-sm text-gray-400 ${align}`}>
        <Link href={`/${locale}/nfts`} className="hover:underline">
          {T.collection[locale]}
        </Link>{" "}
        /{" "}
        <Link
          href={`/${locale}/nfts/${category}`}
          className="hover:underline"
        >
          {categoryLabel}
        </Link>{" "}
        /{" "}
        <span className="text-gray-300">
          {nft.name[locale] ?? nft.name.en}
        </span>
      </div>

      {/* HERO */}
      <div
        className={`rounded-2xl border border-border/60 bg-gradient-to-b from-black/40 to-black/20 p-5 md:p-6 flex flex-col ${rowDir} gap-6 mb-8`}
      >
        {/* الصورة */}
        <div className="md:w-[48%] rounded-xl overflow-hidden border border-border/60 bg-black/40">
          <div className="aspect-[4/3]">
            <img
              src={nft.image}
              alt={nft.name.en}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* العنوان + الوصف + الندرات */}
        <div className="md:flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 leading-tight">
            {nft.name[locale] ?? nft.name.en}
          </h1>

          {nft.description?.[locale] ? (
            <p className="mt-4 text-gray-300 leading-7 whitespace-pre-line" dir={dir}>
              {nft.description[locale]}
            </p>
          ) : null}

          {nft.rarities?.length ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nft.rarities.map((r, i) => (
                <div
                  key={`${r.tier}-${r.label ?? i}`}
                  className={[
                    "rounded-xl border p-3 flex items-center gap-4",
                    dir === "rtl" ? "flex-row-reverse text-right" : "flex-row text-left",
                    rarityBoxColor[r.tier] || "bg-gray-900/40 border-gray-600/50 text-gray-100",
                  ].join(" ")}
                  title={r.label || r.tier}
                >
                  {r.image ? (
                    <img
                      src={r.image}
                      alt={r.label || r.tier}
                      className="w-28 h-40 rounded-lg object-cover ring-1 ring-white/10 shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-28 h-40 rounded-lg bg-white/15 shrink-0" />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="text-sm md:text-base font-semibold leading-6 truncate">
                      {r.label || r.tier}
                    </div>

                    <div className="mt-1 text-xs md:text-sm opacity-90 tabular-nums whitespace-nowrap">
                      {"total" in (r as any) && typeof (r as any).total === "number" ? (
                        <span>{formatNumber((r as any).total, locale)}</span>
                      ) : null}
                      {"percent" in (r as any) && typeof (r as any).percent === "number" ? (
                        <>
                          {"total" in (r as any) && typeof (r as any).total === "number" ? (
                            <span className="mx-1">•</span>
                          ) : null}
                          <span>{(r as any).percent}%</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* بطاقات إحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          dir={dir}
          label={T.mintDate[locale]}
          value={nft.mintDate || "—"}
          icon={<span>🗓️</span>}
        />
        <StatCard
          dir={dir}
          label={T.mintPrice[locale]}
          value={nft.mintPrice || "—"}
          icon={<span>💰</span>}
        />
        <StatCard
          dir={dir}
          label={T.networks[locale]}
          value={
            <div className="flex flex-wrap gap-3">
              {nft.networks?.map((net) => (
                <span
                  key={net}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/60 text-sm"
                >
                  <img
                    src={NETWORK_ICONS[net]}
                    alt={net}
                    width={24}
                    height={24}
                    className="opacity-90"
                  />
                  {net}
                </span>
              ))}
            </div>
          }
        />
        <StatCard
          dir={dir}
          label={T.totalSupply[locale]}
          value={
            typeof nft.totalSupply === "number"
              ? formatNumber(nft.totalSupply, locale)
              : "—"
          }
          icon={<span>📦</span>}
        />
      </div>

      {/* تفاصيل */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* عمود الروابط + السعر الحالي */}
        <div className="space-y-6 order-2 lg:order-1">
          <Section dir={dir} title={T.links[locale]}>
            <div className="flex flex-wrap gap-3">
              {/* Mint */}
              {nft.links?.mint && (
                <a
                  href={nft.links.mint}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-yellow-400/60 text-yellow-300 hover:bg-yellow-500/10 transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                    <path
                      fill="currentColor"
                      d="M14 3h7v7h-2V6.41l-9.29 9.3l-1.42-1.42l9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
                    />
                  </svg>
                  {T.mint[locale]}
                </a>
              )}

              {/* Cardano (jpg.store) */}
              {nft.links?.marketCardano && (
                <a
                  href={nft.links.marketCardano}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 text-gray-200 hover:border-yellow-400/60 transition"
                >
                  <img
                    src={NETWORK_ICONS.Cardano}
                    alt="Cardano"
                    width={24}
                    height={24}
                    className="opacity-90"
                  />
                  {T.marketCardano[locale]}
                </a>
              )}

              {/* Base (OpenSea) */}
              {nft.links?.marketBase && (
                <a
                  href={nft.links.marketBase}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 text-gray-200 hover:border-yellow-400/60 transition"
                >
                  <img
                    src={NETWORK_ICONS.Base}
                    alt="Base"
                    width={24}
                    height={24}
                    className="opacity-90"
                  />
                  {T.marketBase[locale]}
                </a>
              )}

              {/* متجر عام (إن وُجد) */}
              {nft.links?.market && (
                <a
                  href={nft.links.market}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 text-gray-200 hover:border-yellow-400/60 transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                    <path
                      fill="currentColor"
                      d="M7 18q-.825 0-1.412-.588T5 16q0-.825.588-1.412T7 14t1.413.588T9 16q0 .825-.587 1.413T7 18Zm10 0q-.825 0-1.412-.588T15 16q0-.825.588-1.412T17 14t1.413.588T19 16q0 .825-.587 1.413T17 18ZM6.15 6ل2.1 4.5h7.15q.3 0 .55-.163t.35-.437l2.55-4.9q.125-.25.012-.525T18.9 4H6.275l-.6-1.3Q5.5 2.3 5.288 2.15T4.8 2H2v2h2.1l3.15 6.7ل-1.2 2.2q-.275.5.037 1.1T7.1 14H19v-2H7.95l.9-1.7H17q.875 0 1.6-.463t1.2-1.237l2.55-4.9q.35-.7-.1-1.35T20.9 2H6.15Z"
                    />
                  </svg>
                  {T.market[locale]}
                </a>
              )}
            </div>
          </Section>

          {/* ⛔️ قسم السعر الحالي مخفي إذا كانت البيئة غير مفعّلة */}
          {SHOW_MARKET && (
            <Section dir={dir} title={T.currentPrice[locale]}>
              <MarketPrice
                locale={locale}
                policyId={nft.policyId}
                openseaContract={nft.contract}
                openseaSlug={(nft as any).openseaSlug}
                links={{
                  marketBase: nft.links?.marketBase,
                  marketCardano: nft.links?.marketCardano,
                }}
              />
            </Section>
          )}
        </div>

        {/* عمود الوصف التفصيلي + المعرّفات */}
        <div className="space-y-6 lg:col-span-2 order-1 lg:order-2">
          {utilityLines.length > 0 && (
            <Section dir={dir} title={T.utility[locale]}>
              <ul className={`list-disc ps-5 leading-7 ${align}`}>
                {utilityLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>

              {Boolean((nft as any).readMorePath) && (
                <div className={`${align} mt-4`}>
                  <Link
                    href={(nft as any).readMorePath}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-400/60 text-blue-300 hover:bg-blue-500/10 transition"
                  >
                    {T.readMoreCustomDome[locale]}
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M14 3h7v7h-2V6.41l-9.29 9.3l-1.42-1.42l9.3-9.29H14V3Z"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </Section>
          )}

          <Section dir={dir} title={T.identifiers[locale]}>
            <ul className="space-y-4">
              {nft.contract && (
                <li>
                  <AddressField
                    locale={locale}
                    network="Base"
                    label={T.contract[locale]}
                    value={nft.contract}
                  />
                </li>
              )}
              {nft.policyId && (
                <li>
                  <AddressField
                    locale={locale}
                    network="Cardano"
                    label={T.policyId[locale]}
                    value={nft.policyId}
                  />
                </li>
              )}
            </ul>
          </Section>
        </div>
      </div>

      {/* زر الرجوع */}
      <div className={`mt-8 ${align}`}>
        <Link
          href={`/${locale}/nfts/${category}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-400/60 text-yellow-300 hover:bg-yellow-500/10 transition"
        >
          ↩︎ {T.backToCat[locale]}
        </Link>
      </div>
    </div>
  );
}
