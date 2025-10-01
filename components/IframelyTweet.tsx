'use client';

import { useEffect, useId } from 'react';

type Props = {
  /** رابط التغريدة الكامل */
  url: string;
  /** ارتفاع الإطار */
  height?: number | string;
  /** عرض الإطار (افتراضي 100%) */
  width?: number | string;
  /** id للكونتينر. لو عندك أكثر من تغريدة، خليه فريد */
  containerId?: string;
  /** تمكين الثيم الداكن/الفاتح عبر Iframely (اختياري) */
  theme?: 'dark' | 'light';
};

/**
 * Iframely Tweet embed (Client-side)
 * يحتاج مفتاح Iframely في متغير البيئة:
 * NEXT_PUBLIC_IFRAMELY_KEY=your_key_here
 */
export default function IframelyTweet({
  url,
  height = 700,
  width = '100%',
  containerId,
  theme = 'dark',
}: Props) {
  // لو ما أعطيت id، نولّد واحد فريد؛ لكن لو بدك بالضبط "iframely-content"، مرّره عبر prop
  const autoId = useId();
  const id = containerId ?? 'iframely-content';

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_IFRAMELY_KEY;
    if (!API_KEY) {
      // ما توقف الصفحة؛ اترك الرابط يظهر كـ fallback
      console.warn('[IframelyTweet] Missing NEXT_PUBLIC_IFRAMELY_KEY');
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://cdn.iframe.ly/embed.js"]'
    );

    const ensureScript = () =>
      new Promise<void>((resolve) => {
        if (existing) return resolve();
        const s = document.createElement('script');
        s.async = true;
        s.src = `https://cdn.iframe.ly/embed.js?api_key=${API_KEY}`;
        s.onload = () => resolve();
        document.body.appendChild(s);
      });

    ensureScript().then(() => {
      // اطلب من Iframely إعادة مسح الصفحة وتحويل الروابط لـ embed
      // @ts-expect-error: iframely injected globally by the script
      if (window.iframely && typeof window.iframely.load === 'function') {
        // مرّر الكونتينر بالـ id حتى ما يمسح الصفحة كاملة
        const box = document.getElementById(id);
        if (box) {
          // ضبط الثيم (اختياري) عبر data attributes
          box.setAttribute('data-iframely-theme', theme);
          // @ts-expect-error
          window.iframely.load(box);
        }
      }
    });

    // لا إزالة للسكريبت (مفيد لإعادة الاستخدام بصفحات ثانية)
  }, [id, theme, url]);

  return (
    <div
      id={id} // <-- هذا هو الـ id المطلوب
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        maxWidth: 600,
        margin: '1rem 0',
      }}
    >
      {/* Iframely يقرأ هذا الرابط ويحوّله تلقائياً إلى embed */}
      <a
        href={url}
        // ستايل مؤقت يظهر كرابط قبل التحويل (fallback)
        style={{ display: 'inline-block', opacity: 0.8 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Tweet
      </a>

      {/* يمكنك ضبط ارتفاع iframe النهائي عبر CSS inline للكونتينر */}
      <style jsx>{`
        #${id} iframe {
          width: 100% !important;
          height: ${typeof height === 'number' ? `${height}px` : height} !important;
          border: 0;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}
