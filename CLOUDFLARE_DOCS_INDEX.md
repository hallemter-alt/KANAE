# 📚 Cloudflare 部署與域名設定文檔總覽

## 文檔結構

本專案包含完整的 Cloudflare Pages 部署和自定義域名設定文檔。

---

## 📄 文檔列表

### 1. 主要部署指南

#### 📘 [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
**用途**：Cloudflare Pages 完整部署指南

**內容涵蓋**：
- Next.js 專案 Cloudflare 優化配置
- Cloudflare Dashboard 設定步驟
- GitHub 整合與自動部署
- 環境變數配置
- 構建設定與輸出目錄
- 日後更新流程（git commit → push → 自動部署）
- 錯誤日誌查看方法
- 詳細故障排除指南

**適合對象**：首次部署 Cloudflare Pages 的開發者

---

#### 📙 [CLOUDFLARE_QUICK_REFERENCE.md](./CLOUDFLARE_QUICK_REFERENCE.md)
**用途**：Cloudflare 部署快速查閱卡

**內容涵蓋**：
- Cloudflare Pages 設定值總覽
- Build command 和 Output directory
- Production branch 配置
- 一鍵複製指令集合

**適合對象**：已熟悉流程，需要快速參考的開發者

---

### 2. 自定義域名設定

#### 📗 [CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md](./CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md)
**用途**：自定義域名綁定完整指南

**內容涵蓋**：
- Part 1: 在 Cloudflare 中添加新域名 (Add a Site)
- Part 2: 在 Pages 專案中設定 Custom Domain
- Part 3: DNS 記錄設定（CNAME 和 A 記錄）
- Part 4: SSL/TLS 憑證配置
- Part 5: 驗證與測試流程
- 完整故障排除指南
- 視覺化流程圖

**適合對象**：需要綁定正式域名的用戶

---

#### 📕 [DOMAIN_SETUP_QUICK_CARD.md](./DOMAIN_SETUP_QUICK_CARD.md)
**用途**：域名設定快速參考卡（可列印）

**內容涵蓋**：
- 6 個主要步驟的精簡說明
- DNS 配置表格範本
- 驗證檢查清單
- 快速故障排除
- 時間預估
- 一鍵複製指令

**適合對象**：執行域名設定時的逐步檢查清單

---

### 3. 專案管理文檔

#### 📄 [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
**用途**：部署前後完整檢查清單

**內容涵蓋**：
- 部署前準備工作
- Cloudflare 設定檢查項目
- 部署後驗證步驟
- 性能優化建議

---

#### 📄 [CLOUDFLARE_SETUP_COMPLETE.md](./CLOUDFLARE_SETUP_COMPLETE.md)
**用途**：Cloudflare 設定完成報告

**內容涵蓋**：
- 已完成的配置摘要
- 相關文檔快速連結
- 下一步行動計劃

---

## 🗺️ 使用流程圖

```
開始部署 Cloudflare Pages
         │
         ▼
┌────────────────────────┐
│ 1. 閱讀主要部署指南     │
│    📘 CLOUDFLARE_      │
│       DEPLOYMENT.md    │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ 2. 執行 Cloudflare     │
│    Dashboard 設定      │
│    • 連接 GitHub       │
│    • 配置 Build 設定   │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ 3. 驗證部署成功        │
│    訪問 *.pages.dev    │
└────────────────────────┘
         │
         ▼
    需要自定義域名？
         │
    Yes  │  No
         │   └─────────────> 完成！
         ▼
┌────────────────────────┐
│ 4. 閱讀域名設定指南    │
│    📗 CLOUDFLARE_      │
│    CUSTOM_DOMAIN_      │
│    GUIDE.md            │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ 5. 在 Cloudflare       │
│    添加域名            │
│    (Add a Site)        │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ 6. 更改 Nameservers    │
│    在域名註冊商處      │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ 7. 配置 DNS 記錄       │
│    • CNAME for www     │
│    • CNAME for @       │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ 8. 設定 SSL/TLS        │
│    • Full (strict)     │
│    • Always Use HTTPS  │
└────────────────────────┘
         │
         ▼
┌────────────────────────┐
│ 9. 驗證與測試          │
│    ✅ 參考快速檢查清單 │
│    📕 DOMAIN_SETUP_    │
│       QUICK_CARD.md    │
└────────────────────────┘
         │
         ▼
       完成！
```

---

## 📋 快速查閱表

### 需要執行首次部署？
👉 閱讀：[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)

### 需要設定自定義域名？
👉 閱讀：[CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md](./CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md)

### 需要快速參考配置值？
👉 查看：[CLOUDFLARE_QUICK_REFERENCE.md](./CLOUDFLARE_QUICK_REFERENCE.md)

