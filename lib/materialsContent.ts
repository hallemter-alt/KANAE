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
    image: '/assets/materials/images/product-fiberboard.webp',
    sourceUrl: 'https://www.nalexible.com/products-ClassID-40.html',
    tags: ['Natural fibre', 'Bio-based resin', 'Acoustic core'],
    summary: {
      ja: '高性能ファイバーとバイオベース樹脂による軽量ボード。剛性、軽量化、音環境配慮を同時に検討できる構造芯材です。',
      zh: '採用高性能纖維與生物基樹脂的輕量板材，可同時評估剛性、輕量化與聲環境需求。',
      en: 'Lightweight board made with high-performance fibres and bio-based resin, suitable for rigidity, weight reduction and acoustic review.',
    },
    highlights: {
      ja: ['高性能ファイバーとバイオベース樹脂を活用', '軽量パネルとしてプレハブ・モジュール建築にも展開可能', 'KANAE 側では二重床・建具・壁体芯材として技術相談へ接続'],
      zh: ['運用高性能纖維與生物基樹脂', '可作為輕量面板延伸至預製與模組化建築', 'KANAE 以二重床、建具、牆體芯材方向連接技術諮詢'],
      en: ['Uses high-performance fibres and bio-based resin', 'Lightweight panel direction suitable for prefabricated and modular construction review', 'KANAE connects it to raised-floor, door and wall-core technical consultation'],
    },
  },
  {
    name: 'NALEXIBLE EasyStone',
    slug: '/materials/products/easystone',
    image: '/assets/materials/images/product-easystone.webp',
    sourceUrl: 'https://www.nalexible.com/products-ClassID-43.html',
    tags: ['Natural stone', '1-3mm stone series', 'Interior / exterior'],
    summary: {
      ja: '天然石を 1〜3mm の薄片へ加工するブランド技術を背景に、石材意匠を軽量に扱いやすくした建材シリーズ。',
      zh: '以品牌將天然石加工為 1〜3mm 薄片的技術為基礎，使石材質感更輕量、更易導入。',
      en: 'A lightweight stone-surface building-material series based on Nalexible’s 1–3mm ultra-thin natural-stone technology.',
    },
    highlights: {
      ja: ['公式ラインナップには複数の天然石柄を掲載', '天然石の質感を軽量・薄型で検討しやすい', '内装、商業空間、改修、パネル貼付け用途に展開しやすい'],
      zh: ['官方產品線提供多種天然石紋理', '以輕量、薄型方式評估天然石質感', '適用於內裝、商業空間、翻新與板材貼付用途'],
      en: ['Official lineup presents multiple natural-stone patterns', 'Allows natural-stone texture to be reviewed in a lighter, thinner format', 'Suitable for interiors, commercial spaces, renovation and panel-lamination use cases'],
    },
  },
  {
    name: 'NALEXIBLE Flexible Stone UV',
    slug: '/materials/products/flexible-stone-uv',
    image: '/assets/materials/images/product-flexible-stone-uv.webp',
    sourceUrl: 'https://www.nalexible.com/products-ClassID-41.html',
    tags: ['Flexible stone', 'UV surface', 'Thin stone'],
    summary: {
      ja: '天然石を 1〜3mm に薄片化し、柔軟性と耐衝撃性を高める技術をもとにした UV 仕上げの薄型石材パネル。',
      zh: '以天然石 1〜3mm 薄片化、提升柔韌性與耐衝擊性的技術為基礎，加入 UV 表面處理的薄型石材板。',
      en: 'UV-finished thin stone panel based on technology that slices natural stone to 1–3mm while improving flexibility and impact resistance.',
    },
    highlights: {
      ja: ['公式情報では Black、D.Black、Indian Autumn などの柄展開を確認', '薄型石材として曲面・軽量下地での採用可能性を検討', '外装・内装の意匠材として、施工条件を確認しながら提案'],
      zh: ['官方資訊可確認 Black、D.Black、Indian Autumn 等紋理', '以薄型石材方向評估曲面與輕量基底應用可能性', '作為外裝與內裝設計材，配合施工條件提出建議'],
      en: ['Official lineup includes patterns such as Black, D.Black and Indian Autumn', 'Supports review of thin-stone use on curved or lightweight substrates', 'Positioned as an exterior/interior design material with installation-condition checks'],
    },
  },
  {
    name: 'NALEXIBLE w/Acoustic Molded Door',
    slug: '/materials/products/acoustic-molded-door',
    image: '/assets/materials/images/product-acoustic-door.webp',
    sourceUrl: 'https://www.nalexible.com/products-ClassID-47.html',
    tags: ['Acoustic', 'Molded door', 'Fiberboard'],
    summary: {
      ja: 'Natural Fibre Board を用いた成形ドアシリーズの一部。音環境に配慮した建具用途として検討できます。',
      zh: 'Natural Fibre Board 成型門系列之一，可作為重視聲環境的建具用途進行評估。',
      en: 'Part of the molded-door lineup using Natural Fibre Board, positioned for door applications with acoustic considerations.',
    },
    highlights: {
      ja: ['公式ラインナップには複数のドア意匠を掲載', 'Natural Fibre Board と成形パネルの組み合わせを建具へ展開', 'ホテル、集合住宅、オフィスなど音環境を意識する案件に適合検討'],
      zh: ['官方產品線列有多種門片造型', '將 Natural Fibre Board 與成型面板組合延伸至建具', '可於飯店、集合住宅、辦公室等重視聲環境的案件中評估'],
      en: ['Official lineup presents multiple door designs', 'Combines Natural Fibre Board with molded panels for door applications', 'Relevant for hotels, multifamily housing and offices where acoustic comfort matters'],
    },
  },
] as const;

