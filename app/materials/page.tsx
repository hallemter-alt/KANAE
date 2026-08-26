'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { documents, materialCopy, products } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, SectionHeader } from '@/components/materials/MaterialsComponents';

const overviewCopy = {
  ja: {
    summaryLabel: '事業概要',
    summaryTitle: '海外建材技術を、日本の現場で検討できる形へ',
    focusLabel: '重点領域',
    processLabel: '事業プロセス',
    processTitle: '発掘 → 日本仕様化 → 技術確認 → 採用相談',
    processText: '海外メーカーの技術を、設計者・施工者・販売先が比較検討しやすい情報へ整理します。',
    flagshipLabel: '旗艦商品',
    flagshipTitle: '第一弾の中心製品：NALEXIBLE NFB BOARD',
    productLabel: '製品ラインナップ',
    documentsLabel: '資料',
    nextLabel: '次のアクション',
    nextTitle: '資料請求・サンプル・共同開発へ',
    testData: '試験データ',
  },
  zh: {
    summaryLabel: '事業概要',
    summaryTitle: '把海外建材技術轉化為日本現場可評估的資訊',
    focusLabel: '重點領域',
    processLabel: '事業流程',
    processTitle: '發掘 → 日本規格化 → 技術確認 → 採用諮詢',
    processText: '將海外製造商的技術整理為設計、施工與採購方容易比較與評估的資訊。',
    flagshipLabel: '旗艦產品',
    flagshipTitle: '第一階段核心產品：NALEXIBLE NFB BOARD',
    productLabel: '產品陣容',
    documentsLabel: '資料',
    nextLabel: '下一步',
    nextTitle: '索取資料、樣品與共同開發諮詢',
    testData: '測試數據',
  },
  en: {
    summaryLabel: 'Business Overview',
    summaryTitle: 'Turning global material technology into Japan-ready information',
    focusLabel: 'Focus Areas',
    processLabel: 'Business Process',
    processTitle: 'Source → Localize → Verify → Consult',
    processText: 'We organize overseas manufacturers’ technologies into information that designers, builders and buyers can evaluate.',
    flagshipLabel: 'Flagship Product',
    flagshipTitle: 'First flagship product: NALEXIBLE NFB BOARD',
    productLabel: 'Product Lineup',
    documentsLabel: 'Documents',
    nextLabel: 'Next Action',
    nextTitle: 'Documents, samples and co-development consultation',
    testData: 'Test Data',
  },
} as const;

export default function MaterialsPage() {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];
  const page = overviewCopy[locale];

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={copy.home.title} subtitle={copy.home.subtitle} image="/assets/materials/images/hero-materials-overview.webp" />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7">
            <SectionHeader label={page.summaryLabel} title={page.summaryTitle} text={copy.home.lead} />
          </Reveal>
          <Reveal className="lg:col-span-5 border hairline bg-white/45 p-7 md:p-9">
            <p className="section-label mb-6">{page.focusLabel}</p>
            <div className="grid grid-cols-3 gap-4">
              {copy.home.kpis.map((item) => (
                <div key={item.label}>
                  <p className="font-serif text-3xl text-ink mb-2">{item.value}</p>
                  <p className="text-[11px] leading-relaxed tracking-[0.14em] text-ink/50 uppercase">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t hairline space-y-4">
              {copy.home.phases.map((phase, index) => (
                <p key={phase} className="flex gap-4 text-sm text-ink/62 leading-loose">
                  <span className="font-serif text-gold-500">{String(index + 1).padStart(2, '0')}</span>
                  {phase}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </MaterialsSection>

      <MaterialsSection dark>
        <SectionHeader label={page.processLabel} title={page.processTitle} text={page.processText} light />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l hairline-light">
          {copy.home.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} className="border-b border-r hairline-light p-7 md:p-8">
              <p className="font-serif text-washi/35 text-sm tracking-[0.35em] mb-8">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-xl text-washi mb-4">{pillar.title}</h3>
              <p className="text-sm leading-loose text-washi/58">{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </MaterialsSection>

      <MaterialsSection>
        <SectionHeader label={page.flagshipLabel} title={page.flagshipTitle} text={copy.nfb.subtitle} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal className="overflow-hidden border hairline bg-white/30">
            <img src="/assets/materials/images/nfb-overview.webp" alt="NFB BOARD overview" className="w-full h-full object-contain p-4" />
          </Reveal>
          <Reveal className="space-y-7">
            <p className="text-ink/66 leading-loose">{copy.nfb.intro}</p>
            <div className="grid grid-cols-2 gap-4">
              {copy.nfb.metrics.map((metric) => (
                <div key={metric.label} className="border hairline bg-white/45 p-5">
                  <p className="font-serif text-2xl text-ink mb-2">{metric.value}</p>
                  <p className="text-xs tracking-[0.16em] text-ink/60">{metric.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/materials/nfb-board" className="border border-ink text-ink px-6 py-3 text-sm tracking-[0.22em] text-center hover:bg-ink hover:text-washi transition-colors">{copy.common.learnMore}</Link>
              <Link href="/materials/nfb-board/test-data" className="border border-ink/20 text-ink/70 px-6 py-3 text-sm tracking-[0.22em] text-center hover:border-ink transition-colors">{page.testData}</Link>
            </div>
          </Reveal>
        </div>
      </MaterialsSection>

      <MaterialsSection className="bg-white/55">
        <SectionHeader label={page.productLabel} title={copy.products.title} text={copy.products.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Reveal key={product.name} className="group border hairline bg-washi overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <p className="font-serif text-lg mb-3 text-ink">{product.name}</p>
                <p className="text-sm leading-loose text-ink/58 mb-5">{product.summary[locale]}</p>
                <Link href={product.slug} className="text-xs tracking-[0.24em] text-ink/70 hover:text-ink">{copy.common.learnMore} →</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </MaterialsSection>

      <MaterialsSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <SectionHeader label={page.documentsLabel} title={copy.documents.title} text={copy.documents.subtitle} />
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            {documents.slice(0, 4).map((doc) => (
              <a key={doc.href} href={doc.href} target="_blank" rel="noopener noreferrer" className="border hairline bg-white/45 p-6 hover:bg-white/75 transition-colors">
                <p className="text-[11px] tracking-[0.26em] text-gold-600 mb-4 uppercase">{doc.type}</p>
                <p className="font-serif text-lg text-ink mb-3">{doc.title}</p>
                <p className="text-xs leading-relaxed text-ink/50">{doc.note}</p>
              </a>
            ))}
          </div>
        </div>
      </MaterialsSection>

      <section className="bg-ink text-washi py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
          <div>
            <p className="section-label text-washi/45 mb-3">{page.nextLabel}</p>
            <h2 className="font-serif text-2xl md:text-3xl">{page.nextTitle}</h2>
          </div>
          <Link href="/materials/contact" className="border border-washi/55 px-8 py-3 text-sm tracking-[0.25em] hover:bg-washi hover:text-ink transition-colors">
            {copy.common.contactCta}
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
