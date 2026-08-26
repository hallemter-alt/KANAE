'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { materialCopy } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, SectionHeader, SourceNote } from '@/components/materials/MaterialsComponents';

export default function NfbBoardTestDataPage() {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={copy.testData.title} subtitle={copy.testData.subtitle} image="/assets/materials/images/hero-test-data.webp" eyebrow="NFB BOARD / Test Data" />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <SectionHeader label="Acoustics / JIS A 1440" title={copy.testData.acousticsTitle} text="RC 200mm 床板条件で確認された周波数別の低減量を、比較検討しやすい表形式で掲載します。" />
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
            <SectionHeader label="Load" title={copy.testData.loadTitle} text="二重床システムの芯材候補として、音響だけでなく構造支撑力も判断材料にします。" />
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
          <img src="/assets/materials/images/nfb-structure.webp" alt="NFB BOARD structure" className="w-full border border-washi/15" />
          <div>
            <p className="section-label text-washi/45 mb-4">Documents</p>
            <h2 className="font-serif text-3xl text-washi mb-5">詳細資料・試験根拠は資料ページへ</h2>
            <p className="text-washi/62 leading-loose mb-8">営業資料、試験データ、特許証を一箇所に集約し、商談前の確認負荷を下げます。</p>
            <Link href="/materials/documents" className="inline-flex border border-washi/55 text-washi px-7 py-3 text-sm tracking-[0.22em] hover:bg-washi hover:text-ink transition-colors">{copy.common.viewDocuments}</Link>
          </div>
        </div>
      </MaterialsSection>

      <Footer />
    </main>
  );
}
