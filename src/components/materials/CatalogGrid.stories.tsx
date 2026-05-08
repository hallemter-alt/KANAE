import type { Meta, StoryObj } from "@storybook/react";
import { CatalogGrid } from "@/components/materials/CatalogGrid";

/**
 * ## CatalogGrid（建材カタロググリッド）
 *
 * 建材貿易ページで使用される製品一覧グリッド。
 * 無影白背景（#FFFFFF）で建材の色味を正確に再現。
 *
 * **デザイン原則**:
 * - 3列（1440px）/ 2列（768px）/ 1列（375px）
 * - カード背景: 純白（#FFFFFF）
 * - Hover: 光金銅（#C9A96E）1px 枠線 + card-hover（控えめ）
 * - カテゴリタグ: 朽木棕（#8B7355）背景 + 和紙白文字 10px
 * - 製品名: NotoSansJP 16px Bold
 * - 型番: RobotoMono 12px 錆鉄灰（#5A5A5A）
 * - 輸入品タグ: 光金銅 1px 破線枠線
 *
 * **使用Token**:
 * - `colors/dominant/washi-white` — カテゴリタグ文字
 * - `colors/secondary/decay-wood` — カテゴリタグ背景
 * - `colors/accent/light-copper` — Hover枠線・輸入品タグ
 * - `effect/shadow/card-hover` — Hoverシャドウ
 */
const meta = {
  title: "建材貿易/CatalogGrid",
  component: CatalogGrid,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/建材_CatalogGrid?node-id=65-1",
    },
    backgrounds: {
      default: "純白",
      values: [
        { name: "純白", value: "#FFFFFF" },
        { name: "和紙白", value: "#F5F3EF" },
      ],
    },
  },
  argTypes: {
    products: { control: "object", description: "製品データ配列" },
    columns: { control: "select", options: [1, 2, 3], description: "カラム数" },
    onProductClick: { action: "productClicked" },
  },
} satisfies Meta<typeof CatalogGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProducts = [
  {
    id: "1",
    name: "大理石調タイル",
    modelNo: "JPN-MR-6001",
    category: "床材",
    isImported: false,
    origin: "日本",
    imageUrl: "/mock/tile-1.jpg",
    price: "¥2,800/枚",
  },
  {
    id: "2",
    name: "イタリアテラコッタ",
    modelNo: "ITA-TC-4502",
    category: "外壁材",
    isImported: true,
    origin: "イタリア",
    imageUrl: "/mock/tile-2.jpg",
    price: "¥4,500/枚",
  },
  {
    id: "3",
    name: "無垢オークフローリング",
    modelNo: "SWD-WO-1820",
    category: "床材",
    isImported: true,
    origin: "スウェーデン",
    imageUrl: "/mock/floor-1.jpg",
    price: "¥12,000/㎡",
  },
  {
    id: "4",
    name: "和紙調壁紙",
    modelNo: "JPN-WP-1010",
    category: "内装材",
    isImported: false,
    origin: "日本",
    imageUrl: "/mock/wall-1.jpg",
    price: "¥3,200/巻",
  },
  {
    id: "5",
    name: "ドイツ製断熱材",
    modelNo: "DEU-IN-5050",
    category: "建材",
    isImported: true,
    origin: "ドイツ",
    imageUrl: "/mock/insulation-1.jpg",
    price: "¥8,500/束",
  },
  {
    id: "6",
    name: "檜風呂パネル",
    modelNo: "JPN-HB-3030",
    category: "内装材",
    isImported: false,
    origin: "日本",
    imageUrl: "/mock/bath-1.jpg",
    price: "¥15,000/セット",
  },
];

export const ThreeColumns: Story = {
  args: {
    products: mockProducts,
    columns: 3,
  },
  parameters: {
    docs: {
      storyDescription:
        "3列表示（1440px）。製品写真は無影白背景、Hoverで光金銅枠線。",
    },
    viewport: { defaultViewport: "desktop" },
  },
};

export const TwoColumns: Story = {
  args: {
    products: mockProducts,
    columns: 2,
  },
  parameters: {
    docs: {
      storyDescription: "2列表示（768px）。タブレット向け。",
    },
    viewport: { defaultViewport: "tablet" },
  },
};

export const ImportedOnly: Story = {
  args: {
    products: mockProducts.filter((p) => p.isImported),
    columns: 3,
  },
  parameters: {
    docs: {
      storyDescription:
        "輸入品フィルタ表示。すべてのカードに光金銅の破線「IMPORTED」タグが付与される。",
    },
  },
};
