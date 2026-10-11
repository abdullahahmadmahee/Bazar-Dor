"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("সবগুলো ঘর পূরণ করুন।");
      return;
    }
    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মেলেনি!");
      return;
    }
    if (password.length < 8) {
      setError("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        email: email.trim(),
        password: password,
        name: name.trim(),
      });

      if (authError) {
        setError(authError.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError("সার্ভার বা ডেটাবেজ সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await authClient.signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <div className="min-h-screen bg-[#F2F5F3] flex flex-col justify-center items-center px-4 py-12 font-sans">
      
      <div className="text-center mb-6">
        <h1 className="text-[26px] font-bold text-[#1f2937] mb-2 tracking-tight">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-[13px] text-gray-500 font-medium">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <div className="w-full max-w-[460px] bg-white rounded-[16px] shadow-sm border border-gray-100 p-8">
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium text-center leading-normal">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">নাম</label>
            <input
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#057A55]/20 focus:border-[#057A55] text-[14px] placeholder:text-gray-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">ইমেইল</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#057A55]/20 focus:border-[#057A55] text-[14px] placeholder:text-gray-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#057A55]/20 focus:border-[#057A55] text-[14px] placeholder:text-gray-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              type="password"
              placeholder="আবার লিখুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#057A55]/20 focus:border-[#057A55] text-[14px] placeholder:text-gray-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#057A55] text-white mt-3 py-3 px-4 rounded-lg text-[14px] font-semibold hover:bg-[#046c4e] transition-all focus:outline-none shadow-[0_4px_12px_rgba(5,122,85,0.2)] disabled:bg-gray-400 disabled:shadow-none"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <span className="relative bg-white px-3 text-[14px] text-gray-600 font-medium">অথবা</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button onClick={() => handleOAuth("google")} type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
            Google দিয়ে চালিয়ে যান
          </button>
          <button onClick={() => handleOAuth("github")} type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-4 h-4" alt="GitHub" />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-[14px] text-gray-700 font-medium">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="text-[#057A55] font-semibold hover:underline">সাইন ইন করুন</Link>
        </p>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5 font-medium">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>

    </div>
  );
}