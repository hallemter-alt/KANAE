import type { Meta, StoryObj } from "@storybook/react";
import { TenantTable } from "@/components/management/TenantTable";

/**
 * ## TenantTable（入居者一覧テーブル）
 *
 * 賃貸管理ポータルで使用される入居者情報テーブル。
 * 組子細工風の極細区切り線（`effect/shadow/subtle-line`）が和風の緻密さを演出。
 *
 * **デザイン原則**:
 * - 背景は和紙白（#F5F3EF）、ヘッダーは混凝土灰（#E8E4DF）
 * - 行区切りは 1px の極細線（opacity 8%）— 組子細工のイメージ
 * - 行Hover時は光透過10（`rgba(201,169,110,0.10)`）で微妙な温かみ
 * - 入居者名は NotoSansJP 14px Medium、部屋番号は RobotoMono 14px
 *
 * **使用Token**:
 * - `colors/dominant/washi-white` — 行背景
 * - `colors/dominant/concrete-grey` — ヘッダー背景
 * - `colors/secondary/charcoal-black` — テキスト
 * - `colors/light/through-10` — 行Hover背景
 * - `effect/shadow/subtle-line` — 区切り線
 */
const meta = {
  title: "賃貸管理/TenantTable",
  component: TenantTable,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/賃貸管理_TenantTable?node-id=30-1",
    },
  },
  argTypes: {
    data: { control: "object", description: "入居者データ配列" },
    sortable: { control: "boolean", description: "ソート機能の有無" },
  },
} satisfies Meta<typeof TenantTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = [
  {
    roomNo: "101",
    name: "山田 太郎",
    leaseStart: "2024-04-01",
    rent: "¥128,000",
    status: "active",
  },
  {
    roomNo: "102",
    name: "佐藤 花子",
    leaseStart: "2023-10-15",
    rent: "¥135,000",
    status: "active",
  },
  {
    roomNo: "201",
    name: "鈴木 一郎",
    leaseStart: "2025-01-10",
    rent: "¥142,000",
    status: "notice",
  },
  {
    roomNo: "202",
    name: "高橋 美咲",
    leaseStart: "2022-08-20",
    rent: "¥118,000",
    status: "active",
  },
  {
    roomNo: "301",
    name: "田中 健太",
    leaseStart: "2024-11-01",
    rent: "¥155,000",
    status: "active",
  },
];

export const Default: Story = {
  args: {
    data: mockData,
    sortable: true,
  },
  parameters: {
    docs: {
      storyDescription: "標準表示。組子細工風の極細区切り線で行を区切る。",
    },
  },
};

export const RowHover: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      storyDescription: "行Hover状態。背景が和紙白から光透過10へ微妙に変化。",
    },
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    sortable: false,
  },
  parameters: {
    docs: {
      storyDescription:
        "空状態。和紙白背景中央に「入居者データがありません」（NotoSerifJP 18px 錆鉄灰）。",
    },
  },
};
