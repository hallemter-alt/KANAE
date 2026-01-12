# www.rut-tokyo.com ドメイン切り替え - 作業サマリー

## 📋 完了した作業

### ✅ ドキュメント作成
- [x] **DOMAIN_SETUP_GUIDE.md** - 詳細な手順書（6.1 KB）
- [x] **DOMAIN_QUICKSTART.md** - クイックスタートガイド（0.9 KB）
- [x] **DNS_SETUP_TEMPLATES.md** - メールテンプレート & DNS 設定例（5.0 KB）
- [x] **verify-domain.sh** - 自動検証スクリプト（6.3 KB、実行可能）

合計 4 ファイル、18.3 KB のドキュメント

---

## 🎯 次に実施する内容

### 📍 ステップ 1：genspark が Vercel で CNAME 値を取得

#### 1-1. Vercel にアクセス
1. https://vercel.com にアクセス
2. GitHub でログイン
3. **KANAE プロジェクト** を選択

#### 1-2. ドメインを追加
1. **Settings** → **Domains** に移動
2. **「Add Domain」** をクリック
3. `www.rut-tokyo.com` を入力
4. **「Add」** をクリック

#### 1-3. CNAME 値を取得
Vercel が以下のような指示を表示します：

```
To add www.rut-tokyo.com, add the following record to your DNS provider:

Type:  CNAME
Name:  www
Value: cname.vercel-dns.com  ← この値をコピー
```

**⚠️ 重要**: この `Value` の値をメモしてください！

---

### 📧 ステップ 2：会社に CNAME 値を連絡

以下のメールテンプレートを使用して、会社の担当者に連絡します：

```
件名: www.rut-tokyo.com の DNS 設定変更依頼

お疲れ様です。

新不動産サイトのドメイン設定のため、以下の DNS レコードを Wix で追加・変更してください。

━━━━━━━━━━━━━━━━━━━━━━━━━━
【設定内容】
━━━━━━━━━━━━━━━━━━━━━━━━━━

タイプ: CNAME
ホスト: www
値（ターゲット）: [ここに Vercel から取得した値を記載]
TTL: 3600

━━━━━━━━━━━━━━━━━━━━━━━━━━
【設定手順】
━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Wix にログイン
2. ドメイン管理 → rut-tokyo.com を選択
3. DNS 設定 または DNS レコードを管理 をクリック
4. 既存の「www」レコードを削除または編集
5. 上記の CNAME レコードを新規追加
6. 保存

━━━━━━━━━━━━━━━━━━━━━━━━━━
【設定完了後】
━━━━━━━━━━━━━━━━━━━━━━━━━━

設定完了後、「DNS レコードの追加が完了しました」とご連絡ください。

よろしくお願いいたします。
```

---

### 📍 ステップ 3：会社から完了連絡を待機

会社から「DNS 追加完了」の連絡が来るまで待機します（通常 5〜15 分）。

---

### 📍 ステップ 4：DNS 伝播を確認

会社から連絡が来たら、5〜15 分待機してから以下を実行：

```bash
cd /home/user/webapp
./verify-domain.sh
```

このスクリプトは以下をチェックします：
- ✅ DNS CNAME レコードが正しく設定されているか
- ✅ HTTP ステータスが 200 OK を返すか
- ✅ SSL 証明書が有効か
- ✅ 全ページが正常に動作するか

---

### 📍 ステップ 5：全ページの動作確認

ブラウザで以下のページにアクセスして確認：

- [ ] https://www.rut-tokyo.com/ （ホーム）
- [ ] https://www.rut-tokyo.com/rent （賃貸検索）
- [ ] https://www.rut-tokyo.com/sale （売買検索）
- [ ] https://www.rut-tokyo.com/minpaku （民泊サービス）
- [ ] https://www.rut-tokyo.com/api-test （API テスト）

すべて正常に表示されれば、**切り替え完了です！** 🎉

---

## 📊 想定タイムライン

