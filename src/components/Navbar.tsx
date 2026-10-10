"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { renderIcon } from "../lib/icons";

function NavbarContent() {
  const pathname = usePathname();
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

  const categories = [
    { name: "চাল", emoji: "🍚", slug: "chal" },
    { name: "ডাল", emoji: "🫘", slug: "dal" },
    { name: "তেল", emoji: "🛢️", slug: "tel" },
    { name: "সবজি", emoji: "🥬", slug: "sobji" },
    { name: "মাছ", emoji: "🐟", slug: "mach" },
    { name: "মাংস", emoji: "🍗", slug: "mangsho" },
    { name: "ডিম-দুধ", emoji: "🥛", slug: "dim-dui" }, 
    { name: "মসলা", emoji: "🌶️", slug: "mosla" },   
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#057A55] p-2 rounded-xl flex items-center justify-center w-[42px] h-[42px]">
              <Image 
                src="/logo-icon.png" 
                alt="Bazar Dor Logo" 
                width={26} 
                height={26} 
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-none">বাজার দর</h1>
              <p className="text-xs text-gray-500 mt-1">{dateStr}</p>
            </div>
          </Link>

          <div className="flex gap-3">
            <Link href="/signin" className="btn btn-sm btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-normal">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-sm bg-[#057A55] text-white hover:bg-[#046c4e] border-none font-normal">
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6 overflow-x-auto no-scrollbar py-3">
            {categories.map((cat) => {
              const isActive = pathname === `/categories/${cat.slug}`;
              return (
                <Link 
                  key={cat.slug} 
                  href={`/categories/${cat.slug}`} 
                  className={`flex items-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors ${
                    isActive ? "text-[#057A55]" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {renderIcon(cat.emoji, "w-4 h-4 opacity-80")}
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-[120px] bg-white w-full border-b border-gray-100"></div>}>
      <NavbarContent />
    </Suspense>
  );
}