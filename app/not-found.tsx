'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gold-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary-600 to-gold-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ページが見つかりません
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          お探しのページは削除されたか、URLが変更された可能性があります。
        </p>

        {/* Search Suggestions */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            お探しのページは以下かもしれません
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <Link
              href="/ja"
              className="flex items-center p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-3 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">
                ホームページ
              </span>
            </Link>
            <Link
              href="/ja/rent"
              className="flex items-center p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-3 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">
                賃貸物件検索
              </span>
            </Link>
            <Link
              href="/ja/about"
              className="flex items-center p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-3 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">
                会社概要
              </span>
            </Link>
            <Link
              href="/ja/contact"
              className="flex items-center p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-3 text-primary-600"
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
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">
                お問い合わせ
              </span>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/ja"
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ホームに戻る
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            前のページに戻る
          </button>
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-600 mb-4">
            お困りの場合は、お気軽にお問い合わせください。
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a
              href="tel:03-6914-3633"
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              03-6914-3633
            </a>
            <a
              href="mailto:info@kanae-tokyo.com"
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
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
              info@kanae-tokyo.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
