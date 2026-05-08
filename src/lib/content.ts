import type { LucideIcon } from "lucide-react";
import {
  Building,
  Building2,
  Briefcase,
  ClipboardList,
  Home,
  Hotel,
  Mail,
  Package,
  TrendingUp,
  Wrench,
} from "lucide-react";

export type Locale = "ja" | "en" | "zh";

export type LocalizedText = {
  ja: string;
  en: string;
  zh: string;
};

export type NavItem = {
  href: string;
  label: LocalizedText;
  icon: LucideIcon;
};

export type BusinessItem = {
  icon: LucideIcon;
  title: LocalizedText;
  subtitle: string;
  description: LocalizedText;
  features: LocalizedText[];
  colorHex: string;
  colorClass: "light-copper" | "brass-gold" | "celadon-blue" | "decay-wood";
};

export const supportedLanguages: ReadonlyArray<{
  code: Locale;
  label: string;
}> = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
] as const;

export const navItems: ReadonlyArray<NavItem> = [
  {
    href: "/",
    label: { ja: "ホーム", en: "Home", zh: "首页" },
    icon: Home,
  },
  {
    href: "/about/",
    label: { ja: "会社概要", en: "About", zh: "公司简介" },
    icon: Building2,
  },
  {
    href: "/business/",
    label: { ja: "事業内容", en: "Business", zh: "业务内容" },
    icon: Briefcase,
  },
  {
    href: "/contact/",
    label: { ja: "お問い合わせ", en: "Contact", zh: "联系我们" },
    icon: Mail,
  },
] as const;

