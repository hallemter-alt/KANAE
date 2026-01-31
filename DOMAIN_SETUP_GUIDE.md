# www.kanae-tokyo.com を Vercel 不動産サイトに切り替える手順書

## 📋 概要

- **ドメイン**: `kanae-tokyo.com`
- **対象**: `www.kanae-tokyo.com` を新不動産サイトで公開
- **現状**: Wix テンプレートで公開中（置き換え予定）
- **DNS 管理**: Wix
- **新サイト**: Vercel にデプロイされた Next.js 不動産サイト

---

## 🔄 作業フロー

```
[ステップ 1] 会社側：Wix DNS 設定の確認
    ↓
[ステップ 2] genspark：Vercel にドメイン追加 → CNAME 値取得
    ↓
[連絡] genspark → 会社：CNAME 値を連絡
    ↓
[ステップ 3] 会社側：Wix DNS に CNAME レコード追加
    ↓
[連絡] 会社 → genspark：DNS 追加完了を通知
    ↓
[ステップ 4] genspark：SSL 証明書の確認 & 動作確認
    ↓
[ステップ 5] 全ページの動作確認
```

---

## 📍 ステップ 1：会社側（Wix DNS 設定の確認）

### 1-1. Wix にログイン
1. Wix アカウントにログイン
2. **ドメイン管理** セクションに移動
3. `kanae-tokyo.com` を選択

### 1-2. 現在の DNS レコードを確認
1. **DNS 設定** または **DNS レコードを管理** をクリック
2. 既存の `www` レコードを確認：
   ```
   タイプ: CNAME または A レコード
   ホスト: www
   値: （現在 Wix を指している）
   ```
3. このレコードは後で **編集または削除** します

### 1-3. genspark に現状を報告
以下の情報を genspark に連絡：
- ✅ Wix DNS 設定画面にアクセス完了
- ✅ 現在の `www` レコードの内容（タイプと値）
- ✅ CNAME レコード追加の準備完了

**⚠️ この時点では DNS レコードを変更しない**（genspark から CNAME 値が提供されるまで待機）

---

## 📍 ステップ 2：genspark（Vercel 側設定）

### 2-1. Vercel プロジェクトにドメインを追加

1. **Vercel ダッシュボード** にアクセス
2. **KANAE プロジェクト** を選択
3. **Settings** → **Domains** に移動
4. **「Add Domain」** ボタンをクリック
5. `www.kanae-tokyo.com` を入力して **「Add」**

### 2-2. CNAME 値を取得

Vercel が以下のような指示を表示します：

```
To add www.kanae-tokyo.com, add the following record to your DNS provider:

Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
```

**重要**: この `Value` の値（例: `cname.vercel-dns.com`）が実際の CNAME ターゲットです。

### 2-3. 会社に CNAME 値を連絡

以下の情報を **会社の担当者** に送信：

---

**件名**: www.kanae-tokyo.com の DNS 設定変更依頼

**本文**:
```
お疲れ様です。

新不動産サイトのドメイン設定のため、以下の DNS レコードを Wix で追加・変更してください。

【設定内容】
- タイプ: CNAME
- ホスト: www
- 値（ターゲット）: [ここに Vercel から取得した値を記載]
  例: cname.vercel-dns.com
- TTL: 自動（または 3600）

【手順】
1. Wix ドメイン管理 → kanae-tokyo.com → DNS 設定
2. 既存の www レコードを削除または編集
3. 上記の CNAME レコードを追加
4. 保存後、「DNS 追加完了」とご連絡ください

よろしくお願いいたします。
```

---

### 2-4. 会社からの完了連絡を待機

会社から「DNS 追加完了」の連絡が来るまで待機します（通常 5〜15 分）。

---

## 📍 ステップ 3：会社側（Wix DNS に CNAME レコード追加）

### 3-1. Wix DNS 設定画面で編集

1. Wix ドメイン管理 → `kanae-tokyo.com` → **DNS 設定**
2. 既存の `www` レコードを見つける
3. **編集** または **削除** → **新規追加**

### 3-2. CNAME レコードを追加

| 項目 | 値 |
|------|-----|
| **タイプ** | CNAME |
| **ホスト** | `www` |
| **値（ターゲット）** | `cname.vercel-dns.com` （genspark から提供された値） |
| **TTL** | 自動（または 3600） |

### 3-3. 保存して genspark に連絡

1. **保存** ボタンをクリック
2. genspark に以下を連絡：
   ```
   DNS レコードの追加が完了しました。
   追加内容：
   - タイプ: CNAME
   - ホスト: www
   - 値: cname.vercel-dns.com
   ```

---

## 📍 ステップ 4：genspark（SSL 証明書の確認 & 動作確認）

### 4-1. DNS 伝播を待機

会社から「DNS 追加完了」の連絡後、**5〜15 分待機**します。

DNS の伝播状況を確認：
```bash
# DNS の伝播状況を確認
dig www.kanae-tokyo.com CNAME

# または
nslookup www.kanae-tokyo.com
```

### 4-2. Vercel で SSL 証明書のステータス確認

1. Vercel ダッシュボード → KANAE プロジェクト
2. **Settings** → **Domains**
3. `www.kanae-tokyo.com` のステータスを確認：
   - ✅ **Valid Configuration**: DNS 設定正常
   - ✅ **SSL Certificate: Active**: HTTPS 有効

