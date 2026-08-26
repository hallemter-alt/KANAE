import type { Locale } from '@/lib/translations';

export type MaterialsLocale = Locale;

export const materialLinks = [
  { href: '/materials', key: 'overview' },
  { href: '/materials/nfb-board', key: 'nfb' },
  { href: '/materials/nfb-board/test-data', key: 'testData' },
  { href: '/materials/products', key: 'products' },
  { href: '/materials/documents', key: 'documents' },
  { href: '/materials/contact', key: 'contact' },
] as const;

export const materialCopy = {
  ja: {
    nav: {
      overview: '事業概要',
      nfb: 'NFB BOARD',
      testData: '試験データ',
      products: '製品群',
      documents: '資料・知財',
      contact: '技術相談',
    },
    common: {
      label: '建材・国際貿易',
      badge: 'KANAE 第5事業軸',
      contactCta: '技術相談・資料請求',
      sampleCta: 'サンプル相談',
      viewDocuments: '資料を見る',
      learnMore: '詳しく見る',
      download: 'PDFを開く',
      sourceNote: '掲載数値は提供資料・日本国内試験結果に基づく概要です。採用前に仕様書・試験成績書・施工条件をご確認ください。',
    },
    home: {
      title: '建材・国際貿易事業',
      subtitle: '海外建材技術を日本市場へ。技術確認、輸入、販売、共同開発までを一貫して支援します。',
      lead: 'KANAE は、海外メーカーの建材技術を日本の設計・施工・流通の文脈に合わせて紹介し、技術相談、資料請求、サンプル確認、共同開発へつなげます。第一弾として NFB BOARD を中心に展開します。',
      pillars: [
        { title: '海外技術の発掘', text: '中国・海外メーカーの技術を発掘し、採用可能性を評価します。' },
        { title: '日本仕様化', text: '日本市場で説明できる仕様・資料・導入文脈へ翻訳します。' },
        { title: '性能根拠の整理', text: 'JIS 試験、荷重評価、知財資料を整理し、技術信頼を可視化します。' },
        { title: '販売・共同開発', text: '販売、サンプル提供、共同開発まで継続的に接続します。' },
      ],
      kpis: [
        { value: 'NFB', label: '旗艦製品' },
        { value: '5+', label: '技術資料' },
        { value: 'JP/EN/ZH', label: '対応言語' },
      ],
      phases: [
        '製品特性と用途を確認',
        '試験データ・特許・資料を確認',
        'サンプル・仕様条件を相談',
        '販売・採用・共同開発へ接続',
      ],
    },
    nfb: {
      title: 'NALEXIBLE NFB BOARD',
      subtitle: '自然繊維を用いた軽量・高剛性・吸音構造芯材。少ない材料で必要な剛性を確保し、二重床・建具・壁体の新しいコア材として展開します。',
      intro: '独自の金型による熱圧成形で、自然繊維を連続曲面の立体構造へ。従来の平板芯材ではなく、構造そのものが軽さ・剛性・音響性能を生み出します。',
      metrics: [
        { value: 'ΔLL(Ⅱ)-3', label: '軽量床衝撃音', detail: 'JIS A 1440' },
        { value: 'ΔLH(Ⅱ)-3', label: '重量床衝撃音', detail: '主要低周波にも余量' },
        { value: '0.8–1.3mm', label: '100kg 集中荷重変位', detail: '5分後も小変位' },
        { value: '-60%+', label: '材料使用量', detail: '少材料化の目安' },
      ],
      values: [
        { title: '軽量化', text: '自然繊維の立体構造により、必要な剛性を少ない材料で確保。輸送・施工負荷を抑えます。' },
        { title: '構造剛性', text: '100kg 集中荷重で日本の二重床参考線（3mm）内の変位を確認。芯材としての支撑力を示します。' },
        { title: '吸音・遮音', text: '軽量・重量床衝撃音で ΔLL-3 / ΔLH-3 を確認。二重床用途への展開可能性があります。' },
        { title: '共同開発', text: '床・壁・建具・パネルなど用途別に、メーカー・設計者と仕様開発を進めます。' },
      ],
      applications: ['二重床システム芯材', '木製扉・建具芯材', '壁体・内装パネル', '軽量吸音構造材', 'OEM・共同開発'],
    },
    testData: {
      title: '試験データ',
      subtitle: 'NFB BOARD の判断材料となる音響・荷重・知財情報を、営業と技術検討に使いやすい形で整理します。',
      acousticsTitle: '床衝撃音遮断性能',
      loadTitle: '局部集中荷重・衝撃荷重',
      rows: [
        { freq: '63Hz', ll: '3.3dB', lh: '1.5dB' },
        { freq: '125Hz', ll: '9.8dB', lh: '4.6dB' },
        { freq: '250Hz', ll: '16.1dB', lh: '9.7dB' },
        { freq: '500Hz', ll: '23.7dB', lh: '13.1dB' },
        { freq: '1kHz', ll: '37.2dB', lh: '13.1dB' },
        { freq: '2kHz', ll: '51.2dB', lh: '12.6dB' },
        { freq: '4kHz', ll: '60.2dB', lh: '7.8dB' },
      ],
      loadPoints: [
        '100kg 集中荷重下の変位は概ね 0.8〜1.3mm の量級。',
        '5分後データでも小変位を維持し、破壊・開裂・塌陷などの異常記録なし。',
        '日本で参照される 100kg ≤ 3mm の目安内に収まる結果。',
      ],
    },
    products: {
      title: '製品群と拡張候補',
      subtitle: 'NFB BOARD を中心に、薄型天然石、外装向け石材パネル、音環境に配慮した建材まで、採用検討しやすい形で紹介します。',
    },
    documents: {
      title: '資料・知財ライブラリ',
      subtitle: '営業・設計・技術審査で確認される製品資料、試験資料、特許証、認証資料をまとめています。',
    },
    contact: {
      title: 'B2B 技術相談・資料請求',
      subtitle: '用途・計画段階・必要資料をお知らせください。KANAE が技術確認、サンプル、共同開発の次アクションを整理します。',
      formTitle: '相談内容を送信',
      success: '送信内容を受け付けました。担当者より折り返しご連絡いたします。',
      fallback: 'フォーム送信に失敗しました。お手数ですが info@kanae-tokyo.com へ直接ご連絡ください。',
      fields: {
        company: '会社名', name: 'お名前', email: 'メールアドレス', phone: '電話番号', topic: '相談種別', product: '対象製品', message: '相談内容・用途・必要資料', submit: '送信する'
      },
      topics: ['技術相談', '資料請求', 'サンプル依頼', '共同開発', '価格・納期相談'],
    },
  },
  zh: {
    nav: { overview: '事業概要', nfb: 'NFB BOARD', testData: '測試數據', products: '產品群', documents: '資料與知識產權', contact: '技術諮詢' },
    common: { label: '建材・國際貿易', badge: 'KANAE 第五事業軸', contactCta: '技術諮詢／索取資料', sampleCta: '樣品諮詢', viewDocuments: '查看資料', learnMore: '了解更多', download: '打開 PDF', sourceNote: '頁面數值根據提供資料與日本國內測試結果整理。正式採用前請確認規格書、測試報告與施工條件。' },
    home: {
      title: '建材・國際貿易事業', subtitle: '把海外建材技術導入日本市場，協助完成技術確認、進口、銷售與共同開發。', lead: 'KANAE 將海外品牌的建材技術，轉化為日本設計、施工與流通容易理解的內容，並連接技術諮詢、資料請求、樣品確認與共同開發。第一階段以 NFB BOARD 為核心產品展開。',
      pillars: [
        { title: '海外技術發掘', text: '發掘中國及海外建材技術，初步評估日本市場導入可能性。' },
        { title: '日本規格化', text: '轉化為日本客戶能理解的規格、資料與應用語境。' },
        { title: '性能依據整理', text: '整理 JIS 測試、承重數據與專利資料，提升技術可信度。' },
        { title: '銷售・共同開發', text: '連接銷售、樣品提供、技術討論與共同開發。' },
      ],
      kpis: [{ value: 'NFB', label: '旗艦產品' }, { value: '5+', label: '技術資料' }, { value: 'JP/EN/ZH', label: '對應語言' }],
      phases: ['確認產品特性與用途', '確認測試數據、專利與資料', '洽詢樣品與規格條件', '連接銷售、採用與共同開發'],
    },
    nfb: {
      title: 'NALEXIBLE NFB BOARD', subtitle: '使用自然纖維的輕量、高剛性、吸音結構芯材，可作為二重床、門扇、牆體與內裝板材的新型核心材料。', intro: '透過獨家模具熱壓成形，將自然纖維加工為連續曲面的立體結構。不是普通平板芯材，而是由結構本身創造輕量、剛性與聲學性能。',
      metrics: [{ value: 'ΔLL(Ⅱ)-3', label: '輕量床衝擊音', detail: 'JIS A 1440' }, { value: 'ΔLH(Ⅱ)-3', label: '重量床衝擊音', detail: '主要低頻仍有餘量' }, { value: '0.8–1.3mm', label: '100kg 集中荷重變位', detail: '5分鐘後仍維持小變位' }, { value: '-60%+', label: '材料用量', detail: '少材料化參考' }],
      values: [{ title: '輕量化', text: '自然纖維立體結構以較少材料確保剛性，降低運輸與施工負擔。' }, { title: '結構剛性', text: '100kg 集中荷重下變位落在日本二重床常用參考線 3mm 以內。' }, { title: '吸音・隔音', text: '確認 ΔLL-3 / ΔLH-3，具備二重床用途的技術討論基礎。' }, { title: '共同開發', text: '可依地板、牆體、門扇、面板等用途與設計者/製造商共同規格化。' }],
      applications: ['二重床系統芯材', '木製門・建具芯材', '牆體・內裝板', '輕量吸音結構材', 'OEM・共同開發'],
    },
    testData: {
      title: '測試數據', subtitle: '將 NFB BOARD 的聲學、承重與知財資訊整理成便於營業與技術審查使用的內容。', acousticsTitle: '床衝擊音遮斷性能', loadTitle: '局部集中荷重・衝擊荷重',
      rows: [{ freq: '63Hz', ll: '3.3dB', lh: '1.5dB' }, { freq: '125Hz', ll: '9.8dB', lh: '4.6dB' }, { freq: '250Hz', ll: '16.1dB', lh: '9.7dB' }, { freq: '500Hz', ll: '23.7dB', lh: '13.1dB' }, { freq: '1kHz', ll: '37.2dB', lh: '13.1dB' }, { freq: '2kHz', ll: '51.2dB', lh: '12.6dB' }, { freq: '4kHz', ll: '60.2dB', lh: '7.8dB' }],
      loadPoints: ['100kg 集中荷重下變位約 0.8〜1.3mm。', '5分鐘後仍保持小變位，未見破壞、開裂、塌陷等異常記錄。', '結果落在日本常用 100kg ≤ 3mm 參考線以內。'],
    },
    products: { title: '產品群', subtitle: '以 NFB BOARD 為核心，介紹薄型天然石、外裝用石材面板、重視音環境的建材等可供採用評估的產品。' },
    documents: { title: '資料與知識產權資料庫', subtitle: '整理營業、設計與技術審查時會確認的產品資料、測試資料、專利證書與認證資料。' },
    contact: { title: 'B2B 技術諮詢・索取資料', subtitle: '請告訴我們用途、計畫階段與所需資料。KANAE 將協助整理技術確認、樣品與共同開發的下一步。', formTitle: '送出諮詢內容', success: '已收到您的訊息，負責人會再與您聯繫。', fallback: '表單送出失敗，請直接聯繫 info@kanae-tokyo.com。', fields: { company: '公司名', name: '姓名', email: 'Email', phone: '電話', topic: '諮詢類型', product: '目標產品', message: '諮詢內容・用途・所需資料', submit: '送出' }, topics: ['技術諮詢', '索取資料', '樣品需求', '共同開發', '價格・交期'] },
  },
  en: {
    nav: { overview: 'Overview', nfb: 'NFB BOARD', testData: 'Test Data', products: 'Products', documents: 'Docs & IP', contact: 'Consultation' },
    common: { label: 'Building Materials & Global Trade', badge: 'KANAE fifth business pillar', contactCta: 'Technical consultation', sampleCta: 'Sample inquiry', viewDocuments: 'View documents', learnMore: 'Learn more', download: 'Open PDF', sourceNote: 'Figures summarize supplied materials and Japan test results. Confirm specifications, test reports and installation conditions before adoption.' },
    home: { title: 'Building Materials & Global Trade', subtitle: 'Bringing global building-material technologies to Japan through technical review, import, sales and co-development support.', lead: 'KANAE introduces overseas building-material technologies in a way that fits Japanese design, construction and distribution contexts. The first focus is NFB BOARD, supported by technical consultation, document requests, sample review and co-development discussions.',
      pillars: [{ title: 'Global Sourcing', text: 'Discover technologies from China and global manufacturers and evaluate their fit for Japan.' }, { title: 'Japan Localization', text: 'Translate product value into specifications, documents and application contexts that Japanese stakeholders can review.' }, { title: 'Testing & Evidence', text: 'Organize JIS test results, load data and IP documents into practical technical evidence.' }, { title: 'Sales & Co-development', text: 'Connect sales, samples, technical review and long-term co-development.' }],
      kpis: [{ value: 'NFB', label: 'Flagship product' }, { value: '5+', label: 'Technical documents' }, { value: 'JP/EN/ZH', label: 'Supported languages' }], phases: ['Review product characteristics and applications', 'Check test data, patents and documents', 'Discuss samples and specification conditions', 'Connect to sales, adoption and co-development'] },
    nfb: { title: 'NALEXIBLE NFB BOARD', subtitle: 'A lightweight, high-rigidity and acoustic structural core made from natural fibres for raised floors, doors, wall systems and interior panels.', intro: 'Proprietary heated-press moulding turns natural fibres into a continuous curved 3D structure. Performance is created by topology, not by material volume alone.', metrics: [{ value: 'ΔLL(Ⅱ)-3', label: 'Light impact sound', detail: 'JIS A 1440' }, { value: 'ΔLH(Ⅱ)-3', label: 'Heavy impact sound', detail: 'Margin in low frequencies' }, { value: '0.8–1.3mm', label: '100kg concentrated load', detail: 'Small displacement after 5 min' }, { value: '-60%+', label: 'Material usage', detail: 'Indicative reduction' }], values: [{ title: 'Lightweight', text: 'A 3D natural-fibre structure secures rigidity with less material, reducing logistics and installation burden.' }, { title: 'Structural rigidity', text: 'Displacement under 100kg stayed within the commonly referenced 3mm line for raised floors in Japan.' }, { title: 'Acoustics', text: 'ΔLL-3 / ΔLH-3 results provide a basis for raised-floor technical discussions.' }, { title: 'Co-development', text: 'Specifications can be developed for floors, walls, doors and panels with partners.' }], applications: ['Raised floor core', 'Wooden door core', 'Wall and interior panels', 'Lightweight acoustic core', 'OEM / co-development'] },
    testData: { title: 'Test Data', subtitle: 'Acoustic, load and IP evidence for NFB BOARD, structured for sales and technical review.', acousticsTitle: 'Floor impact sound insulation', loadTitle: 'Concentrated and impact load', rows: [{ freq: '63Hz', ll: '3.3dB', lh: '1.5dB' }, { freq: '125Hz', ll: '9.8dB', lh: '4.6dB' }, { freq: '250Hz', ll: '16.1dB', lh: '9.7dB' }, { freq: '500Hz', ll: '23.7dB', lh: '13.1dB' }, { freq: '1kHz', ll: '37.2dB', lh: '13.1dB' }, { freq: '2kHz', ll: '51.2dB', lh: '12.6dB' }, { freq: '4kHz', ll: '60.2dB', lh: '7.8dB' }], loadPoints: ['Displacement under 100kg concentrated load was around 0.8–1.3mm.', 'Small displacement remained after 5 minutes, with no abnormal breakage, cracking or collapse recorded.', 'The result is within the commonly referenced 100kg ≤ 3mm line in Japan.'] },
    products: { title: 'Product Portfolio', subtitle: 'A practical overview of NFB BOARD, ultra-thin natural stone, exterior stone panels and acoustic building-material applications.' },
    documents: { title: 'Documents & IP Library', subtitle: 'Product dossiers, test materials, patent certificates and attestations for sales, design and technical review.' },
    contact: { title: 'B2B Technical Consultation', subtitle: 'Tell us your application, project stage and required materials. KANAE will coordinate technical checks, samples and co-development next steps.', formTitle: 'Send your inquiry', success: 'Your inquiry has been received. Our team will contact you shortly.', fallback: 'Form submission failed. Please contact info@kanae-tokyo.com directly.', fields: { company: 'Company', name: 'Name', email: 'Email', phone: 'Phone', topic: 'Inquiry type', product: 'Target product', message: 'Application / request / required documents', submit: 'Submit' }, topics: ['Technical consultation', 'Document request', 'Sample request', 'Co-development', 'Price / lead time'] },
  },
} as const;

