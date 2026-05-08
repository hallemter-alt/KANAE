import type { Meta, StoryObj } from "@storybook/react";
import { InvoicePDF } from "@/components/pdf/InvoicePDF";

/**
 * ## InvoicePDF（請求書・見積書PDFテンプレート）
 *
 * 建材貿易・BM・賃貸管理・民宿運営などで使用される請求書・見積書PDF出力テンプレート。
 * 新舊結合の極簡高級デザインで、建築の品格と信頼性を演出。
 *
 * **デザイン原則**:
 * - 用紙: A4縦（210×297mm）、余白: 上下30mm・左右25mm
 * - 背景: 純白（#FFFFFF）— 印刷時の再現性を最優先
 * - ヘッダー: 会社ロゴ（NotoSerifJP 16px Bold）+ 光金銅（#C9A96E）1px下線
 * - タイトル: NotoSerifJP 24px 炭墨黑 — 「請求書」「見積書」「納品書」
 * - テーブル: 混凝土灰（#E8E4DF）ヘッダー + 1px 炭墨黑（opacity 8%）ボーダー
 * - 金額: RobotoMono 14px（等幅で桁揃え）
 * - 合計欄: 光金銅 2px 上線 + RobotoMono 18px Bold
 * - 備考欄: NotoSansJP 11px 錆鉄灰、行間1.6
 * - 銀行振込欄: 枠囲み（1px 朽木棕）+ 等幅フォント
 * - 印鑑欄: 90×90mm 白枠（建築確認の重み）
 *
 * **使用Token**:
 * - `colors/dominant/washi-white` — 純白背景（印刷用）
 * - `colors/secondary/charcoal-black` — テキスト・ボーダー
 * - `colors/accent/light-copper` — ヘッダー下線・合計上線
 * - `colors/dominant/concrete-grey` — テーブルヘッダー
 * - `font/heading/serif` — タイトル・会社名
 * - `font/data/mono` — 金額・数量・型番
 * - `font/body/sans` — 本文・備考
 */
const meta = {
  title: "PDF/InvoicePDF",
  component: InvoicePDF,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/XXXX/PDF_InvoicePDF?node-id=90-1",
    },
    layout: "fullscreen",
    backgrounds: {
      default: "純白",
      values: [
        { name: "純白", value: "#FFFFFF" },
        { name: "和紙白", value: "#F5F3EF" },
      ],
    },
  },
  argTypes: {
    docType: {
      control: "select",
      options: ["invoice", "estimate", "delivery", "receipt"],
      description: "文書タイプ",
    },
    companyInfo: { control: "object", description: "自社情報" },
    clientInfo: { control: "object", description: "取引先情報" },
    items: { control: "object", description: "品目明細配列" },
    taxRate: { control: "number", description: "消費税率（%）" },
    notes: { control: "text", description: "備考欄テキスト" },
    bankInfo: { control: "object", description: "振込先情報" },
    showSeal: { control: "boolean", description: "印鑑欄表示" },
  },
} satisfies Meta<typeof InvoicePDF>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultCompany = {
  name: "株式会社KANAE",
  address: "〒150-0036 東京都渋谷区南平台町15-9",
  tel: "03-1234-5678",
  fax: "03-1234-5679",
  email: "info@kanae-tokyo.com",
  registrationNo: "東京都知事(1)第12345号",
};

const defaultClient = {
  name: "株式会社建装",
  department: "資材調達部",
  address: "〒150-0042 東京都渋谷区宇田川町28-3",
  attn: "山田 太郎 様",
};

const defaultItems = [
  {
    no: 1,
    name: "イタリア産大理石調タイル",
    spec: "600×600×10mm / ホワイト",
    qty: 120,
    unit: "枚",
    unitPrice: 4500,
    amount: 540000,
  },
  {
    no: 2,
    name: "無垢オークフローリング",
    spec: "1,820×189×15mm / ナチュラル",
    qty: 85,
    unit: "㎡",
    unitPrice: 12000,
    amount: 1020000,
  },
  {
    no: 3,
    name: "輸入断熱材（ドイツ製）",
    spec: "1,200×600×100mm",
    qty: 40,
    unit: "束",
    unitPrice: 8500,
    amount: 340000,
  },
];

export const Invoice: Story = {
  args: {
    docType: "invoice",
    companyInfo: defaultCompany,
    clientInfo: defaultClient,
    items: defaultItems,
    taxRate: 10,
    notes:
      "※納品後30日以内にお支払いください。\n※振込手数料は御社負担でお願いいたします。",
    bankInfo: {
      bank: "三菱UFJ銀行",
      branch: "渋谷支店",
      accountType: "普通",
      accountNo: "1234567",
      accountName: "カ）KANAE",
    },
    showSeal: true,
  },
  parameters: {
    docs: {
      storyDescription:
        "標準請求書。3品目・税込合計¥2,090,000。印鑑欄・振込先情報を含む。",
    },
  },
};

