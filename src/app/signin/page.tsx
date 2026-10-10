"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("সবগুলো ঘর পূরণ করুন।");
      return;
    }

    setLoading(true);
    const { data, error: authError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);
    if (authError) {
      setError(authError.message || "ইমেইল বা পাসওয়ার্ড ভুল।");
    } else {
      router.push("/");
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await authClient.signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <div className="min-h-screen bg-[#F2F5F3] flex flex-col justify-center items-center px-4 py-12 font-sans">
      <div className="text-center mb-6">
        <h1 className="text-[28px] font-bold text-gray-900 mb-1.5 tracking-tight">সাইন ইন</h1>
        <p className="text-[14px] text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
      </div>

      <div className="w-full max-w-[440px] bg-white rounded-[16px] shadow-sm border border-gray-100/50 p-8">
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">ইমেইল</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#057A55]/20 focus:border-[#057A55] text-[14px] placeholder:text-gray-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#057A55]/20 focus:border-[#057A55] text-[14px] placeholder:text-gray-400 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#057A55] text-white mt-2 py-3 px-4 rounded-lg text-[15px] font-semibold hover:bg-[#046c4e] transition-all focus:outline-none shadow-[0_4px_12px_rgba(5,122,85,0.25)]"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <span className="relative bg-white px-3 text-[12px] text-gray-500 font-medium">অথবা</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button onClick={() => handleOAuth("google")} className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="" />
            Google দিয়ে চালিয়ে যান
          </button>
          <button onClick={() => handleOAuth("github")} className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-4 h-4" alt="" />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-[13px] text-gray-600 font-medium">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="text-[#057A55] font-bold hover:underline">সাইন আপ করুন</Link>
        </p>
      </div>

      <Link href="/" className="mt-8 text-[13px] text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5 font-medium">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}