import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale } from "./lib/i18n";

/**
 * نقاط مهمّة:
 * - لا نتعامل مع أي Route Group مثل (wiki): الجروب لا يظهر في الـ URL أصلاً.
 * - أي مسار عام (صور/خطوط/الـ _next …) نتجاهله.
 * - إن لم توجد بادئة لغة (ar/en) نضيف الافتراضية /en ونترك بقية المسار كما هو.
 * - إذا وُجدت البادئة، نمرّر الطلب كما هو (سواء كان /en/wiki... أو /en/nfts...).
 */

// يمكنك تغيير الافتراضي لو أردت
const DEFAULT_LOCALE: "ar" | "en" = "en";

// مسارات/ملفات عامة يجب أن تتخطى الميدلوير
const PUBLIC_PREFIXES = [
  "/_next",
  "/favicon",  // favicon.ico, favicon.png...
  "/logo",     // /logo.svg
  "/images",
  "/fonts",
  "/api",
];
const PUBLIC_FILE = /\.[\w]+$/; // أي مسار ينتهي بامتداد ملف (png, css, js, ...)

function isPublic(pathname: string) {
  return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p)) || PUBLIC_FILE.test(pathname);
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  // 1) مرّر المسارات العامة كما هي
  if (isPublic(pathname)) return NextResponse.next();

  // 2) لو المسار هو الجذر "/" → أعد التوجيه إلى /<DEFAULT_LOCALE>
  if (pathname === "/") {
    const to = url.clone();
    to.pathname = `/${DEFAULT_LOCALE}/home`;
    return NextResponse.redirect(to);
  }

  // 3) تحقق من أن أوّل سيجمنت هو لوكال معروف
  //    مثال: /en/nfts/... أو /ar/wiki/...
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // لو موجودة بادئة لغة صحيحة → مرّر كما هو (هذا يدعم الويكي والـ NFTs معاً)
  if (first && isLocale(first)) {
    return NextResponse.next();
  }

  // 4) لو ما في لوكال، أضف الافتراضي قبل المسار كاملاً
  const to = url.clone();
  // تجنّب "//" إن كان pathname يبدأ بـ "/"
  to.pathname = `/${DEFAULT_LOCALE}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  return NextResponse.redirect(to);
}

/**
 * نطاق عمل الميدلوير:
 * - نستثني _next و api وأي ملف ذو امتداد.
 * - الباقي كلّه يمر بالميدلوير لضمان وجود /ar أو /en.
 */
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
