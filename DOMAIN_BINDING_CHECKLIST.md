# ⚡ 自定義域名綁定 - 快速執行清單

## 🎯 目標
將正式域名綁定到 Cloudflare Pages 專案

---

## 📍 Part 1: 添加域名到 Cloudflare

```
1️⃣  登入 https://dash.cloudflare.com/
2️⃣  點擊 Websites > Add a Site
3️⃣  輸入域名（例如：kanae-estate.com）
4️⃣  選擇 Free 方案
5️⃣  確認 DNS 記錄掃描結果
6️⃣  記下 Cloudflare 的 Nameservers
    例如：clara.ns.cloudflare.com
          noah.ns.cloudflare.com
7️⃣  前往域名註冊商更改 Nameservers
8️⃣  返回 Cloudflare 點擊 "Check nameservers"
9️⃣  等待 DNS 傳播（5-60 分鐘）
```

---

## 📍 Part 2: Pages 設定 Custom Domain

```
1️⃣  進入 Workers & Pages
2️⃣  點擊專案（kanae-real-estate）
3️⃣  點擊 Custom domains 標籤
4️⃣  點擊 "Set up a custom domain"
5️⃣  輸入域名：
    選項 A：www.kanae-estate.com（推薦先設定）
    選項 B：kanae-estate.com
6️⃣  點擊 Continue > Activate domain
7️⃣  重複步驟 4-6 添加另一個域名（可選）
```

---

## 📍 Part 3: 確認 DNS 記錄

```
位置：Cloudflare > 域名 > DNS > Records

應該看到：
┌──────┬──────┬─────────────────────────┬─────────┐
│ Type │ Name │ Target                  │ Proxy   │
├──────┼──────┼─────────────────────────┼─────────┤
│ CNAME│ www  │ kanae-real-estate.      │Proxied☁│
│      │      │ pages.dev               │         │
├──────┼──────┼─────────────────────────┼─────────┤
│ CNAME│  @   │ kanae-real-estate.      │Proxied☁│
│      │      │ pages.dev               │         │
└──────┴──────┴─────────────────────────┴─────────┘

⚠️ Proxy 必須為 Proxied（橙色雲朵）
```

---

## 📍 Part 4: SSL/TLS 設定

```
位置：Cloudflare > 域名 > SSL/TLS

1️⃣  Overview
    加密模式：Full (strict)

2️⃣  Edge Certificates
    ✅ Always Use HTTPS: ON
    ✅ Automatic HTTPS Rewrites: ON
    ✅ SSL 憑證狀態：Active

3️⃣  HSTS（可選）
    ✅ Enable HSTS
    Max Age: 6 months
    ✅ Apply to subdomains
```

---

## 📍 Part 5: 驗證測試

```
✅ 訪問測試
□ https://www.kanae-estate.com 可訪問
□ https://kanae-estate.com 可訪問
□ 瀏覽器顯示 🔒 鎖頭

✅ HTTPS 轉向測試
□ 輸入 http://www.kanae-estate.com
□ 自動轉向 https://www.kanae-estate.com

✅ SSL 憑證測試
□ 點擊鎖頭圖標查看憑證
□ 憑證狀態：Valid
□ 頒發者：Cloudflare

✅ SSL Labs 測試
□ 前往 ssllabs.com/ssltest
□ 輸入域名測試
□ 評分：A 或 A+

✅ 功能測試
□ 首頁正常顯示
□ 導航功能正常
□ 語言切換正常
□ 響應式設計正常
```

---

## ⚠️ 關鍵提醒

### DNS 記錄必須正確
```
✅ Type: CNAME（不是 A）
✅ Target: your-project.pages.dev
✅ Proxy: Proxied ☁（橙色雲朵）
```

### SSL 設定必須完整
```
✅ 加密模式：Full (strict)
✅ Always Use HTTPS: ON
✅ 憑證狀態：Active
```

### 時間預估
```
操作時間：    30-60 分鐘
等待時間：    10-120 分鐘（DNS 傳播 + SSL）
總計：        40-180 分鐘
```

---

## 🆘 快速排查

### DNS 無法解析
```
1. 確認 nameservers 已更改
2. 等待 DNS 傳播
3. 清除本地 DNS 緩存
   Windows: ipconfig /flushdns
   macOS: sudo dscacheutil -flushcache
```

### SSL 憑證 Pending
```
1. 確認 Proxy 為 Proxied
2. 等待 15-30 分鐘
3. 刪除並重新添加域名
```

### Too Many Redirects
```
1. 確認加密模式為 Full (strict)
2. 清除瀏覽器 Cookie
3. 使用無痕模式測試
```

---

## 📚 完整指南

詳細步驟請參考：
📘 [CUSTOM_DOMAIN_COMPLETE_GUIDE.md](./CUSTOM_DOMAIN_COMPLETE_GUIDE.md)

---

**⏰ 預計完成時間：1-3 小時**  
**🎯 完成後：可使用正式域名訪問網站**
