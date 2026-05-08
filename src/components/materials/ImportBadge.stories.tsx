import type { Meta, StoryObj } from "@storybook/react";
import { ImportBadge } from "@/components/materials/ImportBadge";

/**
 * ## ImportBadge（輸入品・在庫バッジ）
 *
 * 建材カタログで使用される製品属性バッジ。
 * 輸入品は光金銅（#C9A96E）の破線枠線で異国情緒と高級感を演出。
 *
 * **デザイン原則**:
 * - Domestic: 混凝土灰背景 + 炭墨黑文字
 * - Imported: 光金銅 1px 破線枠線 + 光金銅文字（背景なし）
 * - InStock: 青磁差し色（#7A9E9F）背景 + 和紙白文字
 * - MadeToOrder: 朽木棕 1px 枠線 + 朽木棕文字
 *
 * **使用Token**:
 * - `colors/accent/light-copper` — Imported 枠線・文字
 * - `colors/accent/celadon-blue` — InStock 背景
 * - `colors/secondary/decay-wood` — MadeToOrder 枠線
 */
const meta = {
  title: "建材貿易/ImportBadge",
  component: ImportBadge,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/建材_ImportBadge?node-id=70-1",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["domestic", "imported", "inStock", "madeToOrder"],
      description: "バッジタイプ",
    },
    origin: { control: "text", description: "生産国・地域" },
  },
} satisfies Meta<typeof ImportBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Domestic: Story = {
  args: {
    variant: "domestic",
    origin: "日本（滋賀県）",
  },
  parameters: {
    docs: {
      storyDescription: "国産品。混凝土灰背景で素朴さを演出。",
    },
  },
};

export const Imported: Story = {
  args: {
    variant: "imported",
    origin: "イタリア（トスカーナ）",
  },
  parameters: {
    docs: {
      storyDescription:
        "輸入品。光金銅の破線枠線（dashed border）が異国情緒と高級感を演出。背景は透明。",
    },
  },
};

export const InStock: Story = {
  args: {
    variant: "inStock",
    origin: "ドイツ",
  },
  parameters: {
    docs: {
      storyDescription:
        "在庫あり。青磁差し色背景で「即納可能」を直感的に表現。",
    },
  },
};

export const MadeToOrder: Story = {
  args: {
    variant: "madeToOrder",
    origin: "スウェーデン",
  },
  parameters: {
    docs: {
      storyDescription: "受注生産。朽木棕枠線で「特別注文」の品格を表現。",
    },
  },
};
