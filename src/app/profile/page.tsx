"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-[#F2F5F3] flex justify-center items-center">
        <span className="loading loading-spinner text-[#057A55] loading-lg"></span>
      </div>
    );
  }

  const joinDate = new Date(session.user.createdAt).toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-[80vh] bg-[#F2F5F3] px-4 py-12">
      
      <div className="w-full max-w-[850px] mx-auto bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-[20px] p-10 text-center shadow-sm border border-[#A5D6A7]/50 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          স্বাগতম, {session.user.name}!
        </h1>
        <p className="text-[16px] text-gray-600 font-medium mb-6">
          {session.user.email}
        </p>
        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#A5D6A7]/40 text-[#057A55] text-sm font-bold rounded-full border border-[#057A55]/20 shadow-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          যাচাইকৃত অ্যাকাউন্ট
        </span>
      </div>

      <div className="w-full max-w-[850px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-[16px] p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">প্রোফাইল তথ্য</h2>
          <div className="space-y-5">
            <div className="flex gap-4 items-center">
              <span className="w-20 text-[14px] text-gray-500 font-medium">নাম:</span>
              <span className="font-bold text-[15px] text-gray-900">{session.user.name}</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="w-20 text-[14px] text-gray-500 font-medium">ইমেইল:</span>
              <span className="font-bold text-[15px] text-gray-900">{session.user.email}</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="w-20 text-[14px] text-gray-500 font-medium">সদস্যপদ:</span>
              <span className="font-bold text-[15px] text-gray-900">{joinDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[16px] p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">পছন্দের তালিকা</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3.5 border border-gray-100 rounded-xl hover:bg-[#F8FAF8] transition-colors cursor-pointer group">
              <div className="text-2xl opacity-80 group-hover:scale-110 transition-transform">🫘</div>
              <span className="font-bold text-gray-800 text-[15px]">মসুর ডাল - ১৪২ টাকা</span>
            </div>
            <div className="flex items-center gap-4 p-3.5 border border-gray-100 rounded-xl hover:bg-[#F8FAF8] transition-colors cursor-pointer group">
              <div className="text-2xl opacity-80 group-hover:scale-110 transition-transform">🛢️</div>
              <span className="font-bold text-gray-800 text-[15px]">ঘানি ভাঙ্গা সরিষার তেল - ২১৫ টাকা</span>
            </div>
            <div className="flex items-center gap-4 p-3.5 border border-gray-100 rounded-xl hover:bg-[#F8FAF8] transition-colors cursor-pointer group">
              <div className="text-2xl opacity-80 group-hover:scale-110 transition-transform">🌾</div>
              <span className="font-bold text-gray-800 text-[15px]">মিনিকেট চাল - ৯৯ টাকা</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}