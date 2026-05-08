import type { Meta, StoryObj } from "@storybook/react";
import { PropertyDatabaseHub } from "@/components/database/PropertyDatabaseHub";

/**
 * ## PropertyDatabaseHub（扁平化物件データベース入口）
 *
 * 物件データベースへの統合入口。賃貸・売買・投資・民宿・BM・建材の
 * すべての物件情報を一元管理するハブ画面。スクロール中に各カードを
 * 直接タップして詳細へ遷移（扁平化）。階層は「入口→詳細」の2層のみ。
 *
 * **デザイン原則（扁平化・階層分離）**:
 * - 入口は極簡: 業務線アイコン + 件数バッジ + 最新更新時刻のみ
 * - 各業務線カードは独立してスクロール中にタップ可能
 * - ホバー/タップ時: 光金銅（#C9A96E）左Border 3px + 浮遊シャドウ
 * - 新規物件バッジ: 黄銅光（#D4AF37）背景 + 「NEW」文字
 * - 未処理バッジ: 紅銅警示（#B87333）背景 + 件数
 * - AI推薦済み: 光金銅枠線 + AIアイコン
 * - 検索バー: 和紙白背景 + 光金銅Focus枠線 + 内側光彩
 * - クイックフィルタ: 光金銅1px枠線チップ（駅近・新着・値下げ・高利回り）
 * - 一覧プレビュー: 横スクロールで最新5件をサムネイル表示
 *
 * **使用Token**:
 * - `colors/accent/light-copper` — Hover枠線・検索Focus・フィルタチップ
 * - `colors/accent/brass-gold` — NEWバッジ・推薦済みマーカー
 * - `colors/accent/red-copper` — 未処理・緊急バッジ
 * - `colors/dominant/washi-white` — カード背景
 * - `colors/secondary/charcoal-black` — テキスト
 * - `effect/shadow/card-hover` — 浮遊
 * - `effect/shadow/inner-light` — 検索Focus
 */
const meta = {
  title: "Database/PropertyDatabaseHub",
  component: PropertyDatabaseHub,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/Database_PropertyDatabaseHub?node-id=190-1",
    },
  },
  argTypes: {
    businessLines: { control: "object", description: "業務線データ配列" },
    quickFilters: { control: "object", description: "クイックフィルタ配列" },
    recentProperties: {
      control: "object",
      description: "最新物件プレビュー配列",
    },
    searchQuery: { control: "text", description: "検索クエリ" },
    onBusinessLineClick: { action: "businessLineClicked" },
    onQuickFilterClick: { action: "quickFilterClicked" },
    onPropertyClick: { action: "propertyClicked" },
  },
} satisfies Meta<typeof PropertyDatabaseHub>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockBusinessLines = [
  {
    id: "rental",
    name: "賃貸",
    count: 128,
    newCount: 5,
    pendingCount: 2,
    aiRecommended: 12,
    icon: "key",
    lastUpdated: "2026-05-08T19:00:00Z",
  },
  {
    id: "sales",
    name: "売買",
    count: 45,
    newCount: 3,
    pendingCount: 0,
    aiRecommended: 8,
    icon: "home",
    lastUpdated: "2026-05-08T18:30:00Z",
  },
  {
    id: "investment",
    name: "投資",
    count: 67,
    newCount: 8,
    pendingCount: 1,
    aiRecommended: 15,
    icon: "chart",
    lastUpdated: "2026-05-08T20:00:00Z",
  },
  {
    id: "inn",
    name: "民宿",
    count: 23,
    newCount: 1,
    pendingCount: 0,
    aiRecommended: 3,
    icon: "bed",
    lastUpdated: "2026-05-08T17:00:00Z",
  },
  {
    id: "management",
    name: "管理",
    count: 312,
    newCount: 0,
    pendingCount: 7,
    aiRecommended: 0,
    icon: "shield",
    lastUpdated: "2026-05-08T16:00:00Z",
  },
  {
    id: "bm",
    name: "BM",
    count: 89,
    newCount: 2,
    pendingCount: 4,
    aiRecommended: 0,
    icon: "wrench",
    lastUpdated: "2026-05-08T15:00:00Z",
  },
  {
    id: "materials",
    name: "建材",
    count: 156,
    newCount: 10,
    pendingCount: 0,
    aiRecommended: 0,
    icon: "box",
    lastUpdated: "2026-05-08T20:15:00Z",
  },
];

const mockQuickFilters = [
  { id: "near-station", label: "駅近", count: 23, active: false },
  { id: "new-arrival", label: "新着", count: 29, active: true },
  { id: "price-drop", label: "値下げ", count: 7, active: false },
  { id: "high-yield", label: "高利回り", count: 15, active: false },
  { id: "pet-ok", label: "ペット可", count: 12, active: false },
];

