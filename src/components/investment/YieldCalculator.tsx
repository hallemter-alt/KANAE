import CapRateBadge from "@/components/investment/CapRateBadge";

export type YieldCalculatorProps = {
  propertyPrice: number;
  annualRent: number;
  expenses: number;
  targetYield: number;
};

export function YieldCalculator({
  propertyPrice,
  annualRent,
  expenses,
  targetYield,
}: YieldCalculatorProps) {
  const netIncome = annualRent - expenses;
  const yieldRate = propertyPrice > 0 ? (netIncome / propertyPrice) * 100 : 0;
  const variant = yieldRate >= targetYield ? "targetAchieved" : yieldRate >= targetYield * 0.9 ? "high" : "low";

  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="mb-3 font-serif-jp text-lg text-charcoal-black">利回り試算</h3>
      <dl className="grid grid-cols-2 gap-2 text-sm text-rust-iron">
        <div><dt>物件価格</dt><dd className="font-mono-data text-charcoal-black">{propertyPrice.toLocaleString()} 万円</dd></div>
        <div><dt>年間賃料</dt><dd className="font-mono-data text-charcoal-black">{annualRent.toLocaleString()} 万円</dd></div>
        <div><dt>年間経費</dt><dd className="font-mono-data text-charcoal-black">{expenses.toLocaleString()} 万円</dd></div>
        <div><dt>純収益</dt><dd className="font-mono-data text-charcoal-black">{netIncome.toLocaleString()} 万円</dd></div>
      </dl>
      <div className="mt-4"><CapRateBadge variant={variant} value={yieldRate} target={targetYield} /></div>
    </section>
  );
}

export default YieldCalculator;
