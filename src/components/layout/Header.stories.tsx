import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/components/layout/Header";

/**
 * ## Header（サイト共通ヘッダー）— 株式会社KANAE 公式版
 *
 * 東京都豊島区高田3丁目16番4号 Golje Bld. 6F に本社を置く
 * 株式会社KANAE（代表取締役 叶維舟）の公式ウェブサイトヘッダー。
 * 宅地建物取引業 東京都知事(1)第107157号
 *
 * **デザイン原則**:
 * - 背景: 炭墨黑（#2C2C2C）
 * - ロゴ: NotoSerifJP 20px Bold 和紙白「KANAE」
 *   - ロゴ横に小さく「東京の住まいを、もっと自由に」（NotoSansJP 10px 錆鉄灰）
 * - ナビ項目: NotoSansJP 14px 和紙白、Hoverで光金銅（#C9A96E）下線
 * - アクティブ業務線: 光金銅下線 2px
 * - 高さ: 64px（Desktop）/ 56px（Mobile）
 * - シャドウ: building（控えめ）
 * - 営業時間表示: 錆鉄灰 11px「平日9:00-18:00 / 土曜10:00-17:00」
 * - 電話番号: 03-6914-3633（RobotoMono 12px、Hoverで光金銅）
 * - 多言語切替: JP/EN/CN（光金銅1px枠線チップ）
 *
 * **使用Token**:
 * - `colors/secondary/charcoal-black` — 背景
 * - `colors/dominant/washi-white` — テキスト
 * - `colors/accent/light-copper` — Hover・Active下線・言語切替
 * - `colors/secondary/rust-iron` — サブテキスト・営業時間
 * - `font/data/mono` — 電話番号
 * - `effect/shadow/building` — シャドウ
 */
const meta = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/Layout_Header?node-id=1-1",
    },
    layout: "fullscreen",
  },
  argTypes: {
    activeBusiness: {
      control: "select",
      options: [
        "rental",
        "sales",
        "investment",
        "management",
        "inn",
        "bm",
        "materials",
      ],
      description: "アクティブな業務線",
    },
    isLoggedIn: { control: "boolean", description: "ログイン状態" },
    userName: { control: "text", description: "ユーザー名" },
    currentLang: {
      control: "select",
      options: ["ja", "en", "zh"],
      description: "表示言語",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeBusiness: "rental",
    isLoggedIn: false,
    userName: "",
    currentLang: "ja",
  },
  parameters: {
    docs: {
      storyDescription:
        "未ログイン状態。ロゴ「KANAE」+ キャッチコピー「東京の住まいを、もっと自由に」。賃貸業務線がアクティブ（光金銅下線）。右上に電話番号「03-6914-3633」（RobotoMono）と営業時間。",
    },
  },
};

export const LoggedIn: Story = {
  args: {
    activeBusiness: "investment",
    isLoggedIn: true,
    userName: "山田太郎",
    currentLang: "ja",
  },
  parameters: {
    docs: {
      storyDescription:
        "ログイン状態。投資物件提案がアクティブ。右上にユーザー名「山田太郎」+ ログアウトボタン（錆鉄灰）。電話番号はログイン時は非表示。",
    },
  },
};

export const English: Story = {
  args: {
    activeBusiness: "sales",
    isLoggedIn: false,
    userName: "",
    currentLang: "en",
  },
  parameters: {
    docs: {
      storyDescription:
        "英語表示。ロゴ横に「Redefining Tokyo Living」。ナビは「Rental」「Sales」「Investment」。電話番号は「+81 3-6914-3633」。",
    },
  },
};

export const Chinese: Story = {
  args: {
    activeBusiness: "materials",
    isLoggedIn: false,
    userName: "",
    currentLang: "zh",
  },
  parameters: {
    docs: {
      storyDescription:
        "中国語表示。ロゴ横に「让东京居住更自由」。ナビは「租赁」「买卖」「投资」。電話番号は「+81 3-6914-3633」。",
    },
  },
};

export const Mobile: Story = {
  args: {
    activeBusiness: "inn",
    isLoggedIn: false,
    userName: "",
    currentLang: "ja",
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
    docs: {
      storyDescription:
        "Mobile表示。ハンバーガーメニューに集約。高さ56px。電話番号はタップで発呼（tel:03-6914-3633）。",
    },
  },
};