const mockRecentProperties = [
  {
    id: "p-8921",
    name: "代官山新築1K",
    price: "¥118,000",
    area: "25㎡",
    imageUrl: "/mock/db-rec-1.jpg",
    badge: "new",
  },
  {
    id: "p-8922",
    name: "中目黒2LDK",
    price: "¥68,800,000",
    area: "65㎡",
    imageUrl: "/mock/db-rec-2.jpg",
    badge: "ai-rec",
  },
  {
    id: "p-8923",
    name: "渋谷区投資物件",
    price: "利回り7.2%",
    area: "38㎡",
    imageUrl: "/mock/db-rec-3.jpg",
    badge: "high-yield",
  },
  {
    id: "p-8924",
    name: "民宿「楓の間」",
    price: "¥28,000/泊",
    area: "45㎡",
    imageUrl: "/mock/db-rec-4.jpg",
    badge: "new",
  },
  {
    id: "p-8925",
    name: "無垢オーク床材",
    price: "¥12,000/㎡",
    area: "-",
    imageUrl: "/mock/db-rec-5.jpg",
    badge: "new",
  },
];

export const DefaultHub: Story = {
  args: {
    businessLines: mockBusinessLines,
    quickFilters: mockQuickFilters,
    recentProperties: mockRecentProperties,
    searchQuery: "",
  },
  parameters: {
    docs: {
      storyDescription:
        "標準ハブ画面。7業務線を2列グリッドで表示。投資がNEW 8件（黄銅光バッジ）、管理が未処理7件（紅銅バッジ）。クイックフィルタは「新着」がアクティブ（光金銅背景）。下部に最新物件を横スクロール。",
    },
  },
};

export const WithSearch: Story = {
  args: {
    businessLines: mockBusinessLines,
    quickFilters: mockQuickFilters.map((f) => ({ ...f, active: false })),
    recentProperties: mockRecentProperties.slice(0, 2),
    searchQuery: "代官山",
  },
  parameters: {
    docs: {
      storyDescription:
        "検索状態。「代官山」入力中。検索バーが光金銅Focus枠線 + inner-light。リアルタイムで2件ヒット。業務線カードはフェードして非アクティブ化。",
    },
  },
};

export const FilterActive: Story = {
  args: {
    businessLines: mockBusinessLines.map((b) => ({
      ...b,
      count: b.id === "investment" ? 15 : 0,
    })),
    quickFilters: mockQuickFilters.map((f) => ({
      ...f,
      active: f.id === "high-yield",
    })),
    recentProperties: mockRecentProperties.filter(
      (p) => p.badge === "high-yield",
    ),
    searchQuery: "",
  },
  parameters: {
    docs: {
      storyDescription:
        "高利回りフィルタ適用中。投資業務線のみ15件表示（他は0件で錆鉄灰）。物件プレビューも高利回り物件のみ。",
    },
  },
};

export const EmptyState: Story = {
  args: {
    businessLines: mockBusinessLines.map((b) => ({
      ...b,
      count: 0,
      newCount: 0,
      pendingCount: 0,
    })),
    quickFilters: mockQuickFilters,
    recentProperties: [],
    searchQuery: "白金高輪",
  },
  parameters: {
    docs: {
      storyDescription:
        "検索結果0件。「白金高輪」でヒットなし。和紙白背景中央に「該当物件がありません」（NotoSerifJP 18px 錆鉄灰）+ 「検索条件を変更」ボタン（光金銅枠線）。",
    },
  },
};

export const MobileHub: Story = {
  args: {
    businessLines: mockBusinessLines,
    quickFilters: mockQuickFilters,
    recentProperties: mockRecentProperties,
    searchQuery: "",
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
    docs: {
      storyDescription:
        "Mobileハブ。業務線は1列（7枚縦積み）。スクロール中に各カードを直接タップ。最新物件は横スクロール（2枚表示）。検索バーは画面上部に固定（Sticky）。",
    },
  },
};

export const AdminView: Story = {
  args: {
    businessLines: mockBusinessLines.map((b) => ({
      ...b,
      pendingCount: b.pendingCount + 3,
    })),
    quickFilters: [
      ...mockQuickFilters,
      { id: "pending", label: "未処理", count: 24, active: false },
      { id: "ai-pending", label: "AI判定待ち", count: 8, active: true },
    ],
    recentProperties: mockRecentProperties,
    searchQuery: "",
  },
  parameters: {
    docs: {
      storyDescription:
        "管理者用拡張ビュー。「未処理」「AI判定待ち」フィルタを追加。AI判定待ち8件が光金銅枠線で強調。各業務線の未処理件数が増加。",
    },
  },
};
