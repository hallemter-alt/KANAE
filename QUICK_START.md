# 🚀 クイックスタートガイド

## 5分でデプロイ！

### ステップ1: Supabase セットアップ（2分）

1. [Supabase](https://app.supabase.com) にアクセス
2. 「New Project」をクリック
3. プロジェクト名を入力（例: kanae-properties）
4. データベースパスワードを設定
5. リージョンを選択（Tokyo推奨）
6. 「Create new project」をクリック

### ステップ2: 認証情報の取得（1分）

1. プロジェクトダッシュボードで「Settings」→「API」を開く
2. 以下をコピー：
   - Project URL
   - anon/public key
   - service_role key（セキュアに保管）

### ステップ3: 環境変数の設定（1分）

```bash
# ローカル開発
cd /home/user/webapp
cp .env.local.example .env.local

# .env.local を編集
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### ステップ4: データベース初期化（1分）

Supabase の SQL Editor で以下を順番に実行：

```sql
-- 1. 基本スキーマ
-- supabase/schema.sql の内容をコピー&ペースト

-- 2. プレミアム物件テーブル
-- supabase/migrations/20260131_premium_properties.sql の内容をコピー&ペースト

-- 3. 初期データ（4件のプレミアム物件）
-- supabase/migrations/20260131_seed_premium_properties.sql の内容をコピー&ペースト
```

### ステップ5: ZMN物件データインポート（30秒）

```bash
cd /home/user/webapp
npm run import:zmn
```

期待される出力：
```
🚀 Starting ZMN properties import...
📊 Found 13 properties to import
✅ Successful: 13
```

### ステップ6: ローカル確認（30秒）

```bash
npm run dev
```

ブラウザで開く：
- http://localhost:3000/ja/premium-properties

### ステップ7: 本番デプロイ（Vercel推奨）

#### Option A: Git Push でオートデプロイ

```bash
# main ブランチにマージ
git checkout main
git merge genspark_ai_developer
git push origin main

# Vercel が自動的にデプロイ
```

#### Option B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 📋 確認チェックリスト

### データベース
- [ ] Supabase プロジェクト作成完了
- [ ] schema.sql 実行完了
- [ ] premium_properties.sql 実行完了
- [ ] seed データ挿入完了
- [ ] ZMN データインポート完了（13件）

### 環境変数
- [ ] .env.local 作成
- [ ] NEXT_PUBLIC_SUPABASE_URL 設定
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY 設定
- [ ] SUPABASE_SERVICE_ROLE_KEY 設定

### ローカルテスト
- [ ] npm run dev で起動
- [ ] http://localhost:3000/ja にアクセス可能
- [ ] http://localhost:3000/ja/premium-properties で物件表示
- [ ] フィルター機能動作確認
- [ ] 物件カードクリックで詳細表示

### 本番環境
- [ ] Vercel プロジェクト作成
- [ ] 環境変数を Vercel に設定
- [ ] デプロイ完了
- [ ] 本番URLで動作確認

## 🔧 トラブルシューティング

### データベース接続エラー

**症状**: "Invalid Supabase URL" または "Failed to fetch"

**解決方法**:
1. `.env.local` の URL が正しいか確認
2. Supabase プロジェクトが起動しているか確認
3. ネットワーク接続を確認

### インポートエラー

**症状**: "Failed to insert property"

**解決方法**:
1. マイグレーションが正しく実行されたか確認
2. Service Role Key が設定されているか確認
3. Supabase のログを確認（Dashboard → Logs）

### ビルドエラー

**症状**: "Type error" または "Module not found"

**解決方法**:
```bash
# 依存関係の再インストール
rm -rf node_modules package-lock.json
npm install

# TypeScript キャッシュクリア
rm -rf .next
npm run build
```

## 📞 サポート

問題が解決しない場合：

1. **ドキュメント確認**:
   - [DATA_IMPORT_COMPLETE_GUIDE.md](./DATA_IMPORT_COMPLETE_GUIDE.md)
   - [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)
   - [PREMIUM_PROPERTIES_SYSTEM.md](./PREMIUM_PROPERTIES_SYSTEM.md)

2. **Supabase ログ確認**:
   - Dashboard → Logs → API Logs

3. **ブラウザコンソール確認**:
   - F12 → Console タブ

4. **GitHub Issues**:
   - https://github.com/hallemter-alt/KANAE/issues

## 🎉 完了！

これで投資収益物件システムが稼働しました！

### 登録済み物件数: 17件
- プレミアム物件: 4件
- ZMN物件: 13件

### 利用可能な機能
- ✅ 高度な物件検索
- ✅ 9種類の特殊機能フィルター
- ✅ 6種類のプリセットフィルター
- ✅ 多言語対応（日/英/中）
- ✅ レスポンシブデザイン
- ✅ ページネーション
- ✅ ソート機能

### 次の改善案
- 📸 物件画像ギャラリー
- 🎥 360°バーチャルツアー
- 💰 収益シミュレーター
- ⭐ お気に入り機能
- 📊 物件比較機能
- 🔔 新着アラート
- 📄 PDF投資レポート

---

**デプロイ時間**: 約5分  
**難易度**: ⭐⭐☆☆☆ (Easy)  
**必要なもの**: Supabase アカウント、Vercel アカウント（オプション）
