'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { materialCopy, materialLinks, type MaterialsLocale } from '@/lib/materialsContent';

export function MaterialsHero({
  locale,
  title,
  subtitle,
  image = '/assets/materials/images/hero-materials-overview.webp',
  eyebrow,
}: {
  locale: MaterialsLocale;
  title: string;
  subtitle: string;
  image?: string;
  eyebrow?: string;
}) {
  const copy = materialCopy[locale];

  return (
    <section className="relative min-h-[52svh] md:min-h-[60svh] flex items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center animate-slowfade" style={{ backgroundImage: `url('${image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/58 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-14 md:pb-20 pt-36">
        <p className="animate-rise font-serif text-washi/50 text-xs tracking-[0.4em] uppercase mb-5">
          {eyebrow ?? copy.common.label}
        </p>
        <h1 className="animate-rise font-serif text-washi text-3xl md:text-4xl lg:text-5xl leading-[1.4] mb-5 max-w-3xl">
          {title}
        </h1>
        <p className="animate-rise-late text-washi/65 text-sm md:text-base leading-loose max-w-2xl">
          {subtitle}
        </p>
        <div className="animate-rise-later flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/contact?business=materials" className="inline-flex justify-center border border-washi/60 text-washi px-6 py-3 text-xs tracking-[0.22em] hover:bg-washi hover:text-ink transition-colors duration-500">
            {copy.common.contactCta}
          </Link>
          <Link href="/materials/documents" className="inline-flex justify-center border border-washi/20 text-washi/72 px-6 py-3 text-xs tracking-[0.22em] hover:border-washi/60 hover:text-washi transition-colors duration-500">
            {copy.common.viewDocuments}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function MaterialsNav({ locale }: { locale: MaterialsLocale }) {
  const pathname = usePathname();
  const copy = materialCopy[locale];

  return (
    <div className="sticky top-16 md:top-20 z-40 bg-washi/92 backdrop-blur-md border-b hairline overflow-x-auto">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex gap-6 min-w-max">
        {materialLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`py-4 text-xs md:text-[13px] tracking-[0.22em] transition-colors border-b ${
                active ? 'border-ink text-ink' : 'border-transparent text-ink/50 hover:text-ink'
              }`}
            >
              {copy.nav[link.key]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function MaterialsSection({
  children,
  className = '',
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section className={`${dark ? 'bg-ink text-washi' : 'bg-washi text-ink'} py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">{children}</div>
    </section>
  );
}

export function SectionHeader({ label, title, text, light = false }: { label: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl mb-12 md:mb-16">
      <p className={`section-label mb-4 ${light ? 'text-washi/45' : ''}`}>{label}</p>
      <h2 className={`font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.45] ${light ? 'text-washi' : 'text-ink'}`}>{title}</h2>
      {text && <p className={`mt-5 text-sm md:text-base leading-loose ${light ? 'text-washi/62' : 'text-ink/62'}`}>{text}</p>}
    </div>
  );
}

export function MetricCard({ value, label, detail }: { value: string; label: string; detail?: string }) {
  return (
    <div className="border hairline bg-white/40 p-6 md:p-8">
      <p className="font-serif text-3xl md:text-4xl text-ink mb-3 tracking-wider">{value}</p>
      <p className="text-sm tracking-[0.16em] text-ink/75 mb-2">{label}</p>
      {detail && <p className="text-xs leading-relaxed text-ink/45">{detail}</p>}
    </div>
  );
}

export function SourceNote({ locale }: { locale: MaterialsLocale }) {
  return (
    <p className="mt-10 border-l border-ink/20 pl-5 text-xs leading-loose text-ink/45">
      {materialCopy[locale].common.sourceNote}
    </p>
  );
}
