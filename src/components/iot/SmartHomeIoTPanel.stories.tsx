import type { Meta, StoryObj } from "@storybook/react";
import { SmartHomeIoTPanel } from "@/components/iot/SmartHomeIoTPanel";

/**
 * ## SmartHomeIoTPanel（スマートホームIoT連携パネル）
 *
 * 賃貸管理・民宿運営の物件に設置されたIoT設備（スマートロック・温湿度センサー・
 * 電力監視・防犯カメラ・給排水監視）を一元管理するダッシュボードパネル。
 * 管理会社（KANAE）と入居者・宿泊者の双方が使用可能。
 *
 * **デザイン原則（扁平化・階層分離）**:
 * - 入口は極簡: 和紙白カード + アイコン + ステータスランプのみ
 * - タップ/クリックで詳細レイヤー展開（階層分離）
 * - スクロール中でも各カードは独立してタップ可能（扁平化）
 * - 異常時: 紅銅警示（#B87333）の脈動ランプ + 通知バッジ
 * - 正常時: 青磁差し色（#7A9E9F）の静かな点灯
 * - 警告時: 光金銅（#C9A96E）の点滅
 * - デバイスアイコン: 朽木棕（#8B7355）の線アイコン（極細1.5px）
 * - リアルタイム数値: RobotoMono 16px Bold（等幅で桁揃え）
 * - 履歴グラフ: 光透過10塗り + 光金銅2pxライン（Mini Chart）
 * - 操作ボタン: 光金銅1px枠線 + Hoverで塗り（解錠・温度調整等）
 *
 * **使用Token**:
 * - `colors/accent/light-copper` — 操作ボタン・警告ランプ
 * - `colors/accent/celadon-blue` — 正常ステータス
 * - `colors/accent/red-copper` — 異常・緊急
 * - `colors/secondary/decay-wood` — デバイスアイコン
 * - `font/data/mono` — リアルタイム数値
 * - `effect/shadow/card-hover` — カードHover浮遊
 * - `animation/pulse-gold` — 警告時脈動
 */
const meta = {
  title: "IoT/SmartHomeIoTPanel",
  component: SmartHomeIoTPanel,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/IoT_SmartHomeIoTPanel?node-id=170-1",
    },
  },
  argTypes: {
    propertyId: { control: "text", description: "物件ID" },
    propertyName: { control: "text", description: "物件名" },
    devices: { control: "object", description: "IoTデバイス配列" },
    userRole: {
      control: "select",
      options: ["admin", "tenant", "guest"],
      description: "ユーザーロール",
    },
    alertCount: { control: "number", description: "未確認アラート数" },
    onDeviceClick: { action: "deviceClicked" },
    onControlAction: { action: "controlActioned" },
  },
} satisfies Meta<typeof SmartHomeIoTPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockDevices = [
  {
    id: "iot-001",
    type: "smartlock",
    name: "玄関スマートロック",
    status: "locked",
    lastAction: "2026-05-08T18:30:00Z",
    battery: 78,
    alerts: 0,
    quickActions: ["解錠", "鍵履歴"],
  },
  {
    id: "iot-002",
    type: "thermometer",
    name: "リビング温湿度",
    status: "normal",
    currentValue: { temp: 24.5, humidity: 58 },
    battery: 92,
    alerts: 0,
    quickActions: ["履歴"],
  },
  {
    id: "iot-003",
    type: "power",
    name: "電力監視",
    status: "normal",
    currentValue: { watt: 420, yenPerDay: 145 },
    battery: null,
    alerts: 0,
    quickActions: ["詳細"],
  },
  {
    id: "iot-004",
    type: "camera",
    name: "防犯カメラ（玄関）",
    status: "recording",
    lastAction: "2026-05-08T20:00:00Z",
    battery: null,
    alerts: 1,
    quickActions: ["ライブ", "録画"],
  },
  {
    id: "iot-005",
    type: "water",
    name: "給排水監視",
    status: "warning",
    currentValue: { pressure: 0.18, leak: true },
    battery: 85,
    alerts: 2,
    quickActions: ["確認", "緊急停止"],
  },
  {
    id: "iot-006",
    type: "smoke",
    name: "煙感知器",
    status: "normal",
    currentValue: { co2: 420 },
    battery: 65,
    alerts: 0,
    quickActions: ["テスト"],
  },
];

