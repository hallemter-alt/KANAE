import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ja', 'zh', 'en']
const defaultLocale = 'ja'

function getLocale(request: NextRequest): string {
  // 1. 從 URL 路徑檢測語言
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameLocale) return pathnameLocale

  // 2. 從 Cookie 檢測
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 3. 從 Accept-Language header 檢測
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(',')[0].split('-')[0]
    if (locales.includes(browserLocale)) {
      return browserLocale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 檢查路徑是否已經包含語言 prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // 路徑已有語言，設置 cookie 並允許通過
    const locale = pathname.split('/')[1]
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
    })
    return response
  }

  // 路徑無語言，重定向到帶語言的 URL
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  
  // 保留 query parameters
  newUrl.search = request.nextUrl.search
  
  const response = NextResponse.redirect(newUrl)
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
  })
  
  return response
}

export const config = {
  matcher: [
    // 匹配所有路徑，除了 API、靜態文件、圖片
    '/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)',
  ],
}
