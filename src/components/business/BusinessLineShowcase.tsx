import RentalFilterBar from "@/components/rental/RentalFilterBar";
import RentalCard from "@/components/rental/RentalCard";
import SalesHero from "@/components/sales/SalesHero";
import PriceTrendChart from "@/components/sales/PriceTrendChart";
import InvestmentDashboard from "@/components/investment/InvestmentDashboard";
import YieldCalculator from "@/components/investment/YieldCalculator";
import TenantTable from "@/components/management/TenantTable";
import RepairTicket from "@/components/management/RepairTicket";
import InnRoomCard from "@/components/inn/InnRoomCard";
import VendorCard from "@/components/bm/VendorCard";
import MaterialSpecSheet from "@/components/materials/MaterialSpecSheet";
import N8NWorkflowDashboard from "@/components/workflow/N8NWorkflowDashboard";
import PropertyDatabaseHub from "@/components/database/PropertyDatabaseHub";
import { pickText, type Locale } from "@/lib/content";

type BusinessLineShowcaseProps = {
  locale?: Locale;
};

export default function BusinessLineShowcase({ locale = "ja" }: BusinessLineShowcaseProps) {
  return (
    <section className="py-16 md:py-24 bg-concrete-grey/20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 lg:px-16 space-y-10">
        <header className="text-center">
          <p className="text-sm text-decay-wood tracking-[0.2em] mb-3">BUSINESS UI</p>
          <h2 className="font-serif-jp text-2xl md:text-3xl font-bold text-charcoal-black">
            {pickText({ ja: "各事業線の業務UIサンプル", en: "Operational UI by business line", zh: "各业务线运营 UI 示例" }, locale)}
          </h2>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <RentalFilterBar activeFilters={[{ key: "walk", label: "徒歩10分以内", value: "10" }]} />
          <RentalCard propertyName="代官山駅前レジデンス" rentPrice="¥128,000" stationWalk={5} buildingAge={12} area="42.5㎡" variant="newArrival" />

          <SalesHero variant="mansion" propertyName="代官山ヒルズレジデンス" price="¥68,800,000" pricePerTsubo="¥2,450,000/坪" ctaText="資料請求" />
          <PriceTrendChart area="渋谷区代官山" propertyType="mansion" data={[{ month: "01", price: 6280 }, { month: "02", price: 6350 }, { month: "03", price: 6500 }, { month: "04", price: 6700 }]} />

          <InvestmentDashboard activeTab="overview" yieldRate={5.8} targetYield={5.0} totalAssets="¥450,000,000" />
          <YieldCalculator propertyPrice={9800} annualRent={620} expenses={120} targetYield={5.0} />

          <TenantTable sortable data={[{ roomNo: "201", name: "田中 一郎", rent: 132000, status: "occupied" }, { roomNo: "305", name: "鈴木 花子", rent: 148000, status: "notice" }]} />
          <RepairTicket status="inProgress" ticketNo="RP-2026-0402" title="給湯器動作不良" description="温水供給が不安定のため点検中" reportedAt="2026-05-02" roomNo="305" vendor="東京設備メンテナンス" />

          <InnRoomCard variant="deluxe" roomName="桜スイート" price="¥22,000" capacity="4名" features={["Wi-Fi", "キッチン", "駅徒歩7分"]} />
          <VendorCard name="東京設備メンテナンス" specialty="配管・空調" rating={4.7} tags={["緊急対応", "定期点検"]} contact="03-1234-5678" />

          <MaterialSpecSheet productName="防音複層ガラス" modelNo="GL-2X-90" origin="Japan" specs={[{ label: "熱貫流率", value: "1.4 W/㎡K" }, { label: "遮音等級", value: "T-2" }]} />
          <N8NWorkflowDashboard activeWorkflowId="wf-sync" workflows={[{ id: "wf-sync", name: "物件同期", trigger: "毎時", status: "active", successRate: 0.98 }, { id: "wf-alert", name: "異常通知", trigger: "イベント", status: "active", successRate: 0.99 }]} />
        </div>

        <PropertyDatabaseHub
          searchQuery="高田 2LDK"
          quickFilters={[{ id: "q1", label: "徒歩10分以内" }, { id: "q2", label: "ペット可" }]}
          businessLines={[{ id: "rent", name: "賃貸", count: 210 }, { id: "sale", name: "売買", count: 48 }, { id: "invest", name: "投資", count: 36 }]}
          searchResults={[{ id: "p1", title: "高田レジデンス 402", type: "賃貸", location: "豊島区" }, { id: "p2", title: "高田タワー 1502", type: "投資", location: "新宿区" }]}
        />
      </div>
    </section>
  );
}
