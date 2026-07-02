'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';

export default function Hero() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink">
      {/* 背景 — 光が差し込む建築 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slowfade"
          style={{ backgroundImage: `url('${IMAGES.windowLight}')` }}
          role="img"
          aria-label="窓から差し込む静かな光"
        />
        {/* 静かな暗幕 — 文字の可読性のため */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
      </div>

      {/* 縦書きの社是 — 日本の趣（装飾） */}
      <div className="absolute top-24 right-8 md:right-16 z-10 hidden md:block animate-rise-later" aria-hidden="true">
        <p className="vertical-text font-serif text-washi/50 text-sm md:text-base h-64">
          誠意正心　知行合一
        </p>
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24 md:pb-32 pt-40">
        <div className="max-w-3xl">
          <p className="animate-rise text-washi/60 text-xs tracking-[0.4em] uppercase mb-6 font-serif">
            Kanae Real Estate — Tokyo
          </p>

          <h1 className="animate-rise font-serif text-washi text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.5] md:leading-[1.45] mb-8">
            {t.hero.title}
            <br />
            <span className="text-gold-300">{t.hero.subtitle}</span>
          </h1>

          <p className="animate-rise-late text-washi/70 text-sm md:text-base leading-loose max-w-xl mb-12">
            {t.philosophy.mottoDescription}
          </p>

          <div className="animate-rise-late flex flex-col sm:flex-row gap-4">
            <Link
              href="/rent"
              className="group inline-flex items-center justify-center gap-3 border border-washi/60 text-washi px-9 py-4 text-sm tracking-[0.2em] hover:bg-washi hover:text-ink transition-all duration-700"
            >
              <span>{t.hero.cta}</span>
              <span className="inline-block w-6 h-px bg-current group-hover:w-9 transition-all duration-500" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-3 text-washi/80 px-4 py-4 text-sm tracking-[0.2em] hover:text-washi transition-colors duration-500"
            >
              <span className="link-quiet">{t.hero.learnMore}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* スクロール表示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-rise-later" aria-hidden="true">
        <span className="text-washi/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-washi/50 to-transparent" />
      </div>
    </section>
  );
}
