// 首都圏の主要沿線データ — 賃貸・売買検索の「沿線選択」用
// Train line data for the rent / sale search "line selection" feature

import type { Locale } from '@/lib/translations'

export interface TrainLine {
  id: string
  name: { ja: string; zh: string; en: string }
}

export interface TrainLineGroup {
  id: string
  operator: { ja: string; zh: string; en: string }
  lines: TrainLine[]
}

export const TRAIN_LINE_GROUPS: TrainLineGroup[] = [
  {
    id: 'jr',
    operator: { ja: 'JR線', zh: 'JR線', en: 'JR Lines' },
    lines: [
      { id: 'jr-yamanote', name: { ja: '山手線', zh: '山手線', en: 'Yamanote Line' } },
      { id: 'jr-chuo', name: { ja: '中央線', zh: '中央線', en: 'Chuo Line' } },
      { id: 'jr-keihin-tohoku', name: { ja: '京浜東北線', zh: '京濱東北線', en: 'Keihin-Tohoku Line' } },
      { id: 'jr-sobu', name: { ja: '総武線', zh: '總武線', en: 'Sobu Line' } },
      { id: 'jr-saikyo', name: { ja: '埼京線', zh: '埼京線', en: 'Saikyo Line' } },
      { id: 'jr-shonan-shinjuku', name: { ja: '湘南新宿ライン', zh: '湘南新宿線', en: 'Shonan-Shinjuku Line' } },
      { id: 'jr-keiyo', name: { ja: '京葉線', zh: '京葉線', en: 'Keiyo Line' } },
      { id: 'jr-joban', name: { ja: '常磐線', zh: '常磐線', en: 'Joban Line' } },
      { id: 'jr-yokosuka', name: { ja: '横須賀線', zh: '橫須賀線', en: 'Yokosuka Line' } },
    ],
  },
  {
    id: 'metro',
    operator: { ja: '東京メトロ', zh: '東京地鐵', en: 'Tokyo Metro' },
    lines: [
      { id: 'metro-ginza', name: { ja: '銀座線', zh: '銀座線', en: 'Ginza Line' } },
      { id: 'metro-marunouchi', name: { ja: '丸ノ内線', zh: '丸之內線', en: 'Marunouchi Line' } },
      { id: 'metro-hibiya', name: { ja: '日比谷線', zh: '日比谷線', en: 'Hibiya Line' } },
      { id: 'metro-tozai', name: { ja: '東西線', zh: '東西線', en: 'Tozai Line' } },
      { id: 'metro-chiyoda', name: { ja: '千代田線', zh: '千代田線', en: 'Chiyoda Line' } },
      { id: 'metro-yurakucho', name: { ja: '有楽町線', zh: '有樂町線', en: 'Yurakucho Line' } },
      { id: 'metro-hanzomon', name: { ja: '半蔵門線', zh: '半藏門線', en: 'Hanzomon Line' } },
      { id: 'metro-namboku', name: { ja: '南北線', zh: '南北線', en: 'Namboku Line' } },
      { id: 'metro-fukutoshin', name: { ja: '副都心線', zh: '副都心線', en: 'Fukutoshin Line' } },
    ],
  },
  {
    id: 'toei',
    operator: { ja: '都営地下鉄', zh: '都營地鐵', en: 'Toei Subway' },
    lines: [
      { id: 'toei-asakusa', name: { ja: '浅草線', zh: '淺草線', en: 'Asakusa Line' } },
      { id: 'toei-mita', name: { ja: '三田線', zh: '三田線', en: 'Mita Line' } },
      { id: 'toei-shinjuku', name: { ja: '新宿線', zh: '新宿線', en: 'Shinjuku Line' } },
      { id: 'toei-oedo', name: { ja: '大江戸線', zh: '大江戶線', en: 'Oedo Line' } },
    ],
  },
  {
    id: 'private',
    operator: { ja: '私鉄・その他', zh: '私鐵・其他', en: 'Private Railways & Others' },
    lines: [
      { id: 'tokyu-toyoko', name: { ja: '東急東横線', zh: '東急東橫線', en: 'Tokyu Toyoko Line' } },
      { id: 'tokyu-denentoshi', name: { ja: '東急田園都市線', zh: '東急田園都市線', en: 'Tokyu Den-en-toshi Line' } },
      { id: 'tokyu-meguro', name: { ja: '東急目黒線', zh: '東急目黑線', en: 'Tokyu Meguro Line' } },
      { id: 'tokyu-oimachi', name: { ja: '東急大井町線', zh: '東急大井町線', en: 'Tokyu Oimachi Line' } },
      { id: 'odakyu', name: { ja: '小田急線', zh: '小田急線', en: 'Odakyu Line' } },
      { id: 'keio', name: { ja: '京王線', zh: '京王線', en: 'Keio Line' } },
      { id: 'keio-inokashira', name: { ja: '京王井の頭線', zh: '京王井之頭線', en: 'Keio Inokashira Line' } },
      { id: 'seibu-shinjuku', name: { ja: '西武新宿線', zh: '西武新宿線', en: 'Seibu Shinjuku Line' } },
      { id: 'seibu-ikebukuro', name: { ja: '西武池袋線', zh: '西武池袋線', en: 'Seibu Ikebukuro Line' } },
      { id: 'tobu-tojo', name: { ja: '東武東上線', zh: '東武東上線', en: 'Tobu Tojo Line' } },
      { id: 'keikyu', name: { ja: '京急本線', zh: '京急本線', en: 'Keikyu Main Line' } },
      { id: 'keisei', name: { ja: '京成本線', zh: '京成本線', en: 'Keisei Main Line' } },
      { id: 'rinkai', name: { ja: 'りんかい線', zh: '臨海線', en: 'Rinkai Line' } },
      { id: 'tsukuba-express', name: { ja: 'つくばエクスプレス', zh: '筑波快線', en: 'Tsukuba Express' } },
    ],
  },
]

export function lineLabel(line: TrainLine, locale: Locale): string {
  return line.name[locale]
}

export function groupLabel(group: TrainLineGroup, locale: Locale): string {
  return group.operator[locale]
}
