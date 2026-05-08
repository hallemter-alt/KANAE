import CapRateBadge from "@/components/investment/CapRateBadge";

export type InvestmentDashboardProps = {
  activeTab?: "overview" | "propertyDetail" | "portfolio";
  yieldRate: number;
  targetYield: number;
  totalAssets: string;
};

export function InvestmentDashboard({
  activeTab = "overview",
  yieldRate,
  targetYield,
  totalAssets,
}: InvestmentDashboardProps) {
  const tabs = [
    { id: "overview", label: "概要" },
    { id: "propertyDetail", label: "物件詳細" },
    { id: "portfolio", label: "ポートフォリオ" },
  ] as const;

  return (
    <section className="overflow-hidden rounded border border-charcoal-black/10 bg-brick-white shadow-subtle-line md:grid md:grid-cols-[220px_1fr]">
      <aside className="bg-charcoal-black p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <div key={tab.id} className={`rounded px-3 py-2 text-sm ${activeTab === tab.id ? "bg-light-copper text-charcoal-black" : "text-concrete-grey"}`}>
              {tab.label}
            </div>
          ))}
        </nav>
      </aside>
      <div className="space-y-4 p-5">
        <h3 className="font-serif-jp text-lg text-charcoal-black">投資ダッシュボード</h3>
        <p className="text-sm text-rust-iron">総資産: <span className="font-mono-data text-charcoal-black">{totalAssets}</span></p>
        <CapRateBadge
          variant={yieldRate >= targetYield ? "targetAchieved" : "medium"}
          value={yieldRate}
          target={targetYield}
        />
      </div>
    </section>
  );
}

export default InvestmentDashboard;
