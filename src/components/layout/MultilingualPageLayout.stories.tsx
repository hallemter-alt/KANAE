import type { Meta, StoryObj } from "@storybook/react";
import { MultilingualPageLayout } from "@/components/layout/MultilingualPageLayout";

/**
 * ## MultilingualPageLayout（多言語ページレイアウトテンプレート）
 *
 * JP/EN/CN 三言語に対応したページ骨架レイアウト。
 * 言語特性に応じた文字詰め・行間・余白の最適化を実装。
 *
 * **デザイン原則**:
 * - JP: 行間 1.8（漢字・ひらがなの読みやすさ）、文字詰め 0.01em
 * - EN: 行間 1.6（アルファベットのコンパクト性）、文字詰め 0.02em（単語間の開け感）
 * - CN: 行間 1.75（簡体字の密度調整）、文字詰め 0.005em（文字詰まり防止）
 * - 見出し:
 *   - JP: NotoSerifJP（明朝体の品格）
 *   - EN: NotoSansJP（ゴシックの簡潔さ）
 *   - CN: NotoSansJP（簡体字グリフ対応、やや太字）
 * - ボタン幅:
 *   - JP: 最小160px（漢字2-4字のバランス）
 *   - EN: 最小140px（短い単語でも見栄え良く）
 *   - CN: 最小160px（簡体字2-4字）
 * - フォームラベル:
 *   - JP: 上配置（縦書き文化の名残、ラベルが上に来ると自然）
 *   - EN: 左配置（横書き最適化、ラベル左・入力右）
 *   - CN: 上配置（日本語と同じ感覚）
 *
 * **使用Token**:
 * - `font/heading/serif` — JP見出し
 * - `font/body/sans` — EN/CN見出し・本文
 * - `colors/dominant/washi-white` — ページ背景
 * - `colors/secondary/charcoal-black` — テキスト
 */
const meta = {
  title: "Layout/MultilingualPageLayout",
  component: MultilingualPageLayout,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/Layout_MultilingualPageLayout?node-id=110-1",
    },
    layout: "fullscreen",
  },
  argTypes: {
    currentLang: {
      control: "select",
      options: ["ja", "en", "zh"],
      description: "現在の表示言語",
    },
    pageType: {
      control: "select",
      options: ["top", "propertyList", "propertyDetail", "contact"],
      description: "ページタイプ",
    },
    children: { control: "object", description: "ページコンテンツ" },
  },
} satisfies Meta<typeof MultilingualPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const JapaneseTop: Story = {
  args: {
    currentLang: "ja",
    pageType: "top",
    children: null,
  },
  parameters: {
    docs: {
      storyDescription:
        "日本語トップページレイアウト。Heroキャッチは明朝体48px「代官山の、光のある住まい」。行間1.8で和風の余裕。",
    },
  },
};

export const EnglishTop: Story = {
  args: {
    currentLang: "en",
    pageType: "top",
    children: null,
  },
  parameters: {
    docs: {
      storyDescription:
        "英語トップページレイアウト。Heroキャッチは「Homes in Daikanyama, Bathed in Light」。行間1.6でコンパクト。文字詰め0.02em。",
    },
  },
};

export const ChineseTop: Story = {
  args: {
    currentLang: "zh",
    pageType: "top",
    children: null,
  },
  parameters: {
    docs: {
      storyDescription:
        "中国語トップページレイアウト。Heroキャッチは「代官山，有光的家」。行間1.75。簡体字グリフに最適化。",
    },
  },
};

export const JapanesePropertyDetail: Story = {
  args: {
    currentLang: "ja",
    pageType: "propertyDetail",
    children: null,
  },
  parameters: {
    docs: {
      storyDescription:
        "日本語物件詳細ページ。物件名は明朝体、価格はRobotoMono。フォームラベルは上配置（「お名前」「メールアドレス」）。",
    },
  },
};

export const EnglishPropertyDetail: Story = {
  args: {
    currentLang: "en",
    pageType: "propertyDetail",
    children: null,
  },
  parameters: {
    docs: {
      storyDescription:
        "英語物件詳細ページ。フォームラベルは左配置（Name | Email）。ボタン幅140px（「Contact」短い単語対応）。",
    },
  },
};

export const MobileChinese: Story = {
  args: {
    currentLang: "zh",
    pageType: "propertyList",
    children: null,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
    docs: {
      storyDescription:
        "Mobile中国語物件一覧。カード内の物件名は2行まで。簡体字の情報密度を考慮した16px基準。",
    },
  },
};
