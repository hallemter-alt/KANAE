import type { Meta, StoryObj } from "@storybook/react";
import { MultilingualFooter } from "@/components/layout/MultilingualFooter";

/**
 * ## MultilingualFooter（多言語対応フッター）
 *
 * JP/EN/CN 三言語に対応した国際化フッター。
 * 各言語の法規制・表記習慣に対応したレイアウト変体。
 *
 * **デザイン原則**:
 * - 共通: 混凝土灰（#E8E4DF）背景 + 炭墨黑（#2C2C2C）テキスト
 * - 区切り: 上部 subtle-line
 * - JP: NotoSerifJP 16px 会社名 + NotoSansJP 12px 住所（郵便番号付き）
 * - EN: NotoSansJP 14px 会社名 + 13px 住所（郵便番号なし・国名「Japan」追加）
 * - CN: NotoSansJP 16px 会社名 + 13px 住所（「日本国」前置き）
 * - リンク: 言語別に異なるページ遷移（JP:/privacy → EN:/en/privacy → CN:/zh/privacy）
 * - SNSアイコン: 錆鉄灰（#5A5A5A）、Hoverで光金銅
 *
 * **使用Token**:
 * - `colors/dominant/concrete-grey` — 背景
 * - `colors/secondary/charcoal-black` — テキスト・ロゴ
 * - `colors/secondary/rust-iron` — リンク・コピーライト
 * - `colors/accent/light-copper` — SNS Hover
 * - `effect/shadow/subtle-line` — 上部区切り
 */
const meta = {
  title: "Layout/MultilingualFooter",
  component: MultilingualFooter,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/Layout_MultilingualFooter?node-id=105-1",
    },
    layout: "fullscreen",
  },
  argTypes: {
    currentLang: {
      control: "select",
      options: ["ja", "en", "zh"],
      description: "現在の表示言語",
    },
  },
} satisfies Meta<typeof MultilingualFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Japanese: Story = {
  args: {
    currentLang: "ja",
  },
  parameters: {
    docs: {
      storyDescription:
        "日本語フッター。住所は「〒150-0036 東京都渋谷区南平台町15-9」。プライバシーポリシー・利用規約・特定商取引法に基づく表記の3リンク。",
    },
  },
};

export const English: Story = {
  args: {
    currentLang: "en",
  },
  parameters: {
    docs: {
      storyDescription:
        "英語フッター。住所は「15-9 Minami-Aoyama, Shibuya-ku, Tokyo 150-0036, Japan」。Privacy Policy・Terms of Service・Cookie Policyの3リンク。",
    },
  },
};

export const Chinese: Story = {
  args: {
    currentLang: "zh",
  },
  parameters: {
    docs: {
      storyDescription:
        "中国語フッター。住所は「日本国东京都涩谷区南平台町15-9 邮编150-0036」。隐私政策・服务条款・营业执照公示の3リンク。",
    },
  },
};
