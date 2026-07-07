'use client'

// 物件写真ギャラリー — メイン写真＋サムネイル＋ライトボックス（左右クリック切替）

import { useState, useCallback, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { InvestProperty } from '@/lib/invest'

const L = {
  ja: {
    prev: '前へ',
    next: '次へ',
    close: '閉じる',
    counter: '{n} / {total}',
    gallery: '外観・共用部',
  },
  zh: {
    prev: '上一張',
    next: '下一張',
    close: '關閉',
    counter: '{n} / {total}',
    gallery: '外觀·公共區域',
  },
  en: {
    prev: 'Previous',
    next: 'Next',
    close: 'Close',
    counter: '{n} / {total}',
    gallery: 'Exterior & Common Areas',
  },
} as const

export default function PropertyGallery({ property }: { property: InvestProperty }) {
  const { locale } = useLanguage()
  const s = L[locale]
  const [activePhoto, setActivePhoto] = useState(1)
  const [lightbox, setLightbox] = useState(false)

  const photos = Array.from({ length: property.photoCount }, (_, i) => i + 1)
  const photoUrl = (n: number) => `/assets/invest/${property.slug}/${String(n).padStart(2, '0')}.jpg`

  const goNext = useCallback(() => {
    setActivePhoto((prev) => (prev >= property.photoCount ? 1 : prev + 1))
  }, [property.photoCount])

  const goPrev = useCallback(() => {
    setActivePhoto((prev) => (prev <= 1 ? property.photoCount : prev - 1))
  }, [property.photoCount])

  // ライトボックス内キーボード操作
  useEffect(() => {
    if (!lightbox) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    // スクロール停止
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, goPrev, goNext])

  return (
    <div>
      {/* メイン写真 — クリックでライトボックス */}
      <figure
        className="img-breathe relative overflow-hidden aspect-[16/10] mb-4 cursor-pointer group"
        onClick={() => setLightbox(true)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${photoUrl(activePhoto)})` }}
          role="img"
          aria-label={`${property.name[locale]} — ${activePhoto}`}
        />
        {/* 左右ナビゲーション（ホバー表示） */}
        <button
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          className="absolute left-0 top-0 bottom-0 w-1/4 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={s.prev}
        >
          <span className="bg-ink/30 hover:bg-ink/50 text-washi w-10 h-10 flex items-center justify-center ml-3 backdrop-blur-sm transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); goNext() }}
          className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={s.next}
        >
          <span className="bg-ink/30 hover:bg-ink/50 text-washi w-10 h-10 flex items-center justify-center mr-3 backdrop-blur-sm transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        {/* カウンター */}
        <div className="absolute bottom-3 right-3 bg-ink/40 backdrop-blur-sm px-3 py-1 text-washi/90 text-[11px] tracking-widest pointer-events-none">
          {activePhoto} / {property.photoCount}
        </div>
      </figure>

      {/* サムネイル */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {photos.map((n) => (
          <button
            key={n}
            onClick={() => setActivePhoto(n)}
            aria-pressed={activePhoto === n}
            className={`relative overflow-hidden aspect-[4/3] border transition-all duration-300 ${
              activePhoto === n ? 'border-ink opacity-100' : 'border-transparent opacity-55 hover:opacity-90'
            }`}
          >
            <span
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${photoUrl(n)})` }}
            />
          </button>
        ))}
      </div>

      {/* ライトボックス */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          {/* 閉じるボタン */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 text-washi/60 hover:text-washi transition-colors z-10"
            aria-label={s.close}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          {/* 前へ */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 sm:left-8 text-washi/50 hover:text-washi transition-colors z-10"
            aria-label={s.prev}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* 画像 */}
          <div
            className="relative max-w-[88vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl(activePhoto)}
              alt={`${property.name[locale]} — ${activePhoto}`}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 text-center pb-3 text-washi/70 text-[12px] tracking-widest bg-gradient-to-t from-ink/80 to-transparent pt-8">
              {activePhoto} / {property.photoCount}
            </div>
          </div>

          {/* 次へ */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 sm:right-8 text-washi/50 hover:text-washi transition-colors z-10"
            aria-label={s.next}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
