import type { Meta, StoryObj } from "@storybook/react";
import { VendorCard } from "@/components/bm/VendorCard";

/**
 * ## VendorCard（協力業者カード）
 *
 * BM画面で使用される協力業者（修繕・清掃・設備）情報カード。
 * 評価星型と得意分野タグで業者選定を支援。
 *
 * **デザイン原則**:
 * - 背景: 和紙白（#F5F3EF）
 * - アイコン: 業種アイコン（朽木棕 #8B7355）
 * - 評価星: 塗り 光金銅（#C9A96E）、空 混凝土灰（#E8E4DF）
 * - 得意タグ: 光金銅 1px 枠線 + 光金銅文字
 * - 区切り: subtle-line
 *
 * **使用Token**:
 * - `colors/secondary/decay-wood` — アイコン
 * - `colors/accent/light-copper` — 星塗り・タグ
 * - `colors/dominant/concrete-grey` — 星空
 * - `effect/shadow/subtle-line` — 区切り
 */
const meta = {
  title: "BM/VendorCard",
  component: VendorCard,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/BM_VendorCard?node-id=55-1",
    },
  },
  argTypes: {
    name: { control: "text", description: "業者名（NotoSansJP 16px Bold）" },
    specialty: { control: "text", description: "得意分野" },
    rating: { control: "number", description: "評価（0-5）" },
    tags: { control: "object", description: "対応可能作業タグ配列" },
    contact: { control: "text", description: "連絡先" },
  },
} satisfies Meta<typeof VendorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HighRated: Story = {
  args: {
    name: "株式会社建装",
    specialty: "外壁防水・屋上補修",
    rating: 5,
    tags: ["防水", "屋上", "外壁", "緊急対応"],
    contact: "03-1234-5678",
  },
  parameters: {
    docs: {
      storyDescription:
        "高評価業者（5星）。すべての星が光金銅で塗られ、信頼感を演出。",
    },
  },
};

export const MediumRated: Story = {
  args: {
    name: "水道サービス",
    specialty: "給排水管清掃・水栓交換",
    rating: 3,
    tags: ["給水管", "排水管", "水栓"],
    contact: "03-8765-4321",
  },
  parameters: {
    docs: {
      storyDescription: "標準評価業者（3星）。星3つが光金銅、2つが混凝土灰。",
    },
  },
};

export const NewVendor: Story = {
  args: {
    name: "新規業者（登録待ち）",
    specialty: "電気設備点検",
    rating: 0,
    tags: ["電気", "照明"],
    contact: "未登録",
  },
  parameters: {
    docs: {
      storyDescription:
        "新規業者（評価なし）。星がすべて混凝土灰で「未評価」を表現。",
    },
  },
};