export const productDetailSlugs = ['easystone', 'flexible-stone-uv', 'acoustic-molded-door'] as const;
export type ProductDetailSlug = typeof productDetailSlugs[number];

type LocalizedString = Record<MaterialsLocale, string>;
type LocalizedList = Record<MaterialsLocale, string[]>;

export type ProductDetail = {
  title: LocalizedString;
  lead: LocalizedString;
  applications: LocalizedList;
  reviewPoints: LocalizedList;
};

export const productDetails: Record<ProductDetailSlug, ProductDetail> = {
  easystone: {
    title: {
      ja: '天然石の質感を、軽量な薄型建材として扱う',
      zh: '以輕量薄型建材方式導入天然石質感',
      en: 'Natural-stone texture in a lightweight thin-material format',
    },
    lead: {
      ja: 'EasyStone は、天然石を薄く扱いやすい建材へ転換する製品群です。重い石材をそのまま使いにくい改修・商業空間・家具面材などで、石の表情を活かしながら施工負荷を抑える採用検討につなげます。',
      zh: 'EasyStone 將天然石轉化為更薄、更易導入的建材。適合在翻新、商業空間與家具面材等不便使用厚重石材的場景中，兼顧石材質感與施工負擔。',
      en: 'EasyStone converts natural stone into a thinner and easier-to-handle building-material format. It supports adoption review for renovation, commercial interiors and panel or furniture surfaces where full-weight stone is difficult to use.',
    },
    applications: {
      ja: ['ホテル・商業施設の壁面意匠', '既存建物の改修・リニューアル', '家具・什器・建具の表面材', '軽量下地への石材意匠付与'],
      zh: ['飯店與商業設施牆面設計', '既有建築翻新與更新', '家具、什器、建具表面材', '輕量基底上的石材質感表現'],
      en: ['Hotel and commercial wall finishes', 'Renovation and refurbishment projects', 'Furniture, fixture and door surface materials', 'Stone appearance on lightweight substrates'],
    },
    reviewPoints: {
      ja: ['天然石柄・ロット差・サンプル確認', '下地材、接着方法、端部納まり', '内装・外装など使用環境ごとの条件', '数量、納期、輸入・保管条件'],
      zh: ['天然石紋理、批次差異與樣品確認', '基底材料、黏貼方式與收邊處理', '依內裝／外裝使用環境確認條件', '數量、交期、進口與保管條件'],
      en: ['Stone pattern, batch variation and sample review', 'Substrate, adhesive method and edge details', 'Interior/exterior environment requirements', 'Quantity, lead time, import and storage conditions'],
    },
  },
  'flexible-stone-uv': {
    title: {
      ja: '曲面・軽量下地にも検討しやすい UV 仕上げ薄型石材',
      zh: '適合曲面與輕量基底評估的 UV 表面薄型石材',
      en: 'UV-finished thin stone for curved and lightweight substrate review',
    },
    lead: {
      ja: 'Flexible Stone UV は、薄型天然石の意匠性に UV 仕上げを組み合わせた製品です。外装・内装の意匠材として、曲面、軽量パネル、改修下地など、従来石材では制約が出やすい部位での検討を支援します。',
      zh: 'Flexible Stone UV 結合薄型天然石質感與 UV 表面處理。作為外裝與內裝設計材，可用於曲面、輕量面板與翻新基底等傳統石材受限的部位評估。',
      en: 'Flexible Stone UV combines thin natural-stone expression with a UV-finished surface. It supports exterior and interior design-material review for curved surfaces, lightweight panels and renovation substrates where conventional stone may be constrained.',
    },
    applications: {
      ja: ['外装・内装アクセントパネル', '曲面壁・柱まわりの意匠材', '軽量パネルへの貼付け', '店舗・宿泊施設の改修提案'],
      zh: ['外裝與內裝重點牆面板', '曲面牆與柱面設計材', '輕量面板貼付用途', '店鋪與住宿設施翻新提案'],
      en: ['Exterior and interior accent panels', 'Curved wall and column finishes', 'Lamination onto lightweight panels', 'Retail and hospitality refurbishment proposals'],
    },
    reviewPoints: {
      ja: ['UV 仕上げ面の質感・耐候条件確認', '曲げ半径、下地追従性、接着仕様', '屋外利用時の下地・防水・端部設計', '柄展開と案件数量に応じた納期確認'],
      zh: ['確認 UV 表面質感與耐候條件', '彎曲半徑、基底追隨性與黏貼規格', '戶外使用時的基底、防水與邊部設計', '依紋理選項與案件數量確認交期'],
      en: ['UV surface texture and weathering conditions', 'Bending radius, substrate following and adhesive specification', 'Substrate, waterproofing and edge design for exterior use', 'Pattern selection and lead-time review by project quantity'],
    },
  },
  'acoustic-molded-door': {
    title: {
      ja: '音環境に配慮した成形ドア・建具用途',
      zh: '重視聲環境的成型門與建具用途',
      en: 'Molded-door applications with acoustic considerations',
    },
    lead: {
      ja: 'w/Acoustic Molded Door は、Natural Fibre Board を活用した成形ドア用途の製品群です。ホテル、集合住宅、オフィス、教育施設など、建具の意匠と音環境の両面を確認したい案件で、仕様検討の入口をつくります。',
      zh: 'w/Acoustic Molded Door 是運用 Natural Fibre Board 的成型門用途產品。適合飯店、集合住宅、辦公室與教育設施等同時重視門片設計與聲環境的案件作為規格評估入口。',
      en: 'w/Acoustic Molded Door is a molded-door product direction using Natural Fibre Board. It creates an entry point for specification review in hotels, multifamily housing, offices and education facilities where door design and acoustic comfort both matter.',
    },
    applications: {
      ja: ['ホテル客室・共用部の建具', '集合住宅の室内ドア', 'オフィス・会議室まわり', '教育・医療施設の音環境配慮部位'],
      zh: ['飯店客房與公共區域建具', '集合住宅室內門', '辦公室與會議室周邊', '教育與醫療設施中重視聲環境的部位'],
      en: ['Hotel guestroom and common-area doors', 'Interior doors for multifamily housing', 'Office and meeting-room areas', 'Acoustic-sensitive areas in education and healthcare facilities'],
    },
    reviewPoints: {
      ja: ['ドア構成、芯材、面材、金物条件', '必要な遮音・吸音目標の整理', 'サイズ、重量、取付条件の確認', '量産・OEM・共同開発の可能性'],
      zh: ['門片構成、芯材、面材與五金條件', '整理所需隔音／吸音目標', '確認尺寸、重量與安裝條件', '量產、OEM 與共同開發可能性'],
      en: ['Door composition, core, surface and hardware conditions', 'Required sound-insulation or absorption targets', 'Size, weight and installation requirements', 'Mass production, OEM and co-development potential'],
    },
  },
};

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
