// scripts/build-search-index.mjs
// يبني public/search-index.json من الملفات تحت content/{ar,en}/**/*.(md|mdx)
// يحتاج gray-matter (موجود عندك في dependencies)

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const OUT_FILE = path.join(process.cwd(), "public", "search-index.json");
const LOCALES = ["ar", "en"];
const EXTS = new Set([".md", ".mdx"]);

// امشِ على كل الملفات داخل مجلد
async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(full)));
    } else {
      if (EXTS.has(path.extname(e.name))) out.push(full);
    }
  }
  return out;
}

// نظّف الماركداون للحصول على ملخص بسيط
function stripMarkdown(src) {
  return src
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// حوّل مسار الملف داخل content/<locale>/... إلى URL
function filePathToUrl(fullPath, locale) {
  // مثال: content/en/game/about-the-game.mdx → /en/game/about-the-game
  const rel = path.relative(path.join(CONTENT_ROOT, locale), fullPath);
  let noExt = rel.slice(0, -path.extname(rel).length);

  // دعم index.md → صفحة المجلد نفسه
  if (path.basename(noExt).toLowerCase() === "index") {
    noExt = path.dirname(noExt);
    if (noExt === "." || noExt === "") noExt = ""; // content/en/index.md → /en
  }

  // طبّق /<locale>/<path>
  const url = "/" + [locale, noExt].filter(Boolean).join("/").replace(/\\/g, "/");
  return url.replace(/\/+$/, ""); // remove trailing slash
}

async function build() {
  const items = [];

  for (const locale of LOCALES) {
    const base = path.join(CONTENT_ROOT, locale);
    let files = [];
    try {
      files = await walk(base);
    } catch {
      // اللغة قد لا تكون موجودة، تجاهل
      continue;
    }

    for (const file of files) {
      const raw = await fs.readFile(file, "utf8");
      const { data: fm, content } = matter(raw);

      // ال: من frontmatter.title أو أول heading
      let title = fm?.title || "";
      if (!title) {
        const h = content.match(/^\s*#\s+(.+)\s*$/m);
        if (h) title = h[1].trim();
      }
      if (!title) {
        // fallback: اسم الملف
        title = path.basename(file, path.extname(file)).replace(/-/g, " ");
      }

      // الملخص: من frontmatter.summary أو مقتطف من النص
      const summary = (fm?.summary || stripMarkdown(content).slice(0, 200)).trim();

      // الوسوم اختياري
      const tags = Array.isArray(fm?.tags) ? fm.tags.map(String) : [];

      const url = filePathToUrl(file, locale);
      items.push({
        id: url.replace(/\W+/g, "-").replace(/^-|-$/g, ""),
        lang: locale,
        title,
        summary,
        tags,
        url,
      });
    }
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(items, null, 2), "utf8");
  console.log(`✅ Wrote ${items.length} items → ${path.relative(process.cwd(), OUT_FILE)}`);
}

build().catch((e) => {
  console.error("❌ Failed to build search index:", e);
  process.exit(1);
});