**⚠️ SSL 証明書の発行には 5〜30 分かかる場合があります**

### 4-3. ブラウザで動作確認

```bash
# コマンドラインで確認
curl -I https://www.kanae-tokyo.com

# 期待される結果：
# HTTP/2 200
# content-type: text/html; charset=utf-8
# x-vercel-id: ...
```

ブラウザで以下を確認：
- **URL**: https://www.kanae-tokyo.com
- ✅ ページが正常に表示される
- ✅ アドレスバーに 🔒（鍵マーク）が表示される
- ✅ SSL 証明書が有効（Let's Encrypt）

---

## 📍 ステップ 5：全ページの動作確認

### 5-1. 主要ページの確認

以下のページにアクセスして、すべて **200 OK** が返ることを確認：

| ページ | URL | ステータス |
|--------|-----|-----------|
| ホーム | https://www.kanae-tokyo.com/ | [ ] 200 OK |
| 賃貸検索 | https://www.kanae-tokyo.com/rent | [ ] 200 OK |
| 売買検索 | https://www.kanae-tokyo.com/sale | [ ] 200 OK |
| 民泊サービス | https://www.kanae-tokyo.com/minpaku | [ ] 200 OK |
| API テスト | https://www.kanae-tokyo.com/api-test | [ ] 200 OK |

### 5-2. API エンドポイントの確認

```bash
# Hello API
curl https://www.kanae-tokyo.com/api/hello

# Properties API
curl https://www.kanae-tokyo.com/api/properties

# Properties API (フィルタ付き)
curl "https://www.kanae-tokyo.com/api/properties?type=rent"
```

### 5-3. 自動検証スクリプトを実行

```bash
cd /home/user/webapp
./verify-deployment.sh https://www.kanae-tokyo.com
```

---

## 🔍 トラブルシューティング

### ❌ 問題 1：DNS が伝播しない

**症状**: `www.kanae-tokyo.com` にアクセスしても旧 Wix サイトが表示される

**解決策**:
1. DNS キャッシュをクリア：
   ```bash
   # macOS / Linux
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   ```
2. DNS 伝播状況を確認：https://dnschecker.org
3. 24 時間待機（TTL による遅延）

---

### ❌ 問題 2：SSL 証明書が発行されない

**症状**: Vercel で「SSL Certificate: Pending」のまま

**解決策**:
1. DNS レコードが正しいことを確認：
   ```bash
   dig www.kanae-tokyo.com CNAME
   ```
2. Vercel で **「Refresh」** ボタンをクリック
3. 30 分待機
4. それでも解決しない場合は Vercel サポートに連絡

---

### ❌ 問題 3：404 エラーが表示される

**症状**: `https://www.kanae-tokyo.com/` は表示されるが、他のページで 404

**解決策**:
1. Next.js ビルドが成功したことを確認：
   ```bash
   cd /home/user/webapp
   npm run build
   ```
2. Vercel でデプロイログを確認
3. ルーティング設定を確認

---

## 📊 チェックリスト

### 会社側（Wix DNS 設定）
- [ ] Wix ドメイン管理にアクセス
- [ ] 現在の `www` レコードを確認
- [ ] genspark に現状を報告
- [ ] genspark から CNAME 値を受信
- [ ] Wix DNS に CNAME レコードを追加
- [ ] genspark に「DNS 追加完了」を連絡

### genspark 側（Vercel 設定）
- [ ] Vercel に `www.kanae-tokyo.com` を追加
- [ ] CNAME 値を取得
- [ ] 会社に CNAME 値を連絡
- [ ] 会社から「DNS 追加完了」の連絡を受信
- [ ] DNS 伝播を確認（5〜15 分待機）
- [ ] SSL 証明書が **Active** になることを確認
- [ ] ブラウザで `https://www.kanae-tokyo.com/` が表示されることを確認
- [ ] 全ページの動作確認（/, /rent, /sale, /minpaku, /api-test）
- [ ] API エンドポイントの動作確認

---

## 📝 補足情報

### DNS 伝播時間
- **通常**: 5〜15 分
- **最大**: 24〜48 時間（TTL による）
- **確認方法**: https://dnschecker.org で `www.kanae-tokyo.com` の CNAME を確認

### SSL 証明書
- **発行元**: Let's Encrypt（Vercel が自動発行）
- **有効期間**: 90 日（自動更新）
- **ワイルドカード**: サポートされていない（`*.kanae-tokyo.com` は別途設定が必要）

### Apex ドメイン（kanae-tokyo.com）について
もし `kanae-tokyo.com`（www なし）も Vercel に向けたい場合：
1. Vercel で `kanae-tokyo.com` を追加
2. Wix DNS で以下の A レコードを追加：
   ```
   タイプ: A
   ホスト: @
   値: 76.76.21.21
   ```
   ※ Vercel が表示する IP アドレスを使用

---

## 🔗 参考リンク

- **Vercel ドメイン設定ガイド**: https://vercel.com/docs/concepts/projects/domains
- **DNS チェッカー**: https://dnschecker.org
- **SSL チェッカー**: https://www.ssllabs.com/ssltest/

---

**作成日**: 2026-01-12  
**対象プロジェクト**: KANAE 不動産サイト  
**GitHub**: https://github.com/hallemter-alt/KANAE  
**ステータス**: 手順書作成完了、実施待ち
