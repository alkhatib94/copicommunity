
// components/Lines.tsx
export default function Lines({
  text,
  dir = "rtl",
}: { text?: string; dir?: "rtl" | "ltr" }) {
  const lines = (text || "")
    .replace(/\r/g, "")
    .split("\n")
    .map(s => s.replace(/^•\s?/, "").trim())
    .filter(Boolean);

  if (!lines.length) return null;

  return (
    <ul className="list-disc ps-5 space-y-1" dir={dir}>
      {lines.map((l, i) => <li key={i}>{l}</li>)}
    </ul>
  );
}
