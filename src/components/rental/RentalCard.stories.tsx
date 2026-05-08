import type { Meta, StoryObj } from "@storybook/react";
import { RentalCard } from "@/components/rental/RentalCard";

/**
 * ## RentalCard（賃貸物件カード）
 *
 * 賃貸物件一覧画面で使用される主要カードコンポーネント。
 * 建物外観写真、駅近バッジ、賃料、築年数等を一元表示。
 *
 * **デザイン原則**:
 * - 和紙白（#F5F3EF）背景に炭墨黑（#2C2C2C）の 1px 極細ボーダー
 * - Hover時に光金銅（#C9A96E）ボーダーへ遷移、Y軸 -4px 浮遊
 * - 画像上の光透過グラデーションが右下へ 20px シフト（窓光移動表現）
 *
 * **使用Token**:
 * - `colors/dominant/washi-white` — 背景
 * - `colors/secondary/charcoal-black` — テキスト・ボーダー
 * - `colors/accent/light-copper` — Hoverボーダー
 * - `effect/shadow/card-hover` — Hoverシャドウ
 * - `font/heading/serif` — 物件名
 * - `font/data/mono` — 賃料・面積
 */
const meta = {
  title: "賃貸/RentalCard",
  component: RentalCard,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/賃貸_RentalCard?node-id=1-2",
    },
    docs: {
      description: {
        component:
          "賃貸物件一覧で使用されるカードコンポーネント。建築の「住みやすさ」を光の演出で表現。",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "hover", "reserved", "newArrival"],
      description: "カードの状態バリアント",
      table: {
        type: { summary: "default | hover | reserved | newArrival" },
        defaultValue: { summary: "default" },
      },
    },
    propertyName: {
      control: "text",
      description: "物件名（NotoSerifJP 16px）",
    },
    rentPrice: {
      control: "text",
      description: "賃料（RobotoMono 22px Bold）",
    },
    stationWalk: {
      control: "number",
      description: "駅徒歩分数（黄銅光バッジ）",
    },
    buildingAge: {
      control: "number",
      description: "築年数（朽木棕 12px）",
    },
    area: {
      control: "text",
      description: "専有面積（RobotoMono 14px）",
    },
    imageUrl: {
      control: "text",
      description: "建物外観写真URL",
    },
  },
} satisfies Meta<typeof RentalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ### Default（通常状態）
 * 物件一覧の初期表示状態。
 * 光は控えめ、建物写真が主役。
 */
export const Default: Story = {
  args: {
    variant: "default",
    propertyName: "代官山駅前レジデンス",
    rentPrice: "¥128,000",
    stationWalk: 5,
    buildingAge: 12,
    area: "42.5㎡",
    imageUrl: "/mock/property-daitabashi.jpg",
  },
  parameters: {
    docs: {
      storyDescription: "通常表示状態。和紙白背景に炭墨黑の 1px ボーダー。",
    },
  },
};

/**
 * ### Hover（ホバー状態）
 * マウスオーバー時。光金銅ボーダー + 浮遊シャドウ。
 * 画像上の光透過グラデーションが右下へシフトし、「窓から光が移動する」演出。
 */
export const Hover: Story = {
  args: {
    ...Default.args,
    variant: "hover",
  },
  parameters: {
    docs: {
      storyDescription:
        "Hover状態。ボーダーが光金銅に変化し、Y軸 -4px で浮遊。画像上の光が右下へ 20px シフト。",
    },
    backgrounds: { default: "和紙白" },
  },
};

/**
 * ### Reserved（内見予約済み）
 * 内見予約が入っている物件。全体 opacity 60%、青磁差し色バッジ。
 */
export const Reserved: Story = {
  args: {
    ...Default.args,
    variant: "reserved",
    propertyName: "目黒区上目黒マンション",
    rentPrice: "¥145,000",
    stationWalk: 8,
  },
  parameters: {
    docs: {
      storyDescription:
        "内見予約済み。全体が 60% opacity で表示され、「内見予約済み」バッジ（青磁差し色）が付与される。",
    },
  },
};

/**
 * ### NewArrival（新着物件）
 * 新規掲載物件。左上に「NEW」リボン（光金銅背景）。
 */
export const NewArrival: Story = {
  args: {
    ...Default.args,
    variant: "newArrival",
    propertyName: "渋谷区松涛ヴィンテージハウス",
    rentPrice: "¥210,000",
    buildingAge: 35,
    area: "58.2㎡",
  },
  parameters: {
    docs: {
      storyDescription:
        "新着物件。左上に光金銅背景の「NEW」リボン。築35年のヴィンテージ物件であることを朽木棕で表現。",
    },
  },
};

/**
 * ### Mobile（モバイル表示）
 * 375px 幅での表示確認。カード幅は 100%。
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
    propertyName: "中野駅前コンパクト",
    rentPrice: "¥95,000",
    area: "28.0㎡",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
    docs: {
      storyDescription:
        "Mobile（375px）表示。画像比率は維持、情報エリアの padding を 16px に縮小。",
    },
  },
};

/**
 * ### 光効確認（ストーリー）
 * 光透過グラデーションの動作を確認するための専用ストーリー。
 * 背景を混凝土灰に変更し、光のコントラストを強調。
 */
export const LightEffectCheck: Story = {
  args: {
    ...Default.args,
    variant: "hover",
    propertyName: "光効テスト物件",
  },
  parameters: {
    backgrounds: { default: "混凝土灰" },
    docs: {
      storyDescription:
        "光効確認用。混凝土灰背景に対して光金銅の Hover エフェクトが正しく発光することを確認。",
    },
  },
};
