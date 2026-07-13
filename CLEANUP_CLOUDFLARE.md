# Cloudflare 清理手冊（KANAE）

## 背景

目前 `hallemter-alt/KANAE` 已改為僅使用 **Vercel** 部署。但 GitHub 倉庫中仍殘留：

- `Cloudflare Workers and Pages` GitHub App（持續觸發失敗的 check runs）
- 13 筆舊的 Cloudflare 部署記錄（環境名 `Production – kanae`、`Production – kanae-0205`）
- 一個已無用的分支 `feature/code-review-fixes`

本文件提供兩種清理方式：

1. [Windows PowerShell 腳本](#方式一windows-powershell-腳本)（推薦）
2. [GitHub 網頁手動操作](#方式二github-網頁手動操作)

---

## 方式一：Windows PowerShell 腳本

### 步驟 1：安裝 GitHub CLI

1. 開啟瀏覽器，前往：https://cli.github.com/
2. 下載 Windows 安裝檔並安裝
3. 開啟 PowerShell，執行：

```powershell
gh auth login
```

按照提示使用瀏覽器或 token 登入。登入帳號必須對 `hallemter-alt/KANAE` 有管理員權限。

### 步驟 2：下載並執行腳本

在專案根目錄已有 `cleanup-cloudflare.ps1`。將它複製到 Windows 後執行：

```powershell
# 以系統管理員身份開啟 PowerShell（非必要，但建議）
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
.\cleanup-cloudflare.ps1
```

腳本會依序：

1. 將 13 筆 Cloudflare 部署標記為 `inactive`
2. 刪除這 13 筆部署記錄
3. 刪除 `feature/code-review-fixes` 分支

### 步驟 3：移除 Cloudflare GitHub App

腳本無法自動移除 App，必須手動在網頁操作：

1. 前往：https://github.com/hallemter-alt/KANAE/settings/installations
2. 找到 **Cloudflare Workers and Pages**
3. 點擊 **Configure**
4. 拉到最底，選擇 **Uninstall "Cloudflare Workers and Pages"**

### 步驟 4：驗證

```powershell
gh api repos/hallemter-alt/KANAE/deployments --paginate --jq '.[] | {id, environment, created_at}'
```

應該只看到：

- `Production`（Vercel）
- `Preview`（Vercel）

不再看到 `Production – kanae`、`Production – kanae-0205` 或 Cloudflare 相關記錄。

---

## 方式二：GitHub 網頁手動操作

### 1. 移除 Cloudflare App

前往：https://github.com/hallemter-alt/KANAE/settings/installations

找到 `Cloudflare Workers and Pages` 並移除。

### 2. 刪除舊分支

前往：https://github.com/hallemter-alt/KANAE/branches

找到 `feature/code-review-fixes`，點擊垃圾桶圖示刪除。

### 3. 刪除部署記錄（只能透過 API）

GitHub 網頁沒有刪除部署記錄的 UI，因此必須使用 GitHub CLI 或 curl。以下是 curl 版本（需要 Personal Access Token 具有 `repo` 權限）：

```bash
# 將 YOUR_TOKEN 替換為你的 GitHub Personal Access Token
for id in 3776711095 3776719521 3776720267 3776729459 3776735371 \
          3790760423 3790761683 3793444240 3793444292 3793488950 \
          3793490759 3793490833 3793491891; do
  curl -X DELETE \
    -H "Authorization: token YOUR_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    https://api.github.com/repos/hallemter-alt/KANAE/deployments/$id
  echo "Deleted $id"
done
```

---

## 待清理的 Cloudflare 部署 ID 列表

```
3776711095
3776719521
3776720267
3776729459
3776735371
3790760423
3790761683
3793444240
3793444292
3793488950
3793490759
3793490833
3793491891
```

---

## 清理後預期狀態

- GitHub 倉庫的 Deployments 頁面只顯示 Vercel 的 `Production` 和 `Preview`
- PR 不再出現 `Cloudflare Pages: kanae` 和 `Cloudflare Pages: kanae-real-estate` 的失敗檢查
- 分支只剩 `main` 和必要的功能分支
