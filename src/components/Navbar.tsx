"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";
import { renderIcon } from "../lib/icons";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

function NavbarContent() {
  const pathname = usePathname();
  const [dateStr, setDateStr] = useState("");
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDateStr(formatter.format(new Date()));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে লগআউট হয়েছে!"); 
    window.location.href = "/";
  };

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

          <div className="flex gap-3 items-center">
            {isPending ? (
              <div className="w-32 h-8 bg-gray-100 animate-pulse rounded-lg"></div>
            ) : session ? (
              
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 bg-[#E8F3EF] text-[#057A55] rounded-full flex items-center justify-center font-bold text-sm">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-medium text-gray-700 text-[15px] hidden sm:block">
                    {session.user.name?.split(" ")[0]}
                  </span>
                  <svg 
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-[260px] bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-5 z-50">
                    <div className="mb-4">
                      <h3 className="text-[16px] font-bold text-gray-900 leading-snug">
                        {session.user.name}
                      </h3>
                      <p className="text-[13px] text-gray-500 mt-0.5">
                        {session.user.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Link 
                        href="/profile" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-[#F4F7F4] rounded-xl transition-colors"
                      >
                        <svg className="w-[18px] h-[18px] text-[#4B5563]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        আমার প্রোফাইল
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[15px] font-medium text-[#E02424] hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        সাইন আউট
                      </button>
                    </div>
                  </div>
                )}
              </div>

            ) : (
              <>
                <Link href="/signin" className="btn btn-sm btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-normal">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-sm bg-[#057A55] text-white hover:bg-[#046c4e] border-none font-normal">
                  সাইন আপ
                </Link>
              </>
            )}
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