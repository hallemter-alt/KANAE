'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { LineChart, BarChart } from '@/components/charts/AnimatedCharts'
import { useLanguage } from '@/contexts/LanguageContext'
import { MARKET_DATASETS, MARKET_REPORTS } from '@/lib/marketData'

const L = {
  ja: {
    label: 'Market Insight',
    title: '市場データと行業分析',
    subtitle: '公的統計と業界調査から読む、不動産市場の潮流',
    lead: '不動産の判断には、静かな根拠が要ります。国・業界団体・研究機関が公表する一次データをもとに、市場の輪郭を描きます。数字は飾らず、そのままに。',
    chartsTitle: '主要指標の推移',
    chartsSub: '公表統計に基づく参考値（各出典を明記）',
    source: '出典',
    reportsTitle: '公的機関・業界団体の調査資料',
    reportsSub: '一次情報への静かな入口',
    catGov: '政府・公的機関',
    catAssoc: '業界団体',
    catResearch: '研究機関・調査会社',
    visit: '公式サイトへ',
    disclaimer:
      '※ 本ページのグラフは各機関の公表資料に基づく年次代表値・概数であり、正確な数値は必ず各出典の原資料をご確認ください。掲載内容は将来の市場動向を保証するものではありません。',
    ctaTitle: 'データの先にある、個別のご相談へ',
    ctaText: '市場全体の潮流と、個別物件の判断は別のものです。お客様の状況に合わせて、静かにご案内いたします。',
    ctaBtn: 'お問い合わせ',
  },
  zh: {
    label: 'Market Insight',
    title: '市場數據與行業分析',
    subtitle: '從公共統計與行業調查解讀不動產市場潮流',
    lead: '不動產的判斷需要安靜的依據。我們基於國家、行業團體、研究機構公佈的一手數據，描繪市場的輪廓。數字不加修飾，如實呈現。',
    chartsTitle: '主要指標推移',
    chartsSub: '基於公開統計的參考值（均註明出處）',
    source: '出處',
    reportsTitle: '公共機構·行業團體調查資料',
    reportsSub: '通往一手信息的安靜入口',
    catGov: '政府·公共機構',
    catAssoc: '行業團體',
    catResearch: '研究機構·調查公司',
    visit: '訪問官方網站',
    disclaimer:
      '※ 本頁圖表基於各機構公開資料的年度代表值·概數，準確數值請務必查閱各出處的原始資料。刊載內容不構成對未來市場走向的保證。',
    ctaTitle: '數據之外，是個別的諮詢',
    ctaText: '市場整體的潮流與個別物業的判斷是兩回事。我們將根據您的情況，靜靜地為您引路。',
    ctaBtn: '聯繫我們',
  },
  en: {
    label: 'Market Insight',
    title: 'Market Data & Industry Analysis',
    subtitle: 'Reading real estate currents through official statistics and industry research',
    lead: 'Sound real estate decisions require quiet evidence. Based on primary data published by the government, industry associations, and research institutes, we trace the contours of the market — numbers presented plainly, as they are.',
    chartsTitle: 'Key Indicator Trends',
    chartsSub: 'Reference values based on published statistics (sources noted)',
    source: 'Source',
    reportsTitle: 'Official & Industry Research Resources',
    reportsSub: 'A quiet gateway to primary information',
    catGov: 'Government & Public',
    catAssoc: 'Industry Associations',
    catResearch: 'Research Institutes',
    visit: 'Visit Official Site',
    disclaimer:
      '* Charts show approximate annual representative values based on published materials. Please verify exact figures with the original sources. Content does not guarantee future market trends.',
    ctaTitle: 'Beyond the Data — Individual Consultation',
    ctaText: 'Market-wide currents and individual property decisions are different things. We guide you quietly, according to your situation.',
    ctaBtn: 'Contact Us',
  },
} as const

const CATEGORIES = ['gov', 'assoc', 'research'] as const

