"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("অনুগ্রহ করে সবগুলো ঘর পূরণ করুন।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
        setLoading(false);
      } else {
        toast.success("সফলভাবে তৈরি হয়েছে! লগইন পেজে নিয়ে যাওয়া হচ্ছে...");
        setTimeout(() => router.push("/signin"), 1500);
      }
    } catch (err) {
      toast.error("একটি অনাকাঙ্ক্ষিত ত্রুটি ঘটেছে।");
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/", 
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F2] flex flex-col justify-center py-10 px-4 sm:px-6 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-[28px] font-extrabold text-[#1A1A1A] mb-2 tracking-tight">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="text-[15px] text-[#666666]">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[440px]">
        <div className="bg-white py-8 px-6 sm:px-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-[24px] border border-gray-100">
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label className="block text-[14px] font-medium text-gray-800 mb-1.5">নাম</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0E9F57] focus:border-[#0E9F57] outline-none text-gray-900 transition-colors placeholder:text-gray-400 text-[15px]" placeholder="যেমন: রহিম উদ্দিন" />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-gray-800 mb-1.5">ইমেইল</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0E9F57] focus:border-[#0E9F57] outline-none text-gray-900 transition-colors placeholder:text-gray-400 text-[15px]" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-gray-800 mb-1.5">পাসওয়ার্ড</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0E9F57] focus:border-[#0E9F57] outline-none text-gray-900 transition-colors placeholder:text-gray-400 text-[15px]" placeholder="কমপক্ষে ৮ অক্ষর" />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-gray-800 mb-1.5">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0E9F57] focus:border-[#0E9F57] outline-none text-gray-900 transition-colors placeholder:text-gray-400 text-[15px]" placeholder="আবার লিখুন" />
            </div>
            <div className="pt-2">
              <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-[0_2px_6px_rgba(14,159,87,0.3)] text-[16px] font-bold text-white bg-[#0E9F57] hover:bg-[#0c8a4b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E9F57] disabled:opacity-70 transition-all">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "অ্যাকাউন্ট তৈরি করুন"}
              </button>
            </div>
          </form>
          
          <div className="mt-7 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center text-[13px]"><span className="px-4 bg-white text-gray-500 font-medium">অথবা</span></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleSocialLogin("google")} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[13px] font-bold text-gray-700">
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg> Google
            </button>
            <button onClick={() => handleSocialLogin("github")} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[13px] font-bold text-gray-700">
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg> GitHub
            </button>
          </div>
          <p className="mt-8 text-center text-[14px] text-gray-700">অ্যাকাউন্ট আছে? <Link href="/signin" className="font-bold text-[#0E9F57] hover:text-[#0c8a4b] transition-colors">সাইন ইন করুন</Link></p>
        </div>
        <div className="mt-8 text-center"><Link href="/" className="text-[14px] text-gray-500 hover:text-gray-800 transition-colors">← হোম পেজে ফিরে যান</Link></div>
      </div>
    </div>
  );
}