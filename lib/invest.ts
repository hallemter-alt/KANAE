// 一棟収益物件データ — 真実物件データ（J-REX ジェイレックス・コーポレーション）
// 出典: 物件概要書（各物件フォルダ）より転記

export interface InvestProperty {
  slug: string
  name: { ja: string; zh: string; en: string }
  catch: { ja: string; zh: string; en: string }
  address: string
  access: string[]
  /** 販売価格（円・税込） */
  price: number
  /** 表面利回り（%） */
  grossYield: number
  landArea: string
  totalFloorArea: string
  exclusiveArea: string
  built: { ja: string; zh: string; en: string }
  structure: { ja: string; zh: string; en: string }
  units: number
  landRight: string
  zoning: string
  otherZoning: string
  bcr: string
  far: string
  designer?: string
  builder?: string
  transaction: string
  remarks?: string
  updated: string
  /** 写真枚数（/assets/invest/{slug}/01.jpg …） */
  photoCount: number
  /** 新築 or 築浅 */
  badge: 'new' | 'nearlyNew'
  area23: boolean
}

export const INVEST_PROPERTIES: InvestProperty[] = [
  {
    slug: 'kagurazaka',
    name: {
      ja: '神楽坂駅 築浅1棟マンション',
      zh: '神樂坂站 準新整棟公寓',
      en: 'Kagurazaka Station — Nearly-New Whole Building',
    },
    catch: {
      ja: '牛込神楽坂駅 徒歩4分 — 地下1階を含む重厚なRC造14戸',
      zh: '牛込神樂坂站步行4分鐘 — 含地下1層的厚重RC造14戶',
      en: '4 min walk to Ushigome-Kagurazaka — solid RC, 14 units incl. basement',
    },
    address: '東京都新宿区細工町1-15',
    access: [
      '都営大江戸線「牛込神楽坂」駅 徒歩4分',
      '東京メトロ東西線「神楽坂」駅 徒歩8分',
      'JR中央・総武線ほか「市ヶ谷」駅 徒歩11分',
    ],
    price: 1250000000,
    grossYield: 3.6,
    landArea: '140.28㎡（約42.43坪・実測）',
    totalFloorArea: '484.66㎡（約146.60坪）',
    exclusiveArea: '443.29㎡（約134.09坪）',
    built: { ja: '2024年3月', zh: '2024年3月', en: 'March 2024' },
    structure: {
      ja: '鉄筋コンクリート造 地上5階建 地下1階',
      zh: '鋼筋混凝土造 地上5層 地下1層',
      en: 'RC, 5 floors above ground + 1 basement',
    },
    units: 14,
    landRight: '所有権',
    zoning: '近隣商業地域、第1種住居地域',
    otherZoning: '防火地域、準防火地域',
    bcr: '60%・80%',
    far: '200%・300%',
    designer: '北尾一顕建築設計事務所',
    builder: '株式会社ヨシナガ工業',
    transaction: '売主',
    updated: '2025年8月1日',
    photoCount: 8,
    badge: 'nearlyNew',
    area23: true,
  },
  {
    slug: 'shinjuku-wakaba',
    name: {
      ja: '新宿若葉 築浅1棟マンション',
      zh: '新宿若葉 準新整棟公寓',
      en: 'Shinjuku Wakaba — Nearly-New Whole Building',
    },
    catch: {
      ja: '四谷三丁目駅 徒歩7分 — 閑静な住宅地に佇む全10戸',
      zh: '四谷三丁目站步行7分鐘 — 靜謐住宅區中的10戶',
      en: '7 min walk to Yotsuya-sanchome — 10 units in a quiet district',
    },
    address: '東京都新宿区若葉2丁目5-27',
    access: ['東京メトロ丸ノ内線「四谷三丁目」駅 徒歩7分'],
    price: 843000000,
    grossYield: 3.7,
    landArea: '120.06㎡（36.31坪・実測）',
    totalFloorArea: '298.59㎡（90.33坪）',
    exclusiveArea: '266.07㎡（80.48坪）',
    built: { ja: '2024年8月', zh: '2024年8月', en: 'August 2024' },
    structure: {
      ja: '鉄筋コンクリート造 5階建',
      zh: '鋼筋混凝土造 5層',
      en: 'RC, 5 floors',
    },
    units: 10,
    landRight: '所有権',
    zoning: '第一種住居地域',
    otherZoning: '30m高度地区、準防火地域',
    bcr: '60%',
    far: '300%',
    designer: '株式会社スミト一級建築事務所',
    builder: '株式会社嶋工務店',
    transaction: '売主',
    remarks: '私道持ち分あり、共同住宅＋長屋',
    updated: '2025年8月1日',
    photoCount: 8,
    badge: 'nearlyNew',
    area23: true,
  },
  {
    slug: 'hatanodai',
    name: {
      ja: '旗の台 新築1棟マンション',
      zh: '旗之台 新建整棟公寓',
      en: 'Hatanodai — New Whole Building',
    },
    catch: {
      ja: '旗の台駅 徒歩5分 — 商業地域・容積率400%の新築15戸',
      zh: '旗之台站步行5分鐘 — 商業地域·容積率400%的新建15戶',
      en: '5 min walk to Hatanodai — new build, 15 units, FAR 400%',
    },
    address: '東京都品川区旗の台2丁目1',
    access: ['東急池上線・東急大井町線「旗の台」駅 徒歩5分'],
    price: 1115000000,
    grossYield: 4.0,
    landArea: '169.34㎡（51.22坪・実測）',
    totalFloorArea: '630.34㎡（190.67坪）',
    exclusiveArea: '597.37㎡（180.70坪）',
    built: { ja: '2026年2月', zh: '2026年2月', en: 'February 2026' },
    structure: {
      ja: '鉄筋コンクリート造 地上5階建',
      zh: '鋼筋混凝土造 地上5層',
      en: 'RC, 5 floors',
    },
    units: 15,
    landRight: '所有権',
    zoning: '商業地域、近隣商業地域',
    otherZoning: '防火地域、準防火地域、第3種高度地区',
    bcr: '80%',
    far: '400%／300%',
    designer: '合同会社オー・アイ・ディー アーキテクツ',
    builder: '株式会社明豊エンジニアリング',
    transaction: '売主',
    updated: '2026年4月5日',
    photoCount: 8,
    badge: 'new',
    area23: true,
  },
  {
    slug: 'meguro-honcho',
    name: {
      ja: '目黒本町 築浅1棟マンション',
      zh: '目黑本町 準新整棟公寓',
      en: 'Meguro Honcho — Nearly-New Whole Building',
    },
    catch: {
      ja: '西小山駅 徒歩10分 — ゆとりある敷地66坪・全15戸',
      zh: '西小山站步行10分鐘 — 寬裕用地66坪·15戶',
      en: '10 min walk to Nishi-koyama — generous 218㎡ site, 15 units',
    },
    address: '東京都目黒区目黒本町6丁目20番9号',
    access: [
      '東急目黒線「西小山」駅 徒歩10分',
      '東急目黒線「武蔵小山」駅 徒歩14分',
    ],
    price: 887000000,
    grossYield: 4.0,
    landArea: '218.20㎡（66.00坪・実測）',
    totalFloorArea: '491.00㎡（148.52坪）',
    exclusiveArea: '433.80㎡（約131.22坪）',
    built: { ja: '2025年3月', zh: '2025年3月', en: 'March 2025' },
    structure: {
      ja: '鉄筋コンクリート造 地上4階建',
      zh: '鋼筋混凝土造 地上4層',
      en: 'RC, 4 floors',
    },
    units: 15,
    landRight: '所有権',
    zoning: '第1種住居地域',
    otherZoning: '準防火地域、第二種高度地域',
    bcr: '60%（70%）',
    far: '200%',
    designer: '株式会社ランディックス',
    builder: 'イズアーク株式会社',
    transaction: '売主',
    updated: '2026年1月21日',
    photoCount: 8,
    badge: 'nearlyNew',
    area23: true,
  },
  {
    slug: 'senzoku',
    name: {
      ja: '洗足駅 新築1棟マンション',
      zh: '洗足站 新建整棟公寓',
      en: 'Senzoku Station — New Whole Building',
    },
    catch: {
      ja: '洗足駅 徒歩7分 — 近隣商業地域に建つ新築12戸',
      zh: '洗足站步行7分鐘 — 近鄰商業地域的新建12戶',
      en: '7 min walk to Senzoku — new build, 12 units',
    },
    address: '東京都目黒区洗足一丁目20-16',
    access: [
      '東急目黒線「洗足」駅 徒歩7分',
      '東急目黒線「西小山」駅 徒歩8分',
    ],
    price: 672000000,
    grossYield: 4.0,
    landArea: '112.61㎡（34.06坪・実測）',
    totalFloorArea: '377.45㎡（約114.17坪）',
    exclusiveArea: '333.13㎡（約100.77坪）',
    built: { ja: '2025年9月', zh: '2025年9月', en: 'September 2025' },
    structure: {
      ja: '鉄筋コンクリート造 5階建',
      zh: '鋼筋混凝土造 5層',
      en: 'RC, 5 floors',
    },
    units: 12,
    landRight: '所有権',
    zoning: '近隣商業地域',
    otherZoning: '防火地域、20m第3種高度地区、日影規制5h-3h(4m)',
    bcr: '80%',
    far: '300%',
    designer: '(株)曽我建築設計事務所',
    builder: '(株)池田山エステート',
    transaction: '売主',
    updated: '2026年2月25日',
    photoCount: 8,
    badge: 'new',
    area23: true,
  },
  {
    slug: 'miyazakidai',
    name: {
      ja: '宮崎台駅 新築1棟マンション',
      zh: '宮崎台站 新建整棟公寓',
      en: 'Miyazakidai Station — New Whole Building',
    },
    catch: {
      ja: '宮崎台駅 徒歩10分 — 敷地169坪・全43戸の大型レジデンス',
      zh: '宮崎台站步行10分鐘 — 用地169坪·43戶大型公寓',
      en: '10 min walk to Miyazakidai — large residence, 43 units on 560㎡ site',
    },
    address: '神奈川県川崎市宮前区宮崎3丁目',
    access: [
      '東急田園都市線「宮崎台」駅 徒歩10分',
      '東急バス「しばられ松」停留所 徒歩3分',
    ],
    price: 1226000000,
    grossYield: 4.3,
    landArea: '559.75㎡（169.3坪・実測）',
    totalFloorArea: '1404.86㎡（424.9坪）',
    exclusiveArea: '1106.75㎡（330.6坪）',
    built: { ja: '2023年9月', zh: '2023年9月', en: 'September 2023' },
    structure: {
      ja: '鉄筋コンクリート造 地上4階 地下1階建',
      zh: '鋼筋混凝土造 地上4層 地下1層',
      en: 'RC, 4 floors above ground + 1 basement',
    },
    units: 43,
    landRight: '所有権',
    zoning: '第一種中高層住居専用地域',
    otherZoning: '準防火地域',
    bcr: '60%',
    far: '200%',
    transaction: '売主',
    updated: '2024年1月30日',
    photoCount: 8,
    badge: 'new',
    area23: false,
  },
]

export function getInvestProperty(slug: string): InvestProperty | undefined {
  return INVEST_PROPERTIES.find((p) => p.slug === slug)
}

/** 億円表示（例: 12.5億円） */
export function formatOku(price: number): string {
  const oku = price / 100000000
  return Number.isInteger(oku) ? `${oku}億円` : `${oku.toFixed(2).replace(/\.?0+$/, '')}億円`
}

/** 想定年間賃料収入（円） = 価格 × 表面利回り */
export function annualRent(p: InvestProperty): number {
  return Math.round((p.price * p.grossYield) / 100)
}
