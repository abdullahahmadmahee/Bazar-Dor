"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage({ type: "", text: "" });

    try {
      const { data, error } = await authClient.updateUser({ name });
      if (error) {
        setMessage({ type: "error", text: error.message || "আপডেট করতে সমস্যা হয়েছে।" });
      } else {
        setMessage({ type: "success", text: "প্রোফাইল সফলভাবে আপডেট হয়েছে!" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "একটি ত্রুটি ঘটেছে।" });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#F4F7F4] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#057A55] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#F4F7F4] font-sans pt-10 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">আমার প্রোফাইল</h1>
          <p className="text-[13px] text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Placeholder Avatar */}
            <div className="w-14 h-14 bg-[#E8F3EF] text-[#057A55] rounded-full flex items-center justify-center text-2xl font-bold">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-gray-900 leading-snug">{session.user.name}</h2>
              <p className="text-[14px] text-gray-500">{session.user.email}</p>
            </div>
          </div>
          
          <button 
            onClick={handleSignOut}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 border border-[#E02424] text-[#E02424] rounded-lg hover:bg-red-50 transition-colors text-[14px] font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            সাইন আউট
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h3 className="text-[16px] font-bold text-gray-900 mb-6">তথ্য</h3>
          
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[13px] font-medium text-gray-700 mb-2">
                নাম
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#057A55] focus:border-[#057A55] outline-none text-gray-900 transition-all text-[14px]"
              />
            </div>

            {message.text && (
              <div className={`p-3 rounded-lg text-[13px] font-medium ${message.type === 'error' ? 'bg-red-50 text-[#E02424]' : 'bg-[#E8F3EF] text-[#057A55]'}`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isUpdating || name === session.user.name}
              className="w-full bg-[#057A55] text-white py-3 rounded-lg font-medium hover:bg-[#046c4b] transition-colors disabled:opacity-50 text-[15px]"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}