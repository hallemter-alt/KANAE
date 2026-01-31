# www.kanae-tokyo.com ドメイン切り替え - クイックスタート

## 🚀 3 ステップで完了

### ステップ 1：genspark が Vercel で CNAME 値を取得
```
1. Vercel → KANAE プロジェクト → Settings → Domains
2. 「Add Domain」→ www.kanae-tokyo.com を入力
3. Vercel が表示する CNAME 値をコピー
   例: cname.vercel-dns.com
```

### ステップ 2：会社が Wix DNS に CNAME を追加
```
1. Wix ドメイン管理 → kanae-tokyo.com → DNS 設定
2. 既存の www レコードを削除
3. 新規 CNAME レコードを追加：
   - タイプ: CNAME
   - ホスト: www
   - 値: [genspark から提供された値]
4. 保存
```

### ステップ 3：動作確認（5〜15 分後）
```bash
# ブラウザで確認
https://www.kanae-tokyo.com/

# コマンドで確認
curl -I https://www.kanae-tokyo.com
```

---

## ✅ 確認項目

- [ ] `https://www.kanae-tokyo.com/` が表示される
- [ ] 🔒（鍵マーク）が表示される（HTTPS 有効）
- [ ] `/rent`, `/sale`, `/minpaku` が表示される
- [ ] `/api/hello` が JSON を返す

---

## 🔧 トラブルシューティング

### まだ旧サイトが表示される
→ DNS キャッシュをクリア、または 24 時間待機

### SSL 証明書エラー
→ Vercel で「Refresh」、30 分待機

### 404 エラー
→ Vercel のデプロイログを確認

---

**詳細は `DOMAIN_SETUP_GUIDE.md` を参照**
