import type { Meta, StoryObj } from "@storybook/react";
import { SalesFlowStep } from "@/components/sales/SalesFlowStep";

/**
 * ## SalesFlowStep（売買フロー可視化）
 *
 * 売買物件ページで使用される4ステップフロー表示。
 * 現在ステップは光金銅（#C9A96E）、過去は青磁差し色（#7A9E9F）、未達は混凝土灰（#E8E4DF）。
 *
 * **デザイン原則**:
 * - 4ステップ水平配置
 * - ステップ円: 24px、現在は光金銅塗り + 白文字
 * - コネクター線: 1px、達成区間は光金銅、未達は混凝土灰
 * - ステップ名: NotoSansJP 14px
 * - ステップ説明: NotoSansJP 12px 錆鉄灰
 * - 完了アイコン: 青磁差し色のチェックマーク
 *
 * **使用Token**:
 * - `colors/accent/light-copper` — 現在ステップ
 * - `colors/accent/celadon-blue` — 完了ステップ
 * - `colors/dominant/concrete-grey` — 未達ステップ
 * - `colors/secondary/rust-iron` — 説明テキスト
 */
const meta = {
  title: "売買/SalesFlowStep",
  component: SalesFlowStep,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/売買_SalesFlowStep?node-id=18-1",
    },
  },
  argTypes: {
    currentStep: {
      control: "select",
      options: [1, 2, 3, 4],
      description: "現在のステップ番号",
    },
    steps: { control: "object", description: "ステップ定義配列" },
  },
} satisfies Meta<typeof SalesFlowStep>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { id: 1, title: "資料請求", description: "物件概要・価格・図面を確認" },
  { id: 2, title: "内見・現地確認", description: "担当者と現地をご案内" },
  { id: 3, title: "購入申込み", description: "売買契約締結・手付金" },
  { id: 4, title: "決済・引渡し", description: "残代金決済・鍵引渡し" },
];

export const Step1: Story = {
  args: {
    currentStep: 1,
    steps: defaultSteps,
  },
  parameters: {
    docs: {
      storyDescription: "ステップ1「資料請求」がアクティブ。光金銅で強調。",
    },
  },
};

export const Step2: Story = {
  args: {
    currentStep: 2,
    steps: defaultSteps,
  },
  parameters: {
    docs: {
      storyDescription:
        "ステップ2「内見・現地確認」。ステップ1は青磁差し色で完了表示。",
    },
  },
};

export const Step3: Story = {
  args: {
    currentStep: 3,
    steps: defaultSteps,
  },
  parameters: {
    docs: {
      storyDescription:
        "ステップ3「購入申込み」。コネクター線の2/3が光金銅で塗られている。",
    },
  },
};

export const Step4: Story = {
  args: {
    currentStep: 4,
    steps: defaultSteps,
  },
  parameters: {
    docs: {
      storyDescription:
        "ステップ4「決済・引渡し」。すべてのステップが青磁差し色で完了。",
    },
  },
};
