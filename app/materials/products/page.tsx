'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { materialCopy, products } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, SectionHeader } from '@/components/materials/MaterialsComponents';

const anchors = ['nfb-board', 'stone-sheet', 'facade-alu', 'acoustic-panel'] as const;

export default function MaterialsProductsPage() {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={copy.products.title} subtitle={copy.products.subtitle} image="/assets/materials/images/hero-products.webp" eyebrow="Materials / Product Database" />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <SectionHeader label="Lineup" title="段階的に CMS 化する製品 DB" text="商品名、用途、性能根拠、技術資料、問い合わせ導線を同じフォーマットで管理し、第2期以降の拡張を容易にします。" />
        <div className="space-y-10">
          {products.map((product, index) => (
            <Reveal key={product.name}>
              <article id={anchors[index]} className="grid grid-cols-1 lg:grid-cols-12 gap-0 border hairline bg-white/45 scroll-mt-36">
                <div className="lg:col-span-5 min-h-[280px] bg-ink/10 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="lg:col-span-7 p-7 md:p-10 flex flex-col justify-between">
                  <div>
                    <p className="font-serif text-gold-500 text-sm tracking-[0.35em] mb-5">{String(index + 1).padStart(2, '0')}</p>
                    <h2 className="font-serif text-2xl md:text-3xl text-ink mb-5">{product.name}</h2>
                    <p className="text-ink/64 leading-loose mb-6">{product.summary[locale]}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {product.tags.map((tag) => (
                        <span key={tag} className="border hairline px-3 py-1 text-[11px] tracking-[0.16em] text-ink/48 bg-washi/70">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={product.slug} className="border border-ink px-6 py-3 text-sm tracking-[0.22em] text-center text-ink hover:bg-ink hover:text-washi transition-colors">{copy.common.learnMore}</Link>
                    <Link href={`/materials/contact?product=${encodeURIComponent(product.name)}`} className="border border-ink/20 px-6 py-3 text-sm tracking-[0.22em] text-center text-ink/65 hover:border-ink transition-colors">{copy.common.sampleCta}</Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </MaterialsSection>

      <MaterialsSection dark>
        <SectionHeader label="Roadmap" title="MVP 後の拡張イメージ" text="会員・EC・即時見積は第一期では後回しにし、まずは Product 理解 → 技術信頼 → 資料請求 → サンプル → 営業商談を成立させます。" light />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {['Product DB', 'Technical Library', 'CRM Pipeline'].map((item, index) => (
            <div key={item} className="border border-washi/15 p-7">
              <p className="font-serif text-washi/35 text-sm tracking-[0.35em] mb-6">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-xl text-washi mb-4">{item}</h3>
              <p className="text-sm leading-loose text-washi/56">構造化データとして扱い、資料・問い合わせ・商談履歴につなげる設計を前提にします。</p>
            </div>
          ))}
        </div>
      </MaterialsSection>
      <Footer />
    </main>
  );
}
