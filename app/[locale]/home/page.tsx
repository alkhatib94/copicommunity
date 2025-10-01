import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaDiscord, FaTelegram } from "react-icons/fa6";

type Locale = "ar" | "en";

export default function Home({ params }: { params: { locale: Locale } }) {
  const locale: Locale = params.locale === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <main dir={dir} className="max-w-5xl mx-auto p-6 bg-paper text-ink">
      {/* الشعار (بدون زر تبديل اللغة) */}
      <header className="mb-6">
        <div className="flex items-center justify-center">
          <div className="bg-brand/10 border border-border rounded-full px-8 py-4 shadow-lg">
            <Image
              src="/cornucopias.png"
              alt="Cornucopias"
              width={200}
              height={60}
              priority
            />
          </div>
        </div>

       {locale === "ar" ? (
  <p className="text-gray-300 text-center mt-4 max-w-2xl mx-auto leading-relaxed">
    تم إنشاء هذا الموقع بهدف <strong>ترجمة وتبسيط محتوى ويكي كورنوكوبياس</strong> للعرب.
    ويكي اللعبة الأصلي ضخم جدًا، وقراءته مرهقة خصوصًا لمن لغتهم الأم ليست الإنجليزية.
    لكن لما تكون المعلومة بلغتك، بيصير الموضوع أسهل وأمتع وأقرب للقلب.
    <br /><br />
    <em>
      هذا المشروع مبادرة شخصية بالكامل، تم بناؤه بمساعدة <strong>شات جي بي تي</strong> من حيث البرمجة والتطوير.
      إذا واجهتك أي مشكلة في الموقع، أو لاحظت خطأ في الترجمة،
      تقدر دائمًا تتواصل معي عبر وسائل التواصل أسفل الصفحة.
    </em>
    <br /><br />
    في <strong>كورنوكوبياس</strong>، المجتمع هو قلب اللعبة وروحها.
    نحن نحب دائمًا أن نضيف أشخاصًا جدد لعائلتنا ونرحب بالجميع.
    لو عندك أي سؤال أو استفسار، لا تتردد بالتواصل معي.
    <br /><br />
    <em>⚠️ هذا الموقع مجتمعي غير رسمي، وشعاره مستوحى من شعار لعبة كورنوكوبياس.</em>
    <br /><br />
    <strong> حيث السماء لم تعد هي الحد </strong>
  </p>
) : (
  <p className="text-gray-300 text-center mt-4 max-w-2xl mx-auto leading-relaxed">
    This website was created with the goal of <strong>translating and simplifying the Cornucopias Wiki</strong> for Arabic speakers.
    The original Wiki is very large and can be exhausting to read, especially for those whose native language is not English.
    But when the information is in your own language, it becomes easier, more enjoyable, and more engaging.
    <br /><br />
    <em>
      This project is a personal initiative, built with the help of <strong>ChatGPT</strong> for coding and development.
      If you encounter any issues on the site, or notice a translation mistake,
      you can always reach out to me through the contact details at the bottom of the page.
    </em>
    <br /><br />
    In <strong>Cornucopias</strong>, the community is the true heart of the game.
    We always love welcoming new members into our family, and your presence makes a real difference.
    If you have any questions or concerns, don’t hesitate to contact me.
    <br /><br />
    <em>⚠️ This is a community-driven, unofficial website, and its motto is inspired by the official Cornucopias game.</em>
    <br /><br />
    <strong> Where the sky is no longer the limit </strong>
  </p>
)}

      </header>

      {/* الروابط السريعة */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* ويكي */}
        <article className="bg-panel border border-border rounded-xl p-4 flex flex-col">
          <Image
            src="/wiki2.jpeg"
            alt={locale === "ar" ? "ويكي كورنوكوبياس" : "Cornucopias Wiki"}
            width={800}
            height={420}
            className="rounded-md border border-border"
          />
          <h3 className="font-bold mt-4 text-brand">
            {locale === "ar" ? "ويكي كورنوكوبياس" : "Cornucopias Wiki"}
          </h3>
          <p className="text-gray-300">
            {locale === "ar"
              ? "انطلق إلى الويكي الرسمي حسب لغتك."
              : "Jump to the official community wiki in your language."}
          </p>
          <Link
            href={`/${locale}/game/about-the-game`}
            className="mt-4 inline-block bg-brand px-4 py-2 rounded-md text-white font-semibold text-center"
          >
            {locale === "ar" ? "اذهب" : "Visit"}
          </Link>
        </article>

        {/* مجموعات / NFT Collections */}
        <article className="bg-panel border border-border rounded-xl p-4 flex flex-col relative">
          <Image
            src="/nft-thumb.jpeg"
            alt={locale === "ar" ? "مجموعات NFT" : "NFT Collections"}
            width={800}
            height={420}
            className="rounded-md border border-border"
          />
          <h3 className="font-bold mt-4 text-brand">
            {locale === "ar" ? "مجموعات NFT" : "NFT Collections"}
          </h3>
          <p className="text-gray-300">
            {locale === "ar" ? "استكشف مجموعات NFTs الخاصة باللعبة." : "Explore Cornucopias NFTs."}
          </p>
          <Link
            href={`/${locale}/nfts`}
            className="mt-4 inline-block bg-brand px-4 py-2 rounded-md text-white font-semibold text-center"
          >
            {locale === "ar" ? "اذهب" : "Visit"}
          </Link>
        </article>

        {/* دليل اللعبة / Game Guide */}
        <article className="bg-panel border border-border rounded-xl p-4 flex flex-col relative">
          <Image
            src="/guide-thumb.jpeg"
            alt={locale === "ar" ? "دليل اللعبة" : "Game Guide"}
            width={800}
            height={420}
            className="rounded-md border border-border"
          />
          <h3 className="font-bold mt-4 text-brand">
            {locale === "ar" ? "دليل اللعبة" : "Game Guide"}
          </h3>
          <p className="text-gray-300">
            {locale === "ar" ? "كل ما تحتاجه للبدء." : "Everything you need to get started."}
          </p>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm border border-dashed border-border px-3 py-1 rounded-md text-gray-300 bg-paper/60">
            {locale === "ar" ? "قريباً" : "Coming soon"}
          </span>
        </article>
      </section>

      {/* البروفايل */}
      <footer className="mt-12 bg-panel border border-border rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div
          className="w-28 h-28 rounded-xl bg-cover bg-center border border-border"
          style={{ backgroundImage: "url(/dr.jpg)" }}
        />
        {locale === "ar" ? (
          <div className="text-right">
            <h3 className="font-bold">د. محمود الخطيب</h3>
            <p className="text-gray-300">
              شغوف بعالم الويب3 وألعابه ومهتم جدًا بلعبة كورنوكوبياس
            </p>
            <SocialLinks />
          </div>
        ) : (
          <div>
            <h3 className="font-bold">Dr. Mahmoud Alkhatib - also known as Dr. Alkhatib</h3>
            <p className="text-gray-300">
              Passionate about Web3 and its games, and deeply interested in Cornucopias
            </p>
            <SocialLinks />
          </div>
        )}
      </footer>
    </main>
  );
}

function SocialLinks() {
  return (
    <div className="flex gap-3 mt-2 flex-wrap">
      <a
        href="https://x.com/alkhatib94"
        target="_blank"
        rel="noopener noreferrer"
        className="border border-border rounded-full p-2 text-ink hover:bg-panel transition"
        aria-label="X / Twitter"
      >
        <FaXTwitter size={20} />
      </a>

      <a
        href="https://discord.com/users/769097352812167208"
        target="_blank"
        rel="noopener noreferrer"
        className="border border-border rounded-full p-2 text-ink hover:bg-panel transition"
        aria-label="Discord"
      >
        <FaDiscord size={20} />
      </a>

      <a
        href="https://t.me/alkhatib94"
        target="_blank"
        rel="noopener noreferrer"
        className="border border-border rounded-full p-2 text-ink hover:bg-panel transition"
        aria-label="Telegram"
      >
        <FaTelegram size={20} />
      </a>
    </div>
  );
}
