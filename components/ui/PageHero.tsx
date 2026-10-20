'use client';

import type { ReactNode } from 'react';
import { IMAGES, type ImageKey } from '@/lib/images';

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  /** 背景写真 — レジストリのキーか、任意の画像パス（/assets/...） */
  image?: ImageKey | string;
  alt?: string;
  /**
   * md — 標準（一覧・概要ページ）: 52svh → 60svh
   * lg — 詳細ページなど情報量の多いヒーロー: 60svh → 68svh
   */
  size?: 'md' | 'lg';
  /** 左からの暗幕を追加（文字の可読性が必要な写真向け） */
  sideShade?: boolean;
  /** 見出しの下に追加する要素（CTA・価格・パンくず等） */
  children?: ReactNode;
}

/**
 * サブページ共通ヒーロー — 写真と静かな暗幕、左寄せの明朝見出し
 *
 * 高さ・余白・暗幕はここで一元管理する:
 *   min-h: 52svh → 60svh（lg: 60svh → 68svh）
 *   padding: pt-36 / pb-14 md:pb-20
 *   暗幕: from-ink via-ink/45 to-ink/25
 */
export default function PageHero({
  label,
  title,
  subtitle,
  image = 'concreteShadow',
  alt = '',
  size = 'md',
  sideShade = false,
  children,
}: PageHeroProps) {
  const imageUrl = image in IMAGES ? IMAGES[image as ImageKey] : image;
  const sizeClasses = {
    md: 'min-h-[52svh] md:min-h-[60svh]',
    lg: 'min-h-[60svh] md:min-h-[68svh]',
  };

  return (
    <section className={`relative ${sizeClasses[size]} flex items-end overflow-hidden bg-ink`}>
      <div className="absolute inset-0" aria-hidden={alt === ''}>
        <div
          className="absolute inset-0 bg-cover bg-center animate-slowfade"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          role="img"
          aria-label={alt}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
        {sideShade && (
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />
        )}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-36 pb-14 md:pb-20">
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
        {children}
      </div>
    </section>
  );
}
