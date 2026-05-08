import type { Meta, StoryObj } from "@storybook/react";
import { SalesHero } from "@/components/sales/SalesHero";

/**
 * ## SalesHero（売買物件ランディングHero）
 *
 * 売買物件のランディングページ最上部に配置される大判Heroセクション。
 * 建物外観写真を背景に、物件愛称・価格・CTAを重ねて表示。
 *
 * **デザイン原則**:
 * - 建物写真は低彩度（-20%）+ コントラスト（+10%）処理で「資産の重み」を演出
 * - 左上から右下への晨光グラデーション（`effect/grad/morning`）
 * - 価格は光金銅（#C9A96E）の等幅フォントで「資産価値」の輝きを表現
 *
 * **使用Token**:
 * - `colors/secondary/charcoal-black` — ヘッドライン
 * - `colors/accent/light-copper` — 価格表示
 * - `colors/accent/brass-gold` — CTAボタン
 * - `effect/grad/morning` — 晨光オーバーレイ
 * - `font/heading/serif` — 物件愛称（36px）
 * - `font/data/mono` — 価格・坪単価
 */
const meta = {
  title: "売買/SalesHero",
  component: SalesHero,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/売買_SalesHero?node-id=10-5",
    },
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["mansion", "house", "land"],
      description: "物件タイプによるHeroバリアント",
    },
    propertyName: {
      control: "text",
      description: "物件愛称（NotoSerifJP 36px）",
    },
    price: {
      control: "text",
      description: "売価（RobotoMono 48px Bold 光金銅）",
    },
    pricePerTsubo: {
      control: "text",
      description: "坪単価（RobotoMono 14px 朽木棕）",
    },
    imageUrl: { control: "text", description: "建物外観大判写真" },
    ctaText: { control: "text", description: "CTAボタンテキスト" },
  },
} satisfies Meta<typeof SalesHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mansion: Story = {
  args: {
    variant: "mansion",
    propertyName: "代官山ヒルズレジデンス",
    price: "¥68,800,000",
    pricePerTsubo: "¥2,450,000/坪",
    imageUrl: "/mock/sales-mansion-hero.jpg",
    ctaText: "内見予約する",
  },
  parameters: {
    docs: {
      storyDescription:
        "マンションタイプ。晨光グラデーション（左上→右下）が建物の朝日を演出。",
    },
  },
};

export const House: Story = {
  args: {
    variant: "house",
    propertyName: "松涛の家",
    price: "¥128,000,000",
    pricePerTsubo: "¥3,200,000/坪",
    imageUrl: "/mock/sales-house-hero.jpg",
    ctaText: "資料請求",
  },
  parameters: {
    docs: {
      storyDescription:
        "一戸建てタイプ。緑豊かな環境写真に対し、光金銅の価格表示が「資産の輝き」を強調。",
    },
  },
};

export const Land: Story = {
  args: {
    variant: "land",
    propertyName: "中目黒開発用地",
    price: "¥45,000,000",
    pricePerTsubo: "¥1,850,000/坪",
    imageUrl: "/mock/sales-land-hero.jpg",
    ctaText: "現地案内予約",
  },
  parameters: {
    docs: {
      storyDescription:
        "土地タイプ。開けた空に対して晨光がより強く差し込む演出。",
    },
  },
};

export const HoverCTA: Story = {
  args: {
    ...Mansion.args,
  },
  parameters: {
    docs: {
      storyDescription:
        "CTA Hover状態。黄銅光（#D4AF37）背景から光が拡散（soft-glow blur 40px）。",
    },
  },
};
