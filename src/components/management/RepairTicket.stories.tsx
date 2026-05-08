import type { Meta, StoryObj } from "@storybook/react";
import { RepairTicket } from "@/components/management/RepairTicket";

/**
 * ## RepairTicket（修繕・苦情チケット）
 *
 * 賃貸管理画面で使用される修繕依頼・入居者苦情のステータスカード。
 * 和紙白背景に状態による色分け。緊急時は紅銅警示（#B87333）を使用し、
 * ユーザーの不安を和らげつつ注意を喚起する。
 *
 * **デザイン原則**:
 * - 通常: 炭墨黑 1px ボーダー + 和紙白背景
 * - 進行中: 光金銅 1px ボーダー + 光金銅背景バッジ
 * - 完了: 青磁差し色（#7A9E9F）ボーダー + opacity 0.7
 * - 緊急: 紅銅警示（#B87333）左Border 3px + 警告アイコン
 * - 区切り線は組子細工風 `subtle-line`
 *
 * **使用Token**:
 * - `colors/accent/red-copper` — 緊急状態
 * - `colors/accent/celadon-blue` — 完了状態
 * - `colors/accent/light-copper` — 進行中
 * - `effect/shadow/subtle-line` — 区切り
 */
const meta = {
  title: "賃貸管理/RepairTicket",
  component: RepairTicket,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/賃貸管理_RepairTicket?node-id=35-1",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["new", "inProgress", "completed", "urgent"],
      description: "チケット状態バリアント",
    },
    ticketNo: { control: "text", description: "管理番号（RobotoMono 12px）" },
    title: { control: "text", description: "件名（NotoSansJP 16px Bold）" },
    description: { control: "text", description: "詳細（NotoSansJP 14px）" },
    reportedAt: { control: "text", description: "申告日" },
    roomNo: { control: "text", description: "部屋番号" },
    vendor: { control: "text", description: "対応業者名" },
  },
} satisfies Meta<typeof RepairTicket>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {
  args: {
    variant: "new",
    ticketNo: "R-2026-0042",
    title: "キッチン水栓の水漏れ",
    description: "シンク下の水栓接続部から少量の水漏れが確認されました。",
    reportedAt: "2026-05-08",
    roomNo: "201",
    vendor: "未定",
  },
  parameters: {
    docs: {
      storyDescription:
        "新規申告状態。炭墨黑 1px ボーダー。担当業者は「未定」で錆鉄灰表示。",
    },
  },
};

export const InProgress: Story = {
  args: {
    variant: "inProgress",
    ticketNo: "R-2026-0038",
    title: "浴室換気扇の異音",
    description: "換気扇のモーターからカタカタと異音がします。",
    reportedAt: "2026-05-05",
    roomNo: "102",
    vendor: "株式会社建装",
  },
  parameters: {
    docs: {
      storyDescription:
        "対応進行中。光金銅ボーダー + 「対応中」バッジ（光金銅背景・和紙白文字）。",
    },
  },
};

export const Completed: Story = {
  args: {
    variant: "completed",
    ticketNo: "R-2026-0021",
    title: "玄関ドアの鍵交換",
    description: "鍵のシリンダー交換が完了しました。",
    reportedAt: "2026-04-20",
    roomNo: "301",
    vendor: "鍵の株式会社",
  },
  parameters: {
    docs: {
      storyDescription:
        "完了状態。青磁差し色ボーダー + 全体 opacity 0.7。視覚的に「解決済み」を表現。",
    },
  },
};

export const Urgent: Story = {
  args: {
    variant: "urgent",
    ticketNo: "R-2026-0045",
    title: "【緊急】階下からの漏水連絡",
    description:
      "102号室の床下から階下101号室への漏水が発生。即時対応が必要です。",
    reportedAt: "2026-05-08",
    roomNo: "102",
    vendor: "株式会社建装",
  },
  parameters: {
    docs: {
      storyDescription:
        "緊急状態。左Border 3px 紅銅警示（#B87333）。純赤ではなく紅銅色を使用し、上品に緊急性を演出。",
    },
  },
};
