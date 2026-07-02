export const translations = {
  ja: {
    nav: {
      home: 'ホーム',
      rent: '賃貸',
      sale: '売買',
      management: '管理',
      minpaku: '民泊',
      about: '会社概要',
      philosophy: '企業理念',
      contact: 'お問い合わせ',
    },
    hero: {
      title: '物心両面の幸福と利他の心で、',
      subtitle: '世界に通じる価値を創造する',
      cta: '物件を探す',
      learn_more: '詳しく見る',
    },
    services: {
      title: '事業内容',
      subtitle: '4つの事業で、お客様の幸福を実現します',
      rent: {
        title: '賃貸事業',
        description: 'エリア・沿線・賃料・間取りなど、お客様のニーズに合わせた物件検索サービス',
      },
      sale: {
        title: '売買事業',
        description: 'マンション・戸建・土地・投資用物件まで、幅広い不動産売買のサポート',
      },
      management: {
        title: '管理事業',
        description: '賃貸物件の総合管理サービスで、オーナー様の資産価値を守ります',
      },
      minpaku: {
        title: '民泊事業',
        description: 'OneStep PMS連動で、民泊運営を完全サポート。収益最大化を実現',
      },
    },
    philosophy: {
      motto: '誠意正心 知行合一',
      motto_description: '誠実な心を正しく保ち、学んだことを必ず実践する',
      vision: 'ビジョン',
      vision_text: '世界で戦えるブランドへの飛躍、永続的発展の実現',
      mission: 'ミッション',
      mission_text: '他社を凌駕する速さ・安さ・便利さでお客様の笑顔を創造する',
    },
    contact: {
      title: 'お問い合わせ',
      subtitle: 'お気軽にご相談ください',
      phone: '電話でのお問い合わせ',
      email: 'メールでのお問い合わせ',
      address: '所在地',
    },
  },
  zh: {
    nav: {
      home: '首頁',
      rent: '租賃',
      sale: '買賣',
      management: '管理',
      minpaku: '民宿',
      about: '公司簡介',
      philosophy: '企業理念',
      contact: '聯繫我們',
    },
    hero: {
      title: '追求物質與精神的雙重幸福，',
      subtitle: '以利他之心創造通往世界的價值',
      cta: '搜索房源',
      learn_more: '瞭解更多',
    },
    services: {
      title: '業務內容',
      subtitle: '通過四大業務，實現客戶的幸福',
      rent: {
        title: '租賃業務',
        description: '根據地區、線路、租金、戶型等，為客戶提供符合需求的房源搜索服務',
      },
      sale: {
        title: '買賣業務',
        description: '從公寓、獨棟、土地到投資用物業，提供全方位的房地產買賣支持',
      },
      management: {
        title: '管理業務',
        description: '提供租賃物業的綜合管理服務，守護業主的資產價值',
      },
      minpaku: {
        title: '民宿業務',
        description: '通過OneStep PMS聯動，全面支持民宿運營，實現收益最大化',
      },
    },
    philosophy: {
      motto: '誠意正心 知行合一',
      motto_description: '保持誠實正直的心，必定實踐所學',
      vision: '願景',
      vision_text: '成為能在世界競爭的品牌，實現永續發展',
      mission: '使命',
      mission_text: '以超越其他公司的速度、價格和便利性，創造客戶的笑容',
    },
    contact: {
      title: '聯繫我們',
      subtitle: '歡迎隨時諮詢',
      phone: '電話諮詢',
      email: '郵件諮詢',
      address: '地址',
    },
  },
  en: {
    nav: {
      home: 'Home',
      rent: 'Rental',
      sale: 'Sales',
      management: 'Management',
      minpaku: 'Vacation Rental',
      about: 'About Us',
      philosophy: 'Philosophy',
      contact: 'Contact',
    },
    hero: {
      title: 'Creating World-Class Value',
      subtitle: 'With Pursuit of Material and Spiritual Happiness',
      cta: 'Search Properties',
      learn_more: 'Learn More',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Four Business Areas to Realize Customer Happiness',
      rent: {
        title: 'Rental Business',
        description: 'Property search service tailored to customer needs by area, line, rent, layout, etc.',
      },
      sale: {
        title: 'Sales Business',
        description: 'Comprehensive support for real estate transactions from condos, houses, land to investment properties',
      },
      management: {
        title: 'Management Business',
        description: 'Comprehensive management services for rental properties to protect owner asset value',
      },
      minpaku: {
        title: 'Vacation Rental Business',
        description: 'Full support for vacation rental operations with OneStep PMS integration to maximize revenue',
      },
    },
    philosophy: {
      motto: 'Integrity & Unity of Knowledge and Action',
      motto_description: 'Maintain an honest heart and always practice what we learn',
      vision: 'Vision',
      vision_text: 'To become a globally competitive brand and achieve sustainable development',
      mission: 'Mission',
      mission_text: 'Creating customer smiles with speed, affordability, and convenience that surpass others',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Feel free to reach out',
      phone: 'Phone Inquiry',
      email: 'Email Inquiry',
      address: 'Address',
    },
  },
};

export type Locale = keyof typeof translations;
export type TranslationKey = typeof translations.ja;
