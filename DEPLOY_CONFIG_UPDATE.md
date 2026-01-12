# ⚡ Cloudflare Pages 部署 - 更新配置指南

## 🔧 重要更新（2026-01-12）

**問題已修復！** Next.js 配置已更新為與 Cloudflare Pages 完全兼容。

---

## ✅ 已完成的修復

1. ✅ Next.js 配置改為 `output: 'export'`（靜態導出）
2. ✅ 輸出目錄更新為 `out`
3. ✅ 本地構建測試成功
4. ✅ 代碼已推送到 GitHub

---

## 🎯 正確的 Cloudflare Pages 配置

### ⚠️ 關鍵設定（必須正確！）

```yaml
Framework preset:       Next.js (Static Export)  ← 必須選這個！
Build command:          npm run build
Build output directory: out                      ← 必須是 out！
Production branch:      main
Root directory:         /（留空）
```

---

## 🔄 如何更新現有專案設定

### 方式 1: 更新設定（推薦）

1. **進入專案設定**:
   ```
   Cloudflare Dashboard
   → Workers & Pages
   → kanae-real-estate
   → Settings
   → Builds & deployments
   ```

2. **修改 Framework preset**:
   ```
   找到 "Framework preset"
   從 "Next.js (SSR)" 改為 "Next.js (Static Export)"
   ```

3. **修改 Build output directory**:
   ```
   找到 "Build output directory"
   從 ".next" 改為 "out"
   ```

4. **保存設定**:
   ```
   點擊 "Save"
   ```

5. **觸發重新部署**:
   ```
   代碼已推送，應該自動觸發
   或手動點擊 "Retry deployment"
   ```

---

### 方式 2: 重新創建專案（如無法修改）

如果無法直接修改設定，請重新創建：

1. **刪除現有專案**:
   ```
   Settings > 滾動到底部 > Delete project
   ```

2. **重新創建專案**（使用正確配置）:
   ```
   Workers & Pages > Create > Pages > Connect to Git
   選擇 KANAE 倉庫
   
   配置如下：
   ✅ Framework preset: Next.js (Static Export)
   ✅ Build command: npm run build
   ✅ Output directory: out
   ✅ Production branch: main
   
   點擊 "Save and Deploy"
   ```

---

## 📊 預期的構建結果

### 成功的構建日誌應該顯示:

```
13:XX:XX  Cloning repository...
13:XX:XX  Success: Finished cloning repository files
13:XX:XX  Installing dependencies...
13:XX:XX  npm install
13:XX:XX  added 350 packages in 45s
13:XX:XX  Building application...
13:XX:XX  > next build
13:XX:XX  ✓ Compiled successfully in 13.9s
13:XX:XX  ✓ Generating static pages (4/4)
13:XX:XX  ✓ Exporting (2/2)
13:XX:XX  Deploying to Cloudflare Pages...
13:XX:XX  ✅ Success! Your site is live!
```

### 構建時間:
- ⏱️ Clone: ~5 秒
- ⏱️ Install: ~45 秒
- ⏱️ Build: ~40 秒
- ⏱️ Deploy: ~10 秒
- **總計: ~2 分鐘**

---

## ✅ 部署成功驗證清單

```
部署成功後，檢查以下項目：

✅ 構建狀態
├─ [ ] 構建日誌無錯誤
├─ [ ] 狀態顯示 "Success"
└─ [ ] 部署時間 < 3 分鐘

✅ 網站功能
├─ [ ] https://kanae-real-estate.pages.dev 可訪問
├─ [ ] 首頁正常顯示
├─ [ ] 導航欄功能正常
├─ [ ] 語言切換（日/中/英）正常
├─ [ ] 所有內容區域顯示正常
└─ [ ] 手機版正常（測試響應式）

✅ 效能檢查
├─ [ ] 頁面載入速度快（< 2 秒）
├─ [ ] 無 Console 錯誤
└─ [ ] 圖片正常載入
```

---

## 🆘 故障排查

### 問題 1: 仍然顯示構建錯誤

**檢查**:
```
1. Framework preset 是否為 "Next.js (Static Export)"
2. Output directory 是否為 "out"
3. 是否觸發了最新代碼的構建
```

**解決**:
```
1. 更新設定（見上方）
2. 手動觸發重新部署：
   Deployments > Retry deployment
```

---

### 問題 2: 找不到 "Next.js (Static Export)" 選項

**說明**:
```
可能顯示為：
- "Next.js (Static)"
- "Next.js - Static HTML Export"
- 或類似名稱
```

**選擇原則**:
```
✅ 選擇: 包含 "Static" 或 "Export" 字樣的選項
❌ 避免: "Next.js (SSR)" 或純 "Next.js"
```

---

### 問題 3: 構建成功但頁面空白

**檢查**:
```bash
1. 打開瀏覽器 Console (F12)
2. 查看 Network 標籤
3. 檢查是否有 404 錯誤
```

**常見原因**:
```
- 資源路徑錯誤
- 基礎路徑配置問題
```

**解決**:
```
檢查 next.config.ts 中的 basePath 設定
應該為空或 undefined（預設）
```

---

## 🎉 部署完成後

### 自動部署已啟用 ✅

```
每次推送代碼到 GitHub:
    ↓
自動觸發 Cloudflare Pages 構建
    ↓
自動部署到線上
    ↓
網站自動更新
```

### 您的網站 URL:

```
預設域名: https://kanae-real-estate.pages.dev
```

---

## 📚 相關文檔

- 📘 [CLOUDFLARE_BUILD_FIX_REPORT.md](./CLOUDFLARE_BUILD_FIX_REPORT.md) - 問題解決詳情
- 📙 [CLOUDFLARE_DEPLOYMENT_WALKTHROUGH.md](./CLOUDFLARE_DEPLOYMENT_WALKTHROUGH.md) - 完整部署步驟
- 📗 [CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md](./CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md) - 域名綁定指南

---

## 🔔 重要提醒

### ⚠️ 配置檢查表

在開始部署前，確認：

```
✓ Framework preset = "Next.js (Static Export)"
✓ Build command = "npm run build"
✓ Output directory = "out"
✓ Production branch = "main"
```

### ⚠️ 避免的錯誤配置

```
❌ Framework preset = "Next.js (SSR)"
❌ Output directory = ".next"
❌ Output directory = "dist"
```

---

**更新版本**: 2.0.0  
**更新日期**: 2026-01-12  
**狀態**: ✅ 配置已修復  
**下一步**: 更新 Cloudflare Pages 設定並重新部署

---

**📞 需要幫助？** 查看 [CLOUDFLARE_BUILD_FIX_REPORT.md](./CLOUDFLARE_BUILD_FIX_REPORT.md) 了解詳細的問題診斷和解決方案。
