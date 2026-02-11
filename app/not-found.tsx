import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-black text-primary-600 mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ページが見つかりません
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg"
          >
            ホームに戻る
          </Link>
          <Link
            href="/rent"
            className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-bold text-lg hover:bg-primary-50 transition-all"
          >
            物件を探す
          </Link>
        </div>
      </div>
    </div>
  )
}
