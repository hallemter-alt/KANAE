import type { Meta, StoryObj } from "@storybook/react";
import { RentRollChart } from "@/components/management/RentRollChart";

/**
 * ## RentRollChart（賃料収入推移チャート）
 *
 * 賃貸管理ポータルで使用される月次賃料収入棒グラフ。
 * 確定収入は光金銅（#C9A96E）、予測収入は光透過20（破線表現）で区別。
 *
 * **デザイン原則**:
 * - 確定棒: 光金銅 実線塗り
 * - 予測棒: light-through-20（rgba(201,169,110,0.20)）+ 破線ボーダー
 * - グリッド: 錆鉄灰（#5A5A5A）opacity 15%
 * - 軸ラベル: RobotoMono 12px 錆鉄灰
 * - ツールチップ: 和紙白背景 + building シャドウ
 * - 合計行: 混凝土灰背景 + NotoSansJP 14px Bold
 *
 * **使用Token**:
 * - `colors/accent/light-copper` — 確定収入
 * - `colors/light/through-20` — 予測収入
 * - `colors/secondary/rust-iron` — グリッド・軸ラベル
 * - `effect/shadow/building` — ツールチップ
 */
const meta = {
  title: "賃貸管理/RentRollChart",
  component: RentRollChart,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/賃貸管理_RentRollChart?node-id=38-1",
    },
  },
  argTypes: {
    data: { control: "object", description: "月次賃料データ配列" },
    year: { control: "text", description: "表示年度" },
    propertyName: { control: "text", description: "物件名" },
  },
} satisfies Meta<typeof RentRollChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRentData = [
  { month: "1月", confirmed: 380000, projected: 0 },
  { month: "2月", confirmed: 380000, projected: 0 },
  { month: "3月", confirmed: 380000, projected: 0 },
  { month: "4月", confirmed: 380000, projected: 0 },
  { month: "5月", confirmed: 360000, projected: 0 },
  { month: "6月", confirmed: 0, projected: 380000 },
  { month: "7月", confirmed: 0, projected: 380000 },
  { month: "8月", confirmed: 0, projected: 380000 },
  { month: "9月", confirmed: 0, projected: 380000 },
  { month: "10月", confirmed: 0, projected: 380000 },
  { month: "11月", confirmed: 0, projected: 380000 },
  { month: "12月", confirmed: 0, projected: 380000 },
];

export const CurrentYear: Story = {
  args: {
    data: mockRentData,
    year: "2026",
    propertyName: "代官山レジデンス",
  },
  parameters: {
    docs: {
      storyDescription:
        "2026年賃料推移。1-5月が確定（光金銅実線）、6-12月が予測（破線・光透過20）。",
    },
  },
};

export const FullYear: Story = {
  args: {
    data: mockRentData.map((d) => ({
      ...d,
      confirmed: d.confirmed || d.projected,
      projected: 0,
    })),
    year: "2025",
    propertyName: "中目黒マンション",
  },
  parameters: {
    docs: {
      storyDescription: "過去年度（全確定）。すべての棒が光金銅実線。",
    },
  },
};

export const VacancyImpact: Story = {
  args: {
    data: [
      { month: "1月", confirmed: 380000, projected: 0 },
      { month: "2月", confirmed: 380000, projected: 0 },
      { month: "3月", confirmed: 380000, projected: 0 },
      { month: "4月", confirmed: 0, projected: 0 },
      { month: "5月", confirmed: 0, projected: 0 },
      { month: "6月", confirmed: 0, projected: 380000 },
    ],
    year: "2026",
    propertyName: "渋谷区某マンション",
  },
  parameters: {
    docs: {
      storyDescription:
        "空室影響あり。4-5月が0円でグラフに空白が生じ、空室リスクを視覚化。",
    },
  },
};
