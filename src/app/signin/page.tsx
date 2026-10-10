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

    if (!email.trim() || !password.trim()) {
      setError("ইমেইল এবং পাসওয়ার্ড প্রদান করুন।");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        console.log("BetterAuth signIn error:", authError); 
        setError(authError.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে। আবার চেষ্টা করুন।");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      console.log("SignIn network/crash error:", err);
      setError("সার্ভার বা ডেটাবেজ সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
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
        <h1 className="text-[26px] font-bold text-[#1f2937] mb-2 tracking-tight">স্বাগতম!</h1>
        <p className="text-[13px] text-gray-500 font-medium">আপনার অ্যাকাউন্টে সাইন ইন করুন।</p>
      </div>

      <div className="w-full max-w-[420px] bg-white rounded-[16px] shadow-sm border border-gray-100 p-8">
        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium text-center leading-normal">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-5">
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
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[13px] font-bold text-gray-800">পাসওয়ার্ড</label>
              <Link href="#" className="text-[12px] text-[#057A55] font-medium hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <input
              type="password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#057A55]/20 focus:border-[#057A55] text-[14px] placeholder:text-gray-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#057A55] text-white mt-4 py-3 px-4 rounded-lg text-[14px] font-semibold hover:bg-[#046c4e] transition-all focus:outline-none shadow-[0_4px_12px_rgba(5,122,85,0.2)] disabled:bg-gray-400 disabled:shadow-none"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <span className="relative bg-white px-3 text-[12px] text-gray-500 font-medium">অথবা</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button onClick={() => handleOAuth("google")} className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-3.5 h-3.5" alt="" />
            Google
          </button>
          <button onClick={() => handleOAuth("github")} className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-3.5 h-3.5" alt="" />
            GitHub
          </button>
        </div>

        <p className="text-center text-[13px] text-gray-600 font-medium">
          নতুন ব্যবহারকারী? <Link href="/signup" className="text-[#057A55] font-bold hover:underline">অ্যাকাউন্ট তৈরি করুন</Link>
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