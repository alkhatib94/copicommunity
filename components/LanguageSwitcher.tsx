"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Locale = "ar" | "en";

/**
 * زر تبديل اللغة:
 * - يكتشف اللغة الحالية من أول سيجمنت ("/ar" أو "/en")، وإن لم توجد يفترض "en".
 * - يبدّل اللغة مع الحفاظ على باقي المسار + الـquery + الـhash.
 * - ستايل متوافق مع ثيمك (bg-panel / border-border / text-ink / brand).
 */
export default function LanguageSwitcher({
  // اختياري: تمرير اللغة الحالية يدويًا، ولو ما مررت تُستنتج من الـpath
  locale,
  showFlag = true,
}: {
  locale?: Locale;
  showFlag?: boolean;
}) {
  const pathnameRaw = usePathname() || "/";
  const search = useSearchParams();

  // أجزاء المسار بدون فراغات
  const parts = pathnameRaw.split("/").filter(Boolean);

  // استنتاج اللغة الحالية من الـpath إن لم تُمرّر عبر الـprops
  let current: Locale = locale ?? (parts[0] === "ar" ? "ar" : parts[0] === "en" ? "en" : "en");
  const alt: Locale = current === "ar" ? "en" : "ar";

  // نبني المسار الهدف:
  // - إذا أول جزء لغة: نستبدله.
  // - إذا لا: نضيف اللغة في البداية.
  let newParts = [...parts];
  if (newParts[0] === "ar" || newParts[0] === "en") {
    newParts[0] = alt;
  } else {
    newParts = [alt, ...newParts];
  }

  const targetPath = "/" + newParts.join("/");
  const qs = search?.toString();
  // ملاحظة: Next.js لا يوفّر hash عبر useSearchParams. لو تحتاج حفظ الـhash، استخدم useEffect و window.location.hash.
  const href = qs ? `${targetPath}?${qs}` : targetPath;

  return (
    <Link
      href={href}
      aria-label={`Switch to ${alt === "ar" ? "Arabic" : "English"}`}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-panel hover:bg-brand/20 transition text-ink text-sm"
      prefetch={false}
    >
      {showFlag && (
        <span className="inline-flex items-center">
          {/* ضع صور الأعلام في /public */}
          {alt === "ar" ? (
            <Image src="/palestine.png" alt="العربية" width={18} height={18} />
          ) : (
            <Image src="/united-kingdom.png" alt="English" width={18} height={18} />
          )}
        </span>
      )}
      <span>{alt === "ar" ? "العربية" : "English"}</span>
    </Link>
  );
}