export const AdminDashboard: Story = {
  args: {
    propertyId: "prop-001",
    propertyName: "代官山駅前レジデンス 201号室",
    devices: mockDevices,
    userRole: "admin",
    alertCount: 3,
  },
  parameters: {
    docs: {
      storyDescription:
        "管理会社（KANAE）用ダッシュボード。6デバイスを2列グリッドで表示。給排水監視が警告（光金銅点滅）、防犯カメラが未確認アラート1件（紅銅バッジ）。すべての操作ボタンが有効。",
    },
  },
};

export const TenantView: Story = {
  args: {
    propertyId: "prop-001",
    propertyName: "代官山駅前レジデンス 201号室",
    devices: mockDevices.filter((d) =>
      ["smartlock", "thermometer", "power"].includes(d.type),
    ),
    userRole: "tenant",
    alertCount: 0,
  },
  parameters: {
    docs: {
      storyDescription:
        "入居者用ビュー。操作可能デバイスを3つだけ表示（スマートロック・温湿度・電力）。解錠ボタンが光金銅枠線で強調。電力の「¥145/日」がRobotoMonoで等幅表示。",
    },
  },
};

export const GuestView: Story = {
  args: {
    propertyId: "prop-inn-003",
    propertyName: "民宿「椿の間」",
    devices: mockDevices.filter((d) => d.type === "smartlock"),
    userRole: "guest",
    alertCount: 0,
  },
  parameters: {
    docs: {
      storyDescription:
        "民宿宿泊者用。スマートロックのみ表示。チェックイン時の一時的な解錠コード発行ボタン（黄銅光背景）。滞在中のみ有効。",
    },
  },
};

export const AlertMode: Story = {
  args: {
    propertyId: "prop-002",
    propertyName: "中目黒マンション 305号室",
    devices: [
      {
        ...mockDevices[4],
        status: "critical",
        alerts: 5,
        currentValue: { pressure: 0.05, leak: true },
      },
      { ...mockDevices[0], status: "unlocked", alerts: 0 },
      {
        ...mockDevices[5],
        status: "warning",
        alerts: 1,
        currentValue: { co2: 1200 },
      },
    ],
    userRole: "admin",
    alertCount: 6,
  },
  parameters: {
    docs: {
      storyDescription:
        "緊急アラートモード。給排水がクリティカル（紅銅Pulse）、CO2濃度警告（光金銅点滅）。画面上部に「緊急事項6件」バナー（紅銅背景・和紙白文字）。",
    },
  },
};

export const MobileIoT: Story = {
  args: {
    propertyId: "prop-001",
    propertyName: "代官山駅前レジデンス",
    devices: mockDevices,
    userRole: "tenant",
    alertCount: 1,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
    docs: {
      storyDescription:
        "Mobile表示。1列グリッド。スクロール中に各カードが独立してタップ可能。防犯カメラの「ライブ」ボタンが画面幅いっぱいに広がる。",
    },
  },
};

export const DeviceDetailExpanded: Story = {
  args: {
    propertyId: "prop-001",
    propertyName: "代官山駅前レジデンス",
    devices: [mockDevices[1]], // 温湿度のみ
    userRole: "admin",
    alertCount: 0,
  },
  parameters: {
    docs: {
      storyDescription:
        "温湿度詳細展開。タップで24時間グラフ展開。光透過10塗り + 光金銅2pxラインのMini Chart。最高/最低値がRobotoMonoで表示。",
    },
  },
};
