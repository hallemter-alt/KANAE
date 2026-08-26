'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { documents, materialCopy } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, SectionHeader } from '@/components/materials/MaterialsComponents';

const documentsPageCopy = {
  ja: {
    eyebrow: '建材 / 資料',
    libraryLabel: '資料ライブラリ',
    libraryTitle: '製品資料・試験資料・特許証を一元管理',
    libraryText: '営業、設計、技術審査で確認される資料を一覧化し、採用検討に必要な根拠へアクセスしやすくしています。',
    moreLabel: '追加資料',
    moreTitle: 'CAD・詳細仕様・サンプル資料は個別相談へ',
    moreText: '未公開資料や用途別仕様は、案件情報を確認したうえで共有します。',
  },
  zh: {
    eyebrow: '建材 / 資料',
    libraryLabel: '資料庫',
    libraryTitle: '集中管理產品資料、測試資料與專利證書',
    libraryText: '整理營業、設計與技術審查時會確認的資料，方便取得採用評估所需依據。',
    moreLabel: '追加資料',
    moreTitle: 'CAD、詳細規格與樣品資料請個別諮詢',
    moreText: '未公開資料與用途別規格，將在確認案件資訊後提供。',
  },
  en: {
    eyebrow: 'Materials / Documents',
    libraryLabel: 'Document Library',
    libraryTitle: 'Product dossiers, test materials and patent certificates in one place',
    libraryText: 'Materials commonly checked by sales, design and technical review teams are organized for easier adoption evaluation.',
    moreLabel: 'Additional Materials',
    moreTitle: 'Contact us for CAD, detailed specifications and sample materials',
    moreText: 'Non-public materials and application-specific specifications can be shared after project details are confirmed.',
  },
} as const;

export default function MaterialsDocumentsPage() {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];
  const page = documentsPageCopy[locale];

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={copy.documents.title} subtitle={copy.documents.subtitle} image="/assets/materials/images/hero-documents.webp" eyebrow={page.eyebrow} />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <SectionHeader label={page.libraryLabel} title={page.libraryTitle} text={page.libraryText} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Reveal key={doc.href} className="border hairline bg-white/45 p-7 hover:bg-white/75 transition-colors">
              <p className="text-[11px] tracking-[0.26em] text-gold-600 mb-5 uppercase">{doc.type}</p>
              <h2 className="font-serif text-xl text-ink mb-4">{doc.title}</h2>
              <p className="text-sm leading-loose text-ink/55 mb-8">{doc.note}</p>
              <a href={doc.href} target="_blank" rel="noopener noreferrer" className="inline-flex border border-ink/25 px-5 py-2.5 text-xs tracking-[0.22em] text-ink/70 hover:bg-ink hover:text-washi transition-colors">
                {copy.common.download}
              </a>
            </Reveal>
          ))}
        </div>
      </MaterialsSection>

      <MaterialsSection dark>
        <div className="flex flex-col md:flex-row justify-between gap-8 md:items-center">
          <div>
            <p className="section-label text-washi/45 mb-4">{page.moreLabel}</p>
            <h2 className="font-serif text-3xl text-washi mb-3">{page.moreTitle}</h2>
            <p className="text-washi/58 leading-loose">{page.moreText}</p>
          </div>
          <Link href="/materials/contact" className="shrink-0 border border-washi/55 text-washi px-8 py-3 text-sm tracking-[0.25em] hover:bg-washi hover:text-ink transition-colors">{copy.common.contactCta}</Link>
        </div>
      </MaterialsSection>
      <Footer />
    </main>
  );
}
