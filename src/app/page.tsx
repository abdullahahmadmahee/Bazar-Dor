import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
export const instant = false;

const toBengaliNumber = (num: string | number) => {
  if (num === undefined || num === null) return "";
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/[0-9]/g, (w) => bengaliDigits[+w as any]);
};

export default async function Home() {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
    cache: "force-cache"
  });
  const products = await res.json();

  const risers = [...products]
    .filter((p: any) => p.change?.dir === "up")
    .sort((a: any, b: any) => parseFloat(b.change?.pct) - parseFloat(a.change?.pct))
    .slice(0, 6);

  const fallers = [...products]
    .filter((p: any) => p.change?.dir === "down")
    .sort((a: any, b: any) => parseFloat(b.change?.pct) - parseFloat(a.change?.pct))
    .slice(0, 6);

  return (
    <div className="space-y-16">
      <Hero />

      <section>
        <h2 className="text-[20px] font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-[#E02424] text-[18px]">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {risers.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[20px] font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-[#057A55] text-[18px]">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {fallers.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="scroll-mt-32">
        <div className="mb-6">
          <h2 className="text-[20px] font-bold text-gray-900 mb-1">সব পণ্য</h2>
          <p className="text-[13px] text-gray-500 font-medium">মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}