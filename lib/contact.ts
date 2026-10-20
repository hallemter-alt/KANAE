import type { Locale } from '@/lib/translations'
import { products } from '@/lib/materialsContent'

// Shared, stable values keep client fields and server validation in sync across languages.
export const CONTACT_EMAIL = 'info@kanae-tokyo.com'
type Copy = Record<Locale, string>
const l = (ja: string, zh: string, en: string): Copy => ({ ja, zh, en })
type Option = { value: string; label: Copy }
const option = (value: string, ja: string, zh: string, en: string): Option => ({
  value,
  label: l(ja, zh, en),
})
export type ContactField = {
  key: string
  label: Copy
  required?: boolean
  options?: Option[]
  placeholder?: Copy
}
type Business = {
  value: string
  label: Copy
  topics: Option[]
  fields: ContactField[]
}
const unknown = option(
  'undecided',
  '未定・相談したい',
  '尚未決定／希望諮詢',
  'Undecided / need advice'
)
const inquiry = option(
  'inquiry',
  '相談・お問い合わせ',
  '諮詢／詢問',
  'Consultation / inquiry'
)
const viewing = option('viewing', '内見予約', '預約看房', 'Schedule a viewing')
const area: ContactField = {
  key: 'area',
  label: l(
    '希望エリア・所在地',
    '希望地區／所在地',
    'Preferred area / location'
  ),
  required: true,
  placeholder: l(
    '例：東京都豊島区／未定',
    '例：東京都豐島區／未定',
    'e.g. Toshima, Tokyo / undecided'
  ),
}
const budget: ContactField = {
  key: 'budget',
  label: l(
    'ご予算（通貨・単位も記入）',
    '預算（請註明幣別與單位）',
    'Budget (include currency and units)'
  ),
}
const timing: ContactField = {
  key: 'timing',
  label: l('希望時期・納期', '希望時程／交期', 'Preferred timing / lead time'),
}
const property: ContactField = {
  key: 'property',
  label: l(
    '物件名・URL（お分かりの場合）',
    '物件名稱／網址（如已知）',
    'Property name / URL (if known)'
  ),
}
const propertyType: ContactField = {
  key: 'propertyType',
  label: l('物件種別', '物件類型', 'Property type'),
  options: [
    option('apartment', 'マンション・アパート', '公寓／集合住宅', 'Apartment'),
    option('house', '戸建て', '獨棟住宅', 'House'),
    option('building', '一棟・ビル', '整棟／大樓', 'Whole building'),
    option('commercial', '店舗・事務所', '店舖／辦公室', 'Retail / office'),
    option('land', '土地', '土地', 'Land'),
    unknown,
  ],
}

