// Server Component (لا تكتب 'use client')
type Props = {
  id: string; // رقم التغريدة فقط
  align?: 'left' | 'center' | 'right' | 'none';
  theme?: 'light' | 'dark';
};

async function fetchTweetHTML(id: string, opts?: {align?: string; theme?: string}) {
  const url = `https://publish.twitter.com/oembed?url=${encodeURIComponent(
    `https://twitter.com/i/status/${id}`
  )}&omit_script=1&align=${opts?.align ?? 'center'}&theme=${opts?.theme ?? 'dark'}`;

  const res = await fetch(url, {
    // اختياري: كاش لمدة 12 ساعة
    next: { revalidate: 60 * 60 * 12 }
  });

  if (!res.ok) {
    throw new Error(`oEmbed request failed: ${res.status}`);
  }
  const data = (await res.json()) as { html: string };
  return data.html;
}

export default async function TweetOEmbed({ id, align = 'center', theme = 'dark' }: Props) {
  try {
    const html = await fetchTweetHTML(id, { align, theme });
    return (
      <div
        className="tweet-embed"
        // oEmbed يرجّع blockquote جاهز + ستايل inline بسيط
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (e) {
    //Fallback بسيط
    return (
      <div className="tweet-embed-fallback">
        <a
          href={`https://twitter.com/i/status/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Tweet
        </a>
      </div>
    );
  }
}
