import type { Meta, StoryObj } from "@storybook/react";
import { RentalFilterBar } from "@/components/rental/RentalFilterBar";

/**
 * ## RentalFilterBar（賃貸検索フィルター）
 *
 * 賃貸物件一覧ページで使用される検索フィルターバー。
 * 組子細工風の極細区切り線（subtle-line）が和風の緻密さを演出。
 *
 * **デザイン原則**:
 * - 背景: 和紙白（#F5F3EF）
 * - 区切り: 組子細工風 subtle-line（1px opacity 8%）
 * - 展開時: 内側光彩 inner-light（inset glow）
 * - アクティブチップ: 光金銅（#C9A96E）背景 + 和紙白文字
 * - 非アクティブチップ: 混凝土灰（#E8E4DF）背景 + 錆鉄灰（#5A5A5A）文字
 * - クリアボタン: 朽木棕（#8B7355）文字 + 下線
 *
 * **使用Token**:
 * - `colors/dominant/washi-white` — 背景
 * - `colors/accent/light-copper` — アクティブチップ
 * - `colors/dominant/concrete-grey` — 非アクティブチップ
 * - `effect/shadow/inner-light` — 展開時光彩
 * - `effect/shadow/subtle-line` — 区切り線
 */
const meta = {
  title: "賃貸/RentalFilterBar",
  component: RentalFilterBar,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/賃貸_RentalFilterBar?node-id=12-1",
    },
  },
  argTypes: {
    activeFilters: {
      control: "object",
      description: "アクティブフィルター配列",
    },
    onFilterChange: { action: "filterChanged" },
    onClear: { action: "cleared" },
  },
} satisfies Meta<typeof RentalFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeFilters: [],
  },
  parameters: {
    docs: {
      storyDescription: "初期状態。すべてのフィルターが非アクティブ。",
    },
  },
};

export const ActiveFilters: Story = {
  args: {
    activeFilters: [
      { key: "area", label: "渋谷区", value: "shibuya" },
      { key: "rent", label: "¥10万〜¥15万", value: "10-15" },
      { key: "walk", label: "徒歩10分以内", value: "10" },
    ],
  },
  parameters: {
    docs: {
      storyDescription:
        "3つのアクティブフィルター。光金銅背景で選択状態を強調。",
    },
  },
};

export const Expanded: Story = {
  args: {
    activeFilters: [{ key: "type", label: "1K", value: "1k" }],
  },
  parameters: {
    docs: {
      storyDescription:
        "展開状態。内側光彩（inner-light）が発生し、フィルター領域が強調される。",
    },
  },
};
