'use client';

import { IMAGES, type ImageKey } from '@/lib/images';

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  image?: ImageKey;
  alt?: string;
}

/**
 * サブページ共通ヒーロー — 写真と静かな暗幕、左寄せの明朝見出し
 */
export default function PageHero({ label, title, subtitle, image = 'concreteShadow', alt = '' }: PageHeroProps) {
  return (
    <section className="relative min-h-[52svh] md:min-h-[60svh] flex items-end overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden={alt === ''}>
        <div
          className="absolute inset-0 bg-cover bg-center animate-slowfade"
          style={{ backgroundImage: `url('${IMAGES[image]}')` }}
          role="img"
          aria-label={alt}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-14 md:pb-20 pt-36">
        {label && (
          <p className="animate-rise font-serif text-washi/50 text-xs tracking-[0.4em] uppercase mb-5">
            {label}
          </p>
        )}
        <h1 className="animate-rise font-serif text-washi text-3xl md:text-4xl lg:text-5xl leading-[1.4] mb-5 max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-rise-late text-washi/65 text-sm md:text-base leading-loose max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