export default function MarketPage() {
  const { locale } = useLanguage()
  const s = L[locale]

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />

      {/* Hero — 波紋（ユーザー提供ムード素材） */}
      <section className="relative min-h-[56svh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/mood/water-ripple.jpg')" }}
          role="img"
          aria-label="静かな水面に広がる波紋"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-14 pt-40">
          <p className="animate-rise font-serif text-xs tracking-widest2 uppercase text-washi/60 mb-4">{s.label}</p>
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
          </Reveal>
        </div>
      </section>

      {/* チャート群 */}
      <section className="bg-gold-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
          <Reveal>
            <p className="section-label mb-3">Data</p>
            <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-2">{s.chartsTitle}</h2>
            <p className="text-ink/50 text-sm mb-14">— {s.chartsSub}</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {MARKET_DATASETS.map((d, i) => (
              <Reveal key={d.id} delay={(i % 2) as 0 | 1}>
                <article className="border border-ink/10 bg-white/70 p-6 lg:p-8 h-full flex flex-col">
                  <h3 className="font-serif text-lg text-ink leading-snug mb-1.5">{d.title[locale]}</h3>
                  <p className="text-ink/55 text-[13px] leading-relaxed mb-6">{d.note[locale]}</p>
                  <div className="mt-auto">
                    {d.chart === 'line' ? (
                      <LineChart
                        data={d.series}
                        data2={d.series2}
                        seriesName={d.seriesName?.[locale]}
                        series2Name={d.series2Name?.[locale]}
                        unit={d.unit}
                        tightY={d.tightY}
                        height={260}
                      />
                    ) : (
                      <BarChart data={d.series} unit={d.unit} height={260} />
                    )}
                  </div>
                  <p className="mt-5 pt-4 border-t border-ink/10 text-ink/40 text-[11px] leading-relaxed">
                    {s.source}：
                    <a
                      href={d.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 decoration-ink/20 hover:text-ink/70 transition-colors"
                    >
                      {d.source[locale]}
                    </a>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="text-ink/40 text-xs leading-relaxed max-w-3xl">{s.disclaimer}</p>
          </Reveal>
        </div>
      </section>

      {/* レポートリンク集 */}
      <section className="bg-washi texture-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
          <Reveal>
            <p className="section-label mb-3">Reports</p>
            <h2 className="font-serif text-2xl lg:text-3xl text-ink mb-2">{s.reportsTitle}</h2>
            <p className="text-ink/50 text-sm mb-14">— {s.reportsSub}</p>
          </Reveal>

          {CATEGORIES.map((cat) => {
            const items = MARKET_REPORTS.filter((r) => r.category === cat)
            const catLabel = cat === 'gov' ? s.catGov : cat === 'assoc' ? s.catAssoc : s.catResearch
            return (
              <div key={cat} className="mb-14 last:mb-0">
                <Reveal>
                  <p className="font-serif text-xs tracking-widest2 uppercase text-gold-600 mb-6">{catLabel}</p>
                </Reveal>
                <div className="border-t border-ink/15">
                  {items.map((r, i) => (
                    <Reveal key={r.url} delay={(i % 3) as 0 | 1 | 2}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 border-b border-ink/10 hover:bg-gold-50/60 transition-colors duration-500 px-2 -mx-2"
                      >
                        <div className="md:col-span-3">
                          <p className="text-ink/45 text-[12px] tracking-wide">{r.org[locale]}</p>
                        </div>
                        <div className="md:col-span-8">
                          <h3 className="font-serif text-[15px] text-ink mb-1 group-hover:text-ink transition-colors">
                            {r.title[locale]}
                          </h3>
                          <p className="text-ink/50 text-[13px] leading-relaxed">{r.desc[locale]}</p>
                        </div>
                        <div className="md:col-span-1 flex md:justify-end items-start">
                          <span className="text-ink/30 group-hover:text-ink/70 text-xs tracking-widest transition-colors whitespace-nowrap">
                            →
                          </span>
                        </div>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/assets/mood/green-bath-light.jpg')" }}
        />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-28 text-center">
          <Reveal>
            <h2 className="font-serif text-2xl lg:text-3xl text-washi mb-4">{s.ctaTitle}</h2>
            <p className="text-washi/60 text-sm mb-10 max-w-xl mx-auto leading-relaxed">{s.ctaText}</p>
            <Link
              href="/contact"
              className="inline-block border border-washi/40 text-washi text-sm tracking-widest px-10 py-4 hover:bg-washi hover:text-ink transition-colors duration-500"
            >
              {s.ctaBtn}
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
