// API ルート共通ユーティリティ

// PostgREST の .or() フィルタに埋め込む検索文字列をサニタイズ。
// カンマ・括弧・バックスラッシュ・% はフィルタ構文として解釈されるため除去し、
// フィルタ条件の改ざん（他ステータスの物件の閲覧等）を防ぐ。
export function sanitizeSearch(raw: string | null, maxLength = 100): string {
  if (!raw) return ''
  return raw
    .replace(/[,()\\%]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

// ページ番号：1 以上の整数に丸める（NaN・0・負数は 1）
export function parsePage(raw: string | null): number {
  const n = parseInt(raw ?? '1', 10)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1
}

// 取得件数：1〜max の整数に丸める（上限超過は max、NaN はデフォルト）
export function parseLimit(raw: string | null, defaultValue = 20, max = 100): number {
  const n = parseInt(raw ?? String(defaultValue), 10)
  if (!Number.isFinite(n) || n <= 0) return defaultValue
  return Math.min(Math.floor(n), max)
}

// HTML エスケープ（メールテンプレートへのユーザー入力埋め込み用）
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// メール件名など単一行フィールド用：改行を除去（ヘッダインジェクション対策）
export function toSingleLine(value: unknown): string {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim()
}
