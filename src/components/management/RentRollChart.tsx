export type RentRollPoint = {
  month: string;
  amount: number;
};

export type RentRollChartProps = {
  data: RentRollPoint[];
  year: string;
  propertyName: string;
};

export function RentRollChart({ data, year, propertyName }: RentRollChartProps) {
  const max = Math.max(...data.map((entry) => entry.amount), 1);

  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="font-serif-jp text-lg text-charcoal-black">賃料収入推移 ({year})</h3>
      <p className="mb-3 text-xs text-rust-iron">{propertyName}</p>
      <div className="flex h-40 items-end gap-1 rounded bg-washi-white p-3">
        {data.map((entry) => (
          <div key={entry.month} className="flex-1">
            <div className="w-full rounded-t bg-celadon-blue" style={{ height: `${(entry.amount / max) * 100}%` }} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default RentRollChart;
