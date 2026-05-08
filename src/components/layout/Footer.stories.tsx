import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "@/components/layout/Footer";

/**
 * ## Footer（サイト共通フッター）— 株式会社KANAE 公式版
 *
 * 令和3年7月5日（2021年7月5日）設立。
 * 宅地建物取引業 東京都知事(1)第107157号。
 * 公益社団法人 全国宅地建物取引業協会連合会、
 * 公益社団法人 東京都宅地建物取引業協会 加盟。
 *
 * **デザイン原則**:
 * - 背景: 混凝土灰（#E8E4DF）
 * - 区切り: 上部に subtle-line
 * - ロゴ: NotoSerifJP 18px 炭墨黑「KANAE」
 *   - ロゴ下に「東京の住まいを、もっと自由に」（NotoSansJP 11px 錆鉄灰）
 * - 会社情報:
 *   - 会社名: 株式会社KANAE（NotoSansJP 14px Bold）
 *   - 代表者: 代表取締役 叶維舟（NotoSansJP 12px 錆鉄灰）
 *   - 所在地: 〒171-0033 東京都豊島区高田3丁目16番4号 Golje Bld. 6F
 *   - 電話: 03-6914-3633 / 080-4363-2780（RobotoMono 12px）
 *   - メール: info@kanae-tokyo.com（光金銅Hover）
 *   - 営業時間: 平日 9:00～18:00 / 土曜 10:00～17:00（日祝休業）
 *   - 許認可: 宅地建物取引業 東京都知事(1)第107157号
 *   - 法人番号: 0111-01-095676
 * - リンク: NotoSansJP 14px 錆鉄灰、Hoverで炭墨黑
 *   - 7業務線リンク + プライバシーポリシー + 利用規約 + 特定商取引法に基づく表記
 * - SNS: 錆鉄灰アイコン、Hoverで光金銅（LINE/X/Instagram）
 * - コピーライト: NotoSansJP 11px 錆鉄灰
 *   - 「© 2021-2026 株式会社KANAE All Rights Reserved.」
 *
 * **使用Token**:
 * - `colors/dominant/concrete-grey` — 背景
 * - `colors/secondary/charcoal-black` — ロゴ・Hoverリンク
 * - `colors/secondary/rust-iron` — 通常リンク・コピーライト・会社情報
 * - `colors/accent/light-copper` — メールHover・SNS Hover
 * - `effect/shadow/subtle-line` — 上部区切り
 * - `font/data/mono` — 電話番号・法人番号
 */
const meta = {
  title: "Layout/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/Layout_Footer?node-id=1-1",
    },
    layout: "fullscreen",
  },
  argTypes: {
    currentLang: {
      control: "select",
      options: ["ja", "en", "zh"],
      description: "表示言語",
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Japanese: Story = {
  args: {
    currentLang: "ja",
  },
  parameters: {
    docs: {
      storyDescription:
        "日本語フッター。会社情報を左列、7業務線リンクを中央列、SNS/法規リンクを右列の3列レイアウト。許認可番号「宅地建物取引業 東京都知事(1)第107157号」を明記。加盟団体「全国宅地建物取引業協会連合会」「東京都宅地建物取引業協会」を錆鉄灰で表示。",
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
        "英語フッター。住所「3-16-4 Takada, Toshima-ku, Tokyo 171-0033, Japan」。License「Tokyo Governor (1) No. 107157」。営業時間「Mon-Fri 9:00-18:00 / Sat 10:00-17:00 (Closed Sun/Holidays)」。",
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
        "中国語フッター。住所「日本国东京都豊岛区高田3丁目16番4号 Golje Bld. 6F」。许可证「东京都知事(1)第107157号」。营业时间「周一至周五 9:00-18:00 / 周六 10:00-17:00（周日节假日休息）」。",
    },
  },
};

export const Mobile: Story = {
  args: {
    currentLang: "ja",
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
    docs: {
      storyDescription:
        "Mobileフッター。1列縦積み。会社情報→業務線リンク→SNS→法規の順。電話番号はタップで発呼可能（tel:03-6914-3633）。",
    },
  },
};