export const businesses: Business[] = [
  {
    value: 'rent',
    label: l('賃貸', '租賃', 'Rental'),
    topics: [
      inquiry,
      viewing,
      option(
        'application',
        '入居申込の相談',
        '入住申請諮詢',
        'Rental application'
      ),
    ],
    fields: [
      area,
      budget,
      {
        key: 'layout',
        label: l('希望間取り', '希望格局', 'Preferred layout'),
        options: ['1R / 1K', '1DK / 1LDK', '2DK / 2LDK', '3LDK+']
          .map((value) => option(value, value, value, value))
          .concat(unknown),
      },
      timing,
      property,
    ],
  },
  {
    value: 'sale',
    label: l('不動産売買', '不動產買賣', 'Property purchase / sale'),
    topics: [
      option('buy', '購入相談', '購屋諮詢', 'Buying'),
      option('sell', '売却相談', '出售諮詢', 'Selling'),
      option('valuation', '査定相談', '估價諮詢', 'Valuation'),
      viewing,
    ],
    fields: [area, propertyType, budget, timing, property],
  },
  {
    value: 'invest',
    label: l('不動産投資', '不動產投資', 'Property investment'),
    topics: [
      inquiry,
      option(
        'purchase',
        '投資物件の購入',
        '投資物件購買',
        'Investment purchase'
      ),
    ],
    fields: [
      { ...area, required: false },
      budget,
      {
        key: 'goal',
        label: l('投資目的', '投資目的', 'Investment goal'),
        options: [
          option('income', '賃料収入', '租金收益', 'Rental income'),
          option('growth', '資産形成', '資產增值', 'Capital growth'),
          unknown,
        ],
      },
      timing,
      property,
    ],
  },
  {
    value: 'management',
    label: l('不動産管理', '不動產管理', 'Property management'),
    topics: [
      option(
        'quote',
        '管理委託・見積相談',
        '委託管理／報價',
        'Management / quotation'
      ),
      option(
        'transfer',
        '管理会社の変更',
        '更換管理公司',
        'Change management company'
      ),
      option(
        'tenant',
        '入居中の相談',
        '現有租客諮詢',
        'Existing tenant inquiry'
      ),
    ],
    fields: [
      area,
      propertyType,
      {
        key: 'units',
        label: l('戸数・管理規模', '戶數／管理規模', 'Number of units / scope'),
      },
      timing,
    ],
  },
  {
    value: 'minpaku',
    label: l(
      '民泊・宿泊運営',
      '民宿／住宿營運',
      'Vacation rental / hospitality'
    ),
    topics: [
      option(
        'launch',
        '開業・許認可の相談',
        '開業／許可諮詢',
        'Launch / licensing'
      ),
      option(
        'operations',
        '運営委託・改善',
        '委託營運／改善',
        'Operations / improvement'
      ),
    ],
    fields: [
      area,
      propertyType,
      {
        key: 'rooms',
        label: l('客室数・面積', '房間數／面積', 'Rooms / floor area'),
      },
      {
        key: 'stage',
        label: l('現在の状況', '目前階段', 'Current stage'),
        required: true,
        options: [
          option('planning', '計画中', '規劃中', 'Planning'),
          option(
            'preparing',
            '開業準備中',
            '開業準備中',
            'Preparing to launch'
          ),
          option('operating', '運営中', '營運中', 'Operating'),
          unknown,
        ],
      },
      timing,
    ],
  },
  {
    value: 'materials',
    label: l(
      '建材・国際貿易',
      '建材／國際貿易',
      'Building materials / global trade'
    ),
    topics: [
      option('technical', '技術相談', '技術諮詢', 'Technical consultation'),
      option('documents', '資料請求', '索取資料', 'Document request'),
      option('sample', 'サンプル依頼', '樣品需求', 'Sample request'),
      option(
        'development',
        'OEM・共同開発',
        'OEM／共同開發',
        'OEM / co-development'
      ),
      option('quote', '価格・納期相談', '價格／交期', 'Price / lead time'),
    ],
    fields: [
      {
        key: 'product',
        label: l('対象製品', '目標產品', 'Target product'),
        required: true,
        options: [
          ...products.map((p) => option(p.name, p.name, p.name, p.name)),
          option('other', 'その他・未定', '其他／未定', 'Other / undecided'),
        ],
      },
      {
        key: 'application',
        label: l('用途', '用途', 'Application'),
        required: true,
        options: [
          option('floor', '床', '地板', 'Floor'),
          option('wall', '壁・内装', '牆面／內裝', 'Wall / interior'),
          option('door', '建具・ドア', '門扇／建具', 'Door'),
          option('facade', '外装', '外裝', 'Facade'),
          option('oem', 'OEM', 'OEM', 'OEM'),
          unknown,
        ],
      },
      {
        key: 'stage',
        label: l('案件段階', '案件階段', 'Project stage'),
        required: true,
        options: [
          option('research', '情報収集', '資料收集', 'Research'),
          option('design', '設計検討', '設計評估', 'Design review'),
          option(
            'prototype',
            '試作・サンプル確認',
            '試作／樣品確認',
            'Prototype / sample review'
          ),
          option(
            'quotation',
            '見積・調達',
            '報價／採購',
            'Quotation / procurement'
          ),
          unknown,
        ],
      },
      {
        key: 'documents',
        label: l('必要資料', '所需資料', 'Required documents'),
        options: [
          option('catalog', '製品資料', '產品資料', 'Product dossier'),
          option('tests', '試験データ', '測試數據', 'Test data'),
          option(
            'patents',
            '特許・認証',
            '專利／認證',
            'Patents / certification'
          ),
          option(
            'all',
            '関連資料一式',
            '所有相關資料',
            'All relevant documents'
          ),
          unknown,
        ],
      },
      {
        key: 'quantity',
        label: l('希望数量・単位', '需求數量／單位', 'Quantity / units'),
      },
      { ...area, required: false },
      timing,
    ],
  },
  {
    value: 'other',
    label: l('その他・総合相談', '其他／綜合諮詢', 'Other / general inquiry'),
    topics: [
      inquiry,
      option(
        'partnership',
        '協業・取引の相談',
        '合作／交易諮詢',
        'Partnership'
      ),
    ],
    fields: [],
  },
]

