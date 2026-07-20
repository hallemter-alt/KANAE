'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { IMAGES } from '@/lib/images';

/**
 * ヒーロー — 固定の一枚（墨黒）
 * 清水コンクリートに差し込む縦の光。4K に高精細化した静かな建築の情景。
 * 文字は墨の暗幕の上に置き、読みやすさと余白を保つ。
 */
export default function Hero() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);

  const searchLinks = [
    { href: '/rent', label: t.hero.searchRent },
    { href: '/sale', label: t.hero.searchSale },
    { href: '/invest', label: t.hero.searchInvest },
  ];

  return (
    /* overflow は設定しない — ドロップダウンが section 外へ延びる必要があるため */
    <section className="relative min-h-[100svh] flex items-end bg-ink">
      {/* 背景コンテナ — overflow-hidden をここに閉じ込める */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slowfade"
          style={{ backgroundImage: `url('${IMAGES.heroFixed}')` }}
          role="img"
          aria-label="清水コンクリートに差し込む静かな縦の光"
        />
        {/* 墨の暗幕 — 文字の可読性のため */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
      </div>

      {/* 縦書きの社是 — 日本の趣（装飾） */}
      <div
        className="absolute top-24 right-8 md:right-16 z-10 hidden md:block animate-rise-later"
        aria-hidden="true"
      >
        <p className="vertical-text font-serif text-washi/45 text-sm md:text-base h-64">
          誠意正心　知行合一
        </p>
      </div>

      {/* コンテンツ — ドロップダウン分の pb を追加 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-36 md:pb-44 pt-40">
        <div className="max-w-3xl">
          <p className="animate-rise text-washi/60 text-xs tracking-[0.4em] uppercase mb-6 font-serif">
            Kanae Real Estate — Tokyo
          </p>

          <h1 className="animate-rise font-serif text-washi text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.5] md:leading-[1.45] mb-8">
            {t.hero.title}
            <br />
            <span className="text-washi/80">{t.hero.subtitle}</span>
          </h1>

          <p className="animate-rise-late text-washi/70 text-sm md:text-base leading-loose max-w-xl mb-12">
            {t.philosophy.mottoDescription}
          </p>

          <div className="animate-rise-late flex flex-col sm:flex-row gap-4">
            {/* 物件を探す — ドロップダウン */}
            <div
              className="relative"
              style={{ zIndex: 30 }}
              onMouseEnter={() => setIsSearchMenuOpen(true)}
              onMouseLeave={() => setIsSearchMenuOpen(false)}
            >
              <button
                className="group inline-flex items-center justify-center gap-3 border border-washi/60 text-washi px-9 py-4 text-sm tracking-[0.2em] hover:bg-washi hover:text-ink transition-all duration-700"
                aria-expanded={isSearchMenuOpen}
                aria-haspopup="true"
              >
                <span>{t.hero.cta}</span>
                <span
                  className={`inline-block h-px bg-current transition-all duration-500 ${
                    isSearchMenuOpen ? 'w-9' : 'w-6 group-hover:w-9'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* ドロップダウンメニュー — transition でスムーズ表示 */}
              <div
                className={`absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 pt-3 transition-all duration-300 ${
                  isSearchMenuOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="border border-washi/25 bg-ink/96 backdrop-blur-md shadow-xl min-w-[14rem]">
                  {searchLinks.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-6 py-4 text-[13px] text-washi/80 tracking-widest whitespace-nowrap hover:bg-washi/10 hover:text-washi transition-colors duration-200 ${
                        i < searchLinks.length - 1 ? 'border-b border-washi/12' : ''
                      }`}
                    >
                      {/* 小さなドット装飾 */}
                      <span className="w-1 h-1 rounded-full bg-washi/40 flex-shrink-0" aria-hidden="true" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

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
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-rise-later"
        aria-hidden="true"
      >
        <span className="text-washi/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-washi/50 to-transparent" />
      </div>
    </section>
  );
}
