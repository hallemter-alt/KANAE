'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const locale = pathname?.split('/')[1] || 'ja'

  useEffect(() => {
    // エラーをログに記録
    console.error('Error occurred:', error)
  }, [error])

  const messages = {
    ja: {
      title: 'エラーが発生しました',
      description: '申し訳ございません。予期しないエラーが発生しました。',
      tryAgain: 'もう一度試す',
      backHome: 'ホームに戻る',
      contact: 'お問い合わせ',
    },
    zh: {
      title: '发生错误',
      description: '抱歉，发生了意外错误。',
      tryAgain: '重试',
      backHome: '返回首页',
      contact: '联系我们',
    },
    en: {
      title: 'Something went wrong',
      description: 'Sorry, an unexpected error occurred.',
      tryAgain: 'Try again',
      backHome: 'Back to Home',
      contact: 'Contact Us',
    },
  }

  const t = messages[locale as keyof typeof messages] || messages.ja

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {t.description}
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t.tryAgain}
          </button>
          <Link
            href={`/${locale}`}
            className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            {t.backHome}
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            {locale === 'ja' && 'お困りの場合は、お気軽にお問い合わせください。'}
            {locale === 'zh' && '如有疑问，请随时与我们联系。'}
            {locale === 'en' && 'If you need assistance, please contact us.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {t.contact}
          </Link>
        </div>
      </div>
    </div>
  )
}
