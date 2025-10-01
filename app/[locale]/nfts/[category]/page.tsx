import { Suspense } from "react";
import { isLocale } from "@/lib/i18n";
import { type Category } from "@/lib/nfts";
import CategoryPageClient from "./CategoryPageClient";

export default function Page({
  params,
}: {
  params: { locale: string; category: string };
}) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as "ar" | "en";
  const category = params.category as Category;

  return (
    <Suspense fallback={null}>
      <CategoryPageClient locale={locale} category={category} />
    </Suspense>
  );
}
