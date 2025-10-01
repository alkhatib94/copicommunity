"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpenText, Image } from "lucide-react";

function getLocaleFromPath(pathname: string): "ar" | "en" {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg === "ar" ? "ar" : "en";
}

export default function CenterQuickLinks() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname || "/");

  const links = [
    { href: `/${locale}/home`, icon: <Home size={18} />, label: locale === "ar" ? "الرئيسية" : "Home" },
    { href: `/${locale}/game/about-the-game`, icon: <BookOpenText size={18} />, label: "Wiki" },
    { href: `/${locale}/nfts`, icon: <Image  size={18} />, label: "NFTs" },
  ];

  return (
    /* عنصر متمركز تمامًا في منتصف الشريط */
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <nav className="pointer-events-auto flex items-center gap-2">
        {links.map((l) => (
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
  );
}
