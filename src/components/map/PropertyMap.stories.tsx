import type { Meta, StoryObj } from "@storybook/react";
import { PropertyMap } from "@/components/map/PropertyMap";

/**
 * ## PropertyMap（物件周辺Map連動マップ）
 *
 * 賃貸・売買・投資物件の位置情報と周辺施設をMapBox GL JSで表示する連動マップコンポーネント。
 * 建物の「立地価値」を視覚的に伝える核心UI。
 *
 * **デザイン原則**:
 * - 地図ベース: MapBox Light / Monochromeスタイル（和紙白・混凝土灰トーン）
 * - 物件マーカー: 光金銅（#C9A96E）円 + 白抜き建物アイコン、Hoverで黄銅光Glow
 * - 駅マーカー: 黄銅光（#D4AF37）小円 + 「駅」文字
 * - 周辺施設: 錆鉄灰（#5A5A5A）小アイコン（コンビニ・病院・公園）
 * - 情報ウィンドウ: 和紙白背景 + buildingシャドウ + 4px角丸
 * - ルート表示: 光金銅 2px 実線（徒歩経路）
 * - 半径円: 光透過10（rgba(201,169,110,0.10)）で生活圏を演出
 *
 * **使用Token**:
 * - `colors/accent/light-copper` — 物件マーカー・ルート線
 * - `colors/accent/brass-gold` — 駅マーカー
 * - `colors/secondary/rust-iron` — 周辺施設アイコン
 * - `colors/dominant/washi-white` — 情報ウィンドウ背景
 * - `effect/shadow/building` — 情報ウィンドウシャドウ
 * - `colors/light/through-10` — 生活圏半径円
 */
const meta = {
  title: "Map/PropertyMap",
  component: PropertyMap,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/Map_PropertyMap?node-id=80-1",
    },
    layout: "fullscreen",
  },
  argTypes: {
    center: { control: "object", description: "地図中心座標 [lng, lat]" },
    zoom: { control: "number", description: "ズームレベル" },
    properties: { control: "object", description: "物件マーカーデータ配列" },
    stations: { control: "object", description: "駅マーカーデータ配列" },
    facilities: { control: "object", description: "周辺施設データ配列" },
    showRoute: { control: "boolean", description: "徒歩経路表示" },
    radiusMeters: { control: "number", description: "生活圏半径（m）" },
    mapStyle: {
      control: "select",
      options: ["light", "monochrome", "satellite"],
      description: "MapBoxスタイル",
    },
  },
} satisfies Meta<typeof PropertyMap>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProperties = [
  {
    id: "1",
    lng: 139.7036,
    lat: 35.6493,
    name: "代官山駅前レジデンス",
    price: "¥128,000",
    type: "rental",
  },
  {
    id: "2",
    lng: 139.6988,
    lat: 35.6472,
    name: "中目黒ヴィンテージハウス",
    price: "¥210,000",
    type: "rental",
  },
];

const mockStations = [
  {
    id: "s1",
    lng: 139.7032,
    lat: 35.649,
    name: "代官山駅",
    line: "東急東横線",
    walkMinutes: 5,
  },
  {
    id: "s2",
    lng: 139.698,
    lat: 35.6415,
    name: "中目黒駅",
    line: "東急東横線・日比谷線",
    walkMinutes: 12,
  },
];

const mockFacilities = [
  {
    id: "f1",
    lng: 139.704,
    lat: 35.65,
    name: "ファミリーマート",
    type: "convenience",
    brand: "FamilyMart",
  },
  {
    id: "f2",
    lng: 139.702,
    lat: 35.6485,
    name: "代官山町立公園",
    type: "park",
  },
  { id: "f3", lng: 139.705, lat: 35.651, name: "代官山病院", type: "hospital" },
];

export const SingleProperty: Story = {
  args: {
    center: [139.7036, 35.6493],
    zoom: 16,
    properties: [mockProperties[0]],
    stations: mockStations,
    facilities: mockFacilities,
    showRoute: true,
    radiusMeters: 500,
    mapStyle: "monochrome",
  },
  parameters: {
    docs: {
      storyDescription:
        "単一物件表示。代官山駅前レジデンスを中心に、駅・コンビニ・公園・病院を表示。徒歩経路（光金銅2px線）と500m生活圏（光透過10円）を重ねる。",
    },
  },
};

export const MultipleProperties: Story = {
  args: {
    center: [139.701, 35.648],
    zoom: 15,
    properties: mockProperties,
    stations: mockStations,
    facilities: mockFacilities,
    showRoute: false,
    radiusMeters: 0,
    mapStyle: "light",
  },
  parameters: {
    docs: {
      storyDescription:
        "複数物件比較。2物件のマーカーが同時に表示。物件間の相対位置関係を視覚的に比較可能。",
    },
  },
};

export const InvestmentArea: Story = {
  args: {
    center: [139.701, 35.648],
    zoom: 14,
    properties: [
      {
        id: "inv1",
        lng: 139.7036,
        lat: 35.6493,
        name: "投資物件A",
        price: "利回り6.2%",
        type: "investment",
      },
      {
        id: "inv2",
        lng: 139.71,
        lat: 35.655,
        name: "投資物件B",
        price: "利回り5.8%",
        type: "investment",
      },
      {
        id: "inv3",
        lng: 139.69,
        lat: 35.64,
        name: "投資物件C",
        price: "利回り7.1%",
        type: "investment",
      },
    ],
    stations: mockStations,
    facilities: [],
    showRoute: false,
    radiusMeters: 1000,
    mapStyle: "monochrome",
  },
  parameters: {
    docs: {
      storyDescription:
        "投資物件エリア分析。3物件の利回りバッジをマーカーに重ね、1km圏内の駅アクセスを可視化。",
    },
  },
};

export const SatelliteView: Story = {
  args: {
    center: [139.7036, 35.6493],
    zoom: 18,
    properties: [mockProperties[0]],
    stations: [],
    facilities: [],
    showRoute: false,
    radiusMeters: 0,
    mapStyle: "satellite",
  },
  parameters: {
    docs: {
      storyDescription:
        "航空写真モード。建物の外観・屋上・周辺環境を衛星画像で確認。投資家向け現地調査支援。",
    },
  },
};

export const MobileMap: Story = {
  args: {
    center: [139.7036, 35.6493],
    zoom: 15,
    properties: [mockProperties[0]],
    stations: [mockStations[0]],
    facilities: mockFacilities.slice(0, 2),
    showRoute: true,
    radiusMeters: 300,
    mapStyle: "monochrome",
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
    docs: {
      storyDescription:
        "Mobile表示。画面下部にスワイプ可能な情報パネル。マップは上部60%を占有。",
    },
  },
};
