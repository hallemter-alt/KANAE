import type { Meta, StoryObj } from "@storybook/react";
import { MaterialSpecSheet } from "@/components/materials/MaterialSpecSheet";

/**
 * ## MaterialSpecSheet（建材仕様書）
 *
 * 建材貿易業務で使用される製品仕様表示コンポーネント。
 * 無影白背景（#FFFFFF）で建材の色を正確に再現。
 *
 * **デザイン原則**:
 * - 背景は純白（#FFFFFF）— 建材の色味を正確に伝えるため
 * - 仕様表は等幅フォント（RobotoMono 14px）で厳密に整列
 * - 単位（mm, kg, ㎡）は錆鉄灰（#5A5A5A）12px
 * - ヘッダーは混凝土灰（#E8E4DF）背景
 * - 輸入品バッジは光金銅（#C9A96E）1px 破線枠線 — 異国情緒と高級感
 *
 * **使用Token**:
 * - `colors/dominant/concrete-grey` — テーブルヘッダー
 * - `colors/secondary/charcoal-black` — テーブルボーダー（opacity 12%）
 * - `font/data/mono` — 仕様数値
 * - `colors/accent/light-copper` — 輸入品バッジ
 */
const meta = {
  title: "建材貿易/MaterialSpecSheet",
  component: MaterialSpecSheet,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/建材_MaterialSpecSheet?node-id=60-1",
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
    productName: {
      control: "text",
      description: "製品名（NotoSansJP 18px Bold）",
    },
    modelNo: { control: "text", description: "型番（RobotoMono 12px 錆鉄灰）" },
    specs: {
      control: "object",
      description: "仕様データ配列（項目・数値・単位）",
    },
    isImported: { control: "boolean", description: "輸入品フラグ" },
    origin: { control: "text", description: "生産国" },
    imageUrl: { control: "text", description: "製品写真（無影白背景）" },
  },
} satisfies Meta<typeof MaterialSpecSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSpecs = [
  { item: "サイズ", value: "600", unit: "×600×10mm" },
  { item: "重量", value: "28.5", unit: "kg/枚" },
  { item: "吸水率", value: "0.05", unit: "%以下" },
  { item: "破壊強度", value: "1,300", unit: "N" },
  { item: "摩耗係数", value: "PEI", unit: "Class 5" },
  { item: "防滑性", value: "0.6", unit: "以上" },
];

export const Domestic: Story = {
  args: {
    productName: "国産大理石調タイル",
    modelNo: "JPN-MR-6001",
    specs: mockSpecs,
    isImported: false,
    origin: "日本（滋賀県）",
    imageUrl: "/mock/tile-domestic.jpg",
  },
  parameters: {
    docs: {
      storyDescription:
        "国産建材。純白背景に製品写真を中央配置。仕様表は等幅フォントで厳密に整列。",
    },
  },
};

export const Imported: Story = {
  args: {
    productName: "イタリア産テラコッタタイル",
    modelNo: "ITA-TC-4502",
    specs: [
      { item: "サイズ", value: "450", unit: "×450×12mm" },
      { item: "重量", value: "32.0", unit: "kg/枚" },
      { item: "吸水率", value: "3.0", unit: "%以下" },
      { item: "破壊強度", value: "1,100", unit: "N" },
    ],
    isImported: true,
    origin: "イタリア（トスカーナ）",
    imageUrl: "/mock/tile-italian.jpg",
  },
  parameters: {
    docs: {
      storyDescription:
        "輸入建材。左上に光金銅の破線枠線バッジ「IMPORTED」。異国情緒と高級感を演出。",
    },
  },
};

export const LongSpec: Story = {
  args: {
    productName: "高級無垢フローリング",
    modelNo: "SWD-WO-1820",
    specs: [
      { item: "樹種", value: "ホワイトオーク", unit: "" },
      { item: "等級", value: "ナチュラル", unit: "グレード" },
      { item: "サイズ", value: "1,820", unit: "×189×15mm" },
      { item: "含水率", value: "8", unit: "%" },
      { item: "表面仕上", value: "オイル塗装", unit: "（自然系）" },
      { item: "JAS規格", value: "F☆☆☆☆", unit: "取得" },
      { item: "梱包", value: "8", unit: "枚/ケース" },
      { item: "生産国", value: "スウェーデン", unit: "" },
    ],
    isImported: true,
    origin: "スウェーデン",
    imageUrl: "/mock/flooring-oak.jpg",
  },
  parameters: {
    docs: {
      storyDescription:
        "多項目仕様書。8行の仕様表でも等幅フォントにより整然と配置される。",
    },
  },
};
