'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { materialCopy, products } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, SectionHeader } from '@/components/materials/MaterialsComponents';

const anchors = ['nfb-board', 'stone-sheet', 'facade-alu', 'acoustic-panel'] as const;

const productsPageCopy = {
  ja: {
    eyebrow: '建材 / 製品群',
    lineLabel: '製品ラインナップ',
    lineTitle: '採用検討しやすい製品情報',
    lineText: '用途、特徴、関連資料、相談導線を揃え、設計・施工・販売の初期検討に必要な情報を確認しやすくします。',
    sourceLabel: 'ブランド公式情報を整理',
    officialSource: '公式ページ',
    internalDetail: '詳細を見る',
    supportLabel: '取扱方針',
    supportTitle: '技術確認からサンプル相談まで',
    supportText: '製品ごとに用途・施工条件・必要資料を確認し、案件に合わせた次のステップをご案内します。',
    supportItems: [
      { title: '製品理解', text: '用途、構成、施工条件を確認します。' },
      { title: '技術資料', text: '試験資料や認証情報を整理します。' },
      { title: '相談導線', text: 'サンプル、見積、共同開発へ接続します。' },
    ],
  },
  zh: {
    eyebrow: '建材 / 產品群',
    lineLabel: '產品陣容',
    lineTitle: '便於採用評估的產品資訊',
    lineText: '統一整理用途、特點、相關資料與諮詢入口，方便設計、施工與銷售初期評估。',
    sourceLabel: '整理自品牌官方資訊',
    officialSource: '官方頁面',
    internalDetail: '查看詳情',
    supportLabel: '服務方式',
    supportTitle: '從技術確認到樣品諮詢',
    supportText: '依產品確認用途、施工條件與所需資料，並根據案件引導下一步。',
    supportItems: [
      { title: '產品理解', text: '確認用途、構成與施工條件。' },
      { title: '技術資料', text: '整理測試資料與認證資訊。' },
      { title: '諮詢入口', text: '連接樣品、報價與共同開發。' },
    ],
  },
  en: {
    eyebrow: 'Materials / Products',
    lineLabel: 'Product Lineup',
    lineTitle: 'Product information for adoption review',
    lineText: 'Applications, characteristics, related documents and consultation paths are presented consistently for early design, construction and sales review.',
    sourceLabel: 'Distilled from brand official information',
    officialSource: 'Official page',
    internalDetail: 'View details',
    supportLabel: 'Support Policy',
    supportTitle: 'From technical review to sample consultation',
    supportText: 'We confirm applications, installation conditions and required documents by product, then guide the next step for each project.',
    supportItems: [
      { title: 'Product understanding', text: 'Confirm use cases, composition and installation conditions.' },
      { title: 'Technical documents', text: 'Organize test materials and certification information.' },
      { title: 'Consultation path', text: 'Connect samples, quotations and co-development.' },
    ],
  },
} as const;

export default function MaterialsProductsPage() {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];
  const page = productsPageCopy[locale];

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={copy.products.title} subtitle={copy.products.subtitle} image="/assets/materials/images/hero-products.webp" eyebrow={page.eyebrow} />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <SectionHeader label={page.lineLabel} title={page.lineTitle} text={page.lineText} />
        <div className="space-y-10">
          {products.map((product, index) => (
            <Reveal key={product.name}>
              <article id={anchors[index]} className="grid grid-cols-1 lg:grid-cols-12 gap-0 border hairline bg-white/45 scroll-mt-36">
                <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:min-h-[320px] bg-white overflow-hidden flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6" />
                </div>
                <div className="lg:col-span-7 p-7 md:p-10 flex flex-col justify-between">
                  <div>
                    <p className="font-serif text-gold-500 text-sm tracking-[0.35em] mb-5">{String(index + 1).padStart(2, '0')}</p>
                    <h2 className="font-serif text-2xl md:text-3xl text-ink mb-5">{product.name}</h2>
                    <p className="text-ink/64 leading-loose mb-6">{product.summary[locale]}</p>
                    <div className="flex flex-wrap gap-2 mb-7">
                      {product.tags.map((tag) => (
                        <span key={tag} className="border hairline px-3 py-1 text-[11px] tracking-[0.16em] text-ink/48 bg-washi/70">{tag}</span>
                      ))}
                    </div>
                    <div className="border-t hairline pt-6 mb-8">
                      <p className="section-label mb-4 text-ink/38">{page.sourceLabel}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {product.highlights[locale].map((item) => (
                          <p key={item} className="text-xs leading-loose text-ink/56 border-l border-ink/10 pl-4">{item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={product.slug} className="border border-ink px-6 py-3 text-sm tracking-[0.22em] text-center text-ink hover:bg-ink hover:text-washi transition-colors">{index === 0 ? page.internalDetail : copy.common.learnMore}</Link>
                    <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="border border-ink/20 px-6 py-3 text-sm tracking-[0.22em] text-center text-ink/65 hover:border-ink transition-colors">{page.officialSource}</a>
                    <Link href={`/materials/contact?product=${encodeURIComponent(product.name)}`} className="border border-ink/20 px-6 py-3 text-sm tracking-[0.22em] text-center text-ink/65 hover:border-ink transition-colors">{copy.common.sampleCta}</Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </MaterialsSection>

      <MaterialsSection dark>
        <SectionHeader label={page.supportLabel} title={page.supportTitle} text={page.supportText} light />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {page.supportItems.map((item, index) => (
            <div key={item.title} className="border border-washi/15 p-7">
              <p className="font-serif text-washi/35 text-sm tracking-[0.35em] mb-6">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-xl text-washi mb-4">{item.title}</h3>
              <p className="text-sm leading-loose text-washi/56">{item.text}</p>
            </div>
          ))}
        </div>
      </MaterialsSection>
      <Footer />
    </main>
  );
}
