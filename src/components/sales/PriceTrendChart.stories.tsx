import type { Meta, StoryObj } from "@storybook/react";
import { PriceTrendChart } from "@/components/sales/PriceTrendChart";

/**
 * ## PriceTrendChart（価格推移チャート）
 *
 * 売買物件ページで使用される価格推移ラインチャート。
 * 光金銅（#C9A96E）のラインで「資産価値の上昇」を演出。
 *
 * **デザイン原則**:
 * - ライン: 光金銅 2px
 * - 塗り: light-through-10（rgba(201,169,110,0.10)）
 * - グリッド: 錆鉄灰（#5A5A5A）opacity 20%
 * - ツールチップ: 和紙白背景 + building シャドウ
 * - データポイント: 光金銅 6px 円
 * - 軸ラベル: RobotoMono 12px 錆鉄灰
 *
 * **使用Token**:
 * - `colors/accent/light-copper` — ライン・データポイント
 * - `colors/light/through-10` — 塗り
 * - `colors/secondary/rust-iron` — グリッド・軸ラベル
 * - `effect/shadow/building` — ツールチップ
 */
const meta = {
  title: "売買/PriceTrendChart",
  component: PriceTrendChart,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/売買_PriceTrendChart?node-id=15-1",
    },
  },
  argTypes: {
    data: { control: "object", description: "月次価格データ配列" },
    area: { control: "text", description: "対象エリア名" },
    propertyType: {
      control: "select",
      options: ["mansion", "house", "land"],
      description: "物件タイプ",
    },
  },
} satisfies Meta<typeof PriceTrendChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = [
  { month: "2025-01", price: 6280 },
  { month: "2025-02", price: 6350 },
  { month: "2025-03", price: 6420 },
  { month: "2025-04", price: 6380 },
  { month: "2025-05", price: 6500 },
  { month: "2025-06", price: 6580 },
  { month: "2025-07", price: 6650 },
  { month: "2025-08", price: 6720 },
  { month: "2025-09", price: 6800 },
  { month: "2025-10", price: 6950 },
  { month: "2025-11", price: 7100 },
  { month: "2025-12", price: 7250 },
  { month: "2026-01", price: 7380 },
  { month: "2026-02", price: 7450 },
  { month: "2026-03", price: 7600 },
  { month: "2026-04", price: 7750 },
];

export const MansionTrend: Story = {
  args: {
    data: mockData,
    area: "渋谷区代官山",
    propertyType: "mansion",
  },
  parameters: {
    docs: {
      storyDescription:
        "マンション価格推移（渋谷区代官山）。光金銅ラインが右上がりで資産価値上昇を演出。",
    },
  },
};

export const HouseTrend: Story = {
  args: {
    data: mockData.map((d) => ({ ...d, price: Math.round(d.price * 1.8) })),
    area: "目黒区青葉台",
    propertyType: "house",
  },
  parameters: {
    docs: {
      storyDescription: "一戸建て価格推移。マンション比で高額帯。",
    },
  },
};

export const DecliningTrend: Story = {
  args: {
    data: mockData.map((d, i) => ({ ...d, price: 8000 - i * 120 })),
    area: "千代田区丸の内",
    propertyType: "mansion",
  },
  parameters: {
    docs: {
      storyDescription:
        "価格下落トレンド。光金銅ラインが右下がり。投資家の注意喚起に使用。",
    },
  },
};
