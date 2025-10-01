import Link from "next/link";
import Image from "next/image";
import { catLabel, type Locale } from "@/lib/i18n";

type CatSlug = "apparel" | "land" | "packs" | "ships" | "weapons" | "other";

const CATS: Array<{
  slug: CatSlug;
  image: string;
  // العنوان يُجلب من i18n عبر catLabel - هنا فقط الوصف
  desc: { ar: string; en: string };
}> = [
  {
    slug: "apparel",
    image: "/images/nfts/_categories/",
    desc: {
      ar: "ملابس وإكسسوارات داخل اللعبة: أحذية، خوذات، وأطقم استكشاف.",
      en: "In-game wearables: boots, helmets, and scout outfits.",
    },
  },
  {
    slug: "land",
    image: "/images/nfts/_categories/land.jpg",
    desc: {
      ar: "قباب ومربعات أراضٍ للبناء داخل العالم.",
      en: "Domes and plots used for building in the world.",
    },
  },
  {
    slug: "packs",
    image: "/images/nfts/_categories/packs.jpg",
    desc: {
      ar: "حزم بعناصر وشخصيات ومعدات.",
      en: "Bundles with themed items and gear.",
    },
  },
  {
    slug: "ships",
    image: "/images/nfts/_categories/ships.jpg",
    desc: {
      ar: "مركبات طائرة للسباقات والتنقل.",
      en: "Flying vehicles for racing and traversal.",
    },
  },
  {
    slug: "weapons",
    image: "/images/nfts/_categories/weapons.jpg",
    desc: {
      ar: "معدات قتالية عبر مختلف الندرات.",
      en: "Combat equipment across rarities.",
    },
  },
  {
    slug: "other",
    image: "/images/nfts/_categories/other.jpg",
    desc: {
      ar: "مفاتيح وصول ومقتنيات وعناصر متنوعة.",
      en: "Access keys, collectibles, assorted items.",
    },
  },
];

const HEADING = {
  ar: "مجموعة كورنوكوبياس من الـ NFTs",
  en: "Cornucopias NFT Collection",
} as const;

const CTA = { ar: "استكشف الفئة", en: "Explore category" } as const;

export default function NFTsHome({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="container mx-auto px-6 py-10" dir={dir}>
      <h1 className="text-3xl font-extrabold text-yellow-400 mb-8">
        {HEADING[locale]}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {CATS.map((c, idx) => {
          const title = catLabel(c.slug, locale); // العنوان من i18n
          return (
            <Link
              key={c.slug}
              href={`/${locale}/nfts/${c.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-border/60 bg-black/30 hover:border-yellow-400/60 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
              aria-label={`${title} – ${CTA[locale]}`}
            >
              <div className="relative aspect-[16/9] bg-black/40">
                <Image
                  src={c.image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  priority={idx < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-yellow-300">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  {c.desc[locale]}
                </p>
                <div className="mt-4 text-sm text-yellow-300 flex items-center justify-between font-medium">
                  {CTA[locale]}
                  <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
