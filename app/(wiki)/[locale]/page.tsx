import { getMdxComponent } from "@/lib/mdx";
import { isLocale } from "@/lib/i18n";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : "en";
  const res = await getMdxComponent(locale, []);
  if (res.notFound) return <p>Missing index.mdx</p>;
  return res.node;
}
