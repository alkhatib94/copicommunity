// app/(wiki)/[locale]/layout.tsx
import { ReactNode } from "react";
import { isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Prose from "@/components/Prose";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const rawLocale = isLocale(params.locale) ? params.locale : "en";
  const locale = (rawLocale === "ar" ? "ar" : "en") as "ar" | "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} className="min-h-screen grid grid-cols-[300px_1fr]">
      {/* العمود الأيسر: السايدبار */}
      <Sidebar locale={locale} />

      {/* العمود الأيمن: المحتوى */}
      <main className="px-8 py-8">
        {/* إذا كان Header يعرض زر لغة مدمج:
            استعمل showLangSwitcher={false} لمنع التكرار مع Navbar */}
        <Header locale={locale} />
        <Prose className="max-w-prose">{children}</Prose>
      </main>
    </div>
  );
}