export const products = [
  {
    name: 'NALEXIBLE NFB BOARD',
    slug: '/materials/nfb-board',
    image: '/assets/materials/images/hero-nfb-board.webp',
    tags: ['Flagship', 'Natural fibre', 'Acoustic core'],
    summary: {
      ja: '自然繊維の連続曲面構造による軽量・高剛性・吸音芯材。',
      zh: '自然纖維連續曲面結構形成的輕量、高剛性、吸音芯材。',
      en: 'Lightweight, high-rigidity acoustic core with continuous curved natural-fibre topology.',
    },
  },
  {
    name: 'NALEXIBLE EasyStone',
    slug: '/materials/products#stone-sheet',
    image: '/assets/materials/images/product-easystone.webp',
    tags: ['Natural stone', 'Fire-rated panel', 'Interior / exterior'],
    summary: {
      ja: '防火パネルへの貼付け用途を想定した、天然石意匠の軽量建材パネル。',
      zh: '適用於防火板貼付用途的天然石質感輕量建材面板。',
      en: 'Lightweight building panel with a natural-stone surface for fire-rated panel applications.',
    },
  },
  {
    name: 'NALEXIBLE Flexible Stone UV',
    slug: '/materials/products#facade-alu',
    image: '/assets/materials/images/product-flexible-stone-uv.webp',
    tags: ['Facade', 'UV surface', 'Thin stone'],
    summary: {
      ja: '外装・内装での意匠利用を想定した、UV 表面仕上げの薄型天然石系パネル。',
      zh: '適用於外裝與內裝設計的 UV 表面薄型天然石系板材。',
      en: 'UV-finished thin natural-stone panel for exterior and interior design applications.',
    },
  },
  {
    name: 'NALEXIBLE w/Acoustic Molded Door',
    slug: '/materials/products#acoustic-panel',
    image: '/assets/materials/images/product-acoustic-door.webp',
    tags: ['Acoustic', 'Door core', 'Fiberboard'],
    summary: {
      ja: '音環境に配慮した建具用途へ展開する、NFB 系芯材を用いた成形ドア製品。',
      zh: '面向聲環境需求的建具應用，採用 NFB 系芯材的成型門產品。',
      en: 'Molded door product using an NFB-based core for acoustic building applications.',
    },
  },
] as const;

