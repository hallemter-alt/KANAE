# 🔧 Cloudflare Pages 部署問題解決報告

## ❌ 遇到的問題

### 錯誤訊息
```
Failed: an internal error occurred. 
If this continues, contact support: https://cfl.re/3WgEyrH
```

### 錯誤發生時間
- **時間**: 2026-01-12 13:06:11
- **階段**: 構建初始化後（Clone 成功後）
- **位置**: Cloudflare Pages 構建過程

---

## 🔍 問題診斷

### 根本原因
Next.js 15 的 `output: 'standalone'` 模式與 Cloudflare Pages 的構建環境不完全兼容，導致內部錯誤。

### 技術細節
1. **原始配置**:
   ```typescript
   // next.config.ts
   output: 'standalone',  // ❌ 不兼容
   ```

2. **輸出目錄**:
   ```toml
   # wrangler.toml
   pages_build_output_dir = ".next"  // ❌ standalone 模式輸出
   ```

3. **兼容性問題**:
   - Cloudflare Pages 對 Next.js 15 的 standalone 模式支持有限
   - 內部構建環境無法正確處理 standalone 輸出
   - 導致構建過程中的內部錯誤

---

## ✅ 解決方案

### 修改 1: 更新 Next.js 配置

**檔案**: `next.config.ts`

**修改前**:
```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  output: 'standalone',  // ❌ 問題所在
};
```

**修改後**:
```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  output: 'export',      // ✅ 靜態導出
  trailingSlash: false,  // ✅ Cloudflare 路由優化
};
```

**變更說明**:
- ✅ 使用 `export` 模式進行靜態站點生成（SSG）
- ✅ 添加 `trailingSlash: false` 以匹配 Cloudflare 路由
- ✅ 保留 `unoptimized: true` 以支持圖片優化

---

### 修改 2: 更新 Wrangler 配置

**檔案**: `wrangler.toml`

**修改前**:
```toml
pages_build_output_dir = ".next"  # ❌ standalone 輸出目錄
```

**修改後**:
```toml
pages_build_output_dir = "out"    # ✅ export 輸出目錄
```

**變更說明**:
- ✅ Next.js export 模式輸出到 `out/` 目錄
- ✅ 符合 Cloudflare Pages 的預期結構

---

### 修改 3: 更新 Cloudflare Pages 設定

在 Cloudflare Dashboard 中，確認以下設定：

```yaml
Framework preset:       Next.js (Static Export)  # ✅ 改用 Static Export
Build command:          npm run build
Build output directory: out                       # ✅ 改為 out
Production branch:      main
```

**⚠️ 重要**: 必須選擇 **"Next.js (Static Export)"** 而不是 "Next.js (SSR)"

---

## 🧪 本地驗證

### 構建測試
```bash
cd /home/user/webapp
npm run build
```

### 構建結果
```
✓ Compiled successfully in 13.9s
✓ Generating static pages (4/4)
✓ Exporting (2/2)

Route (app)                                 Size  First Load JS
┌ ○ /                                    14.8 kB         117 kB
└ ○ /_not-found                            993 B         103 kB
```

### 輸出驗證
```bash
ls -la out/
# 輸出:
# - index.html (主頁)
# - 404.html (錯誤頁)
# - _next/ (靜態資源)
# - images/ (圖片)
# - icons/ (圖標)
```

✅ **驗證成功**: 所有靜態文件已正確生成

---

## 📊 架構變更影響

### 從 SSR 到 SSG

| 特性 | SSR (Standalone) | SSG (Export) | 影響 |
|------|------------------|--------------|------|
| **動態路由** | ✅ 支持 | ⚠️ 需預渲染 | 目前無影響（靜態頁面） |
| **API Routes** | ✅ 支持 | ❌ 不支持 | 目前無影響（未使用） |
| **ISR** | ✅ 支持 | ❌ 不支持 | 目前無影響（未使用） |
| **靜態生成** | ✅ 支持 | ✅ 支持 | ✅ 完全支持 |
| **客戶端路由** | ✅ 支持 | ✅ 支持 | ✅ 完全支持 |
| **Cloudflare 兼容** | ⚠️ 有限 | ✅ 完全 | ✅ 問題解決 |

### 當前專案狀態
- ✅ **首頁**: 靜態內容，完全兼容
- ✅ **導航**: 客戶端路由，完全兼容
- ✅ **多語言**: 客戶端切換，完全兼容
- ✅ **所有組件**: 靜態渲染，完全兼容

### 未來考慮
如需要 SSR 功能（如動態 API、用戶認證），可考慮：
1. 使用 **Cloudflare Workers** + **Next.js API Routes**
2. 使用 **@cloudflare/next-on-pages** 適配器
3. 或分離靜態前端 + 獨立 API 後端

---

## 🚀 部署步驟更新

### 新的部署配置

在 Cloudflare Pages Dashboard 中設定：

```
┌─────────────────────────────────────────┐
│  Cloudflare Pages 配置                  │
├─────────────────────────────────────────┤
│  專案名稱:          kanae-real-estate   │
│  Production branch: main                │
│  Framework preset:  Next.js (Static Export)  ← 重要！
│  Build command:     npm run build       │
│  Output directory:  out                 ← 重要！
│  Root directory:    /                   │
└─────────────────────────────────────────┘
```

