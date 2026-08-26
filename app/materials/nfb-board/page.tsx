'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { materialCopy } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, MetricCard, SectionHeader, SourceNote } from '@/components/materials/MaterialsComponents';

export default function NfbBoardPage() {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={copy.nfb.title} subtitle={copy.nfb.subtitle} image="/assets/materials/images/hero-nfb-board.webp" />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <SectionHeader label="Product Definition" title="軽さは、構造でつくる。" text={copy.nfb.intro} />
            <div className="flex flex-wrap gap-3">
              {copy.nfb.applications.map((item) => (
                <span key={item} className="border hairline bg-white/45 px-4 py-2 text-xs tracking-[0.16em] text-ink/65">{item}</span>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 overflow-hidden border hairline bg-white/35">
            <img src="/assets/materials/images/nfb-cover.webp" alt="NALEXIBLE NFB BOARD product dossier cover" className="w-full object-cover" />
          </Reveal>
        </div>
      </MaterialsSection>

      <MaterialsSection className="bg-white/55">
        <SectionHeader label="Evidence Snapshot" title="日本国内試験で示す、音と荷重の基礎性能" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {copy.nfb.metrics.map((metric) => (
            <MetricCard key={metric.label} value={metric.value} label={metric.label} detail={metric.detail} />
          ))}
        </div>
        <SourceNote locale={locale} />
      </MaterialsSection>

      <MaterialsSection>
        <SectionHeader label="Value Proposition" title="B2B の検討ポイントを4つに整理" />
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
          <Reveal>
            <img src="/assets/materials/images/nfb-acoustics.webp" alt="NFB BOARD acoustic test data page" className="w-full border border-washi/15" />
          </Reveal>
          <Reveal>
            <p className="section-label text-washi/45 mb-4">Technical Review</p>
            <h2 className="font-serif text-3xl md:text-4xl text-washi mb-6">試験データを先に見せ、営業商談へつなげる</h2>
            <p className="text-washi/62 leading-loose mb-8">企画書・ロードマップに沿って、性能訴求は抽象的なコピーではなく、JIS A 1440、集中荷重、特許資料を入口に構成します。</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/materials/nfb-board/test-data" className="border border-washi/55 text-washi px-7 py-3 text-sm tracking-[0.22em] text-center hover:bg-washi hover:text-ink transition-colors">Test Data</Link>
              <Link href="/materials/contact" className="border border-washi/20 text-washi/72 px-7 py-3 text-sm tracking-[0.22em] text-center hover:border-washi/55 transition-colors">{copy.common.contactCta}</Link>
            </div>
          </Reveal>
        </div>
      </MaterialsSection>

      <Footer />
    </main>
  );
}
