import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-washi texture-paper flex items-center justify-center px-5">
      <div className="max-w-xl w-full text-center animate-rise">
        <p className="font-serif text-6xl md:text-7xl text-ink/15 tracking-[0.2em] mb-8">404</p>
        <h1 className="font-serif text-2xl md:text-3xl text-ink mb-5">
          ページが見つかりません
        </h1>
        <p className="text-ink/60 text-sm leading-loose mb-10">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-ink text-washi px-9 py-3.5 text-sm tracking-[0.2em] hover:bg-gold-800 transition-colors duration-500"
          >
            ホームに戻る
          </Link>
          <Link
            href="/rent"
            className="inline-flex items-center justify-center border border-ink/30 text-ink px-9 py-3.5 text-sm tracking-[0.2em] hover:bg-ink hover:text-washi transition-all duration-500"
          >
            物件を探す
          </Link>
        </div>
      </div>
    </div>
  )
}
