# GitHub Secrets & Variables 設定清單

## KANAE プロジェクト用

---

## 🔐 Repository Secrets（暗号化・機密情報）

### CI/CD 関連

| Secret名                  | 値の例            | 取得方法                             | 用途               |
| ------------------------- | ----------------- | ------------------------------------ | ------------------ |
| `VERCEL_TOKEN`            | `vercel_xxxxxxxx` | Vercel Dashboard → Settings → Tokens | Vercel デプロイ    |
| `VERCEL_ORG_ID`           | `team_xxxxxxxx`   | Vercel Project Settings              | 組織ID             |
| `VERCEL_PROJECT_ID`       | `prj_xxxxxxxx`    | Vercel Project Settings              | プロジェクトID     |
| `CHROMATIC_PROJECT_TOKEN` | `chpt_xxxxxxxx`   | Chromatic Project Settings           | Storybook デプロイ |

### API キー

| Secret名                   | 値の例             | 取得方法                       | 用途       |
| -------------------------- | ------------------ | ------------------------------ | ---------- |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | `pk.eyJ1Ij...`     | Mapbox Account → Tokens        | 地図表示   |
| `OPENAI_API_KEY`           | `sk-proj-xxxxxxxx` | OpenAI Platform → API Keys     | AI物件分析 |
| `KANAE_API_TOKEN`          | `kan_xxxxxxxx`     | 自社CMS管理画面                | CMS連携    |
| `DOCUSIGN_CLIENT_ID`       | `xxxxxxxx-xxxx...` | DocuSign Admin → Apps and Keys | 電子署名   |
| `DOCUSIGN_CLIENT_SECRET`   | `xxxxxxxx`         | DocuSign Admin → Apps and Keys | 電子署名   |

### データベース

| Secret名       | 値の例                                | 取得方法           | 用途       |
| -------------- | ------------------------------------- | ------------------ | ---------- |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/db` | PostgreSQL接続情報 | DB接続     |
| `REDIS_URL`    | `redis://user:pass@host:6379`         | Redis接続情報      | キャッシュ |

### N8N 連携

| Secret名       | 値の例                        | 取得方法           | 用途        |
| -------------- | ----------------------------- | ------------------ | ----------- |
| `N8N_HOST`     | `https://n8n.kanae-tokyo.com` | N8N管理画面        | N8N API接続 |
| `N8N_USER`     | `admin`                       | N8N Basic Auth設定 | N8N認証     |
| `N8N_PASSWORD` | `xxxxxxxx`                    | N8N Basic Auth設定 | N8N認証     |
| `N8N_API_KEY`  | `n8n_api_xxxxxxxx`            | N8N Settings → API | N8N APIキー |

### 通知・監視

| Secret名            | 値の例                        | 取得方法                        | 用途    |
| ------------------- | ----------------------------- | ------------------------------- | ------- |
| `SLACK_WEBHOOK_URL` | `https://hooks.slack.com/...` | Slack App → Incoming Webhooks   | CI通知  |
| `SLACK_BOT_TOKEN`   | `xoxb-xxxxxxxx`               | Slack App → OAuth & Permissions | Bot通知 |

### セキュリティ

| Secret名                 | 値の例                               | 取得方法            | 用途        |
| ------------------------ | ------------------------------------ | ------------------- | ----------- |
| `GITHUB_APP_ID`          | `123456`                             | GitHub App Settings | Actions認証 |
| `GITHUB_APP_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY-----...` | GitHub App Settings | Actions認証 |

---

## 📝 Repository Variables（非暗号化・一般設定）

| Variable名                    | 値                                                      | 用途              |
| ----------------------------- | ------------------------------------------------------- | ----------------- |
| `NEXT_PUBLIC_KANAE_API_URL`   | `https://api.kanae-tokyo.com`                           | APIエンドポイント |
| `NEXT_PUBLIC_SITE_URL`        | `https://www.kanae-tokyo.com`                           | サイトURL         |
| `NEXT_PUBLIC_COMPANY_NAME`    | `株式会社KANAE`                                         | 会社名            |
| `NEXT_PUBLIC_COMPANY_ADDRESS` | `〒171-0033 東京都豊島区高田3丁目16番4号 Golje Bld. 6F` | 住所              |
| `NEXT_PUBLIC_COMPANY_TEL`     | `03-6914-3633`                                          | 電話番号          |
| `NEXT_PUBLIC_COMPANY_EMAIL`   | `info@kanae-tokyo.com`                                  | メール            |
| `NEXT_PUBLIC_LICENSE_NUMBER`  | `東京都知事(1)第107157号`                               | 許認可番号        |
| `NODE_VERSION`                | `20`                                                    | Node.jsバージョン |
| `PNPM_VERSION`                | `9`                                                     | pnpmバージョン    |

---

## 🔧 設定手順

### 1. Secrets の設定

1. GitHub Repository → Settings → Secrets and variables → Actions
2. 「New repository secret」ボタンをクリック
3. Name と Secret を入力し「Add secret」

### 2. Variables の設定

1. 同じ画面で「Variables」タブを選択
2. 「New repository variable」ボタンをクリック
3. Name と Value を入力し「Add variable」

### 3. Environment Secrets（環境別設定）

Production / Staging / Development 環境別に設定:

1. Settings → Environments → New environment
2. 環境名を入力（`production`, `staging`, `development`）
3. 環境ごとに Secrets / Variables を設定
4. Deployment protection rules を設定:
   - Required reviewers: 1-2名
   - Wait timer: 5分
   - Deployment branches: `main`（productionのみ）
