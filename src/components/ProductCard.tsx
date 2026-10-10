import Link from "next/link";
import { renderIcon } from "../lib/icons";

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

export default function ProductCard({ product }: { product: any }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  
  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <div className="bg-white p-5 rounded-[16px] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all h-full flex flex-col justify-between">
        
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-[48px] h-[48px] bg-[#f8faf8] border border-gray-100 rounded-[14px] flex items-center justify-center shrink-0">
            {renderIcon(product.image, "w-8 h-8")}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-[17px] mb-0.5 leading-none">{product.nameBn}</h3>
            <p className="text-[#6b7280] text-[13px] font-medium">প্রতি {translateUnit(product.unit)}</p>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-[12px] text-[#6b7280] mb-1.5 font-medium">আজকের দাম</p>
          <div className="flex items-end justify-between">
            <p className="font-bold text-[22px] text-gray-900 leading-none">
              {toBengaliNumber(product.today)} টাকা
            </p>
            <div className={`flex items-center gap-1 text-[14px] font-bold mb-0.5 ${isUp ? 'text-[#E02424]' : isDown ? 'text-[#057A55]' : 'text-gray-400'}`}>
              <span className="text-[10px]">{isUp ? '▲' : isDown ? '▼' : '—'}</span>
              <span>{toBengaliNumber(product.change?.pct || 0)}%</span>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}