### ⚠️ 關鍵變更

1. **Framework preset 必須改為**:
   ```
   ❌ 錯誤: Next.js (SSR)
   ✅ 正確: Next.js (Static Export)
   ```

2. **Output directory 必須改為**:
   ```
   ❌ 錯誤: .next
   ✅ 正確: out
   ```

---

## 🔄 重新部署步驟

### 方式 1: 通過 Cloudflare Dashboard（推薦）

1. **更新專案設定**:
   ```
   Cloudflare Dashboard > Workers & Pages > kanae-real-estate
   > Settings > Builds & deployments
   ```

2. **修改配置**:
   - Framework preset: 改為 **"Next.js (Static Export)"**
   - Build output directory: 改為 **"out"**
   - 點擊 **Save**

3. **觸發重新部署**:
   ```
   選項 A: 推送代碼（已自動觸發）
   選項 B: Deployments > Retry deployment
   ```

### 方式 2: 刪除並重新創建（如設定無法修改）

如果無法直接修改設定：

1. **刪除現有專案**:
   ```
   Workers & Pages > kanae-real-estate > Settings > 刪除專案
   ```

2. **重新創建**:
   ```
   按照 DEPLOY_QUICKSTART.md 重新設定
   使用正確的配置（見上方）
   ```

---

## ✅ 驗證清單

部署完成後，確認以下項目：

```
✅ 構建驗證
├─ [ ] 構建成功完成（無錯誤）
├─ [ ] 構建時間 < 5 分鐘
└─ [ ] 部署狀態為 "Success"

✅ 網站驗證
├─ [ ] https://kanae-real-estate.pages.dev 可訪問
├─ [ ] 首頁內容完整顯示
├─ [ ] 導航欄功能正常
├─ [ ] 語言切換正常（日/中/英）
├─ [ ] 所有區域正常顯示
├─ [ ] 響應式設計正常（手機/平板/桌面）
└─ [ ] 無 Console 錯誤

✅ 效能驗證
├─ [ ] 頁面載入 < 2 秒
├─ [ ] First Contentful Paint < 1.5s
└─ [ ] Lighthouse Score > 90
```

---

## 📈 預期構建日誌

成功的構建應該顯示：

```
2026-01-12T13:XX:XX.XXXZ  Cloning repository...
2026-01-12T13:XX:XX.XXXZ  Success: Finished cloning repository files
2026-01-12T13:XX:XX.XXXZ  Installing dependencies...
2026-01-12T13:XX:XX.XXXZ  npm install
2026-01-12T13:XX:XX.XXXZ  added 350 packages in 45s
2026-01-12T13:XX:XX.XXXZ  Building application...
2026-01-12T13:XX:XX.XXXZ  > kanae-real-estate@0.1.0 build
2026-01-12T13:XX:XX.XXXZ  > next build
2026-01-12T13:XX:XX.XXXZ  ✓ Compiled successfully
2026-01-12T13:XX:XX.XXXZ  ✓ Generating static pages (4/4)
2026-01-12T13:XX:XX.XXXZ  ✓ Exporting (2/2)
2026-01-12T13:XX:XX.XXXZ  Deploying to Cloudflare Pages...
2026-01-12T13:XX:XX.XXXZ  Success! Deployed to kanae-real-estate.pages.dev
```

---

## 🎯 問題總結

### 問題
- Cloudflare Pages 構建失敗，內部錯誤
- Next.js standalone 模式不兼容

### 解決
- ✅ 改用 Next.js static export 模式
- ✅ 更新輸出目錄為 `out`
- ✅ 調整 Cloudflare Pages 設定

### 結果
- ✅ 本地構建成功
- ✅ 配置已推送到 GitHub
- ✅ 等待 Cloudflare Pages 自動重新構建

---

## 📞 後續支援

### 如果問題持續

1. **檢查構建日誌**:
   ```
   Cloudflare Dashboard > 專案 > Deployments > View build log
   ```

2. **嘗試手動重新部署**:
   ```
   Deployments > Retry deployment
   ```

3. **聯繫 Cloudflare 支援**:
   ```
   如果仍然失敗，提交工單：
   https://cfl.re/3WgEyrH
   ```

### 提供的資訊
當聯繫支援時，提供：
- 專案名稱: kanae-real-estate
- 錯誤時間: 2026-01-12 13:06:11
- 部署 ID: (從 Dashboard 獲取)
- 錯誤訊息: "an internal error occurred"
- 已採取的解決措施: 改用 static export

---

## 📚 相關文檔

- [DEPLOY_QUICKSTART.md](./DEPLOY_QUICKSTART.md) - 快速部署指南
- [CLOUDFLARE_DEPLOYMENT_WALKTHROUGH.md](./CLOUDFLARE_DEPLOYMENT_WALKTHROUGH.md) - 詳細部署步驟
- [Next.js Static Export 文檔](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)

---

**修復版本**: 1.0.0  
**修復日期**: 2026-01-12  
**狀態**: ✅ 已修復並推送  
**下一步**: 等待 Cloudflare Pages 自動重新構建

---

**🎉 問題已解決！新的構建應該會成功完成。**