export const businesses: ReadonlyArray<BusinessItem> = [
  {
    icon: Home,
    title: { ja: "不動産賃貸仲介", en: "Rental Brokerage", zh: "房产租赁中介" },
    subtitle: "Rental Brokerage",
    description: {
      ja: "東京都内の優良物件をご紹介。駅近・新築・ペット可・ファミリー向けなど、ご希望に合わせた物件探しをサポートいたします。",
      en: "Premium rental listings across Tokyo, including station-near, newly-built and pet-friendly homes.",
      zh: "提供东京都内优质房源，支持近站、新建、可养宠等多种需求。",
    },
    features: [
      {
        ja: "豊富な物件データベース",
        en: "Large property database",
        zh: "丰富的房源数据库",
      },
      {
        ja: "駅徒歩分数の詳細な検索",
        en: "Detailed station access filters",
        zh: "精细的步行到站筛选",
      },
      {
        ja: "内見・契約の完全サポート",
        en: "Viewing and contract support",
        zh: "看房与签约全流程支持",
      },
      {
        ja: "入居後のトラブル対応",
        en: "Post move-in assistance",
        zh: "入住后的问题处理",
      },
    ],
    colorHex: "#C9A96E",
    colorClass: "light-copper",
  },
  {
    icon: Building,
    title: { ja: "不動産売買仲介", en: "Sales Brokerage", zh: "房产买卖中介" },
    subtitle: "Sales Brokerage",
    description: {
      ja: "マンション・戸建・土地の売買を専門スタッフが丁寧にサポート。市場分析から交渉・契約・引渡しまで一貫してご対応いたします。",
      en: "End-to-end support for condo, house and land transactions from appraisal to closing.",
      zh: "覆盖公寓、独栋和土地交易，从估值到交割全程支持。",
    },
    features: [
      { ja: "正確な物件価格査定", en: "Accurate valuation", zh: "精准估价" },
      { ja: "市場動向分析レポート", en: "Market analysis report", zh: "市场分析报告" },
      { ja: "交渉・契約のプロサポート", en: "Negotiation support", zh: "专业谈判与合约支持" },
      { ja: "ローン手続き支援", en: "Loan support", zh: "贷款手续协助" },
    ],
    colorHex: "#D4AF37",
    colorClass: "brass-gold",
  },
  {
    icon: TrendingUp,
    title: { ja: "投資物件提案", en: "Investment Properties", zh: "投资物业提案" },
    subtitle: "Investment Properties",
    description: {
      ja: "利回りシミュレーション・キャップレート分析を基に、収益性の高い投資物件をご提案。不動産投資のプロとして資産形成をサポートいたします。",
      en: "Yield simulation and cap-rate analysis for high-performance investment portfolios.",
      zh: "通过收益率与资本化率分析，提供高回报投资物业方案。",
    },
    features: [
      { ja: "利回りシミュレーション", en: "Yield simulation", zh: "收益率模拟" },
      { ja: "キャップレート分析", en: "Cap-rate analysis", zh: "资本化率分析" },
      { ja: "リスク評価レポート", en: "Risk report", zh: "风险评估报告" },
      { ja: "ポートフォリオ管理", en: "Portfolio planning", zh: "资产组合管理" },
    ],
    colorHex: "#C9A96E",
    colorClass: "light-copper",
  },
  {
    icon: ClipboardList,
    title: { ja: "賃貸管理", en: "Property Management", zh: "租赁管理" },
    subtitle: "Property Management",
    description: {
      ja: "入居者対応・修繕管理・賃料収入管理まで、オーナー様の大切な資産を徹底的に管理いたします。",
      en: "Tenant support, rent operations, repair handling and periodic inspections.",
      zh: "包含租客应对、租金运营、维修处理与定期巡检。",
    },
    features: [
      { ja: "入居者募集・審査", en: "Tenant screening", zh: "租客招募与审核" },
      { ja: "賃料収入管理・報告", en: "Rent accounting", zh: "租金收支管理与报告" },
      { ja: "修繕・苦情対応", en: "Repair and complaints", zh: "维修与投诉处理" },
      { ja: "定期巡回・設備点検", en: "Periodic inspections", zh: "定期巡检与设备点检" },
    ],
    colorHex: "#7A9E9F",
    colorClass: "celadon-blue",
  },
  {
    icon: Hotel,
    title: { ja: "民泊運営", en: "Vacation Rental", zh: "民宿运营" },
    subtitle: "Vacation Rental",
    description: {
      ja: "旅館業法許可申請から運営代行まで、国内外のゲストをおもてなしする民泊運営をトータルサポートいたします。",
      en: "From licensing to operation, we support complete short-stay property management.",
      zh: "从旅馆法许可申请到日常代运营，提供民宿全流程支持。",
    },
    features: [
      { ja: "旅館業法許可申請支援", en: "License support", zh: "旅馆法许可申请支持" },
      { ja: "予約管理システム導入", en: "Reservation setup", zh: "预订系统导入" },
      { ja: "清掃・リネン管理", en: "Cleaning operations", zh: "保洁与布草管理" },
      { ja: "ゲスト対応・レビュー管理", en: "Guest communication", zh: "住客沟通与评价管理" },
    ],
    colorHex: "#D4AF37",
    colorClass: "brass-gold",
  },
  {
    icon: Wrench,
    title: { ja: "建物維持管理", en: "Building Maintenance", zh: "建筑维保" },
    subtitle: "Building Maintenance",
    description: {
      ja: "定期清掃・設備点検・修繕対応。建物の価値を維持し、安心してお住まいいただける環境をご提供いたします。",
      en: "Cleaning, maintenance and repair coordination to preserve long-term building value.",
      zh: "定期清洁、设备点检与维修安排，持续维护建筑价值。",
    },
    features: [
      { ja: "定期清掃・保守点検", en: "Regular cleaning", zh: "定期清洁与保养" },
      { ja: "修繕工事手配・管理", en: "Repair coordination", zh: "维修施工统筹" },
      { ja: "設備更新計画立案", en: "Facility renewal plan", zh: "设备更新计划" },
      { ja: "緊急対応体制", en: "Emergency response", zh: "紧急响应机制" },
    ],
    colorHex: "#C9A96E",
    colorClass: "light-copper",
  },
  {
    icon: Package,
    title: { ja: "建材貿易", en: "Building Materials", zh: "建材贸易" },
    subtitle: "Building Materials",
    description: {
      ja: "国内外の高品質建材を取り扱い。リノベーション・修繕に最適な素材をご提案いたします。",
      en: "Procurement and trading support for quality domestic and imported building materials.",
      zh: "提供国内外高品质建材采购与贸易支持。",
    },
    features: [
      { ja: "輸入建材の取り扱い", en: "Imported materials", zh: "进口建材供应" },
      { ja: "仕様書作成・見積", en: "Spec and quotation", zh: "规格书与报价" },
      { ja: "納期管理・物流手配", en: "Logistics planning", zh: "交期与物流安排" },
      { ja: "品質保証対応", en: "Quality support", zh: "质量保障支持" },
    ],
    colorHex: "#8B7355",
    colorClass: "decay-wood",
  },
] as const;

export const featureHighlights = [
  {
    title: { ja: "安心のライセンス", en: "Licensed and trusted", zh: "持证经营，值得信赖" },
    description: {
      ja: "宅地建物取引業 東京都知事(1)第107157号。公益社団法人東京都宅地建物取引業協会に加盟。",
      en: "Licensed brokerage in Tokyo with professional association membership.",
      zh: "持有东京都不动产执照，并加入行业协会。",
    },
  },
] as const;

export const defaultLocale: Locale = "ja";

export const localeSet = new Set<Locale>(["ja", "en", "zh"]);

export const isLocale = (value: string): value is Locale => localeSet.has(value as Locale);

export const withLocalePath = (locale: Locale, href: string) => {
  const normalized = href === "/" ? "" : href.replace(/\/$/, "");
  return `/${locale}${normalized}`;
};

export const pickText = (text: LocalizedText, locale: Locale = "ja") => text[locale];
