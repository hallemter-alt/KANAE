import type { Meta, StoryObj } from "@storybook/react";
import { N8NWorkflowDashboard } from "@/components/workflow/N8NWorkflowDashboard";

/**
 * ## N8NWorkflowDashboard（N8N自動化工作流ダッシュボード）
 *
 * 物件データベースの自動化工作流を可視化・管理するダッシュボード。
 * Renis（物件情報サイト）からの自動スクレイピング→情報抽出→周辺分析→
 * 推薦判定→物件データ档作成→Webシステム連携の一連フローを監視。
 *
 * **デザイン原則（扁平化・階層分離）**:
 * - 入口は極簡: 各ワークフローカードは「状態ランプ + 名前 + 最終実行時刻」のみ
 * - スクロール中に各カードをタップして詳細ログ展開（扁平化）
 * - 実行中: 光金銅（#C9A96E）の流れるアニメーション（N8Nロゴ風）
 * - 成功: 青磁差し色（#7A9E9F）の静かな点灯
 * - 失敗: 紅銅警示（#B87333）の脈動 + エラーログプレビュー
 * - 待機中: 錆鉄灰（#5A5A5A）の薄い点灯
 * - フロー図: 水平ノード連結（光金銅1px線 + ノード間アニメーションドット）
 * - ログ表示: RobotoMono 12px（ターミナル風）+ シンタックスハイライト
 * - 物件データプレビュー: 光透過10背景 + 光金銅左Border 3px（推薦確定時）
 *
 * **使用Token**:
 * - `colors/accent/light-copper` — 実行中フロー・ノード接続線
 * - `colors/accent/celadon-blue` — 成功状態
 * - `colors/accent/red-copper` — 失敗・エラー
 * - `colors/secondary/rust-iron` — 待機中・ログテキスト
 * - `colors/light/through-10` — 物件プレビュー背景
 * - `font/data/mono` — ログ・タイムスタンプ・物件ID
 * - `effect/shadow/building` — フローカード群
 */
const meta = {
  title: "Workflow/N8NWorkflowDashboard",
  component: N8NWorkflowDashboard,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/Workflow_N8NWorkflowDashboard?node-id=180-1",
    },
  },
  argTypes: {
    workflows: { control: "object", description: "工作流定義配列" },
    activeWorkflowId: { control: "text", description: "展開中ワークフローID" },
    onWorkflowToggle: { action: "workflowToggled" },
    onNodeClick: { action: "nodeClicked" },
    onManualTrigger: { action: "manualTriggered" },
  },
} satisfies Meta<typeof N8NWorkflowDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockWorkflows = [
  {
    id: "wf-scrape-renis",
    name: "Renis物件自動抓取",
    status: "running",
    lastRun: "2026-05-08T20:15:00Z",
    nextRun: "2026-05-08T21:00:00Z",
    trigger: "cron",
    nodes: [
      { id: "n1", name: "Cron", type: "trigger", status: "completed" },
      { id: "n2", name: "HTTP Request", type: "action", status: "running" },
      { id: "n3", name: "HTML Extract", type: "action", status: "waiting" },
      { id: "n4", name: "Save to DB", type: "action", status: "waiting" },
    ],
    logs: [
      "[20:15:00] Cron triggered",
      "[20:15:01] HTTP Request: https://renis.jp/tokyo/shibuya",
      "[20:15:03] Fetching page 1 of 12...",
    ],
    stats: { totalRuns: 1247, successRate: 98.2, avgDuration: "45s" },
  },
  {
    id: "wf-analyze-property",
    name: "物件情報分析・調査",
    status: "idle",
    lastRun: "2026-05-08T19:30:00Z",
    nextRun: "On demand",
    trigger: "webhook",
    nodes: [
      { id: "n1", name: "Webhook", type: "trigger", status: "completed" },
      { id: "n2", name: "AI Analysis", type: "action", status: "completed" },
      { id: "n3", name: "Map API", type: "action", status: "completed" },
      { id: "n4", name: "Scoring", type: "action", status: "completed" },
    ],
    logs: [
      "[19:30:00] Webhook received: prop-8921",
      "[19:30:02] AI Analysis: 築15年, 42㎡, 代官山駅5分",
      "[19:30:05] Map API: 周辺施設取得完了",
      "[19:30:08] Scoring: 推薦スコア 87/100",
    ],
    stats: { totalRuns: 342, successRate: 96.5, avgDuration: "12s" },
  },
  {
    id: "wf-recommend-check",
    name: "推薦判定・データ档作成",
    status: "idle",
    lastRun: "2026-05-08T18:00:00Z",
    nextRun: "On demand",
    trigger: "webhook",
    nodes: [
      { id: "n1", name: "Webhook", type: "trigger", status: "completed" },
      {
        id: "n2",
        name: "Threshold Check",
        type: "action",
        status: "completed",
      },
      { id: "n3", name: "Create Record", type: "action", status: "completed" },
      { id: "n4", name: "Notify Slack", type: "action", status: "completed" },
    ],
    logs: [
      "[18:00:00] Threshold Check: 87 >= 80 → PASS",
      "[18:00:01] Create Record: DB登録完了 (prop-8921)",
      "[18:00:02] Notify Slack: #物件推薦 チャンネルに通知",
    ],
    stats: { totalRuns: 156, successRate: 100, avgDuration: "3s" },
  },
  {
    id: "wf-sync-web",
    name: "Webシステム自動連携",
    status: "failed",
    lastRun: "2026-05-08T17:45:00Z",
    nextRun: "Retry in 5min",
    trigger: "cron",
    nodes: [
      { id: "n1", name: "Cron", type: "trigger", status: "completed" },
      { id: "n2", name: "Get New Props", type: "action", status: "completed" },
      { id: "n3", name: "Upload Images", type: "action", status: "failed" },
      { id: "n4", name: "Update CMS", type: "action", status: "waiting" },
    ],
    logs: [
      "[17:45:00] 3件の新規物件を検出",
      "[17:45:02] Upload Images: ERROR - CDN timeout (502)",
      "[17:45:03] Retry attempt 1/3...",
    ],
    stats: { totalRuns: 890, successRate: 94.1, avgDuration: "28s" },
  },
];

