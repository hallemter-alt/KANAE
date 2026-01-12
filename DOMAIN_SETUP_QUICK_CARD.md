# 🚀 Cloudflare 自定義域名設定快速參考卡

## 📍 Part 1: 添加域名到 Cloudflare

```
路徑：Dashboard > Websites > [+ Add a Site]

1. 輸入域名：kanae-estate.com
2. 選擇方案：Free
3. DNS 掃描：確認現有記錄
4. 記下 Nameservers：
   • clara.ns.cloudflare.com
   • noah.ns.cloudflare.com
```

## 📍 Part 2: 更改域名註冊商 Nameservers

```
前往域名註冊商（GoDaddy/Namecheap/Google Domains）

找到：域名管理 > Nameservers 設定

替換為：
NS1: clara.ns.cloudflare.com
NS2: noah.ns.cloudflare.com

⏱ 等待：5-60 分鐘（最長 48 小時）
```

## 📍 Part 3: Pages 添加 Custom Domain

```
路徑：Workers & Pages > [選擇專案] > Settings > Custom domains

1. 點擊：[Set up a custom domain]
2. 輸入域名：
   選項 A：www.kanae-estate.com （推薦先添加）
   選項 B：kanae-estate.com
3. 點擊：Activate domain
```

## 📍 Part 4: 配置 DNS 記錄

```
路徑：[選擇域名] > DNS > Records > [Add record]

記錄 1（www 子域名）：
┌─────────┬──────┬─────────────────────────────┬──────────┐
│ Type    │ Name │ Target                      │ Proxy    │
├─────────┼──────┼─────────────────────────────┼──────────┤
│ CNAME   │ www  │ kanae-real-estate.pages.dev │ Proxied☁│
└─────────┴──────┴─────────────────────────────┴──────────┘

記錄 2（根域名）：
┌─────────┬──────┬─────────────────────────────┬──────────┐
│ Type    │ Name │ Target                      │ Proxy    │
├─────────┼──────┼─────────────────────────────┼──────────┤
│ CNAME   │  @   │ kanae-real-estate.pages.dev │ Proxied☁│
└─────────┴──────┴─────────────────────────────┴──────────┘

⚠️ 確保 Proxy 狀態為 "Proxied"（橙色雲朵圖標）
```

## 📍 Part 5: SSL/TLS 設定

```
路徑：[選擇域名] > SSL/TLS

5.1 Overview > 加密模式
    選擇：● Full (strict)

5.2 Edge Certificates > Always Use HTTPS
    開關：[ON] ✅

5.3 Edge Certificates > Automatic HTTPS Rewrites
    開關：[ON] ✅

5.4 檢查 SSL 憑證狀態
    狀態：✅ Active Certificate
    ⏱ 如顯示 "Pending"，等待 5-15 分鐘
```

## 📍 Part 6: 驗證測試

```
✅ 檢查清單：

1. DNS 傳播
   □ 使用 https://dnschecker.org/ 檢查
   □ 全球多數節點顯示正確 IP/CNAME

2. 訪問網站
   □ https://www.kanae-estate.com 可訪問
   □ https://kanae-estate.com 可訪問
   □ 內容正確顯示

3. SSL 憑證
   □ 瀏覽器地址欄顯示 🔒 鎖頭圖標
   □ 點擊鎖頭 > 憑證有效
   □ 沒有 SSL 警告

4. HTTP 轉向
   □ 輸入 http://www.kanae-estate.com
   □ 自動轉向到 https://www.kanae-estate.com

5. SSL Labs 測試
   □ 前往 https://www.ssllabs.com/ssltest/
   □ 輸入域名並提交
   □ 目標評分：A 或 A+
```

## 🔧 快速故障排除

### DNS 無法解析
```bash
# 清除本地 DNS 緩存
Windows:  ipconfig /flushdns
macOS:    sudo dscacheutil -flushcache
Linux:    sudo systemd-resolve --flush-caches

# 檢查 DNS 記錄
nslookup www.kanae-estate.com
dig www.kanae-estate.com
```

### SSL 憑證 Pending
```
1. 確認 DNS 記錄 Proxy 為 "Proxied"
2. 等待 15-30 分鐘
3. 刪除並重新添加 Custom Domain
```

### Too Many Redirects
```
1. 檢查 SSL/TLS 模式：必須為 "Full (strict)"
2. 清除瀏覽器 Cookie 和緩存
3. 檢查 Pages 專案無衝突的重定向規則
```

## 📊 時間預估

| 步驟                    | 預估時間        |
|-------------------------|----------------|
| 添加域名到 Cloudflare    | 5 分鐘         |
| 更改 Nameservers        | 5 分鐘         |
| DNS 傳播等待            | 5-60 分鐘      |
| Pages 添加 Custom Domain| 2 分鐘         |
| 配置 DNS 記錄           | 3 分鐘         |
| SSL/TLS 設定            | 5 分鐘         |
| SSL 憑證生成等待        | 5-15 分鐘      |
| 驗證測試                | 5 分鐘         |
| **總計**                | **30-100 分鐘**|

## 🎯 一鍵複製指令

### DNS 檢查
```bash
# 檢查 www 子域名
nslookup www.kanae-estate.com

# 檢查根域名
nslookup kanae-estate.com

# 使用 dig 詳細查詢
dig www.kanae-estate.com +trace
```

### 測試 HTTP/HTTPS 轉向
```bash
# 測試 HTTP 是否轉向 HTTPS
curl -I http://www.kanae-estate.com

# 應該看到 301/302 重定向到 https://
```

### 檢查 SSL 憑證
```bash
# 查看 SSL 憑證詳情
openssl s_client -connect www.kanae-estate.com:443 -servername www.kanae-estate.com

# 檢查憑證過期時間
echo | openssl s_client -servername www.kanae-estate.com -connect www.kanae-estate.com:443 2>/dev/null | openssl x509 -noout -dates
```

## 📞 需要幫助？

- 📖 完整指南：參閱 `CLOUDFLARE_CUSTOM_DOMAIN_GUIDE.md`
- 🔗 Cloudflare 文檔：https://developers.cloudflare.com/pages/
- 💬 Cloudflare 社區：https://community.cloudflare.com/
- 📧 支援：透過 Cloudflare Dashboard 提交工單

---

**快速參考卡版本**: 1.0.0  
**最後更新**: 2026-01-12  
**列印建議**: A4 紙張，雙面列印
