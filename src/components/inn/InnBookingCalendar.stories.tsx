import type { Meta, StoryObj } from "@storybook/react";
import { InnBookingCalendar } from "@/components/inn/InnBookingCalendar";

/**
 * ## InnBookingCalendar（予約カレンダー）
 *
 * 民宿運営ページで使用される予約状況カレンダー。
 * 和紙白背景に月切り替えは明朝体で和風の品格を演出。
 *
 * **デザイン原則**:
 * - 背景: 和紙白（#F5F3EF）
 * - 月タイトル: NotoSerifJP 22px 炭墨黑
 * - 日付: NotoSansJP 14px
 * - 状態色:
 *   - 空室: 和紙白
 *   - 予約済み: 混凝土灰（#E8E4DF）+ 錆鉄灰文字
 *   - 選択中: 光金銅（#C9A96E）背景 + 和紙白文字
 *   - 本日: 炭墨黑円 + 和紙白文字
 * - 曜日ヘッダー: 混凝土灰背景 + 錆鉄灰文字 12px
 *
 * **使用Token**:
 * - `colors/dominant/washi-white` — 空室セル
 * - `colors/dominant/concrete-grey` — 予約済みセル
 * - `colors/accent/light-copper` — 選択中セル
 * - `colors/secondary/charcoal-black` — 本日マーカー
 */
const meta = {
  title: "民宿運營/InnBookingCalendar",
  component: InnBookingCalendar,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/民宿_InnBookingCalendar?node-id=45-1",
    },
  },
  argTypes: {
    yearMonth: { control: "text", description: "表示年月（YYYY-MM）" },
    bookedDates: { control: "object", description: "予約済み日付配列" },
    selectedDate: { control: "text", description: "選択中日付" },
    onDateSelect: { action: "dateSelected" },
  },
} satisfies Meta<typeof InnBookingCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const May2026: Story = {
  args: {
    yearMonth: "2026-05",
    bookedDates: [
      "2026-05-03",
      "2026-05-04",
      "2026-05-05",
      "2026-05-10",
      "2026-05-11",
      "2026-05-17",
      "2026-05-18",
      "2026-05-24",
      "2026-05-25",
      "2026-05-31",
    ],
    selectedDate: "2026-05-15",
  },
  parameters: {
    docs: {
      storyDescription:
        "2026年5月表示。ゴールデンウィーク（3-5日）と週末が予約済み。15日が選択中（光金銅）。",
    },
  },
};

export const EmptyMonth: Story = {
  args: {
    yearMonth: "2026-06",
    bookedDates: [],
    selectedDate: null,
  },
  parameters: {
    docs: {
      storyDescription: "空室が多い月。大部分が和紙白のまま。",
    },
  },
};

export const FullyBooked: Story = {
  args: {
    yearMonth: "2026-08",
    bookedDates: [
      "2026-08-01",
      "2026-08-02",
      "2026-08-03",
      "2026-08-04",
      "2026-08-05",
      "2026-08-06",
      "2026-08-07",
      "2026-08-08",
      "2026-08-09",
      "2026-08-10",
      "2026-08-11",
      "2026-08-12",
      "2026-08-13",
      "2026-08-14",
      "2026-08-15",
      "2026-08-16",
      "2026-08-17",
      "2026-08-18",
      "2026-08-19",
      "2026-08-20",
      "2026-08-21",
      "2026-08-22",
      "2026-08-23",
      "2026-08-24",
      "2026-08-25",
      "2026-08-26",
      "2026-08-27",
      "2026-08-28",
      "2026-08-29",
      "2026-08-30",
      "2026-08-31",
    ],
    selectedDate: null,
  },
  parameters: {
    docs: {
      storyDescription:
        "満室月。すべての日付が混凝土灰。満室状態を視覚的に確認。",
    },
  },
};
