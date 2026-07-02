'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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
    <div className="min-h-screen bg-washi texture-paper flex items-center justify-center px-5">
      <div className="max-w-xl w-full text-center animate-rise">
        <p className="font-serif text-xs tracking-[0.4em] uppercase text-gold-600 mb-6">Error</p>
        <h1 className="font-serif text-2xl md:text-3xl text-ink mb-5">
          エラーが発生しました
        </h1>
        <p className="text-ink/60 text-sm leading-loose mb-10">
          申し訳ございません。予期しないエラーが発生しました。<br />
          時間をおいて再度お試しください。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center bg-ink text-washi px-9 py-3.5 text-sm tracking-[0.2em] hover:bg-gold-800 transition-colors duration-500"
          >
            再試行する
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-ink/30 text-ink px-9 py-3.5 text-sm tracking-[0.2em] hover:bg-ink hover:text-washi transition-all duration-500"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
