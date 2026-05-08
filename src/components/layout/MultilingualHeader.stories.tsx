import type { Meta, StoryObj } from "@storybook/react";
import { MultilingualHeader } from "@/components/layout/MultilingualHeader";

/**
 * ## MultilingualHeader（多言語対応ヘッダー）
 *
 * JP/EN/CN 三言語に対応した国際化ヘッダーナビゲーション。
 * 日本語（縦書き対応領域予約）・英語（コンパクト）・中国語（字体最適化）の
 * 言語特性を考慮したレイアウト変体。
 *
 * **デザイン原則**:
 * - 共通: 炭墨黑（#2C2C2C）背景 + 和紙白（#F5F3EF）テキスト
 * - 言語切替ボタン: 光金銅（#C9A96E）1px 枠線 + Hoverで塗り
 * - アクティブ言語: 黄銅光（#D4AF37）背景バッジ
 * - ナビ項目:
 *   - JP: NotoSerifJP 14px（見出し的品格）
 *   - EN: NotoSansJP 13px Letter-spacing 0.02em（欧米の開け感）
 *   - CN: NotoSansJP 14px（簡体字対応、やや太字）
 * - 高さ: JP/CN 64px / EN 56px（英語は行間不要でコンパクト）
 * - ロゴ: 言語共通（KANAEロゴはブランド固定）
 *
 * **使用Token**:
 * - `colors/secondary/charcoal-black` — 背景
 * - `colors/dominant/washi-white` — テキスト
 * - `colors/accent/light-copper` — 言語切替枠線
 * - `colors/accent/brass-gold` — アクティブ言語バッジ
 * - `font/heading/serif` — JPナビ（明朝体の品格）
 * - `font/body/sans` — EN/CNナビ
 */
const meta = {
  title: "Layout/MultilingualHeader",
  component: MultilingualHeader,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/Layout_MultilingualHeader?node-id=100-1",
    },
    layout: "fullscreen",
  },
  argTypes: {
    currentLang: {
      control: "select",
      options: ["ja", "en", "zh"],
      description: "現在の表示言語",
    },
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
      description: "アクティブ業務線",
    },
    isLoggedIn: { control: "boolean", description: "ログイン状態" },
    onLangChange: { action: "langChanged" },
  },
} satisfies Meta<typeof MultilingualHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Japanese: Story = {
  args: {
    currentLang: "ja",
    activeBusiness: "rental",
    isLoggedIn: false,
  },
  parameters: {
    docs: {
      storyDescription:
        "日本語表示。ナビ項目は明朝体（NotoSerifJP 14px）で和風の品格。「賃貸」「売買」「投資物件」など漢字表記。",
    },
  },
};

export const English: Story = {
  args: {
    currentLang: "en",
    activeBusiness: "sales",
    isLoggedIn: true,
    userName: "Taro Yamada",
  },
  parameters: {
    docs: {
      storyDescription:
        "英語表示。ナビは「Rental」「Sales」「Investment」など簡潔表記。NotoSansJP 13px + letter-spacing 0.02emで欧米の開け感を演出。高さ56px（コンパクト）。",
    },
  },
};

export const Chinese: Story = {
  args: {
    currentLang: "zh",
    activeBusiness: "investment",
    isLoggedIn: false,
  },
  parameters: {
    docs: {
      storyDescription:
        "中国語表示。簡体字対応。「租赁」「买卖中介」「投资物业」など。字体はNotoSansJP（簡体字グリフ対応）14pxやや太字（font-weight 500）。",
    },
  },
};

export const LangSwitchHover: Story = {
  args: {
    currentLang: "ja",
    activeBusiness: "materials",
    isLoggedIn: false,
  },
  parameters: {
    docs: {
      storyDescription:
        "言語切替Hover状態。EN/CNボタンが光金銅枠線で強調。クリックで言語切替。",
    },
  },
};

export const MobileJapanese: Story = {
  args: {
    currentLang: "ja",
    activeBusiness: "inn",
    isLoggedIn: false,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
    docs: {
      storyDescription:
        "Mobile日本語。ハンバーガーメニュー内に縦並びナビ。言語切替はボトムに固定。",
    },
  },
};
