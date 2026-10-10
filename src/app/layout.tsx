import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { Suspense } from "react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "বাজার দর | Bazar Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body className={`${notoSansBengali.className} min-h-screen flex flex-col text-gray-900`}>
        <Navbar />
        <Suspense fallback={<div className="h-[41px] w-full bg-white border-t border-gray-100"></div>}>
          <Ticker />
        </Suspense>
        <main className="flex-grow w-full pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}