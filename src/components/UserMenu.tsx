"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  if (!session?.user) return null;

  const firstName = session.user.name?.split(" ")[0] || "User";
  const initial = session.user.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative" ref={dropdownRef}>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-50 p-1.5 pr-3 rounded-full transition-colors"
      >
        <div className="w-8 h-8 bg-[#E8F3EF] text-[#057A55] rounded-full flex items-center justify-center font-bold text-sm">
          {initial}
        </div>
        <span className="font-medium text-gray-700 text-[15px]">{firstName}</span>
        <svg 
          className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
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
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-[#F4F7F4] rounded-xl transition-colors"
            >
              <svg className="w-[18px] h-[18px] text-[#4B5563]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              আমার প্রোফাইল
            </Link>

            <button 
              onClick={handleSignOut}
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
  );
}