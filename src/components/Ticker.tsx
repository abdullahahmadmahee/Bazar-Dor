export default async function Ticker() {
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      cache: "no-store",
    });
    const products = await res.json();
    const tickerItems = products.slice(0, 15);

    return (
      <div className="w-full bg-white border-t border-gray-100 py-2 overflow-hidden flex">
        <div className="animate-marquee whitespace-nowrap flex gap-8 px-4 w-max">
          {tickerItems.map((item: any, i: number) => (
            <span key={i} className="text-sm text-gray-700 flex items-center gap-2">
              <span className={item.change.dir === "up" ? "text-red-500" : item.change.dir === "down" ? "text-green-500" : "text-gray-500"}>
                {item.change.dir === "up" ? "▲" : item.change.dir === "down" ? "▼" : "—"}
              </span>
              {item.name} {item.today} টাকা/{item.unit}{" "}
              <span className={item.change.dir === "up" ? "text-red-500" : item.change.dir === "down" ? "text-green-500" : "text-gray-500"}>
                {item.change.pct}%
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return null;
  }
}