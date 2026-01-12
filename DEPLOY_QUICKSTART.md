# ⚡ Cloudflare Pages 部署 - 快速操作清單

## 🎯 5 分鐘快速部署

### 準備工作 ✅
- [x] 代碼已推送到 GitHub
- [x] 擁有 Cloudflare 帳號

---

## 📋 操作步驟

### 1️⃣ 登入 Cloudflare
```
🔗 https://dash.cloudflare.com/
```

### 2️⃣ 創建 Pages 專案
```
點擊：Workers & Pages > Create application > Pages > Connect to Git
```

### 3️⃣ 連接 GitHub
```
選擇：GitHub > 授權 > 選擇 KANAE 倉庫 > Begin setup
```

### 4️⃣ 配置構建（重要！）⚙️

```yaml
專案名稱：         kanae-real-estate
生產分支：         main
Framework preset： Next.js (SSR)  ← 不要選 Static Export
Build command：    npm run build
輸出目錄：         .next           ← 注意是 .next 不是 out
根目錄：           /（留空）
```

### 5️⃣ 部署
```
點擊：Save and Deploy
等待：2-5 分鐘
```

### 6️⃣ 驗證
```
訪問：https://kanae-real-estate.pages.dev
檢查：所有功能正常運作
```

---

## ✅ 驗證清單

```
部署成功標誌：
├─ [ ] 網站可訪問
├─ [ ] 首頁正常顯示
├─ [ ] 導航欄功能正常
├─ [ ] 語言切換可用
├─ [ ] 手機版正常
└─ [ ] 無錯誤訊息
```

---

## 🔧 關鍵配置提醒

### ⚠️ Framework Preset 必須選對
```
✅ 正確：Next.js (SSR)
❌ 錯誤：Next.js (Static Export)
```

### ⚠️ 輸出目錄必須正確
```
✅ 正確：.next
❌ 錯誤：out 或 dist
```

---

## 🆘 遇到問題？

### 構建失敗
```bash
檢查：View build log 查看錯誤
解決：確認 package.json 和依賴正確
```

### 頁面空白
```
檢查：瀏覽器 Console (F12)
確認：next.config.ts 有 output: 'standalone'
```

### 圖片無法載入
```
確認：next.config.ts 有 images.unoptimized: true
```

---

## 📞 詳細指南

📘 完整步驟：[CLOUDFLARE_DEPLOYMENT_WALKTHROUGH.md](./CLOUDFLARE_DEPLOYMENT_WALKTHROUGH.md)

---

## 🎉 完成後

### 自動部署已啟用 ✅
```
每次 git push → 自動構建 → 自動部署
```

### 下一步
```
1. 測試網站功能
2. 設定自定義域名（可選）
3. 繼續開發新功能
```

---

**⏱️ 預估時間：15-30 分鐘**  
**🎯 目標：網站成功部署到 Cloudflare Pages**

**現在就開始吧！** 👉 https://dash.cloudflare.com/
