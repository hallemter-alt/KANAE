'use client'

import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import Simulator from '@/components/invest/Simulator'
import PropertyGallery from '@/components/invest/PropertyGallery'
import { useLanguage } from '@/contexts/LanguageContext'
import { getInvestProperty, formatOku, annualRent } from '@/lib/invest'

const L = {
  ja: {
    back: '物件一覧へ戻る',
    overview: '物件概要',
    gallery: '外観・共用部',
    location: '所在地・交通',
    yield: '表面利回り',
    price: '販売価格',
    annualIncome: '想定年間賃料収入',
    address: '所在地',
    access: '交通',
    landArea: '土地面積',
    totalFloorArea: '延床面積',
    exclusiveArea: '専有面積',
    built: '築年月',
    structure: '構造・階数',
    units: '総戸数',
    unitsSuffix: '戸',
    landRight: '土地権利',
    zoning: '用途地域',
    otherZoning: 'その他地域地区',
    bcr: '建ぺい率',
    far: '容積率',
    designer: '設計事務所',
    builder: '施工業者',
    transaction: '取引態様',
    remarks: '備考',
    updated: '更新日',
    simTitle: '収益シミュレーション',
    simSubtitle: 'ご自身の条件で、収支の輪郭を静かに確かめる',
    contactTitle: 'この物件についてのご相談',
    contactText: '詳細資料・レントロール・実査のご案内は個別にご対応いたします。',
    contactBtn: 'お問い合わせ',
    disclaimer:
      '※掲載内容と現況が異なる場合は、現況を優先させて頂きます。※掲載の写真に含まれる家具等は価格に含まれておりません。※表面利回りは想定年収÷販売価格で算出したものであり、公租公課その他の諸費用控除前です。賃料収入を保証するものではありません。',
  },
  zh: {
    back: '返回物業一覽',
    overview: '物業概要',
    gallery: '外觀·公共區域',
    location: '所在地·交通',
    yield: '表面收益率',
    price: '銷售價格',
    annualIncome: '預計年租金收入',
    address: '所在地',
    access: '交通',
    landArea: '土地面積',
    totalFloorArea: '總建築面積',
    exclusiveArea: '專有面積',
    built: '竣工年月',
    structure: '結構·層數',
    units: '總戶數',
    unitsSuffix: '戶',
    landRight: '土地權利',
    zoning: '用途地域',
    otherZoning: '其他地域地區',
    bcr: '建蔽率',
    far: '容積率',
    designer: '設計事務所',
    builder: '施工單位',
    transaction: '交易形式',
    remarks: '備註',
    updated: '更新日期',
    simTitle: '收益模擬計算',
    simSubtitle: '以您自己的條件，靜靜確認收支的輪廓',
    contactTitle: '關於此物業的諮詢',
    contactText: '詳細資料、租金明細表（Rent Roll）及實地考察均可單獨安排。',
    contactBtn: '聯繫我們',
    disclaimer:
      '※如刊載內容與現狀不符，以現狀為準。※照片中的家具等不包含在價格內。※表面收益率=預計年收入÷銷售價格，未扣除稅費及其他費用，不構成租金收入保證。',
  },
  en: {
    back: 'Back to Properties',
    overview: 'Property Overview',
    gallery: 'Exterior & Common Areas',
    location: 'Location & Access',
    yield: 'Gross Yield',
    price: 'Price',
    annualIncome: 'Est. Annual Rental Income',
    address: 'Address',
    access: 'Access',
    landArea: 'Land Area',
    totalFloorArea: 'Total Floor Area',
    exclusiveArea: 'Exclusive Area',
    built: 'Built',
    structure: 'Structure / Floors',
    units: 'Total Units',
    unitsSuffix: '',
    landRight: 'Land Rights',
    zoning: 'Zoning',
    otherZoning: 'Other Districts',
    bcr: 'BCR',
    far: 'FAR',
    designer: 'Architect',
    builder: 'Builder',
    transaction: 'Transaction Type',
    remarks: 'Remarks',
    updated: 'Updated',
    simTitle: 'Income Simulation',
    simSubtitle: 'Quietly trace the outline of cash flow under your own assumptions',
    contactTitle: 'Inquire About This Property',
    contactText: 'Detailed documents, rent roll, and property viewing are arranged individually.',
    contactBtn: 'Contact Us',
    disclaimer:
      '* Current conditions take precedence over listed content. * Furniture shown in photos is not included. * Gross yield = estimated annual income ÷ price, before taxes and expenses. Rental income is not guaranteed.',
  },
} as const

function yenMan(n: number, locale: 'ja' | 'zh' | 'en'): string {
  if (locale === 'en') return `¥${(n / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`
  return `${Math.round(n / 10000).toLocaleString('ja-JP')}万円`
}

