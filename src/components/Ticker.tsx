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

export default async function Ticker() {
  let products = [];
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      cache: "force-cache"
    });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch ticker data", error);
  }

  if (!products.length) return null;

  return (
    <div className="w-full bg-[#f8faf8] border-b border-gray-100 overflow-hidden py-2.5">
      <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
        {[...products, ...products].map((item: any, index: number) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";

          return (
            <div key={`${item.id}-${index}`} className="flex items-center gap-2.5 px-5 border-r border-gray-200 last:border-none">
              <span className="flex items-center justify-center shrink-0 opacity-80">
                {renderIcon(item.image, "w-[16px] h-[16px]")}
              </span>
              
              <span className="text-[14px] font-semibold text-[#374151]">
                {item.nameBn}
              </span>
              
              <span className="text-[14px] font-medium text-[#6b7280]">
                {toBengaliNumber(item.today)} টাকা/{translateUnit(item.unit)}
              </span>
              
              <div className={`flex items-center gap-1 text-[13px] font-bold ${isUp ? 'text-[#E02424]' : isDown ? 'text-[#057A55]' : 'text-gray-400'}`}>
                <span className="text-[10px]">{isUp ? '▲' : isDown ? '▼' : '—'}</span>
                <span>{toBengaliNumber(item.change?.pct || 0)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}