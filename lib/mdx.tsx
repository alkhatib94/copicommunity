import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import React from "react";

export async function getMdxComponent(locale: string, slugParts: string[]) {
  const rel = slugParts.length ? slugParts.join("/") : "index";
  const file = path.join(process.cwd(), "content", locale, `${rel}.mdx`);

  let raw: string | null = null;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return { notFound: true } as const;
  }

  const { content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    // 👇 نحول لِـ Rehype ونسمح بـ HTML الخام
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const html = String(processed);

  return {
    notFound: false,
    node: React.createElement("div", { dangerouslySetInnerHTML: { __html: html } }),
  } as const;
}
