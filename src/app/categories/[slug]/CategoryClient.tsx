"use client";

import { useState } from "react";
import ProductCard from "../../../components/ProductCard";
import Link from "next/link";
import { renderIcon } from "../../../lib/icons";

const toBengaliNumber = (num: string | number) => {
  if (num === undefined || num === null) return "";
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/[0-9]/g, (w) => bengaliDigits[+w as any]);
};

export default function CategoryClient({ products, categoryDetails }: { products: any[], categoryDetails: any }) {
  const [sort, setSort] = useState("default");

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-2xl border border-gray-100 mt-6 shadow-sm">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই।</p>
        <Link href="/" className="btn bg-[#057A55] text-white hover:bg-[#046c4e] border-none font-normal px-8 h-12 min-h-12 rounded-lg">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "asc") return a.today - b.today;
    if (sort === "desc") return b.today - a.today;
    return 0; 
  });

  const displayIcon = categoryDetails?.icon || products[0]?.categoryIcon || "📦";
  const displayName = categoryDetails?.nameBn || products[0]?.categoryNameBn || "ক্যাটাগরি";

  return (
    <div className="space-y-6 mt-6">
      <div className="bg-white p-6 rounded-[16px] border border-gray-100 flex items-center gap-5 shadow-sm">
        <div className="w-[72px] h-[72px] bg-[#f8faf8] border border-gray-100 rounded-[20px] flex items-center justify-center shrink-0">
          {renderIcon(displayIcon, "w-10 h-10")}
        </div>
        <div>
          <h1 className="text-[26px] font-bold text-gray-900 leading-none mb-2">
            {displayName}
          </h1>
          <p className="text-gray-500 text-[14px] font-medium">প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="bg-white px-6 py-4 rounded-[16px] border border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center shadow-sm gap-4">
        <div className="w-full sm:w-auto"></div>
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-medium text-gray-600 whitespace-nowrap">সাজান:</span>
          <select 
            className="select select-bordered select-sm rounded-lg bg-[#f8faf8] border-gray-200 focus:outline-none focus:border-[#057A55] text-gray-700 font-medium h-10 w-full sm:w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div>
        <p className="text-[13px] text-gray-500 font-medium mb-4">মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}