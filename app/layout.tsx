// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import PriceTicker from "@/components/PriceTicker";
import Navbar from "@/components/Navbar"; // أضفنا النافبار

export const metadata: Metadata = {
  title: "Cornucopias Wiki (AR/EN)",
  description: "Community bilingual wiki for Cornucopias - Arabic & English.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      {/* ملاحظة: نضيف padding-bottom لتجنّب تغطية الشريط للمحتوى */}
      <body className="bg-paper text-ink antialiased font-sans min-h-screen pb-14">
        <Navbar />         {/* النافبار أعلى كل الصفحات */}
        {children}
        <PriceTicker />    {/* الشريط أسفل الصفحة */}
      </body>
    </html>
  );
}
