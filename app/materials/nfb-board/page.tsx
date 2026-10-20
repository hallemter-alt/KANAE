'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { materialCopy } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, MetricCard, SectionHeader, SourceNote } from '@/components/materials/MaterialsComponents';

const nfbPageCopy = {
  ja: {
    definitionLabel: '製品概要',
    definitionTitle: '軽さは、構造でつくる。',
    evidenceLabel: '性能確認',
    evidenceTitle: '日本国内試験で確認された音響・荷重性能',
    valueLabel: '採用検討ポイント',
    valueTitle: 'B2Bで確認しやすい4つの特長',
    reviewLabel: '技術確認',
    reviewTitle: '試験データと資料をもとに、具体的な採用相談へ',
    reviewText: '音響性能、集中荷重、特許資料などの根拠を確認しながら、用途・下地・施工条件に応じた検討を進めます。',
    testData: '試験データ',
  },
  zh: {
    definitionLabel: '產品概要',
    definitionTitle: '輕量，來自結構。',
    evidenceLabel: '性能確認',
    evidenceTitle: '透過日本國內測試確認聲學與承重性能',
    valueLabel: '採用評估重點',
    valueTitle: '便於 B2B 評估的四項特點',
    reviewLabel: '技術確認',
    reviewTitle: '以測試數據與資料為基礎，進入具體採用諮詢',
    reviewText: '確認聲學性能、集中荷重與專利資料等依據後，依用途、基層與施工條件推進評估。',
    testData: '測試數據',
  },
  en: {
    definitionLabel: 'Product Overview',
    definitionTitle: 'Lightness created by structure.',
    evidenceLabel: 'Performance Review',
    evidenceTitle: 'Acoustic and load performance verified in Japan',
    valueLabel: 'Adoption Points',
    valueTitle: 'Four characteristics for B2B review',
    reviewLabel: 'Technical Review',
    reviewTitle: 'Move from test data and documents to project-specific consultation',
    reviewText: 'Review acoustic performance, concentrated load data and patent materials while checking each application, substrate and installation condition.',
    testData: 'Test Data',
  },
} as const;

export default function NfbBoardPage() {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];
  const page = nfbPageCopy[locale];

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={copy.nfb.title} subtitle={copy.nfb.subtitle} image="/assets/materials/images/hero-nfb-board.webp" />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <SectionHeader label={page.definitionLabel} title={page.definitionTitle} text={copy.nfb.intro} />
            <div className="flex flex-wrap gap-3">
              {copy.nfb.applications.map((item) => (
                <span key={item} className="border hairline bg-white/45 px-4 py-2 text-xs tracking-[0.16em] text-ink/65">{item}</span>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 overflow-hidden border hairline bg-white/35 aspect-[4/3] flex items-center justify-center">
            <img src="/assets/materials/images/hero-nfb-board.webp" alt="NALEXIBLE NFB BOARD" className="w-full h-full object-contain p-4" />
          </Reveal>
        </div>
      </MaterialsSection>

      <MaterialsSection className="bg-white/55">
        <SectionHeader label={page.evidenceLabel} title={page.evidenceTitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {copy.nfb.metrics.map((metric) => (
            <MetricCard key={metric.label} value={metric.value} label={metric.label} detail={metric.detail} />
          ))}
        </div>
        <SourceNote locale={locale} />
      </MaterialsSection>

      <MaterialsSection>
        <SectionHeader label={page.valueLabel} title={page.valueTitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {copy.nfb.values.map((value, index) => (
            <Reveal key={value.title} className="border hairline bg-white/40 p-7 md:p-9">
              <p className="font-serif text-gold-500 text-sm tracking-[0.35em] mb-6">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-2xl text-ink mb-4">{value.title}</h3>
              <p className="text-sm leading-loose text-ink/62">{value.text}</p>
            </Reveal>
          ))}
        </div>
      </MaterialsSection>

      <MaterialsSection dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal className="overflow-hidden border border-washi/15 bg-washi/5 aspect-[4/3] flex items-center justify-center">
            <img src="/assets/materials/images/nfb-acoustics.webp" alt="NFB BOARD acoustic test data page" className="w-full h-full object-contain p-4" />
          </Reveal>
          <Reveal>
            <p className="section-label text-washi/45 mb-4">{page.reviewLabel}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-washi mb-6">{page.reviewTitle}</h2>
            <p className="text-washi/62 leading-loose mb-8">{page.reviewText}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/materials/nfb-board/test-data" className="border border-washi/55 text-washi px-7 py-3 text-sm tracking-[0.22em] text-center hover:bg-washi hover:text-ink transition-colors">{page.testData}</Link>
              <Link href="/contact?business=materials&product=NALEXIBLE%20NFB%20BOARD" className="border border-washi/20 text-washi/72 px-7 py-3 text-sm tracking-[0.22em] text-center hover:border-washi/55 transition-colors">{copy.common.contactCta}</Link>
            </div>
          </Reveal>
        </div>
      </MaterialsSection>

      <Footer />
    </main>
  );
}
