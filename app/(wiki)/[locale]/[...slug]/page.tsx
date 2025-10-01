import { getMdxComponent } from "@/lib/mdx";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { locale: string; slug: string[] } }) {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const res = await getMdxComponent(locale, params.slug);
  if (res.notFound) return notFound();
  return res.node;
}
