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
      home: '首页',
      rent: '租赁',
      sale: '买卖',
      management: '管理',
      minpaku: '民宿',
      about: '公司简介',
      philosophy: '企业理念',
      contact: '联系我们',
    },
    hero: {
      title: '追求物质与精神的双重幸福，',
      subtitle: '以利他之心创造通往世界的价值',
      cta: '搜索房源',
      learn_more: '了解更多',
    },
    services: {
      title: '业务内容',
      subtitle: '通过四大业务，实现客户的幸福',
      rent: {
        title: '租赁业务',
        description: '根据地区、线路、租金、户型等，为客户提供符合需求的房源搜索服务',
      },
      sale: {
        title: '买卖业务',
        description: '从公寓、独栋、土地到投资用物业，提供全方位的房地产买卖支持',
      },
      management: {
        title: '管理业务',
        description: '提供租赁物业的综合管理服务，守护业主的资产价值',
      },
      minpaku: {
        title: '民宿业务',
        description: '通过OneStep PMS联动，全面支持民宿运营，实现收益最大化',
      },
    },
    philosophy: {
      motto: '诚意正心 知行合一',
      motto_description: '保持诚实正直的心，必定实践所学',
      vision: '愿景',
      vision_text: '成为能在世界竞争的品牌，实现永续发展',
      mission: '使命',
      mission_text: '以超越其他公司的速度、价格和便利性，创造客户的笑容',
    },
    contact: {
      title: '联系我们',
      subtitle: '欢迎随时咨询',
      phone: '电话咨询',
      email: '邮件咨询',
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