export default function InvestDetailPage() {
  const params = useParams()
  const { locale } = useLanguage()
  const s = L[locale]
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const p = getInvestProperty(slug)

  if (!p) {
    notFound()
  }

  const rows: Array<[string, string]> = [
    [s.address, p.address],
    [s.landArea, p.landArea],
    [s.totalFloorArea, p.totalFloorArea],
    [s.exclusiveArea, p.exclusiveArea],
    [s.built, p.built[locale]],
    [s.structure, p.structure[locale]],
    [s.units, `${p.units}${s.unitsSuffix}`],
    [s.landRight, p.landRight],
    [s.zoning, p.zoning],
    [s.otherZoning, p.otherZoning],
    [s.bcr, p.bcr],
    [s.far, p.far],
    ...(p.designer ? ([[s.designer, p.designer]] as Array<[string, string]>) : []),
    ...(p.builder ? ([[s.builder, p.builder]] as Array<[string, string]>) : []),
    [s.transaction, p.transaction],
    ...(p.remarks ? ([[s.remarks, p.remarks]] as Array<[string, string]>) : []),
    [s.updated, p.updated],
  ]

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      {/* Hero — メイン写真 */}
      <section className="relative min-h-[60svh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/invest/${p.slug}/01.jpg')` }}
          role="img"
          aria-label={p.name[locale]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-12 pt-44">
          <Link
            href="/invest"
            className="animate-rise inline-flex items-center gap-2 text-washi/60 hover:text-washi text-xs tracking-widest mb-6 transition-colors"
          >
            <span className="inline-block w-6 h-px bg-washi/40" />
            {s.back}
          </Link>
          <h1 className="animate-rise font-serif text-3xl sm:text-4xl lg:text-5xl text-washi leading-snug mb-3">
            {p.name[locale]}
          </h1>
          <p className="animate-rise text-washi/70 text-sm sm:text-base tracking-wide mb-8">{p.catch[locale]}</p>
          <div className="animate-rise flex flex-wrap gap-x-10 gap-y-3">
            <div>
              <p className="text-washi/50 text-[11px] tracking-widest mb-1">{s.price}</p>
              <p className="font-serif text-washi text-2xl lg:text-3xl">{formatOku(p.price)}</p>
            </div>
            <div>
              <p className="text-washi/50 text-[11px] tracking-widest mb-1">{s.yield}</p>
              <p className="font-serif text-washi text-2xl lg:text-3xl">{p.grossYield.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-washi/50 text-[11px] tracking-widest mb-1">{s.annualIncome}</p>
              <p className="font-serif text-washi text-2xl lg:text-3xl">{yenMan(annualRent(p), locale)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ギャラリー — ライトボックス・左右切替対応 */}
      <section className="bg-washi texture-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
          <Reveal>
            <p className="section-label mb-3">Gallery</p>
            <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-10">{s.gallery}</h2>
          </Reveal>
          <Reveal delay={1}>
            <PropertyGallery property={p} />
          </Reveal>
        </div>
      </section>

      {/* 概要 + 交通 */}
      <section className="bg-gold-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="section-label mb-3">Overview</p>
                <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-10">{s.overview}</h2>
              </Reveal>
              <Reveal delay={1}>
                <dl className="border-t border-ink/15">
                  {rows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-4 py-4 border-b border-ink/10">
                      <dt className="text-ink/45 text-[13px] tracking-wide pt-0.5">{k}</dt>
                      <dd className="col-span-2 text-ink/85 text-[14px] leading-relaxed">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={1}>
                <p className="section-label mb-3">Access</p>
                <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-10">{s.location}</h2>
                <ul className="space-y-4 mb-10">
                  {p.access.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-ink/75 text-sm leading-relaxed">
                      <span className="mt-2.5 inline-block w-4 h-px bg-gold-500 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="border border-ink/10 overflow-hidden">
                  <iframe
                    title={`${p.name[locale]} map`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(p.address)}&output=embed`}
                    className="w-full h-72 grayscale-[0.85] contrast-[0.92] opacity-90"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 収益シミュレーション */}
      <section className="bg-washi texture-paper" id="simulator">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
          <Reveal>
            <p className="section-label mb-3">Simulation</p>
            <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-2">{s.simTitle}</h2>
            <p className="text-ink/50 text-sm mb-12">— {s.simSubtitle}</p>
          </Reveal>
          <Simulator property={p} />
        </div>
      </section>

      {/* 免責 + CTA — 桜の散らしている動画背景（再生速度を落として漂いを自然に） */}
      <section className="bg-ink relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/mood/blossom-scatter-poster.jpg"
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = 0.55
          }}
        >
          <source src="/assets/mood/blossom-scatter.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/40" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-28">
          <Reveal className="text-center">
            <h2 className="font-serif text-2xl lg:text-3xl text-washi mb-4">{s.contactTitle}</h2>
            <p className="text-washi/60 text-sm mb-10">{s.contactText}</p>
            <Link
              href="/contact"
              className="inline-block border border-washi/40 text-washi text-sm tracking-widest px-10 py-4 hover:bg-washi hover:text-ink transition-colors duration-500"
            >
              {s.contactBtn}
            </Link>
            <p className="mt-14 text-washi/35 text-[11px] leading-relaxed max-w-3xl mx-auto text-left">
              {s.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
