# Cloudflare Pages 自定義域名綁定完整指南

## 📋 目錄

1. [前提條件](#前提條件)
2. [Part 1: 在 Cloudflare 中添加新域名](#part-1-在-cloudflare-中添加新域名)
3. [Part 2: 在 Pages 專案中設定 Custom Domain](#part-2-在-pages-專案中設定-custom-domain)
4. [Part 3: DNS 記錄設定](#part-3-dns-記錄設定)
5. [Part 4: SSL 憑證與 HTTPS 設定](#part-4-ssl-憑證與-https-設定)
6. [Part 5: 驗證與測試](#part-5-驗證與測試)
7. [常見問題排查](#常見問題排查)

---

## 前提條件

- ✅ 已擁有 Cloudflare 帳號
- ✅ 已購買域名（例如：kanae-estate.com）
- ✅ 已在 Cloudflare Pages 上部署了專案
- ✅ 具有域名註冊商的管理權限

---

## Part 1: 在 Cloudflare 中添加新域名

### 步驟 1.1: 登入 Cloudflare Dashboard

1. 前往 [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. 使用您的帳號登入

### 步驟 1.2: 添加新站點

1. 在左側導航欄中，點擊 **「Websites」**（網站）
2. 點擊右上角的 **「Add a Site」**（添加站點）按鈕

   ```
   ┌─────────────────────────────────────┐
   │  Cloudflare Dashboard               │
   │  ┌───────────────────────────────┐  │
   │  │ 🌐 Websites          [+ Add a Site] │
   │  └───────────────────────────────┘  │
   └─────────────────────────────────────┘
   ```

### 步驟 1.3: 輸入域名

1. 在彈出的輸入框中，輸入您的新域名
   - 例如：`kanae-estate.com`
   - **注意**：不要包含 `http://` 或 `www`
2. 點擊 **「Continue」**（繼續）

### 步驟 1.4: 選擇方案

1. Cloudflare 會顯示可用的方案選項
2. 對於一般用途，選擇 **「Free」**（免費方案）即可
3. 點擊 **「Continue」**（繼續）

### 步驟 1.5: DNS 記錄掃描

1. Cloudflare 會自動掃描您現有的 DNS 記錄
2. 檢查掃描結果，確認重要記錄都已被識別
3. 如有遺漏，可以手動添加
4. 點擊 **「Continue」**（繼續）

### 步驟 1.6: 更改 Nameservers

1. Cloudflare 會提供兩個 nameserver 地址，例如：
   ```
   NS1: clara.ns.cloudflare.com
   NS2: noah.ns.cloudflare.com
   ```

2. **重要**：前往您的域名註冊商（例如：GoDaddy、Namecheap、Google Domains）
3. 找到 **Nameserver 設定**區域
4. 將原有的 nameservers 替換為 Cloudflare 提供的 nameservers

   ```
   域名註冊商設定：
   ┌──────────────────────────────────────┐
   │ Nameservers 設定                      │
   ├──────────────────────────────────────┤
   │ Nameserver 1: clara.ns.cloudflare.com │
   │ Nameserver 2: noah.ns.cloudflare.com  │
   └──────────────────────────────────────┘
   ```

### 步驟 1.7: 等待 DNS 傳播

1. 在域名註冊商完成 nameserver 更改後，返回 Cloudflare
2. 點擊 **「Done, check nameservers」**（完成，檢查 nameservers）
3. DNS 傳播通常需要 **5-60 分鐘**，最長可能需要 **24-48 小時**
4. Cloudflare 會通過電子郵件通知您域名已激活

---

## Part 2: 在 Pages 專案中設定 Custom Domain

### 步驟 2.1: 進入 Pages 專案

1. 在 Cloudflare Dashboard 中，點擊左側的 **「Workers & Pages」**
2. 找到並點擊您的 Pages 專案名稱（例如：`kanae-real-estate`）

   ```
   ┌─────────────────────────────────────┐
   │  Workers & Pages                    │
   │  ┌───────────────────────────────┐  │
   │  │ 📄 kanae-real-estate          │  │  ← 點擊這裡
   │  │ 📄 other-project              │  │
   │  └───────────────────────────────┘  │
   └─────────────────────────────────────┘
   ```

### 步驟 2.2: 打開 Custom Domains 設定

1. 在專案頁面中，點擊頂部的 **「Settings」**（設定）標籤
2. 在左側菜單中，找到並點擊 **「Custom domains」**

   ```
   ┌─────────────────────────────────────┐
   │  Settings                            │
   │  ├─ General                          │
   │  ├─ Builds & Deployments            │
   │  ├─ Environment Variables           │
   │  ├─ Custom domains          ◀───── 點擊這裡
   │  └─ Access Policy                   │
   └─────────────────────────────────────┘
   ```

### 步驟 2.3: 添加自定義域名

1. 在 Custom domains 頁面中，點擊 **「Set up a custom domain」**（設定自定義域名）
2. 在彈出的輸入框中，輸入您想要使用的域名或子域名：
   
   **選項 A：使用子域名（推薦）**
   ```
   輸入：www.kanae-estate.com
   ```
   
   **選項 B：使用根域名**
   ```
   輸入：kanae-estate.com
   ```
   
   **選項 C：同時設定兩者**
   - 先添加 `www.kanae-estate.com`
   - 再添加 `kanae-estate.com`

3. 點擊 **「Continue」**（繼續）

### 步驟 2.4: 開始 DNS 配置

1. Cloudflare 會顯示需要添加的 DNS 記錄
2. 如果該域名已經在 Cloudflare 管理中，系統可能會自動添加記錄
3. 點擊 **「Activate domain」**（激活域名）

---

## Part 3: DNS 記錄設定

### DNS 記錄類型說明

根據您選擇的域名類型，需要設定不同的 DNS 記錄：

#### 情況 A：子域名（例如 www.kanae-estate.com）

**使用 CNAME 記錄**

| Type  | Name | Target                              | Proxy Status |
|-------|------|-------------------------------------|--------------|
| CNAME | www  | kanae-real-estate.pages.dev         | Proxied      |

#### 情況 B：根域名（例如 kanae-estate.com）

**選項 1：使用 CNAME 記錄（Cloudflare 自動處理）**

| Type         | Name | Target                              | Proxy Status |
|--------------|------|-------------------------------------|--------------|
| CNAME        | @    | kanae-real-estate.pages.dev         | Proxied      |

**選項 2：使用 A 記錄**

如果需要使用 A 記錄，請使用 Cloudflare 提供的 IP 地址：

| Type | Name | IPv4 Address | Proxy Status |
|------|------|--------------|--------------|
| A    | @    | [Cloudflare提供的IP] | Proxied      |

### 手動添加 DNS 記錄步驟

如果需要手動添加 DNS 記錄：

1. 在 Cloudflare Dashboard 中，進入您的域名
2. 點擊 **「DNS」** > **「Records」**
3. 點擊 **「Add record」**（添加記錄）
4. 填寫以下資訊：

   **對於子域名 (www)：**
   ```
   Type:    CNAME
   Name:    www
   Target:  kanae-real-estate.pages.dev
   Proxy status: Proxied (橙色雲朵圖標)
   TTL:     Auto
   ```

   **對於根域名 (@)：**
   ```
   Type:    CNAME
   Name:    @
   Target:  kanae-real-estate.pages.dev
   Proxy status: Proxied (橙色雲朵圖標)
   TTL:     Auto
   ```

5. 點擊 **「Save」**（保存）

### DNS 設定視覺化

```
┌──────────────────────────────────────────────────────────┐
│  DNS Records for kanae-estate.com                        │
├────────┬──────┬─────────────────────────────┬───────────┤
│  Type  │ Name │         Target              │   Proxy   │
├────────┼──────┼─────────────────────────────┼───────────┤
│ CNAME  │ www  │ kanae-real-estate.pages.dev │ Proxied ☁ │
│ CNAME  │  @   │ kanae-real-estate.pages.dev │ Proxied ☁ │
└────────┴──────┴─────────────────────────────┴───────────┘
```

---

## Part 4: SSL 憑證與 HTTPS 設定

### 步驟 4.1: 檢查 SSL 憑證狀態

1. 在 Cloudflare Dashboard 中，進入您的域名
2. 點擊左側的 **「SSL/TLS」**
3. 查看 SSL 憑證狀態

   **狀態說明：**
   - ✅ **Active Certificate**（活動憑證）：SSL 已正確配置
   - ⏳ **Pending**（待處理）：正在生成憑證（通常需要 5-15 分鐘）
   - ❌ **Error**（錯誤）：需要檢查配置

### 步驟 4.2: 設定 SSL/TLS 加密模式

1. 在 **「SSL/TLS」** > **「Overview」** 中
2. 選擇加密模式為 **「Full (strict)」**（完全嚴格模式）

   ```
   ┌──────────────────────────────────────┐
   │  SSL/TLS Encryption Mode             │
   ├──────────────────────────────────────┤
   │  ○ Off                               │
   │  ○ Flexible                          │
   │  ○ Full                              │
   │  ● Full (strict)          ◀───── 選擇這個
   └──────────────────────────────────────┘
   ```

### 步驟 4.3: 啟用 Always Use HTTPS

1. 點擊 **「SSL/TLS」** > **「Edge Certificates」**
2. 找到 **「Always Use HTTPS」**（始終使用 HTTPS）選項
3. 將開關切換為 **「On」**（開啟）

   ```
   ┌──────────────────────────────────────┐
   │  Always Use HTTPS                    │
   │  自動將所有 HTTP 請求重定向到 HTTPS   │
   │                            [ON]  ◀─── 開啟
   └──────────────────────────────────────┘
   ```

### 步驟 4.4: 啟用 Automatic HTTPS Rewrites

1. 在同一頁面中，找到 **「Automatic HTTPS Rewrites」**
2. 將開關切換為 **「On」**

### 步驟 4.5: 設定 HSTS（可選，但推薦）

1. 在 **「Edge Certificates」** 頁面中
2. 找到 **「HTTP Strict Transport Security (HSTS)」**
3. 點擊 **「Enable HSTS」**
4. 配置以下設定：
   - Max Age: 6 months (推薦)
   - Include subdomains: 啟用
   - Preload: 啟用（可選）

---

## Part 5: 驗證與測試

### 步驟 5.1: 驗證 DNS 傳播

使用以下工具檢查 DNS 是否已傳播：

```bash
# 使用 nslookup 檢查
nslookup www.kanae-estate.com

# 使用 dig 檢查
dig www.kanae-estate.com

# 使用線上工具
# https://dnschecker.org/
```

### 步驟 5.2: 訪問正式域名

1. 在瀏覽器中輸入您的域名：
   ```
   https://www.kanae-estate.com
   或
   https://kanae-estate.com
   ```

2. **驗證清單：**
   - ✅ 網站內容正確顯示
   - ✅ URL 欄顯示 `https://`（而非 `http://`）
   - ✅ 瀏覽器地址欄顯示鎖頭圖標 🔒
   - ✅ 沒有顯示 SSL 警告

### 步驟 5.3: 檢查 SSL 憑證

1. 點擊瀏覽器地址欄的鎖頭圖標 🔒
2. 查看憑證詳情：
   - **頒發給**：您的域名
   - **頒發者**：Cloudflare Inc ECC CA-3（或類似）
   - **有效期**：通常為 90 天
   - **狀態**：有效

### 步驟 5.4: 測試 HTTP 自動轉向

1. 在瀏覽器中輸入 HTTP 版本的 URL：
   ```
   http://www.kanae-estate.com
   ```

2. 檢查是否自動重定向到：
   ```
   https://www.kanae-estate.com
   ```

### 步驟 5.5: 使用 SSL 檢測工具

使用專業工具進行深度檢測：

```
🔗 SSL Labs Server Test
https://www.ssllabs.com/ssltest/

在輸入框中輸入您的域名，點擊 Submit
等待測試完成（通常需要 1-2 分鐘）
目標評分：A 或 A+
```

---

## 常見問題排查

### 問題 1: DNS 記錄無法生效

**症狀：** 訪問域名時顯示 "DNS_PROBE_FINISHED_NXDOMAIN"

**解決方案：**
1. 檢查 DNS 記錄是否正確配置
2. 等待 DNS 傳播完成（最多 48 小時）
3. 清除本地 DNS 緩存：
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### 問題 2: SSL 憑證顯示 "Pending"

**症狀：** SSL 憑證一直處於待處理狀態

**解決方案：**
1. 確認 DNS 記錄的 Proxy 狀態為 "Proxied"（橙色雲朵）
2. 等待 15-30 分鐘
3. 如果仍未解決，在 Pages 專案中刪除並重新添加自定義域名
4. 聯繫 Cloudflare 支援

### 問題 3: 出現 "Too Many Redirects" 錯誤

**症狀：** 瀏覽器顯示 "ERR_TOO_MANY_REDIRECTS"

**解決方案：**
1. 檢查 SSL/TLS 加密模式是否設定為 "Full (strict)"
2. 確認 Pages 專案沒有額外的重定向規則衝突
3. 清除瀏覽器 Cookie 和緩存

### 問題 4: 根域名無法訪問

**症狀：** `www.kanae-estate.com` 可以訪問，但 `kanae-estate.com` 不行

**解決方案：**
1. 確認已為根域名（@）添加 DNS 記錄
2. 在 Pages 專案的 Custom domains 中同時添加兩個域名
3. 檢查是否有 Page Rules 影響根域名

### 問題 5: Pages 專案找不到 Custom Domains 選項

**症狀：** Settings 中沒有 Custom domains 選項

**解決方案：**
1. 確認您使用的是 Pages（而非 Workers）
2. 確認專案已成功部署
3. 檢查帳號權限是否足夠

---

## 完整流程圖

```
┌─────────────────────────────────────────────────────────────┐
│                 Cloudflare 自定義域名綁定流程                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 1: 在 Cloudflare 添加新站點                            │
│  ✓ Dashboard > Add a Site                                   │
│  ✓ 輸入域名 (kanae-estate.com)                              │
│  ✓ 選擇 Free 方案                                            │
│  ✓ 更改域名註冊商的 Nameservers                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 2: 等待 DNS 傳播                                       │
│  ⏱ 通常需要 5-60 分鐘，最長 24-48 小時                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 3: 在 Pages 專案添加 Custom Domain                     │
│  ✓ Workers & Pages > 選擇專案                                │
│  ✓ Settings > Custom domains                                │
│  ✓ Set up a custom domain                                   │
│  ✓ 輸入 www.kanae-estate.com 和/或 kanae-estate.com         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 4: 配置 DNS 記錄                                       │
│  ✓ DNS > Records > Add record                               │
│  ✓ CNAME: www → kanae-real-estate.pages.dev (Proxied)      │
│  ✓ CNAME: @ → kanae-real-estate.pages.dev (Proxied)        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 5: 配置 SSL/TLS                                        │
│  ✓ SSL/TLS > Overview > Full (strict)                       │
│  ✓ Edge Certificates > Always Use HTTPS (ON)                │
│  ✓ 等待 SSL 憑證生成 (5-15 分鐘)                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 6: 驗證與測試                                          │
│  ✓ 訪問 https://www.kanae-estate.com                        │
│  ✓ 檢查 SSL 憑證狀態 (Active)                                │
│  ✓ 測試 HTTP → HTTPS 自動轉向                                │
│  ✓ 使用 SSL Labs 進行評分測試                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                         ✅ 完成！
```

---

## 快速檢查清單

使用此清單確保所有步驟都已完成：

### Cloudflare 站點設定
- [ ] 域名已添加到 Cloudflare
- [ ] Nameservers 已在註冊商處更改
- [ ] 域名狀態顯示為 "Active"

### DNS 記錄
- [ ] 已添加 www 子域名的 CNAME 記錄
- [ ] 已添加根域名（@）的 CNAME 記錄
- [ ] 所有記錄的 Proxy 狀態為 "Proxied"（橙色雲朵）
- [ ] DNS 傳播已完成

### Pages 專案設定
- [ ] 已在 Custom domains 中添加 www.yourdomain.com
- [ ] 已在 Custom domains 中添加 yourdomain.com
- [ ] 自定義域名狀態顯示為 "Active"

### SSL/TLS 設定
- [ ] SSL/TLS 加密模式設定為 "Full (strict)"
- [ ] SSL 憑證狀態顯示為 "Active"
- [ ] "Always Use HTTPS" 已啟用
- [ ] "Automatic HTTPS Rewrites" 已啟用

### 驗證測試
- [ ] https://www.yourdomain.com 可正常訪問
- [ ] https://yourdomain.com 可正常訪問
- [ ] 瀏覽器顯示鎖頭圖標
- [ ] HTTP 自動轉向到 HTTPS
- [ ] SSL Labs 測試評分為 A 或 A+

---

## 總結

完成以上所有步驟後，您的 Cloudflare Pages 專案應該已經成功綁定到自定義域名，並且：

1. ✅ 使用您的正式域名可以訪問網站
2. ✅ SSL 憑證已正確配置並處於 Active 狀態
3. ✅ HTTP 請求會自動重定向到 HTTPS
4. ✅ 網站享有 Cloudflare 的 CDN 加速和安全保護

如有任何問題，請參考 [常見問題排查](#常見問題排查) 部分，或聯繫 Cloudflare 支援團隊。

---

**文檔版本**: 1.0.0  
**最後更新**: 2026-01-12  
**適用於**: Cloudflare Pages + Next.js 專案