### 執行域名設定時需要檢查清單？
👉 使用：[DOMAIN_SETUP_QUICK_CARD.md](./DOMAIN_SETUP_QUICK_CARD.md)

### 部署前需要檢查項目？
👉 參考：[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 🎯 關鍵配置值速查

### Cloudflare Pages 設定

```yaml
Project Name: kanae-real-estate
Framework Preset: Next.js (SSR)
Build Command: npm run build
Output Directory: .next
Production Branch: main
Node Version: 20 (推薦)
```

### DNS 記錄範本

```
# 子域名 (www)
Type: CNAME
Name: www
Target: kanae-real-estate.pages.dev
Proxy: Proxied ☁

# 根域名 (@)
Type: CNAME
Name: @
Target: kanae-real-estate.pages.dev
Proxy: Proxied ☁
```

### SSL/TLS 設定

```
Encryption Mode: Full (strict)
Always Use HTTPS: ON
Automatic HTTPS Rewrites: ON
Minimum TLS Version: 1.2 (推薦 1.3)
```

---

## 🔗 外部資源連結

### Cloudflare 官方文檔
- 📖 [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
- 📖 [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- 📖 [Custom Domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- 📖 [SSL/TLS Settings](https://developers.cloudflare.com/ssl/)

### 檢測工具
- 🔍 [DNS Checker](https://dnschecker.org/) - 檢查 DNS 傳播狀態
- 🔍 [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL 憑證評分測試
- 🔍 [WebPageTest](https://www.webpagetest.org/) - 網站性能測試

### 社區支援
- 💬 [Cloudflare Community](https://community.cloudflare.com/)
- 💬 [Cloudflare Discord](https://discord.cloudflare.com/)

---

## 📞 需要協助？

### 遇到部署問題？
1. 檢查 [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) 的「故障排除」部分
2. 查看 Cloudflare Dashboard 的 Build logs
3. 在 [Cloudflare Community](https://community.cloudflare.com/) 搜尋類似問題

### 遇到域名設定問題？
1. 參考 [CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md](./CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md) 的「常見問題排查」部分
2. 使用 [DNS Checker](https://dnschecker.org/) 檢查 DNS 狀態
3. 確認 Nameservers 已正確更改

### 遇到 SSL 憑證問題？
1. 確認 DNS 記錄的 Proxy 狀態為 "Proxied"
2. 等待 15-30 分鐘讓憑證生成
3. 檢查 SSL/TLS 加密模式是否為 "Full (strict)"

---

## 📊 文檔版本記錄

| 文檔名稱                              | 版本  | 最後更新    |
|--------------------------------------|-------|------------|
| CLOUDFLARE_DEPLOYMENT.md             | 1.0.0 | 2026-01-12 |
| CLOUDFLARE_QUICK_REFERENCE.md        | 1.0.0 | 2026-01-12 |
| CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md    | 1.0.0 | 2026-01-12 |
| DOMAIN_SETUP_QUICK_CARD.md           | 1.0.0 | 2026-01-12 |
| DEPLOYMENT_CHECKLIST.md              | 1.0.0 | 2026-01-12 |
| CLOUDFLARE_SETUP_COMPLETE.md         | 1.0.0 | 2026-01-12 |
| CLOUDFLARE_DOCS_INDEX.md (本文檔)    | 1.0.0 | 2026-01-12 |

---

## ✅ 使用建議

### 對於首次使用者
1. **從頭到尾閱讀** [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
2. **跟隨步驟執行**部署設定
3. **參考檢查清單**確保沒有遺漏步驟

### 對於有經驗的用戶
1. **快速查閱** [CLOUDFLARE_QUICK_REFERENCE.md](./CLOUDFLARE_QUICK_REFERENCE.md)
2. **直接執行**部署或域名設定
3. **遇到問題時**查看對應指南的故障排除部分

### 對於團隊協作
1. **分享本文檔**給新加入的團隊成員
2. **使用快速參考卡**作為標準操作流程
3. **維護文檔**，記錄團隊特定的配置和注意事項

---

**文檔總覽版本**: 1.0.0  
**最後更新**: 2026-01-12  
**維護者**: KANAE Real Estate 開發團隊

---

## 🌟 文檔品質承諾

- ✅ 所有步驟均已實際測試
- ✅ 包含詳細的視覺化說明
- ✅ 提供完整的故障排除指南
- ✅ 定期更新以反映最新的 Cloudflare 功能
- ✅ 歡迎提交改進建議

---

**💡 提示**：建議將此文檔加入書籤，作為 Cloudflare 部署與域名設定的中央參考點。
