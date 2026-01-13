'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { translations, Locale, Translations } from '@/lib/translations'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ 
  children, 
  initialLocale 
}: { 
  children: ReactNode
  initialLocale: Locale 
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const router = useRouter()
  const pathname = usePathname()

  // 當 initialLocale 變化時同步（處理 SSR hydration）
  useEffect(() => {
    setLocaleState(initialLocale)
  }, [initialLocale])

  const setLocale = (newLocale: Locale) => {
    // 更新狀態
    setLocaleState(newLocale)
    
    // 設置 cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`
    
    // 計算新的路徑
    const segments = pathname.split('/')
    segments[1] = newLocale // 替換語言段
    const newPathname = segments.join('/')
    
    // 導航到新語言的 URL
    router.push(newPathname)
  }

  const t = translations[locale]

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
