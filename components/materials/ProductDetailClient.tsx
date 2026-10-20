'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { materialCopy, productDetails, products, type ProductDetailSlug } from '@/lib/materialsContent';
import { MaterialsHero, MaterialsNav, MaterialsSection, SectionHeader } from '@/components/materials/MaterialsComponents';

const detailPageCopy = {
  ja: {
    eyebrow: '建材 / 製品詳細',
    sourceLabel: 'ブランド公式情報をKANAE視点で整理',
    applicationLabel: '想定用途',
    reviewLabel: '採用前に確認すること',
    nextLabel: '次のアクション',
    nextTitle: '案件条件に合わせて、資料・サンプル・見積へ',
    nextText: '用途、数量、施工条件、必要資料をお知らせください。KANAE がブランド公式情報と技術確認事項を整理し、次のステップをご案内します。',
    productList: '製品一覧へ戻る',
    officialSource: '公式ページ',
  },
  zh: {
    eyebrow: '建材 / 產品詳情',
    sourceLabel: '以 KANAE 視角整理品牌官方資訊',
    applicationLabel: '適用場景',
    reviewLabel: '採用前確認事項',
    nextLabel: '下一步',
    nextTitle: '根據案件條件，連接資料、樣品與報價',
    nextText: '請提供用途、數量、施工條件與所需資料。KANAE 將整理品牌官方資訊與技術確認事項，並引導下一步。',
    productList: '返回產品列表',
    officialSource: '官方頁面',
  },
  en: {
    eyebrow: 'Materials / Product Detail',
    sourceLabel: 'Brand official information organized through KANAE’s perspective',
    applicationLabel: 'Potential applications',
    reviewLabel: 'Items to confirm before adoption',
    nextLabel: 'Next Action',
    nextTitle: 'Connect project conditions to documents, samples and quotations',
    nextText: 'Tell us the application, quantity, installation conditions and required materials. KANAE will organize brand official information and technical review points, then guide the next step.',
    productList: 'Back to products',
    officialSource: 'Official page',
  },
} as const;

export default function ProductDetailClient({ slug }: { slug: string }) {
  const { locale } = useLanguage();
  const copy = materialCopy[locale];
  const page = detailPageCopy[locale];
  const detail = productDetails[slug as ProductDetailSlug];
  const product = products.find((item) => item.slug === `/materials/products/${slug}`);

  if (!detail || !product) {
    return (
      <main className="min-h-screen bg-washi">
        <Navbar />
        <MaterialsHero locale={locale} title="Product not found" subtitle="Please return to the product portfolio." image="/assets/materials/images/hero-products.webp" />
        <MaterialsSection>
          <Link href="/materials/products" className="inline-flex border border-ink px-7 py-3 text-sm tracking-[0.22em] text-ink hover:bg-ink hover:text-washi transition-colors">
            {page.productList}
          </Link>
        </MaterialsSection>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-washi">
      <Navbar />
      <MaterialsHero locale={locale} title={product.name} subtitle={detail.lead[locale]} image="/assets/materials/images/hero-products.webp" eyebrow={page.eyebrow} />
      <MaterialsNav locale={locale} />

      <MaterialsSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <div className="border hairline bg-white aspect-[4/3] flex items-center justify-center overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="border hairline px-3 py-1 text-[11px] tracking-[0.16em] text-ink/48 bg-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <SectionHeader label={page.sourceLabel} title={detail.title[locale]} text={product.summary[locale]} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.highlights[locale].map((item) => (
                <p key={item} className="text-sm leading-loose text-ink/58 border-l border-ink/10 pl-4">
                  {item}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </MaterialsSection>

      <MaterialsSection className="bg-white/55">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal>
            <SectionHeader label={page.applicationLabel} title={page.applicationLabel} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10 border hairline">
              {detail.applications[locale].map((item, index) => (
                <div key={item} className="bg-washi p-6">
                  <p className="font-serif text-gold-500 text-xs tracking-[0.35em] mb-5">{String(index + 1).padStart(2, '0')}</p>
                  <p className="text-sm leading-loose text-ink/68">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1}>
            <SectionHeader label={page.reviewLabel} title={page.reviewLabel} />
            <div className="border-t hairline">
              {detail.reviewPoints[locale].map((item) => (
                <div key={item} className="border-b hairline py-5 flex gap-4">
                  <span className="mt-3 block w-8 h-px bg-gold-500 shrink-0" aria-hidden="true" />
                  <p className="text-sm leading-loose text-ink/64">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </MaterialsSection>

      <MaterialsSection dark>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <SectionHeader label={page.nextLabel} title={page.nextTitle} text={page.nextText} light />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link href={`/contact?business=materials&topic=sample&product=${encodeURIComponent(product.name)}`} className="border border-washi/55 text-washi px-7 py-3 text-sm tracking-[0.22em] text-center hover:bg-washi hover:text-ink transition-colors">
              {copy.common.sampleCta}
            </Link>
            <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="border border-washi/20 text-washi/72 px-7 py-3 text-sm tracking-[0.22em] text-center hover:border-washi/55 transition-colors">
              {page.officialSource}
            </a>
            <Link href="/materials/products" className="border border-washi/20 text-washi/72 px-7 py-3 text-sm tracking-[0.22em] text-center hover:border-washi/55 transition-colors">
              {page.productList}
            </Link>
          </div>
        </div>
      </MaterialsSection>

      <Footer />
    </main>
  );
}
