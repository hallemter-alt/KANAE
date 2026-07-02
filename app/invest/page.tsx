'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { INVEST_PROPERTIES, formatOku, annualRent } from '@/lib/invest'

const L = {
  ja: {
    label: 'Investment',
    title: '一棟収益物件',
    subtitle: '東京23区・駅10分以内 — 新築・築浅の一棟レジデンス',
    lead: 'ひとつの建物を、まるごと所有するということ。それは土地と建築、そして時間への投資です。KANAEは、立地と品質を静かに見極めた一棟収益物件をご紹介します。',
    yield: '表面利回り',
    price: '販売価格',
    units: '総戸数',
    unitsSuffix: '戸',
    built: '築年月',
    structure: '構造',
    view: '詳細を見る',
    badgeNew: '新築',
    badgeNearlyNew: '築浅',
    annualIncome: '想定年間賃料',
    note: '※ 表面利回りは想定年収÷販売価格で算出したものであり、諸費用控除前です。賃料収入を保証するものではありません。',
    simulator: '各物件ページで収益シミュレーションをご利用いただけます',
    cta: 'ご相談・資料請求',
    ctaText: '物件詳細資料・レントロールは個別にご案内しております。',
  },
  zh: {
    label: 'Investment',
    title: '整栋收益物业',
    subtitle: '东京23区·车站10分钟内 — 新建·准新整栋公寓',
    lead: '完整持有一栋建筑，是对土地、建筑与时间的投资。KANAE 为您甄选立地与品质兼备的整栋收益物业。',
    yield: '表面收益率',
    price: '销售价格',
    units: '总户数',
    unitsSuffix: '户',
    built: '竣工年月',
    structure: '结构',
    view: '查看详情',
    badgeNew: '新建',
    badgeNearlyNew: '准新',
    annualIncome: '预计年租金',
    note: '※ 表面收益率=预计年收入÷销售价格，未扣除各项费用，不构成租金收入保证。',
    simulator: '每个物业页面均提供收益模拟计算功能',
    cta: '咨询·索取资料',
    ctaText: '物业详细资料及租金明细表（Rent Roll）可单独提供。',
  },
  en: {
    label: 'Investment',
    title: 'Whole-Building Investment',
    subtitle: 'Tokyo 23 wards, within 10 min of stations — new & nearly-new residences',
    lead: 'Owning an entire building is an investment in land, architecture, and time itself. KANAE quietly curates whole-building income properties selected for location and quality.',
    yield: 'Gross Yield',
    price: 'Price',
    units: 'Units',
    unitsSuffix: '',
    built: 'Built',
    structure: 'Structure',
    view: 'View Details',
    badgeNew: 'New',
    badgeNearlyNew: 'Nearly New',
    annualIncome: 'Est. Annual Rent',
    note: '* Gross yield = estimated annual income ÷ price, before expenses. Rental income is not guaranteed.',
    simulator: 'An income simulator is available on each property page',
    cta: 'Inquiry & Materials',
    ctaText: 'Detailed property documents and rent rolls are available upon request.',
  },
} as const

function yen(n: number, locale: 'ja' | 'zh' | 'en'): string {
  if (locale === 'en') return `¥${(n / 1000000).toLocaleString('en-US', { maximumFractionDigits: 0 })}M`
  return `${Math.round(n / 10000).toLocaleString('ja-JP')}万円`
}

export default function InvestPage() {
  const { locale } = useLanguage()
  const s = L[locale]

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      {/* Hero — 木漏れ日のテラス（ユーザー提供ムード素材） */}
      <section className="relative min-h-[56svh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/mood/tree-shadow-terrace.jpg')" }}
          role="img"
          aria-label="樹影の落ちる静かなテラス"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/15" />
        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-14 pt-40">
          <p className="animate-rise font-serif text-xs tracking-widest2 uppercase text-washi/60 mb-4">
            {s.label}
          </p>
          <h1 className="animate-rise font-serif text-3xl sm:text-4xl lg:text-5xl text-washi leading-snug mb-3">
            {s.title}
          </h1>
          <p className="animate-rise text-washi/70 text-sm sm:text-base tracking-wide">{s.subtitle}</p>
        </div>
      </section>

      {/* リード */}
      <section className="bg-washi texture-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
          <Reveal>
            <p className="max-w-2xl text-ink/70 leading-loose text-[15px]">{s.lead}</p>
            <p className="mt-4 text-ink/40 text-xs tracking-widest">— {s.simulator}</p>
          </Reveal>
        </div>
      </section>

      {/* 物件一覧 */}
      <section className="bg-gold-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {INVEST_PROPERTIES.map((p, idx) => (
              <Reveal key={p.slug} delay={(idx % 2) as 0 | 1}>
                <Link
                  href={`/invest/${p.slug}`}
                  className="group block border border-ink/10 bg-white/60 hover:border-ink/30 transition-colors duration-500"
                >
                  {/* 写真 */}
                  <figure className="relative overflow-hidden aspect-[5/4]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms] ease-quiet group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url('/assets/invest/${p.slug}/01.jpg')` }}
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-ink/80 text-washi text-[11px] tracking-widest px-3 py-1.5">
                        {p.badge === 'new' ? s.badgeNew : s.badgeNearlyNew}
                      </span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/70 to-transparent px-5 pt-10 pb-4 flex items-end justify-between">
                      <span className="font-serif text-washi text-xl tracking-wide">{formatOku(p.price)}</span>
                      <span className="text-washi/85 text-sm tracking-widest">
                        {s.yield} {p.grossYield.toFixed(1)}%
                      </span>
                    </div>
                  </figure>

                  {/* 情報 */}
                  <div className="p-6 lg:p-7">
                    <p className="font-serif text-[11px] tracking-widest2 uppercase text-gold-600 mb-2">
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h2 className="font-serif text-lg lg:text-xl text-ink leading-snug mb-2">
                      {p.name[locale]}
                    </h2>
                    <p className="text-ink/55 text-sm leading-relaxed mb-5">{p.catch[locale]}</p>

                    <dl className="grid grid-cols-3 gap-px bg-ink/10 border border-ink/10 text-center">
                      {[
                        [s.units, `${p.units}${s.unitsSuffix}`],
                        [s.built, p.built[locale]],
                        [s.annualIncome, yen(annualRent(p), locale)],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-white/80 px-2 py-3">
                          <dt className="text-[10px] tracking-widest text-ink/40 mb-1">{k}</dt>
                          <dd className="text-[13px] text-ink/80">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="mt-5 inline-flex items-center gap-3 text-ink/60 text-xs tracking-widest group-hover:text-ink transition-colors">
                      {s.view}
                      <span className="inline-block w-8 h-px bg-ink/30 group-hover:w-12 group-hover:bg-ink/60 transition-all duration-500" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="text-ink/40 text-xs leading-relaxed max-w-3xl">{s.note}</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/assets/mood/water-ripple.jpg')" }}
        />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-28 text-center">
          <Reveal>
            <h2 className="font-serif text-2xl lg:text-3xl text-washi mb-4">{s.cta}</h2>
            <p className="text-washi/60 text-sm mb-10">{s.ctaText}</p>
            <Link
              href="/contact"
              className="inline-block border border-washi/40 text-washi text-sm tracking-widest px-10 py-4 hover:bg-washi hover:text-ink transition-colors duration-500"
            >
              {s.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
