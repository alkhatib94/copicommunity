"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Search from "./Search";
import { Home, BookOpenText, Image } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const isAr = pathname.startsWith("/ar");
  const locale: "ar" | "en" = isAr ? "ar" : "en";

  const centerLinks = [
    
    { href: `/${locale}/game/about-the-game`, icon: <BookOpenText size={18} />, label: "Wiki" },
    { href: `/${locale}/home`, icon: <Home size={18} />, label: isAr ? "الرئيسية" : "Home" },
    { href: `/${locale}/nfts`, icon: <Image size={18} />, label: "NFTs" },
  ];

  return (
    <div className="w-full sticky top-0 z-40 bg-panel/95 backdrop-blur border-b border-border">
      <div
        className={`relative max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 ${
          isAr ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* شعار / رابط للهوم */}
        <Link
  href={`/${locale}/home`}
  className="font-bold text-brand hover:opacity-80 transition"
>
  {locale === "ar" ? "كورنوكوبياس" : "Cornucopias"}
</Link>


        {/* ✅ الوسط: أزرار سريعة */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <nav className="pointer-events-auto flex items-center gap-2">
            {centerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                title={l.label}
                aria-label={l.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-black/30
                           hover:border-yellow-400/60 hover:text-yellow-300 transition shadow-sm"
              >
                {l.icon}
              </Link>
            ))}
          </nav>
        </div>

        {/* Spacer ليدفع العناصر لليمين/اليسار */}
        <div className="flex-1" />

        {/* البحث + محوّل اللغة */}
        <div className="flex items-center gap-2">
          <Search />
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </div>
  );
}
