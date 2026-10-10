"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDateStr(formatter.format(new Date()));
  }, []);

  return (
    <section className="w-full bg-white rounded-[24px] p-8 md:p-14 mt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10 shadow-sm border border-gray-100">
      <div className="flex-1 flex flex-col items-start gap-6">
        <div className="bg-green-50 text-[#057A55] px-4 py-2 rounded-full text-sm font-medium">
          {dateStr}
        </div>
        <h1 className="text-4xl md:text-[44px] font-bold text-gray-900 leading-[1.3]">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a 
          href="#সব-পণ্য" 
          className="btn bg-[#057A55] text-white hover:bg-[#046c4e] border-none px-8 rounded-lg font-normal h-12 min-h-12"
        >
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="flex-1 w-full flex justify-center md:justify-end">
        <div className="relative w-full max-w-[400px] aspect-[4/3]">
          <Image 
            src="/bazar-hero.png" 
            alt="Hero Basket" 
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>
      </div>
    </section>
  );
}