| 時刻 | アクション | 担当 | 所要時間 |
|------|-----------|------|---------|
| 10:00 | Vercel にドメイン追加 | genspark | 5 分 |
| 10:05 | 会社に CNAME 値を連絡 | genspark | 2 分 |
| 10:10 | Wix DNS 設定を待機 | 会社 | 10〜20 分 |
| 10:30 | DNS 追加完了の連絡 | 会社 | 1 分 |
| 10:35 | DNS 伝播を待機 | 自動 | 5〜15 分 |
| 10:50 | 動作確認（verify-domain.sh） | genspark | 2 分 |
| 10:55 | 全ページ確認 | genspark | 5 分 |
| 11:00 | 完了報告 | genspark | 2 分 |

**合計所要時間**: 約 1 時間

---

## 🛠️ 利用可能なツール

### 📄 ドキュメント
- **DOMAIN_SETUP_GUIDE.md** - 詳細な手順書
- **DOMAIN_QUICKSTART.md** - 3 ステップのクイックガイド
- **DNS_SETUP_TEMPLATES.md** - メールテンプレート & 設定例

### 🔧 スクリプト
```bash
# ドメイン検証スクリプト（DNS、HTTP、SSL をチェック）
./verify-domain.sh

# Vercel デプロイ検証スクリプト（全 API をテスト）
./verify-deployment.sh https://www.rut-tokyo.com
```

---

## 🔍 トラブルシューティング

### ❌ DNS が伝播しない
```bash
# DNS キャッシュをクリア
sudo dscacheutil -flushcache  # macOS
sudo killall -HUP mDNSResponder

# DNS 伝播状況を確認
dig www.rut-tokyo.com CNAME
# または
https://dnschecker.org/#CNAME/www.rut-tokyo.com
```

### ❌ SSL 証明書が発行されない
1. Vercel で **「Refresh」** をクリック
2. 30 分待機
3. DNS レコードが正しいことを確認

### ❌ 404 エラーが表示される
1. Vercel のデプロイログを確認
2. Next.js ビルドが成功したことを確認
3. ページファイルが存在することを確認

---

## 📞 連絡のタイミング

### genspark → 会社
- **タイミング**: Vercel でドメイン追加直後
- **内容**: CNAME 値を含む DNS 設定依頼メール

### 会社 → genspark
- **タイミング**: Wix で DNS 設定完了直後
- **内容**: 「DNS レコードの追加が完了しました」

### genspark → 会社
- **タイミング**: 全ページ確認完了後
- **内容**: 切り替え完了報告、動作確認結果

---

## 🔗 参考リンク

- **GitHub リポジトリ**: https://github.com/hallemter-alt/KANAE
- **Vercel ドメインガイド**: https://vercel.com/docs/concepts/projects/domains
- **DNS チェッカー**: https://dnschecker.org
- **SSL チェッカー**: https://www.ssllabs.com/ssltest

---

## ✅ チェックリスト

### 準備段階
- [x] ドメイン設定ガイドを作成
- [x] メールテンプレートを作成
- [x] 検証スクリプトを作成
- [x] すべてのドキュメントを GitHub にコミット

### 実施段階（これから）
- [ ] Vercel にログイン
- [ ] Vercel で `www.rut-tokyo.com` を追加
- [ ] CNAME 値を取得
- [ ] 会社に CNAME 値を連絡
- [ ] 会社から「DNS 追加完了」の連絡を受信
- [ ] DNS 伝播を確認（5〜15 分待機）
- [ ] `./verify-domain.sh` を実行
- [ ] ブラウザで全ページを確認
- [ ] 会社に完了報告

---

## 📝 GitHub ステータス

- **リポジトリ**: https://github.com/hallemter-alt/KANAE
- **最新コミット**: `d619c51`
- **コミットメッセージ**: "docs: Add comprehensive domain setup guides for www.rut-tokyo.com"
- **追加ファイル**: 4 ファイル、863 行
- **ブランチ**: `main`
- **ステータス**: ✅ Push 完了

---

## 🎉 まとめ

すべての準備が完了しました！

**次のアクション**:
1. **Vercel にログイン** して `www.rut-tokyo.com` を追加
2. **CNAME 値を取得** してメモ
3. **会社に連絡** して DNS 設定を依頼
4. **完了連絡を待機** してから `./verify-domain.sh` を実行

---

**作成日**: 2026-01-12  
**対象**: www.rut-tokyo.com → Vercel 不動産サイト  
**ステータス**: ドキュメント作成完了、実施待ち  
**所要時間**: 約 1 時間（DNS 伝播を含む）
