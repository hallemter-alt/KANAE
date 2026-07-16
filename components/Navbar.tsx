'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations, type Locale } from '@/lib/translations';

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLocale } = useLanguage();

  const t = translations[locale];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // モバイルメニュー展開中は背面スクロールを固定
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const otherLinks = [
    { href: '/management', label: t.nav.management },
    { href: '/minpaku', label: t.nav.minpaku },
    { href: '/market', label: t.nav.market },
    { href: '/about', label: t.nav.about },
    { href: '/philosophy', label: t.nav.philosophy },
  ];

  const solid = isScrolled || isMobileMenuOpen;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-700 ${
        solid
          ? 'bg-washi/95 backdrop-blur-md border-b hairline'
          : 'bg-gradient-to-b from-ink/50 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* ロゴ */}
          <Link href="/" className="group flex items-baseline gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <span
              className={`font-serif text-xl md:text-2xl tracking-[0.3em] transition-colors duration-500 ${
                solid ? 'text-ink' : 'text-washi'
              }`}
            >
              KANAE
            </span>
            <span
              className={`hidden sm:inline text-[10px] tracking-[0.25em] transition-colors duration-500 ${
                solid ? 'text-gold-600' : 'text-washi/70'
              }`}
            >
              株式会社
            </span>
          </Link>

          {/* デスクトップ・ナビ */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            <Link
              href="/properties"
              className={`link-quiet text-[13px] xl:text-sm tracking-wider xl:tracking-widest whitespace-nowrap transition-colors duration-500 ${
                solid ? 'text-ink/80 hover:text-ink' : 'text-washi/90 hover:text-washi'
              }`}
            >
              {t.nav.propertyInfo}
            </Link>
            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`link-quiet text-[13px] xl:text-sm tracking-wider xl:tracking-widest whitespace-nowrap transition-colors duration-500 ${
                  solid ? 'text-ink/80 hover:text-ink' : 'text-washi/90 hover:text-washi'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 言語 & お問い合わせ */}
          <div className="hidden lg:flex items-center gap-6">
            <div className={`flex items-center gap-1 text-xs ${solid ? 'text-ink/50' : 'text-washi/60'}`}>
              {LOCALES.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="mx-1.5 opacity-40">/</span>}
                  <button
                    onClick={() => setLocale(l.code)}
                    className={`tracking-wider transition-colors duration-300 ${
                      locale === l.code
                        ? solid ? 'text-ink font-medium' : 'text-washi font-medium'
                        : 'hover:opacity-80'
                    }`}
                    aria-pressed={locale === l.code}
                  >
                    {l.label}
                  </button>
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              className={`border px-6 py-2.5 text-sm tracking-widest transition-all duration-500 ${
                solid
                  ? 'border-ink/30 text-ink hover:bg-ink hover:text-washi'
                  : 'border-washi/50 text-washi hover:bg-washi hover:text-ink'
              }`}
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`block h-px w-full transform transition-all duration-500 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''
              } ${solid ? 'bg-ink' : 'bg-washi'}`}></span>
              <span className={`block h-px w-full transition-all duration-500 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              } ${solid ? 'bg-ink' : 'bg-washi'}`}></span>
              <span className={`block h-px w-full transform transition-all duration-500 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
              } ${solid ? 'bg-ink' : 'bg-washi'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-washi border-t hairline h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-6 pt-8 pb-12 flex flex-col gap-1">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-3.5 border-b hairline font-serif text-lg text-ink tracking-widest">
              {t.nav.home}
            </Link>
            <Link
              href="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3.5 border-b hairline font-serif text-lg text-ink tracking-widest"
            >
              {t.nav.propertyInfo}
            </Link>
            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3.5 border-b hairline font-serif text-lg text-ink tracking-widest"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-8">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`flex-1 py-2.5 text-sm border transition-colors ${
                    locale === l.code
                      ? 'bg-ink text-washi border-ink'
                      : 'border-ink/20 text-ink/70'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 border border-ink text-ink text-center py-3.5 tracking-widest hover:bg-ink hover:text-washi transition-colors"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
