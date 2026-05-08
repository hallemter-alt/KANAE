import type { Meta, StoryObj } from "@storybook/react";
import { CapRateBadge } from "@/components/investment/CapRateBadge";

/**
 * ## CapRateBadge（キャップレート・利回りバッジ）
 *
 * 投資物件の利回り水準を視覚的に示すバッジコンポーネント。
 * 目標達成時は黄銅光（#D4AF37）の Pulse Glow アニメーションが発火。
 *
 * **デザイン原則**:
 * - High: 光金銅（#C9A96E）背景 + 和紙白文字
 * - Medium: 朽木棕（#8B7355）背景 + 和紙白文字
 * - Low: 混凝土灰（#E8E4DF）背景 + 錆鉄灰文字
 * - TargetAchieved: 黄銅光（#D4AF37）背景 + Pulse Gold アニメーション
 *
 * **使用Token**:
 * - `colors/accent/brass-gold` — TargetAchieved 背景
 * - `colors/accent/light-copper` — High 背景
 * - `colors/secondary/decay-wood` — Medium 背景
 * - `animation/pulse-gold` — 達成時 Glow
 */
const meta = {
  title: "投資物件提案/CapRateBadge",
  component: CapRateBadge,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/投資_CapRateBadge?node-id=28-1",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["high", "medium", "low", "targetAchieved"],
      description: "利回り水準バリアント",
    },
    value: { control: "number", description: "利回り数値（%）" },
    target: { control: "number", description: "目標利回り（%）" },
  },
} satisfies Meta<typeof CapRateBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const High: Story = {
  args: {
    variant: "high",
    value: 6.5,
    target: 5.0,
  },
  parameters: {
    docs: {
      storyDescription: "高利回り（6.5%）。光金銅背景で「優良物件」の印象。",
    },
  },
};

export const Medium: Story = {
  args: {
    variant: "medium",
    value: 4.8,
    target: 5.0,
  },
  parameters: {
    docs: {
      storyDescription: "標準利回り（4.8%）。朽木棕背景で「安定物件」の印象。",
    },
  },
};

export const Low: Story = {
  args: {
    variant: "low",
    value: 3.2,
    target: 5.0,
  },
  parameters: {
    docs: {
      storyDescription: "低利回り（3.2%）。混凝土灰背景で「慎重検討」の印象。",
    },
  },
};

export const TargetAchieved: Story = {
  args: {
    variant: "targetAchieved",
    value: 5.3,
    target: 5.0,
  },
  parameters: {
    docs: {
      storyDescription:
        "目標達成（5.3% ≥ 5.0%）。黄銅光背景 + Pulse Gold アニメーション（2秒周期）。",
    },
  },
};
