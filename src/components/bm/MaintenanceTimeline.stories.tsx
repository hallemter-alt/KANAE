import type { Meta, StoryObj } from "@storybook/react";
import { MaintenanceTimeline } from "@/components/bm/MaintenanceTimeline";

/**
 * ## MaintenanceTimeline（修繕履歴タイムライン）
 *
 * BM（建物維持管理）画面で使用される垂直タイムライン。
 * 建築の「安全確認」を視覚的に表現。
 *
 * **デザイン原則**:
 * - 垂直線は錆鉄灰（#5A5A5A）1px — 年月の経過を静かに表現
 * - 完了済み節点は光金銅（#C9A96E）12px + Glow（`0 0 12px rgba(201,169,110,0.5)`）
 * - 未着手節点は混凝土灰（#E8E4DF）8px
 * - 年月ラベルは NotoSerifJP 14px 朽木棕 — 年代感
 * - 内容は NotoSansJP 14px
 *
 * **使用Token**:
 * - `colors/secondary/rust-iron` — タイムライン線
 * - `colors/accent/light-copper` — 完了節点
 * - `colors/dominant/concrete-grey` — 未着手節点
 * - `colors/secondary/decay-wood` — 年月ラベル
 * - `font/heading/serif` — 年月表示
 */
const meta = {
  title: "BM/MaintenanceTimeline",
  component: MaintenanceTimeline,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/BM_MaintenanceTimeline?node-id=50-1",
    },
  },
  argTypes: {
    events: { control: "object", description: "修繕イベント配列" },
    year: { control: "text", description: "表示年度" },
  },
} satisfies Meta<typeof MaintenanceTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockEvents = [
  {
    month: "1月",
    title: "外壁防水点検",
    status: "completed",
    vendor: "株式会社建装",
  },
  {
    month: "3月",
    title: "エレベーター定期検査",
    status: "completed",
    vendor: "東芝エレベータ",
  },
  {
    month: "5月",
    title: "給水管清掃",
    status: "inProgress",
    vendor: "水道サービス",
  },
  { month: "8月", title: "屋上防水補修", status: "pending", vendor: "未定" },
  {
    month: "10月",
    title: "消火設備点検",
    status: "pending",
    vendor: "消防設備株式会社",
  },
];

export const Default: Story = {
  args: {
    events: mockEvents,
    year: "2026",
  },
  parameters: {
    docs: {
      storyDescription:
        "標準表示。1月と3月が完了（光金銅 Glow）、5月が進行中、8月・10月が未着手。",
    },
  },
};

export const AllCompleted: Story = {
  args: {
    events: mockEvents.map((e) => ({ ...e, status: "completed" })),
    year: "2025",
  },
  parameters: {
    docs: {
      storyDescription:
        "全イベント完了状態。すべての節点が光金銅 Glow を発し、建物の安全が視覚的に確認できる。",
    },
  },
};

export const UrgentPending: Story = {
  args: {
    events: [
      ...mockEvents,
      {
        month: "6月",
        title: "【緊急】漏水修繕",
        status: "urgent",
        vendor: "株式会社建装",
      },
    ],
    year: "2026",
  },
  parameters: {
    docs: {
      storyDescription:
        "緊急イベント追加。6月の節点が紅銅警示（#B87333）で脈動し、注意を喚起。",
    },
  },
};
