
export default function Header({ locale }: { locale: "en" | "ar" }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {/*<img src="/logo.png" alt="Cornucopias" className="h-7" />*/}
{/* <span className="text-sm text-ink/70">Community Wiki</span> */}
      </div>
    </div>
  );
}