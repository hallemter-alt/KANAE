// 会社情報の共通定数
export const COMPANY_INFO = {
  name: {
    ja: '株式会社KANAE',
    en: 'KANAE CO., LTD.',
    zh: '株式会社KANAE',
  },
  legalName: '株式会社ＫＡＮＡＥ',
  representative: '代表取締役 叶維舟',
  established: '2021-07-05',
  corporateNumber: '0111-01-095676',
  licenseNumber: '東京都知事(1)第107157号',
  
  // 連絡先情報
  contact: {
    email: 'info@kanae-tokyo.com',
    phone: '03-6914-3633',
    fax: '03-6457-3368',
    website: 'www.kanae-tokyo.com',
    domain: 'https://www.kanae-tokyo.com',
  },
  
  // 営業時間
  businessHours: {
    hours: '10:00-19:00',
    closedDays: {
      ja: '水曜・日曜・年末年始',
      en: 'Wednesday, Sunday, Year-end/New Year',
      zh: '周三、周日、年末年初',
    },
  },
  
  // 所在地
  address: {
    postalCode: '171-0033',
    prefecture: '東京都',
    city: '豊島区',
    street: '高田3丁目16番4号',
    building: 'Golje Bld. 6F',
    full: '〒171-0033 東京都豊島区高田3丁目16番4号 Golje Bld. 6F',
    coordinates: {
      latitude: 35.7165,
      longitude: 139.7063,
    },
  },
  
  // アクセス情報
  access: [
    {
      station: 'JR山手線・東京メトロ東西線 高田馬場駅',
      exit: '早稲田口',
      walkTime: '徒歩約7分',
    },
    {
      station: '東京メトロ東西線 高田馬場駅',
      exit: '7番出口',
      walkTime: '徒歩約5分',
    },
    {
      station: '東京メトロ副都心線 西早稲田駅',
      exit: '3番出口',
      walkTime: '徒歩約6分',
    },
  ],
  
  // 事業内容
  business: {
    ja: '不動産賃貸仲介・売買仲介・賃貸管理・民泊運営・不動産コンサルティング',
    en: 'Real Estate Rental Brokerage, Sales Brokerage, Rental Management, Vacation Rental Operations, Real Estate Consulting',
    zh: '房地産租賃中介・買卖中介・租賃管理・民宿運営・房地産咨詢',
  },
  
  // 加盟団体
  associations: [
    '公益社団法人 全国宅地建物取引業協会連合会',
    '公益社団法人 東京都宅地建物取引業協会',
  ],
  
  // ソーシャルメディア
  social: {
    twitter: '',
    facebook: '',
    instagram: '',
    line: '',
  },
} as const;

// SEO設定
export const SEO_CONFIG = {
  defaultTitle: {
    ja: 'KANAE - 物心両面の幸福と利他の心で、世界に通じる価値を創造する',
    zh: 'KANAE - 追求物質与精神的双重幸福，以利他之心创造通往世界的价值',
    en: 'KANAE - Creating World-Class Value with Pursuit of Material and Spiritual Happiness',
  },
  defaultDescription: {
    ja: '株式会社KANAE - 不動産事業（賃貸・売買・管理・民泊）を通じて、お客様と社会の幸福を実現します。',
    zh: '株式会社KANAE - 通过房地産業务（租賃、买卖、管理、民宿）実現客戸与社会的幸福。',
    en: 'KANAE Co., Ltd. - Realizing customer and social happiness through real estate business (rental, sales, management, vacation rental).',
  },
  keywords: {
    ja: ['不動産', '賃貸', '売買', '民泊', '管理', '東京', '豊島区', 'KANAE'],
    zh: ['房地産', '租賃', '买卖', '民宿', '管理', '東京', '豊島区', 'KANAE'],
    en: ['real estate', 'rental', 'sales', 'vacation rental', 'management', 'Tokyo', 'Toshima', 'KANAE'],
  },
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
} as const;

// サイト設定
export const SITE_CONFIG = {
  name: 'KANAE',
  url: 'https://www.kanae-tokyo.com',
  locales: ['ja', 'zh', 'en'] as const,
  defaultLocale: 'ja' as const,
} as const;

export type Locale = typeof SITE_CONFIG.locales[number];