export const contactCopy = {
  subtitle: l(
    'すべての事業のご相談を、一つの窓口で承ります。',
    '所有業務諮詢，統一由此窗口受理。',
    'One contact point for all our services.'
  ),
  business: l('ご相談の事業', '諮詢業務類型', 'Business / service'),
  select: l('選択してください', '請選擇', 'Please select'),
  topic: l('ご相談の目的', '諮詢目的', 'Purpose of inquiry'),
  details: l('事業別のご相談内容', '業務相關資訊', 'Service-specific details'),
  hint: l(
    '事業を選ぶと、必要な項目が表示されます。* は必須項目です。未定の場合はその旨をご記入ください。',
    '選擇業務後將顯示對應欄位。* 為必填；尚未決定的資訊可填寫「未定」。',
    'Select a service to see relevant fields. * indicates required fields; enter “undecided” where appropriate.'
  ),
  company: l(
    '会社名・組織名（任意）',
    '公司／機構名稱（選填）',
    'Company / organization (optional)'
  ),
  storedTitle: l(
    '受付済み・メール通知未完了',
    '已保存，郵件通知尚未完成',
    'Saved — email notification incomplete'
  ),
  storedMessage: l(
    '内容は保存されましたが、担当者へのメール通知を確認できませんでした。再送信は不要です。お急ぎの場合は電話または下記メールへご連絡ください。',
    '您的諮詢已保存，但未能確認通知郵件寄出。請勿重複提交；如需即時處理，請致電或直接寄信至下方信箱。',
    'Your inquiry was saved, but the notification email could not be confirmed. Please do not resubmit. For urgent help, call us or email the address below.'
  ),
  validation: l(
    '必須項目・入力内容をご確認ください。',
    '請檢查必填欄位與輸入內容。',
    'Please check the required fields and your input.'
  ),
}

export type InquiryInput = {
  name: string
  email: string
  phone: string
  company: string
  message: string
  business: string
  topic: string
  details: Record<string, string>
  locale: Locale
  type: 'inquiry' | 'viewing' | 'application'
  property_id?: string
}
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export function validateInquiry(
  body: unknown
): { data: InquiryInput; errors?: never } | { errors: string[]; data?: never } {
  if (!record(body)) return { errors: ['body'] }
  const errors: string[] = []
  const text = (key: string, required: boolean, max: number) => {
    const value = body[key]
    if (value === undefined && !required) return ''
    if (
      typeof value !== 'string' ||
      value.length > max ||
      (required && !value.trim()) ||
      (typeof value === 'string' && value.includes('\0'))
    ) {
      errors.push(key)
      return ''
    }
    return value.trim()
  }
  const name = text('name', true, 100)
  const email = text('email', true, 254)
  const message = text('message', true, 5000)
  const phone = text('phone', false, 50)
  const company = text('company', false, 200)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email')
  if (body.website) errors.push('website')
  const locale =
    body.locale === 'zh' || body.locale === 'en' ? body.locale : 'ja'
  // Accept the previous form payload during rolling deployments / cached-page submissions.
  const legacy = body.business === undefined
  const business = legacy ? 'other' : text('business', true, 30)
  const config = businesses.find((item) => item.value === business)
  if (!config) errors.push('business')
  const topic = legacy ? 'inquiry' : text('topic', true, 40)
  if (!legacy && !config?.topics.some((item) => item.value === topic))
    errors.push('topic')
  let type: InquiryInput['type'] =
    topic === 'viewing'
      ? 'viewing'
      : topic === 'application'
        ? 'application'
        : 'inquiry'
  if (legacy) {
    if (
      body.type !== undefined &&
      (typeof body.type !== 'string' ||
        !['viewing', 'inquiry', 'application', 'other'].includes(body.type))
    )
      errors.push('type')
    if (body.type === 'viewing' || body.type === 'application') type = body.type
  }
  if (!legacy && !record(body.details)) errors.push('details')
  const source = record(body.details) ? body.details : {}
  const details: Record<string, string> = {}
  for (const field of config?.fields ?? []) {
    const value = source[field.key] ?? ''
    if (
      typeof value !== 'string' ||
      value.length > 500 ||
      (field.required && !value.trim()) ||
      (typeof value === 'string' && value.includes('\0'))
    ) {
      errors.push(`details.${field.key}`)
      continue
    }
    if (
      value &&
      field.options &&
      !field.options.some((item) => item.value === value)
    ) {
      errors.push(`details.${field.key}`)
      continue
    }
    if (value.trim()) details[field.key] = value.trim()
  }
  const propertyId = text('property_id', false, 36)
  if (
    propertyId &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      propertyId
    )
  )
    errors.push('property_id')
  if (errors.length) return { errors: [...new Set(errors)] }
  return {
    data: {
      name,
      email,
      phone,
      company,
      message,
      business,
      topic,
      details,
      locale,
      type,
      ...(propertyId ? { property_id: propertyId } : {}),
    },
  }
}

// Store the same human-readable business details in the existing DB message column and email.
export function formatInquiry(input: InquiryInput): string {
  const config = businesses.find((item) => item.value === input.business)!
  return [
    `事業 / Service: ${config.label.ja}`,
    `相談目的 / Purpose: ${config.topics.find((item) => item.value === input.topic)?.label.ja ?? input.topic}`,
    `受付種別 / Type: ${input.type}`,
    `言語 / Language: ${input.locale}`,
    ...(input.company ? [`会社名 / Company: ${input.company}`] : []),
    ...config.fields.flatMap((field) => {
      const value = input.details[field.key]
      return value
        ? [
            `${field.label.ja}: ${field.options?.find((item) => item.value === value)?.label.ja ?? value}`,
          ]
        : []
    }),
    '',
    input.message,
  ].join('\n')
}
