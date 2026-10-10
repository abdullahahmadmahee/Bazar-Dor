import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-6xl font-bold text-[#057A55] mb-4">৪০৪</h2>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">পেজটি পাওয়া যায়নি</h3>
      <p className="text-gray-500 mb-8 max-w-md">
        আপনি যে পেজটি খুঁজছেন তা হয়তো ডিলিট হয়ে গেছে অথবা লিংকটি ভুল। 
      </p>
      <Link href="/" className="btn bg-[#057A55] text-white hover:bg-[#046c4e] border-none px-8 rounded-lg">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}