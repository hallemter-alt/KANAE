export type PricePoint = {
  month: string;
  price: number;
};

export type PriceTrendChartProps = {
  data: PricePoint[];
  area: string;
  propertyType: "mansion" | "house" | "land";
};

export function PriceTrendChart({ data, area, propertyType }: PriceTrendChartProps) {
  const max = Math.max(...data.map((item) => item.price), 1);
  const min = Math.min(...data.map((item) => item.price), 0);
  const latest = data[data.length - 1]?.price ?? 0;

  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif-jp text-lg text-charcoal-black">価格推移 ({area})</h3>
        <span className="rounded bg-concrete-grey px-2 py-1 text-xs text-rust-iron">{propertyType}</span>
      </div>
      <div className="flex h-40 items-end gap-1 rounded bg-washi-white p-3">
        {data.map((item) => (
          <div key={item.month} className="flex-1">
            <div
              className="w-full rounded-t bg-light-copper/80"
              style={{ height: `${((item.price - min) / Math.max(max - min, 1)) * 100}%` }}
              title={`${item.month}: ${item.price}`}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-rust-iron">直近価格: <span className="font-mono-data font-semibold text-charcoal-black">¥{latest.toLocaleString()}万</span></p>
    </section>
  );
}

export default PriceTrendChart;
