import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F7F4] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[120px] font-bold text-[#057A55] leading-none mb-4">৪০৪</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">পেজটি পাওয়া যায়নি</h2>
      <p className="text-gray-500 mb-8 max-w-md text-[15px]">
        আপনি যে পেজটি খুঁজছেন তা হয়তো ডিলিট হয়ে গেছে অথবা লিংকটি ভুল।
      </p>
      <Link 
        href="/" 
        className="bg-[#057A55] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#046c4b] transition-colors"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}