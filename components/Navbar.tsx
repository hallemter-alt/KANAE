'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, t, setLocale } = useLanguage();

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="relative">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-gold-600 bg-clip-text text-transparent">
                KANAE
              </div>
              <div className="text-xs text-gray-600 tracking-wider">
                株式会社
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}`} className="nav-link text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.home}
            </Link>
            <Link href={`/${locale}/rent`} className="nav-link text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.rent}
            </Link>
            <Link href={`/${locale}/sale`} className="nav-link text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.sale}
            </Link>
            <Link href={`/${locale}/management`} className="nav-link text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.management}
            </Link>
            <Link href={`/${locale}/minpaku`} className="nav-link text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.minpaku}
            </Link>
            <Link href={`/${locale}/about`} className="nav-link text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.about}
            </Link>
            <Link href={`/${locale}/philosophy`} className="nav-link text-gray-700 hover:text-primary-600 transition-colors">
              {t.nav.philosophy}
            </Link>
          </div>

          {/* Language Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r pr-4">
              <button 
                onClick={() => setLocale('ja')}
                className={`px-2 py-1 text-sm rounded transition-colors ${
                  locale === 'ja' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                日本語
              </button>
              <button 
                onClick={() => setLocale('zh')}
                className={`px-2 py-1 text-sm rounded transition-colors ${
                  locale === 'zh' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                中文
              </button>
              <button 
                onClick={() => setLocale('en')}
                className={`px-2 py-1 text-sm rounded transition-colors ${
                  locale === 'en' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                EN
              </button>
            </div>
            <Link 
              href={`/${locale}/contact`}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2.5 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-gray-700 transform transition-all ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`block h-0.5 w-full bg-gray-700 transition-all ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block h-0.5 w-full bg-gray-700 transform transition-all ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href={`/${locale}`} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              {t.nav.home}
            </Link>
            <Link href={`/${locale}/rent`} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              {t.nav.rent}
            </Link>
            <Link href={`/${locale}/sale`} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              {t.nav.sale}
            </Link>
            <Link href={`/${locale}/management`} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              {t.nav.management}
            </Link>
            <Link href={`/${locale}/minpaku`} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              {t.nav.minpaku}
            </Link>
            <Link href={`/${locale}/about`} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              {t.nav.about}
            </Link>
            <Link href={`/${locale}/philosophy`} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              {t.nav.philosophy}
            </Link>
            <div className="flex space-x-2 px-4 pt-2">
              <button 
                onClick={() => setLocale('ja')}
                className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
                  locale === 'ja' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                日本語
              </button>
              <button 
                onClick={() => setLocale('zh')}
                className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
                  locale === 'zh' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                中文
              </button>
              <button 
                onClick={() => setLocale('en')}
                className={`flex-1 px-3 py-2 text-sm rounded transition-colors ${
                  locale === 'en' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                EN
              </button>
            </div>
            <Link 
              href={`/${locale}/contact`}
              className="block mx-4 mt-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center px-6 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
