import type { Meta, StoryObj } from "@storybook/react";
import { InnRoomCard } from "@/components/inn/InnRoomCard";

/**
 * ## InnRoomCard（部屋タイプカード）
 *
 * 民宿運営ページで使用される部屋タイプ紹介カード。
 * 16:9 部屋写真 + 下部情報エリアの構成。
 *
 * **デザイン原則**:
 * - 16:9 部屋写真（和室・洋室・特別室）
 * - 下部情報エリア: 和紙白（#F5F3EF）背景
 * - 価格: RobotoMono 22px Bold
 * - 角丸: 4px（極小、和風の柔らかさ）
 * - シャドウ: building（控えめ）
 * - タイプ別色分け:
 *   - Standard: 無印
 *   - Deluxe: 光金銅 1px 枠線
 *   - Suite: 黄銅光背景バッジ「特別室」
 *
 * **使用Token**:
 * - `colors/dominant/washi-white` — 情報エリア背景
 * - `colors/accent/light-copper` — Deluxe 枠線
 * - `colors/accent/brass-gold` — Suite バッジ
 * - `effect/shadow/building` — カードシャドウ
 */
const meta = {
  title: "民宿運營/InnRoomCard",
  component: InnRoomCard,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/民宿_InnRoomCard?node-id=48-1",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "deluxe", "suite"],
      description: "部屋タイプ",
    },
    roomName: { control: "text", description: "部屋名（NotoSerifJP 18px）" },
    price: { control: "text", description: "一泊料金（RobotoMono 22px Bold）" },
    capacity: { control: "text", description: "定員" },
    features: { control: "object", description: "設備タグ配列" },
    imageUrl: { control: "text", description: "部屋写真" },
  },
} satisfies Meta<typeof InnRoomCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    variant: "standard",
    roomName: "椿の間",
    price: "¥18,000",
    capacity: "2名",
    features: ["和室8畳", "檜風呂", "WiFi"],
    imageUrl: "/mock/room-tsubaki.jpg",
  },
  parameters: {
    docs: {
      storyDescription: "スタンダード和室。無印の和紙白カード。",
    },
  },
};

export const Deluxe: Story = {
  args: {
    variant: "deluxe",
    roomName: "楓の間",
    price: "¥28,000",
    capacity: "4名",
    features: ["和室10畳+次の間", "露天風呂", "庭園_view"],
    imageUrl: "/mock/room-kaede.jpg",
  },
  parameters: {
    docs: {
      storyDescription: "デラックス和室。光金銅 1px 枠線で「上質さ」を表現。",
    },
  },
};

export const Suite: Story = {
  args: {
    variant: "suite",
    roomName: "松の間",
    price: "¥45,000",
    capacity: "6名",
    features: ["離れ", "専用庭園", "囲炉裏", "檜風呂付露天"],
    imageUrl: "/mock/room-matsu.jpg",
  },
  parameters: {
    docs: {
      storyDescription:
        "特別室。黄銅光（#D4AF37）背景の「特別室」バッジ + 光金銅枠線。最高級の演出。",
    },
  },
};
