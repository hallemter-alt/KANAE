'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { materialCopy } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, SectionHeader, SourceNote } from '@/components/materials/MaterialsComponents';

const testDataPageCopy = {
  ja: {
    eyebrow: 'NFB BOARD / 試験データ',
    acousticsLabel: '音響性能 / JIS A 1440',
    acousticsText: 'RC 200mm 床板条件で確認された周波数別の低減量を、比較検討しやすい表形式で掲載します。',
    loadLabel: '荷重性能',
    loadText: '二重床システムの芯材候補として、音響だけでなく構造支持力も判断材料にします。',
    documentsLabel: '関連資料',
    documentsTitle: '詳細資料・試験根拠は資料ページへ',
    documentsText: '製品資料、試験データ、特許証を一箇所にまとめ、商談前の確認をしやすくしています。',
  },
  zh: {
    eyebrow: 'NFB BOARD / 測試數據',
    acousticsLabel: '聲學性能 / JIS A 1440',
    acousticsText: '以表格方式呈現 RC 200mm 樓板條件下各頻率的降低量，方便比較評估。',
    loadLabel: '承重性能',
    loadText: '作為二重床系統芯材候選時，除聲學外也可確認結構支撐力。',
    documentsLabel: '相關資料',
    documentsTitle: '詳細資料與測試依據請查看資料頁',
    documentsText: '集中整理產品資料、測試數據與專利證書，降低商談前的確認負擔。',
  },
  en: {
    eyebrow: 'NFB BOARD / Test Data',
    acousticsLabel: 'Acoustics / JIS A 1440',
    acousticsText: 'Frequency-by-frequency reduction values measured under RC 200mm slab conditions are presented in an easy-to-compare table.',
    loadLabel: 'Load Performance',
    loadText: 'For raised-floor core applications, structural support is reviewed together with acoustic performance.',
    documentsLabel: 'Related Documents',
    documentsTitle: 'See the document page for detailed materials and test evidence',
    documentsText: 'Product materials, test data and patent certificates are collected in one place to support review before consultation.',
  },
} as const;

export default function NfbBoardTestDataPage() {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];
  const page = testDataPageCopy[locale];

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={copy.testData.title} subtitle={copy.testData.subtitle} image="/assets/materials/images/hero-test-data.webp" eyebrow={page.eyebrow} />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <SectionHeader label={page.acousticsLabel} title={copy.testData.acousticsTitle} text={page.acousticsText} />
            <div className="overflow-x-auto border hairline bg-white/45">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b hairline text-left text-ink/45 tracking-[0.16em]">
                    <th className="px-5 py-4 font-normal">Freq.</th>
                    <th className="px-5 py-4 font-normal">ΔLL</th>
                    <th className="px-5 py-4 font-normal">ΔLH</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.testData.rows.map((row) => (
                    <tr key={row.freq} className="border-b hairline last:border-b-0">
                      <td className="px-5 py-4 font-serif text-ink">{row.freq}</td>
                      <td className="px-5 py-4 text-ink/68">{row.ll}</td>
                      <td className="px-5 py-4 text-ink/68">{row.lh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal>
            <SectionHeader label={page.loadLabel} title={copy.testData.loadTitle} text={page.loadText} />
            <div className="border hairline bg-white/45 p-7 md:p-9 space-y-6">
              {copy.testData.loadPoints.map((point, index) => (
                <p key={point} className="flex gap-4 text-sm leading-loose text-ink/66">
                  <span className="font-serif text-2xl text-gold-500">{String(index + 1).padStart(2, '0')}</span>
                  {point}
                </p>
              ))}
            </div>
            <SourceNote locale={locale} />
          </Reveal>
        </div>
      </MaterialsSection>

      <MaterialsSection dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="overflow-hidden border border-washi/15 bg-washi/5 aspect-[4/3] flex items-center justify-center">
            <img src="/assets/materials/images/nfb-structure.webp" alt="NFB BOARD structure" className="w-full h-full object-contain p-4" />
          </div>
          <div>
            <p className="section-label text-washi/45 mb-4">{page.documentsLabel}</p>
            <h2 className="font-serif text-3xl text-washi mb-5">{page.documentsTitle}</h2>
            <p className="text-washi/62 leading-loose mb-8">{page.documentsText}</p>
            <Link href="/materials/documents" className="inline-flex border border-washi/55 text-washi px-7 py-3 text-sm tracking-[0.22em] hover:bg-washi hover:text-ink transition-colors">{copy.common.viewDocuments}</Link>
          </div>
        </div>
      </MaterialsSection>

      <Footer />
    </main>
  );
}
