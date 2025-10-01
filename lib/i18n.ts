// اللغات المدعومة
export const locales = ["en", "ar"] as const;
export type Locale = typeof locales[number];

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (locales as readonly string[]).includes(v);
}

// =======================
// التصنيفات + المساعدات
// =======================

export const CATEGORY_LABELS = {
  Apparel: { ar: "الملابس",  en: "Apparel" },
  Land:    { ar: "الأراضي",  en: "Land" },
  Packs:   { ar: "الحقائب",  en: "Packs" },
  Ships:   { ar: "المركبات", en: "Ships" },
  Weapons: { ar: "الأسلحة",  en: "Weapons" },
  Other:   { ar: "أخرى",     en: "Other" },
} as const;

export type CategoryKey  = keyof typeof CATEGORY_LABELS;        // "Apparel" | ...
export type CategorySlug = Lowercase<CategoryKey>;             // "apparel" | ...

export const CATEGORY_KEYS  = Object.keys(CATEGORY_LABELS) as CategoryKey[];
export const CATEGORY_SLUGS = CATEGORY_KEYS.map(k => k.toLowerCase() as CategorySlug);

/** يحوّل أي قيمة (slug صغير أو مفتاح كبير) إلى مفتاح CategoryKey صالح */
export function catKeyFromAny(cat: string): CategoryKey | undefined {
  if (!cat) return undefined;
  const normalized =
    cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
  return (CATEGORY_LABELS as any)[normalized] ? (normalized as CategoryKey) : undefined;
}

/** إرجاع التسمية الصحيحة حسب اللغة - يقبل slug صغير أو مفتاح كبير */
export function catLabel(cat: CategoryKey | CategorySlug | string, locale: Locale): string {
  const key = catKeyFromAny(String(cat));
  return key ? CATEGORY_LABELS[key][locale] : String(cat);
}
