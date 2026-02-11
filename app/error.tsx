'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <html lang="ja">
      <body>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <svg
                className="w-24 h-24 text-red-500 mx-auto mb-6"
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                エラーが発生しました
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                申し訳ございません。予期しないエラーが発生しました。
              </p>
              {error.message && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                  <p className="text-sm text-red-800 font-mono">{error.message}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg"
              >
                再試行する
              </button>
              <a
                href="/"
                className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-bold text-lg hover:bg-primary-50 transition-all"
              >
                ホームに戻る
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}