export const documents = [
  {
    title: 'NFB BOARD Product Dossier',
    href: '/assets/materials/docs/nfb-board-product-dossier.pdf',
    type: 'Product / Test Data',
    note: 'ΔLL(Ⅱ)-3 / ΔLH(Ⅱ)-3, 100kg load, topology overview',
  },
  {
    title: 'NFB BOARD Utility Model Certificate',
    href: '/assets/materials/docs/nfb-board-utility-model-cn.pdf',
    type: 'Patent / CN',
    note: 'ZL 2023 2 2091258.4 / CN 220535111 U',
  },
  {
    title: 'NFB BOARD Design Patent Certificate',
    href: '/assets/materials/docs/nfb-board-design-patent-cn.pdf',
    type: 'Patent / CN',
    note: 'ZL 2023 3 0495962.9 / CN 308458908 S',
  },
  {
    title: 'NFB BOARD Japan Patent',
    href: '/assets/materials/docs/nfb-board-japan-patent.pdf',
    type: 'Patent / JP',
    note: '特願 2024-125162',
  },
  {
    title: 'LumiSlate PSE Test Result Attestation',
    href: '/assets/materials/docs/lumislate-pse-attestation.pdf',
    type: 'Certificate / JP',
    note: 'Reference No. LCSB11055009S',
  },
] as const;
