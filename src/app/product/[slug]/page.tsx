"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { renderIcon } from "@/lib/icons";

const toBengaliNumber = (num: number | string) => {
  const engToBng: { [key: string]: string } = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.' };
  return num.toString().replace(/[0-9.]/g, x => engToBng[x] || x);
};

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); 
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const { data: session, isPending: isAuthPending } = authClient.useSession();

  useEffect(() => {
    if (!isAuthPending && !session) {
      router.push("/signin");
    }
  }, [session, isAuthPending, router]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${slug}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (isAuthPending || loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F4] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#057A55] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session || !product) {
    return (
      <div className="min-h-screen bg-[#F4F7F4] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-[#057A55] mb-2">404</h1>
        <p className="text-gray-600">Product not found.</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-[#057A55] text-white rounded-lg">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  const priceDiff = Math.abs(product.today - product.yesterday);
  const isUp = product.change?.dir === 'up';
  
  const minPrice = product.markets?.length ? Math.min(...product.markets.map((m: any) => m.min)) : product.today;
  const maxPrice = product.markets?.length ? Math.max(...product.markets.map((m: any) => m.max)) : product.today;
  
  const unitBn = product.unit === 'kg' ? 'কেজি' : product.unit === 'liter' ? 'লিটার' : product.unit === 'hali' ? 'হালি' : product.unit;

  return (
    <div className="min-h-screen bg-[#F4F7F4] font-sans pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        
        <div className="text-[13px] text-gray-500 mb-5 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-800">হোম</Link>
          <span>›</span>
          <Link href={`/categories/${product.category}`} className="hover:text-gray-800">
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{product.nameBn}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] bg-[#F4F7F4] rounded-full flex items-center justify-center text-3xl">
            {renderIcon(product.image, "w-10 h-10")} 
        </div>
        
            <div>
              <h1 className="text-[22px] font-bold text-gray-900 mb-1">{product.nameBn}</h1>
              <p className="text-[13px] text-gray-500 mb-2">প্রতি {unitBn} - {product.categoryNameBn}</p>
              <p className="text-[13px] text-gray-700 font-medium">
                গতকালের তুলনায় আজ দাম <span className={`font-bold ${isUp ? 'text-[#E02424]' : 'text-[#057A55]'}`}>
                  {isUp ? 'বেড়েছে' : 'কমেছে'}
                </span> - {toBengaliNumber(priceDiff)} টাকা
              </p>
            </div>
          </div>

          <div className="bg-[#F8FAF8] border border-gray-100 rounded-xl p-4 text-center min-w-[130px]">
            <p className="text-[12px] text-gray-500 font-medium mb-1">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{toBengaliNumber(product.today)}</p>
            <p className="text-[11px] text-gray-500 mb-1">টাকা / {unitBn}</p>
            <p className={`text-[12px] font-bold ${isUp ? 'text-[#E02424]' : 'text-[#057A55]'}`}>
              {isUp ? '▲' : '▼'} {toBengaliNumber(product.change?.pct || 0)}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 sm:p-8">
          
          <div className="mb-10">
            <h2 className="text-[16px] font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col justify-center">
                <p className="text-[13px] text-gray-500 font-medium mb-1">সর্বনিম্ন দাম</p>
                <p className="text-[22px] font-bold text-[#057A55] mb-1">{toBengaliNumber(minPrice)} টাকা</p>
                <p className="text-[12px] text-gray-400">সবচেয়ে কম দামের বাজার</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col justify-center">
                <p className="text-[13px] text-gray-500 font-medium mb-1">সর্বোচ্চ দাম</p>
                <p className="text-[22px] font-bold text-[#E02424] mb-1">{toBengaliNumber(maxPrice)} টাকা</p>
                <p className="text-[12px] text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col justify-center">
                <p className="text-[13px] text-gray-500 font-medium mb-1">গড় দাম</p>
                <p className="text-[22px] font-bold text-[#057A55] mb-1">{toBengaliNumber(product.today)} টাকা</p>
                <p className="text-[12px] text-gray-400">প্রতি {unitBn}-এর হিসাব</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[16px] font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-white border-b border-gray-200 text-[13px] text-gray-500">
                      <th className="py-4 px-6 font-medium">বাজার</th>
                      <th className="py-4 px-6 font-medium">বিভাগ</th>
                      <th className="py-4 px-6 font-medium">সর্বনিম্ন</th>
                      <th className="py-4 px-6 font-medium">সর্বোচ্চ</th>
                      <th className="py-4 px-6 font-medium text-right">গড়</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-gray-800">
                    {product.markets?.map((row: any, idx: number) => {
                      const marketAvg = (row.min + row.max) / 2;
                      
                      return (
                        <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-gray-700">{row.market}</td>
                          <td className="py-4 px-6 text-gray-500">{row.division}</td>
                          <td className="py-4 px-6">{toBengaliNumber(row.min)} টাকা</td>
                          <td className="py-4 px-6">{toBengaliNumber(row.max)} টাকা</td>
                          <td className="py-4 px-6 text-right font-bold text-gray-900">
                            {toBengaliNumber(marketAvg % 1 === 0 ? marketAvg : marketAvg.toFixed(2))} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}