import type { Meta, StoryObj } from "@storybook/react";
import { StationAccessBadge } from "@/components/rental/StationAccessBadge";

/**
 * ## StationAccessBadge（駅近アクセスバッジ）
 *
 * 賃貸物件カード・詳細画面で使用される駅徒歩分数バッジ。
 * 黄銅光（#D4AF37）背景で「駅近」の価値を視覚的に強調。
 *
 * **デザイン原則**:
 * - 背景: 黄銅光（#D4AF37）
 * - 文字: 和紙白（#F5F3EF）
 * - フォント: NotoSansJP 12px Bold
 * - アイコン: 徒歩/バス/車のピクトグラム（和紙白）
 * - 角丸: 4px（極小）
 *
 * **使用Token**:
 * - `colors/accent/brass-gold` — 背景
 * - `colors/dominant/washi-white` — 文字・アイコン
 * - `font/body/sans` — 12px Bold
 */
const meta = {
  title: "賃貸/StationAccessBadge",
  component: StationAccessBadge,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/賃貸_StationAccessBadge?node-id=8-1",
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["walk", "bus", "car"],
      description: "移動手段",
    },
    minutes: { control: "number", description: "所要時間（分）" },
    stationName: { control: "text", description: "駅名・地名" },
  },
} satisfies Meta<typeof StationAccessBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Walk: Story = {
  args: {
    type: "walk",
    minutes: 5,
    stationName: "代官山駅",
  },
  parameters: {
    docs: {
      storyDescription:
        "徒歩5分。最も価値の高い「駅近」状態。黄銅光背景で強調。",
    },
  },
};

export const Bus: Story = {
  args: {
    type: "bus",
    minutes: 10,
    stationName: "渋谷駅",
  },
  parameters: {
    docs: {
      storyDescription: "バス10分。バスアイコン + 黄銅光背景。",
    },
  },
};

export const Car: Story = {
  args: {
    type: "car",
    minutes: 5,
    stationName: "駐車場",
  },
  parameters: {
    docs: {
      storyDescription: "車5分。駐車場アイコン。駐車場付き物件の訴求に使用。",
    },
  },
};
