// 不動産市場データ — 公的機関・業界団体の公表統計に基づく参考値
// 出典は各データセットの source を参照（掲載値は公表資料からの概数・年次代表値）

export interface DataSet {
  id: string
  source: { ja: string; zh: string; en: string }
  sourceUrl: string
  title: { ja: string; zh: string; en: string }
  note: { ja: string; zh: string; en: string }
  unit: string
  series: Array<{ label: string; value: number }>
  series2?: Array<{ label: string; value: number }>
  seriesName?: { ja: string; zh: string; en: string }
  series2Name?: { ja: string; zh: string; en: string }
  chart: 'line' | 'bar'
  tightY?: boolean
}

export const MARKET_DATASETS: DataSet[] = [
  {
    id: 'price-index',
    source: {
      ja: '国土交通省「不動産価格指数（住宅）」',
      zh: '国土交通省《不动产价格指数（住宅）》',
      en: 'MLIT "Residential Property Price Index"',
    },
    sourceUrl: 'https://www.mlit.go.jp/totikensangyo/totikensangyo_tk5_000085.html',
    title: {
      ja: '不動産価格指数 — マンション（全国）',
      zh: '不动产价格指数 — 公寓（全国）',
      en: 'Property Price Index — Condominiums (Nationwide)',
    },
    note: {
      ja: '2010年平均=100。区分マンションは2013年以降ほぼ一貫して上昇し、2024年には200を超える水準に達した。',
      zh: '以2010年平均=100。区分公寓自2013年起持续上涨，2024年已突破200。',
      en: 'Average of 2010 = 100. Condominium prices have risen almost continuously since 2013, exceeding 200 in 2024.',
    },
    unit: '',
    chart: 'line',
    tightY: true,
    seriesName: { ja: 'マンション', zh: '公寓', en: 'Condos' },
    series2Name: { ja: '住宅総合', zh: '住宅综合', en: 'All Residential' },
    series: [
      { label: '2013', value: 110 },
      { label: '2014', value: 120 },
      { label: '2015', value: 128 },
      { label: '2016', value: 137 },
      { label: '2017', value: 142 },
      { label: '2018', value: 146 },
      { label: '2019', value: 151 },
      { label: '2020', value: 157 },
      { label: '2021', value: 171 },
      { label: '2022', value: 187 },
      { label: '2023', value: 195 },
      { label: '2024', value: 205 },
    ],
    series2: [
      { label: '2013', value: 103 },
      { label: '2014', value: 106 },
      { label: '2015', value: 108 },
      { label: '2016', value: 111 },
      { label: '2017', value: 113 },
      { label: '2018', value: 114 },
      { label: '2019', value: 116 },
      { label: '2020', value: 118 },
      { label: '2021', value: 126 },
      { label: '2022', value: 134 },
      { label: '2023', value: 138 },
      { label: '2024', value: 143 },
    ],
  },
  {
    id: 'land-price',
    source: {
      ja: '国土交通省「地価公示」',
      zh: '国土交通省《地价公示》',
      en: 'MLIT "Official Land Price Publication"',
    },
    sourceUrl: 'https://www.mlit.go.jp/kanbo01_hy_001569.html',
    title: {
      ja: '東京圏 住宅地の地価変動率（前年比）',
      zh: '东京圈住宅用地地价变动率（同比）',
      en: 'Tokyo Area Residential Land Price Change (YoY)',
    },
    note: {
      ja: 'コロナ禍の2021年に一時マイナスとなった後、4年連続で上昇幅が拡大。東京23区はさらに高い伸びを示す。',
      zh: '2021年疫情期间一度转负，其后连续4年涨幅扩大。东京23区涨幅更高。',
      en: 'After briefly turning negative in 2021, growth has expanded for four consecutive years. Tokyo 23 wards show even higher growth.',
    },
    unit: '%',
    chart: 'bar',
    series: [
      { label: '2019', value: 1.3 },
      { label: '2020', value: 1.4 },
      { label: '2021', value: -0.5 },
      { label: '2022', value: 0.6 },
      { label: '2023', value: 1.7 },
      { label: '2024', value: 2.8 },
      { label: '2025', value: 3.6 },
    ],
  },
  {
    id: 'shinchiku-price',
    source: {
      ja: '（株）不動産経済研究所「首都圏新築マンション市場動向」',
      zh: '不动产经济研究所《首都圈新建公寓市场动向》',
      en: 'Real Estate Economic Institute "Tokyo Area New Condo Market"',
    },
    sourceUrl: 'https://www.fudousankeizai.co.jp/mansion',
    title: {
      ja: '東京23区 新築マンション平均価格',
      zh: '东京23区新建公寓平均价格',
      en: 'Tokyo 23 Wards — Average New Condo Price',
    },
    note: {
      ja: '2023年に平均1億円を突破。都心の希少性と建築コスト上昇を背景に、価格水準の切り上がりが続く。',
      zh: '2023年平均价格突破1亿日元。在都心稀缺性与建筑成本上升的背景下，价格水平持续抬升。',
      en: 'Average price exceeded ¥100M in 2023. Scarcity in central Tokyo and rising construction costs continue to push prices upward.',
    },
    unit: '万円',
    chart: 'line',
    tightY: true,
    seriesName: { ja: '平均価格', zh: '平均价格', en: 'Avg. Price' },
    series: [
      { label: '2018', value: 7142 },
      { label: '2019', value: 7286 },
      { label: '2020', value: 7712 },
      { label: '2021', value: 8293 },
      { label: '2022', value: 8236 },
      { label: '2023', value: 11483 },
      { label: '2024', value: 11181 },
    ],
  },
  {
    id: 'vacancy',
    source: {
      ja: '（公財）日本賃貸住宅管理協会「賃貸住宅市場景況感調査」',
      zh: '日本租赁住宅管理协会《租赁住宅市场景气调查》',
      en: 'Japan Property Management Association "Rental Housing Market Survey"',
    },
    sourceUrl: 'https://www.jpm.jp/marketdata/',
    title: {
      ja: '首都圏 賃貸住宅の入居率',
      zh: '首都圈租赁住宅入住率',
      en: 'Tokyo Area Rental Housing Occupancy Rate',
    },
    note: {
      ja: '首都圏の入居率は95%前後の高水準で安定的に推移。単身世帯の増加が賃貸需要を下支えしている。',
      zh: '首都圈入住率稳定在95%左右的高水平。单身家庭的增加支撑着租赁需求。',
      en: 'Occupancy remains stable at around 95%. Growth in single-person households underpins rental demand.',
    },
    unit: '%',
    chart: 'line',
    tightY: true,
    seriesName: { ja: '入居率', zh: '入住率', en: 'Occupancy' },
    series: [
      { label: '2018', value: 94.6 },
      { label: '2019', value: 95.0 },
      { label: '2020', value: 94.3 },
      { label: '2021', value: 94.8 },
      { label: '2022', value: 95.5 },
      { label: '2023', value: 96.0 },
      { label: '2024', value: 96.2 },
    ],
  },
  {
    id: 'jreit',
    source: {
      ja: '（一社）不動産証券化協会（ARES）／東京証券取引所',
      zh: '不动产证券化协会（ARES）／东京证券交易所',
      en: 'ARES / Tokyo Stock Exchange',
    },
    sourceUrl: 'https://j-reit.jp/market/',
    title: {
      ja: 'J-REIT市場 時価総額の推移',
      zh: 'J-REIT市场总市值推移',
      en: 'J-REIT Market Capitalization',
    },
    note: {
      ja: '不動産証券化市場は約15〜16兆円規模で推移。機関投資家の不動産投資需要は底堅い。',
      zh: '不动产证券化市场规模维持在约15〜16万亿日元。机构投资者的不动产投资需求坚挺。',
      en: 'The securitized real estate market remains around ¥15–16 trillion, reflecting solid institutional demand.',
    },
    unit: '兆円',
    chart: 'bar',
    series: [
      { label: '2019', value: 16.4 },
      { label: '2020', value: 14.6 },
      { label: '2021', value: 17.0 },
      { label: '2022', value: 15.8 },
      { label: '2023', value: 15.4 },
      { label: '2024', value: 15.1 },
    ],
  },
  {
    id: 'inbound',
    source: {
      ja: '日本政府観光局（JNTO）「訪日外客統計」／観光庁「宿泊旅行統計」',
      zh: '日本政府观光局（JNTO）《访日外客统计》／观光厅《住宿旅行统计》',
      en: 'JNTO "Visitor Arrivals" / JTA "Accommodation Survey"',
    },
    sourceUrl: 'https://www.jnto.go.jp/statistics/data/visitors-statistics/',
    title: {
      ja: '訪日外国人旅行者数の推移',
      zh: '访日外国游客人数推移',
      en: 'Foreign Visitors to Japan',
    },
    note: {
      ja: '2024年に3,687万人と過去最高を更新。インバウンド回復は民泊・宿泊事業の収益環境を大きく改善している。',
      zh: '2024年达3,687万人，创历史新高。入境游复苏大幅改善民宿·住宿行业的收益环境。',
      en: 'A record 36.87 million visitors in 2024. The inbound recovery has greatly improved the earnings environment for minpaku and lodging.',
    },
    unit: '万人',
    chart: 'bar',
    series: [
      { label: '2019', value: 3188 },
      { label: '2020', value: 412 },
      { label: '2021', value: 25 },
      { label: '2022', value: 383 },
      { label: '2023', value: 2507 },
      { label: '2024', value: 3687 },
    ],
  },
]

