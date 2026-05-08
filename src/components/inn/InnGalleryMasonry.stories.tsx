import type { Meta, StoryObj } from "@storybook/react";
import { InnGalleryMasonry } from "@/components/inn/InnGalleryMasonry";

/**
 * ## InnGalleryMasonry（和室・外観ギャラリー）
 *
 * 民宿運営ページで使用される不規則 Masonry ギャラリー。
 * 和室の「襖」の錯落感をデジタル上で再現。
 *
 * **デザイン原則**:
 * - 不規則グリッド: 2列（60/40）、3列（40/30/30）— 襖の非対称美
 * - 画像上に夕暮れグラデーション（`effect/grad/sunset`）オーバーレイ
 * - キャプションは炭墨黑背景 opacity 60% + glass blur（24px）
 * - 角丸は 4px（極小）で和風の柔らかさを表現
 *
 * **使用Token**:
 * - `effect/grad/sunset` — 夕暮れオーバーレイ
 * - `effect/blur/glass` — キャプション背景ブラー
 * - `colors/secondary/charcoal-black` — キャプション背景
 * - `colors/dominant/washi-white` — キャプションテキスト
 */
const meta = {
  title: "民宿運營/InnGalleryMasonry",
  component: InnGalleryMasonry,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/民宿_InnGallery?node-id=40-1",
    },
  },
  argTypes: {
    images: {
      control: "object",
      description: "画像データ配列（url, caption, aspectRatio）",
    },
    columns: { control: "select", options: [2, 3], description: "カラム数" },
  },
} satisfies Meta<typeof InnGalleryMasonry>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockImages = [
  {
    url: "/mock/inn-garden.jpg",
    caption: "庭園から見た離れ",
    aspectRatio: "3/2",
  },
  { url: "/mock/inn-tatami.jpg", caption: "八畳の間", aspectRatio: "4/3" },
  { url: "/mock/inn-bath.jpg", caption: "檜風呂", aspectRatio: "1/1" },
  {
    url: "/mock/inn-kitchen.jpg",
    caption: "囲炉裏のある台所",
    aspectRatio: "16/9",
  },
  { url: "/mock/inn-facade.jpg", caption: "外観・夕暮れ", aspectRatio: "3/2" },
  { url: "/mock/inn-room.jpg", caption: "二階客室", aspectRatio: "4/5" },
];

export const TwoColumns: Story = {
  args: {
    images: mockImages,
    columns: 2,
  },
  parameters: {
    docs: {
      storyDescription:
        "2列 Masonry（60/40）。大判画像と細長画像のコントラストで襖の錯落感を演出。",
    },
  },
};

export const ThreeColumns: Story = {
  args: {
    images: mockImages,
    columns: 3,
  },
  parameters: {
    docs: {
      storyDescription: "3列 Masonry（40/30/30）。より緻密な和室の雰囲気。",
    },
  },
};

export const SunsetOverlay: Story = {
  args: {
    images: mockImages.slice(4, 5), // 外観・夕暮れのみ
    columns: 1,
  },
  parameters: {
    docs: {
      storyDescription:
        "夕暮れオーバーレイ単体確認。`effect/grad/sunset` が画像全体に暖かみを与える。",
    },
    backgrounds: { default: "炭墨黑" },
  },
};
