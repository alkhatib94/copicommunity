// app/components/Sidebar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { getNav } from "@/lib/nav";
import { tSection, tItem } from "@/lib/nav.i18n";

/** سهم صغير للتوسيع/الطي */
function Chevron({ open }: { open: boolean }) {
  return (
    <span
      className={
        "inline-block transition-transform duration-200 text-grayc-8 " +
        (open ? "rotate-180" : "rotate-0")
      }
      aria-hidden
    >
      ▾
    </span>
  );
}

type Item = {
  title: string;
  href: string;
  children?: Item[];
};

function NavNode({
  item,
  level,
  currentPath,
  isRTL,
  locale,
}: {
  item: Item;
  level: number;
  currentPath: string;
  isRTL: boolean;
  locale: "en" | "ar";
}) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const isActive = currentPath === item.href;
  const isBranchActive =
    isActive || (hasChildren && item.children!.some((c) => currentPath.startsWith(c.href)));

  const [open, setOpen] = useState<boolean>(isBranchActive);
  useEffect(() => {
    if (isBranchActive) setOpen(true);
  }, [isBranchActive]);

  // ترجمة ال
  const displayTitle = tItem(locale, item.href, item.title);

  const linkClasses =
    "block flex-1 px-3 py-2 rounded transition-colors hover:bg-brand/faint " +
    (isActive ? "bg-brand/faint text-brand font-semibold" : "text-ink") +
    (isRTL ? " text-right" : "");

  return (
    <div className="select-none">
      <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
        <a href={item.href} className={linkClasses}>
          {displayTitle}
        </a>

        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`p-1 text-grayc-8 hover:text-ink transition-transform ${
              isRTL ? "order-first" : ""
            }`}
            aria-label={open ? "Collapse" : "Expand"}
            aria-expanded={open}
            aria-controls={`sect-${item.href}`}
          >
            <Chevron open={open} />
          </button>
        )}
      </div>

      {hasChildren && open && (
        <div
          id={`sect-${item.href}`}
          className={`mt-1 space-y-1 ${isRTL ? "mr-4 border-r pr-3" : "ml-4 border-l pl-3"}`}
        >
          {item.children!.map((c) => (
            <NavNode
              key={c.href}
              item={c}
              level={level + 1}
              currentPath={currentPath}
              isRTL={isRTL}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ locale }: { locale: "en" | "ar" }) {
  const nav = useMemo(() => getNav(locale), [locale]);
  const pathname = usePathname() || "/";
  const isRTL = locale === "ar";

  return (
    <aside
      dir={isRTL ? "rtl" : "ltr"}
      className={`min-h-screen bg-panel ${isRTL ? "border-l" : "border-r"} border-border`}
    >
      {/*  أعلى السايدبار */}
     <div className={`p-4 ${isRTL ? "text-right" : ""}`}>
  <img 
    src="/logo.png"  // ← حط مسار اللوجو الصحيح هون
    alt="Cornucopias Logo"
    className="h-8 mx-auto"
  />
</div>


      {/* اجعل كل محتوى الناف يمين في RTL */}
      <nav className={`px-3 pb-8 space-y-4 ${isRTL ? "text-right" : ""}`}>
        {nav.map((section: any) => (
          <div key={section.title}>
            {/* ترويسة المجموعة: أيقونة + نص على اليمين بالكامل */}
            <div
              className={`w-full px-3 py-2 text-[11px] uppercase tracking-wider text-grayc-8
                          flex items-center gap-2
                          ${isRTL ? "flex-row-reverse justify-end text-right" : ""}`}
            >
              <span>{section.icon}</span>
              <span>{tSection(locale, section.title)}</span>
            </div>

            <div className="space-y-1">
              {section.items.map((it: Item) => (
                <NavNode
                  key={it.href}
                  item={it}
                  level={0}
                  currentPath={pathname}
                  isRTL={isRTL}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
