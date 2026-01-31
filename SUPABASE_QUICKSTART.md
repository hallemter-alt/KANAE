# 🎯 Supabase セットアップ - クイックガイド

## 📋 セットアップ手順（10〜15 分）

### 1️⃣ Supabase プロジェクト作成（5 分）
```
https://app.supabase.com
↓
New Project
↓
Name: kanae-crm
Database Password: [強力なパスワード]
Region: Tokyo (ap-northeast-1)
↓
Create new project（2〜3 分待機）
```

### 2️⃣ データベーススキーマ作成（2 分）
```
SQL Editor → New query
↓
supabase/schema.sql の内容をコピー＆ペースト
↓
Run
↓
Table Editor で 5 テーブルを確認
```

### 3️⃣ API キー取得（1 分）
```
Settings → API
↓
以下をコピー：
- Project URL
- anon public key
```

### 4️⃣ Vercel 環境変数設定（2 分）
```
Vercel → KANAE → Settings → Environment Variables
↓
3 つの環境変数を追加：
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_APP_URL
```

### 5️⃣ Vercel 再デプロイ（1 分）
```
Deployments → ⋮ → Redeploy
```

### 6️⃣ 動作確認（1 分）
```bash
# 自動確認スクリプト
./verify-supabase-setup.sh

# または手動確認
curl https://www.kanae-tokyo.com/api/crm/customers
```

---

## ✅ 完了確認

### サンプルデータが表示されれば成功！
```json
{
  "customers": [
    {"name": "山田太郎", ...},
    {"name": "佐藤花子", ...},
    {"name": "鈴木一郎", ...}
  ],
  "pagination": {
    "total": 3
  }
}
```

---

## 📚 詳細ドキュメント

- **SUPABASE_SETUP_STEP_BY_STEP.md** - 詳細な手順書（6 ステップ）
- **verify-supabase-setup.sh** - 自動確認スクリプト
- **PHASE1_SETUP_GUIDE.md** - Phase 1 全体のガイド

---

## 🔍 トラブルシューティング

### 空の配列が返る場合
```json
{"customers": [], "pagination": {"total": 0}}
```
**原因**: 環境変数が未設定、または間違っている  
**解決策**: Vercel の環境変数を確認 → 再デプロイ

### 500 エラーが返る場合
```json
{"error": "Failed to fetch customers"}
```
**原因**: Supabase の URL またはキーが間違っている  
**解決策**: Supabase ダッシュボードで API キーを再確認

---

## 🎉 セットアップ完了後

### できること
- ✅ 顧客管理 API（CRUD）
- ✅ 物件管理 API（検索・フィルター）
- ✅ 問合せ管理 API（送信・一覧）
- ✅ サンプルデータでのテスト

### 次のステップ
1. UI 実装（物件検索・詳細ページ）
2. メール送信設定（Resend API）
3. 認証機能（NextAuth.js）

---

**所要時間**: 10〜15 分  
**難易度**: ⭐⭐☆☆☆（簡単）  
**最終確認**: https://www.kanae-tokyo.com/api/crm/customers