export const AllWorkflows: Story = {
  args: {
    workflows: mockWorkflows,
    activeWorkflowId: null,
  },
  parameters: {
    docs: {
      storyDescription:
        "全ワークフロー一覧。4つの自動化フローをカードグリッドで表示。Renis抓取が実行中（光金銅流れるアニメーション）、Web連携が失敗（紅銅Pulse）。各カードはスクロール中に独立タップ可能。",
    },
  },
};

export const WorkflowExpanded: Story = {
  args: {
    workflows: mockWorkflows,
    activeWorkflowId: "wf-analyze-property",
  },
  parameters: {
    docs: {
      storyDescription:
        "「物件情報分析・調査」展開状態。水平ノードフロー図が表示（Webhook→AI Analysis→Map API→Scoring）。光金銅1px線でノード接続。各ノードをタップで個別ログ展開。下部に推薦スコア87/100の物件プレビュー（光透過10背景）。",
    },
  },
};

export const RunningState: Story = {
  args: {
    workflows: [mockWorkflows[0]],
    activeWorkflowId: "wf-scrape-renis",
  },
  parameters: {
    docs: {
      storyDescription:
        "実行中詳細。Cron→HTTP Request間で光金銅のドットが流れるアニメーション。ログはリアルタイムに追加される（RobotoMono 12px）。「page 1 of 12」の進捗が錆鉄灰で表示。",
    },
  },
};

export const FailedDetail: Story = {
  args: {
    workflows: [mockWorkflows[3]],
    activeWorkflowId: "wf-sync-web",
  },
  parameters: {
    docs: {
      storyDescription:
        "失敗詳細。Upload Imagesノードが紅銅背景で強調。エラーログ「CDN timeout (502)」が赤文字。Retryボタンが光金銅枠線で表示。手動実行トリガーも配置。",
    },
  },
};

export const PropertyPreviewCard: Story = {
  args: {
    workflows: [mockWorkflows[1]],
    activeWorkflowId: "wf-analyze-property",
  },
  parameters: {
    docs: {
      storyDescription:
        "物件プレビューカード。AI分析完了後、自動生成された物件データが表示。物件名「代官山駅前新築マンション」、推薦スコア87、推薦理由タグ（「駅近」「築浅」「利回り良好」）。光金銅左Border 3pxで「推薦確定」を表現。",
    },
  },
};

export const MobileWorkflow: Story = {
  args: {
    workflows: mockWorkflows,
    activeWorkflowId: null,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
    docs: {
      storyDescription:
        "Mobile表示。1列カード積み。各カードは画面幅いっぱい。タップでボトムシート展開（フロー図が縦方向にリフロー）。",
    },
  },
};
