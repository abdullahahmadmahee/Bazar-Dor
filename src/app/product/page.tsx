import Link from "next/link";
import { renderIcon } from "@/lib/icons";

const toBengaliNumber = (num: string | number) => {
  if (num === undefined || num === null) return "";
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/[0-9]/g, (w) => bengaliDigits[+w as any]);
};

const translateUnit = (unit: string) => {
  if (!unit) return "";
  const map: Record<string, string> = {
    "kg": "কেজি",
    "litre": "লিটার",
    "dozen": "ডজন",
    "piece": "পিস",
    "gm": "গ্রাম",
  };
  return map[unit.toLowerCase()] || unit;
};

export default async function ProductDetailsPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${slug}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    return <div className="text-center py-20 text-xl font-bold text-red-500">পণ্যটি পাওয়া যায়নি।</div>;
  }

  const product = await res.json();
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const marketData = product.markets || [];

  return (
    <div className="min-h-screen bg-[#F2F5F3] font-sans pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        
        <div className="text-[13px] text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-800">হোম</Link>
          <span>›</span>
          <Link href={`/categories/${product.category}`} className="hover:text-gray-800 capitalize">{product.category}</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{product.nameBn}</span>
        </div>

        <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#F2F5F3] rounded-full flex items-center justify-center text-3xl shadow-inner border border-gray-50">
              {renderIcon(product.image, "w-10 h-10")}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.nameBn}</h1>
              <p className="text-[14px] text-gray-500 mb-2">প্রতি {translateUnit(product.unit)} - {product.category}</p>
            </div>
          </div>

          <div className="bg-[#F8FAF8] border border-gray-100 rounded-xl p-4 text-center min-w-[140px]">
            <p className="text-[12px] text-gray-500 font-medium mb-1">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{toBengaliNumber(product.today)}</p>
            <p className="text-[11px] text-gray-500 mb-1">টাকা / {translateUnit(product.unit)}</p>
            <p className={`text-[12px] font-bold ${isUp ? 'text-red-600' : isDown ? 'text-green-600' : 'text-gray-500'}`}>
              {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumber(product.change?.pct || 0)}%
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-[16px] p-5 border border-gray-100 shadow-sm flex flex-col justify-center">
              <p className="text-[13px] text-gray-500 font-medium mb-1">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-bold text-[#057A55] mb-1">{toBengaliNumber(product.priceSummary?.min || 0)} <span className="text-sm font-normal">টাকা</span></p>
              <p className="text-[12px] text-gray-400">সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="bg-white rounded-[16px] p-5 border border-gray-100 shadow-sm flex flex-col justify-center">
              <p className="text-[13px] text-gray-500 font-medium mb-1">সর্বোচ্চ দাম</p>
              <p className="text-2xl font-bold text-red-600 mb-1">{toBengaliNumber(product.priceSummary?.max || 0)} <span className="text-sm font-normal">টাকা</span></p>
              <p className="text-[12px] text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="bg-white rounded-[16px] p-5 border border-gray-100 shadow-sm flex flex-col justify-center">
              <p className="text-[13px] text-gray-500 font-medium mb-1">গড় দাম</p>
              <p className="text-2xl font-bold text-[#057A55] mb-1">{toBengaliNumber(product.priceSummary?.avg || product.today)} <span className="text-sm font-normal">টাকা</span></p>
              <p className="text-[12px] text-gray-400">প্রতি {translateUnit(product.unit)}-এর হিসাব</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
          <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-100 text-[13px] text-gray-500">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">বাজার</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">বিভাগ</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">সর্বনিম্ন</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">সর্বোচ্চ</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-gray-800">
                  {marketData.map((row: any, idx: number) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium">{row.market}</td>
                      <td className="py-4 px-6 text-gray-600">{row.division}</td>
                      <td className="py-4 px-6">{toBengaliNumber(row.min)} টাকা</td>
                      <td className="py-4 px-6">{toBengaliNumber(row.max)} টাকা</td>
                    </tr>
                  ))}
                  {marketData.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">কোনো বাজারের তথ্য পাওয়া যায়নি</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}