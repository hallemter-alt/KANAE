import type { Meta, StoryObj } from "@storybook/react";
import { InvestmentDashboard } from "@/components/investment/InvestmentDashboard";

/**
 * ## InvestmentDashboard（投資家向けダッシュボード）
 *
 * 投資物件のポートフォリオ管理・收益率分析に使用されるダッシュボード。
 * サイドバーナビゲーション + メインコンテンツエリアの構成。
 *
 * **デザイン原則**:
 * - サイドバーは炭墨黑（#2C2C2C）背景で「重厚な資産管理」の印象
 * - 選択中メニューは左Border 3px 光金銅（#C9A96E）で視認性確保
 * - メインエリアは和紙白（#F5F3EF）で情報の読みやすさを担保
 * - 收益率達成時は黄銅光（#D4AF37）の Pulse Glow アニメーション
 *
 * **使用Token**:
 * - `colors/secondary/charcoal-black` — サイドバー背景
 * - `colors/dominant/washi-white` — メイン背景
 * - `colors/accent/light-copper` — アクティブメニュー
 * - `colors/accent/brass-gold` — 達成Glow
 * - `font/data/mono` — 收益率・価格表示
 */
const meta = {
  title: "投資物件提案/InvestmentDashboard",
  component: InvestmentDashboard,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/投資_InvestmentDashboard?node-id=20-1",
    },
    layout: "fullscreen",
  },
  argTypes: {
    activeTab: {
      control: "select",
      options: ["overview", "propertyDetail", "portfolio"],
      description: "アクティブなダッシュボードタブ",
    },
    yieldRate: { control: "number", description: "現在の利回り（%）" },
    targetYield: { control: "number", description: "目標利回り（%）" },
    totalAssets: { control: "text", description: "総資産額" },
  },
} satisfies Meta<typeof InvestmentDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    activeTab: "overview",
    yieldRate: 5.8,
    targetYield: 5.0,
    totalAssets: "¥450,000,000",
  },
  parameters: {
    docs: {
      storyDescription:
        "ポートフォリオ概要画面。サイドバー「概要」が光金銅の左Borderでアクティブ表示。",
    },
  },
};

export const TargetAchieved: Story = {
  args: {
    activeTab: "overview",
    yieldRate: 6.2,
    targetYield: 5.0,
    totalAssets: "¥620,000,000",
  },
  parameters: {
    docs: {
      storyDescription:
        "目標達成状態。收益率カードが黄銅光（#D4AF37）の Pulse Glow を発し、達成感を演出。",
    },
  },
};

export const PropertyDetail: Story = {
  args: {
    activeTab: "propertyDetail",
    yieldRate: 4.9,
    targetYield: 5.0,
    totalAssets: "¥120,000,000",
  },
  parameters: {
    docs: {
      storyDescription:
        "物件詳細画面。投資物件ごとの収支シミュレーションと築年数・駅距離のリスク指標。",
    },
  },
};
