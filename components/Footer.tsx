'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <footer className="bg-ink text-washi">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-washi/10">
          {/* 社名・理念 */}
          <div className="md:col-span-5">
            <p className="font-serif text-2xl tracking-[0.3em] mb-2">KANAE</p>
            <p className="text-washi/50 text-xs tracking-widest mb-6">{t.footer.companyName}</p>
            <p className="text-washi/60 text-sm leading-loose max-w-sm mb-8">
              {t.footer.slogan}
            </p>
            <p className="text-washi/35 text-xs leading-relaxed">
              {t.footer.license}
            </p>
          </div>

          {/* 事業内容 */}
          <div className="md:col-span-2">
            <p className="text-washi/40 text-xs tracking-[0.25em] uppercase mb-6">{t.footer.businessContent}</p>
            <ul className="space-y-3.5">
              {[
                { href: '/rent', label: t.footer.rentalBusiness },
                { href: '/sale', label: t.footer.salesBusiness },
                { href: '/invest', label: t.nav.properties },
                { href: '/management', label: t.footer.managementBusiness },
                { href: '/minpaku', label: t.footer.minpakuBusiness },
                { href: '/market', label: t.nav.market },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-quiet text-washi/65 hover:text-washi text-sm transition-colors duration-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報 */}
          <div className="md:col-span-2">
            <p className="text-washi/40 text-xs tracking-[0.25em] uppercase mb-6">{t.footer.companyInfo}</p>
            <ul className="space-y-3.5">
              {[
                { href: '/about', label: t.footer.aboutUs },
                { href: '/philosophy', label: t.footer.philosophy },
                { href: '/contact', label: t.footer.contact },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-quiet text-washi/65 hover:text-washi text-sm transition-colors duration-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 所在地・連絡先 */}
          <div className="md:col-span-3">
            <p className="text-washi/40 text-xs tracking-[0.25em] uppercase mb-6">{t.footer.contactInfo}</p>
            <address className="not-italic text-washi/65 text-sm leading-loose mb-5">
              〒171-0033<br />
              東京都豊島区高田3-16-4<br />
              Golje Bld. 6F
              <span className="block text-washi/40 text-xs mt-2">
                東京メトロ東西線 高田馬場駅 7番出口より徒歩5分
              </span>
            </address>
            <p className="space-y-2">
              <a href="tel:03-6914-3633" className="block text-washi/65 hover:text-washi text-sm transition-colors duration-500">
                03-6914-3633
              </a>
              <a href="mailto:info@kanae-tokyo.com" className="block text-washi/65 hover:text-washi text-sm transition-colors duration-500 break-all">
                info@kanae-tokyo.com
              </a>
            </p>
          </div>
        </div>

        {/* ボトム */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-washi/35 text-xs tracking-wider">
            &copy; {currentYear} {t.footer.companyName}. {t.footer.allRightsReserved}
          </p>
          <p className="text-washi/25 text-[10px] tracking-[0.3em] uppercase font-serif">
            誠意正心 知行合一
          </p>
        </div>
      </div>
    </footer>
  );
}