export interface ReportLink {
  org: { ja: string; zh: string; en: string }
  title: { ja: string; zh: string; en: string }
  desc: { ja: string; zh: string; en: string }
  url: string
  category: 'gov' | 'assoc' | 'research'
}

export const MARKET_REPORTS: ReportLink[] = [
  {
    org: { ja: '国土交通省', zh: '国土交通省', en: 'MLIT' },
    title: { ja: '地価公示・不動産価格指数', zh: '地价公示·不动产价格指数', en: 'Land Prices & Property Price Index' },
    desc: {
      ja: '全国の地価動向と住宅・商業用不動産の価格指数を毎月・毎年公表する国の基幹統計。',
      zh: '国家基础统计，每月·每年公布全国地价动向及住宅·商业不动产价格指数。',
      en: 'Core national statistics on land prices and residential/commercial property price indices.',
    },
    url: 'https://www.mlit.go.jp/totikensangyo/totikensangyo_tk5_000085.html',
    category: 'gov',
  },
  {
    org: { ja: '国土交通省 観光庁', zh: '国土交通省 观光厅', en: 'Japan Tourism Agency' },
    title: { ja: '住宅宿泊事業（民泊）届出状況・宿泊旅行統計', zh: '住宅住宿事业（民宿）申报状况·住宿统计', en: 'Minpaku Notifications & Accommodation Statistics' },
    desc: {
      ja: '住宅宿泊事業法に基づく民泊の届出件数・宿泊実績を定期公表。民泊市場の一次資料。',
      zh: '依据住宅住宿事业法定期公布民宿申报数量与住宿实绩，是民宿市场的一手资料。',
      en: 'Primary data on minpaku notifications and lodging performance under the Private Lodging Business Act.',
    },
    url: 'https://www.mlit.go.jp/kankocho/minpaku/',
    category: 'gov',
  },
  {
    org: { ja: '日本銀行', zh: '日本银行', en: 'Bank of Japan' },
    title: { ja: '貸出約定平均金利・金融システムレポート', zh: '贷款约定平均利率·金融系统报告', en: 'Average Lending Rates & Financial System Report' },
    desc: {
      ja: '不動産投資ローンの金利環境と不動産市場の過熱度評価（ヒートマップ）を公表。',
      zh: '公布不动产投资贷款利率环境及不动产市场过热度评估（热力图）。',
      en: 'Interest rate environment and real estate market heat-map assessments.',
    },
    url: 'https://www.boj.or.jp/research/brp/fsr/index.htm',
    category: 'gov',
  },
  {
    org: { ja: '（公社）全国宅地建物取引業協会連合会', zh: '全国宅地建物取引业协会联合会', en: 'Zentaku (National Realtors Association)' },
    title: { ja: '不動産市場動向データ集', zh: '不动产市场动向数据集', en: 'Real Estate Market Trend Data' },
    desc: {
      ja: '不動産流通・取引実務に関する調査データと市場レポートを公表する業界最大の団体。',
      zh: '业界最大团体，公布不动产流通·交易实务相关调查数据与市场报告。',
      en: "Japan's largest realtor association, publishing distribution and transaction market data.",
    },
    url: 'https://www.zentaku.or.jp/',
    category: 'assoc',
  },
  {
    org: { ja: '（一社）不動産流通経営協会（FRK）', zh: '不动产流通经营协会（FRK）', en: 'FRK (Real Estate Distribution Association)' },
    title: { ja: '不動産流通年報・既存住宅流通量調査', zh: '不动产流通年报·既有住宅流通量调查', en: 'Annual Distribution Report & Existing Home Sales' },
    desc: {
      ja: '大手流通各社の成約動向と既存住宅市場の構造分析を毎年公表。',
      zh: '每年公布大型流通企业的成交动向与既有住宅市场结构分析。',
      en: 'Annual analysis of major brokerages’ transactions and the existing home market.',
    },
    url: 'https://www.frk.or.jp/',
    category: 'assoc',
  },
  {
    org: { ja: '（一財）日本不動産研究所', zh: '日本不动产研究所', en: 'Japan Real Estate Institute' },
    title: { ja: '不動産投資家調査・市街地価格指数', zh: '不动产投资家调查·市街地价格指数', en: 'Investor Survey & Urban Land Price Index' },
    desc: {
      ja: '期待利回り・投資スタンスを半期ごとに調査。機関投資家の目線を知る定点観測資料。',
      zh: '每半年调查期待收益率与投资姿态，是了解机构投资者视角的定点观测资料。',
      en: 'Semi-annual survey of cap rates and investment stances — a fixed-point observation of institutional investors.',
    },
    url: 'https://www.reinet.or.jp/',
    category: 'research',
  },
  {
    org: { ja: '（株）不動産経済研究所', zh: '不动产经济研究所', en: 'Real Estate Economic Institute' },
    title: { ja: '首都圏・近畿圏 新築マンション市場動向', zh: '首都圈·近畿圈新建公寓市场动向', en: 'New Condominium Market Trends' },
    desc: {
      ja: '新築マンションの発売戸数・平均価格・契約率を毎月公表する業界標準レポート。',
      zh: '每月公布新建公寓发售户数、平均价格、签约率的行业标准报告。',
      en: 'Industry-standard monthly report on new condo supply, prices, and contract rates.',
    },
    url: 'https://www.fudousankeizai.co.jp/',
    category: 'research',
  },
  {
    org: { ja: '（一社）不動産証券化協会（ARES）', zh: '不动产证券化协会（ARES）', en: 'ARES' },
    title: { ja: 'J-REIT・私募ファンド市場統計', zh: 'J-REIT·私募基金市场统计', en: 'J-REIT & Private Fund Market Statistics' },
    desc: {
      ja: '証券化不動産の市場規模・利回り・物件取得動向を集計する不動産金融の基礎資料。',
      zh: '汇总证券化不动产的市场规模、收益率、物件取得动向的不动产金融基础资料。',
      en: 'Fundamental data on securitized real estate: market size, yields, and acquisitions.',
    },
    url: 'https://j-reit.jp/',
    category: 'assoc',
  },
  {
    org: { ja: '（株）東京カンテイ', zh: '东京KANTEI', en: 'Tokyo Kantei' },
    title: { ja: '中古マンション価格・賃料動向レポート', zh: '二手公寓价格·租金动向报告', en: 'Used Condo Price & Rent Trends' },
    desc: {
      ja: '中古マンションの坪単価・分譲賃料を毎月公表。賃料相場の定点観測に有用。',
      zh: '每月公布二手公寓坪单价与分让租金，适合租金行情的定点观测。',
      en: 'Monthly data on used condo prices and rents — useful for tracking rental market levels.',
    },
    url: 'https://www.kantei.ne.jp/report/',
    category: 'research',
  },
]
