'use client';

import { useEffect, useRef, ReactNode } from 'react';

type RevealVariant = 'rise' | 'media' | 'text' | 'text-left' | 'stagger';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  as?: 'div' | 'section' | 'span' | 'li' | 'figure';
  /** 出現の仕方：既定は控えめな rise。media=画像先行、text=文字が横から遅れて */
  variant?: RevealVariant;
}

/**
 * 静かなスクロール・リビール
 * IntersectionObserver で一度だけ、ゆっくり現れる
 * variant により「画像が先・文字が後」の分層演出にも対応
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  variant = 'rise',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as 'div';

  const baseClass =
    variant === 'media'
      ? 'reveal-media'
      : variant === 'text'
      ? 'reveal-text'
      : variant === 'text-left'
      ? 'reveal-text from-left'
      : variant === 'stagger'
      ? 'reveal stagger'
      : 'reveal';

  const delayClass = variant === 'rise' && delay ? ` reveal-delay-${delay}` : '';

  return (
    <Tag ref={ref} className={`${baseClass}${delayClass} ${className}`}>
      {children}
    </Tag>
  );
}
