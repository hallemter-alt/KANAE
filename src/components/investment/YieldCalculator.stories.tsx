import type { Meta, StoryObj } from "@storybook/react";
import { YieldCalculator } from "@/components/investment/YieldCalculator";

/**
 * ## YieldCalculator（利回りシミュレーター）
 *
 * 投資家向けの利回り計算フォーム。入力値に応じてリアルタイムに
 * 表面利回り・実質利回り・キャップレートを計算表示。
 *
 * **デザイン原則**:
 * - 入力フォーム: 和紙白背景 + 1px 朽木棕（#8B7355）ボーダー
 * - Focus時: 光金銅（#C9A96E）ボーダー + inner-light 光彩
 * - 結果表示: RobotoMono 32px Bold、目標達成で黄銅光 Glow
 * - 数値変化時: 0.3s ease-out でスムーズにカウントアップ
 *
 * **使用Token**:
 * - `colors/secondary/decay-wood` — 入力ボーダー
 * - `colors/accent/light-copper` — Focus状態
 * - `effect/shadow/inner-light` — Focus光彩
 * - `font/data/mono` — 結果数値
 */
const meta = {
  title: "投資物件提案/YieldCalculator",
  component: YieldCalculator,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/投資_YieldCalculator?node-id=25-1",
    },
  },
  argTypes: {
    propertyPrice: { control: "number", description: "物件価格（万円）" },
    annualRent: { control: "number", description: "年間賃料収入（万円）" },
    expenses: { control: "number", description: "年間経費（万円）" },
    targetYield: { control: "number", description: "目標利回り（%）" },
  },
} satisfies Meta<typeof YieldCalculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    propertyPrice: 5000,
    annualRent: 300,
    expenses: 60,
    targetYield: 5.0,
  },
  parameters: {
    docs: {
      storyDescription:
        "標準入力状態。表面利回り 6.0%、実質利回り 4.8%。目標未達。",
    },
  },
};

export const TargetAchieved: Story = {
  args: {
    propertyPrice: 4500,
    annualRent: 280,
    expenses: 40,
    targetYield: 5.0,
  },
  parameters: {
    docs: {
      storyDescription:
        "目標達成状態。実質利回り 5.33% が目標 5.0% を上回り、黄銅光（#D4AF37）の Glow を発する。",
    },
  },
};

export const HighYield: Story = {
  args: {
    propertyPrice: 3200,
    annualRent: 260,
    expenses: 35,
    targetYield: 6.0,
  },
  parameters: {
    docs: {
      storyDescription:
        "高利回り物件。実質利回り 7.03%。結果数値が大きく光る。",
    },
  },
};