export const Estimate: Story = {
  args: {
    docType: "estimate",
    companyInfo: defaultCompany,
    clientInfo: defaultClient,
    items: [
      {
        no: 1,
        name: "外壁防水工事",
        spec: "ウレタン塗膜防水 / 延べ120㎡",
        qty: 1,
        unit: "式",
        unitPrice: 850000,
        amount: 850000,
      },
      {
        no: 2,
        name: "足場仮設",
        spec: "単管足場 / 高さ10m以下",
        qty: 1,
        unit: "式",
        unitPrice: 120000,
        amount: 120000,
      },
      {
        no: 3,
        name: "高圧洗浄",
        spec: "外壁・屋上",
        qty: 1,
        unit: "式",
        unitPrice: 45000,
        amount: 45000,
      },
    ],
    taxRate: 10,
    notes:
      "※有効期限: 発行日より30日間\n※工期: 受注後2週間\n※保証期間: 完工後5年",
    bankInfo: null,
    showSeal: false,
  },
  parameters: {
    docs: {
      storyDescription:
        "見積書（BM工事）。工事内容を明記、有効期限・工期・保証を備考欄に記載。",
    },
  },
};

export const Delivery: Story = {
  args: {
    docType: "delivery",
    companyInfo: defaultCompany,
    clientInfo: defaultClient,
    items: [
      {
        no: 1,
        name: "檜風呂パネルセット",
        spec: "JPN-HB-3030 / 専用接着剤付",
        qty: 3,
        unit: "セット",
        unitPrice: 15000,
        amount: 45000,
      },
    ],
    taxRate: 10,
    notes:
      "※納品日: 2026年5月15日\n※納入場所: 東京都渋谷区南平台町15-9\n※破損品がございましたら7日以内にご連絡ください。",
    bankInfo: null,
    showSeal: true,
  },
  parameters: {
    docs: {
      storyDescription:
        "納品書。建材単品の納品証明。納品日・場所・破損連絡期限を明記。",
    },
  },
};

export const LongItems: Story = {
  args: {
    docType: "invoice",
    companyInfo: defaultCompany,
    clientInfo: defaultClient,
    items: [
      {
        no: 1,
        name: "イタリア産大理石調タイル",
        spec: "600×600×10mm",
        qty: 120,
        unit: "枚",
        unitPrice: 4500,
        amount: 540000,
      },
      {
        no: 2,
        name: "無垢オークフローリング",
        spec: "1,820×189×15mm",
        qty: 85,
        unit: "㎡",
        unitPrice: 12000,
        amount: 1020000,
      },
      {
        no: 3,
        name: "輸入断熱材（ドイツ製）",
        spec: "1,200×600×100mm",
        qty: 40,
        unit: "束",
        unitPrice: 8500,
        amount: 340000,
      },
      {
        no: 4,
        name: "和紙調壁紙",
        spec: "JPN-WP-1010 / 930×50m",
        qty: 12,
        unit: "巻",
        unitPrice: 3200,
        amount: 38400,
      },
      {
        no: 5,
        name: "檜風呂パネルセット",
        spec: "JPN-HB-3030",
        qty: 5,
        unit: "セット",
        unitPrice: 15000,
        amount: 75000,
      },
      {
        no: 6,
        name: "ドイツ製断熱材",
        spec: "DEU-IN-5050",
        qty: 20,
        unit: "束",
        unitPrice: 8500,
        amount: 170000,
      },
      {
        no: 7,
        name: "外壁用防水シート",
        spec: "1,000×50m / 耐候性10年",
        qty: 8,
        unit: "巻",
        unitPrice: 18500,
        amount: 148000,
      },
    ],
    taxRate: 10,
    notes: "※長期取引割引（5%）適用済み\n※納品後30日以内にお支払いください。",
    bankInfo: {
      bank: "三菱UFJ銀行",
      branch: "渋谷支店",
      accountType: "普通",
      accountNo: "1234567",
      accountName: "カ）KANAE",
    },
    showSeal: true,
  },
  parameters: {
    docs: {
      storyDescription:
        "多品目請求書（7行）。2ページ目に自動継続。品目が増えても等幅フォントで桁揃えを維持。",
    },
  },
};

export const NoTax: Story = {
  args: {
    docType: "invoice",
    companyInfo: defaultCompany,
    clientInfo: { ...defaultClient, name: "株式会社海外建販" },
    items: [
      {
        no: 1,
        name: "輸出用建材セット",
        spec: "FOB東京港",
        qty: 1,
        unit: "式",
        unitPrice: 2500000,
        amount: 2500000,
      },
    ],
    taxRate: 0,
    notes: "※輸出免税適用\n※貿易条件: FOB東京港\n※船積予定: 2026年6月15日",
    bankInfo: {
      bank: "三菱UFJ銀行",
      branch: "渋谷支店",
      accountType: "外貨普通",
      accountNo: "7654321",
      accountName: "カ）KANAE",
    },
    showSeal: true,
  },
  parameters: {
    docs: {
      storyDescription:
        "輸出免税請求書。税0%・外貨普通預金・FOB条件。貿易業務特有の表記。",
    },
  },
};
