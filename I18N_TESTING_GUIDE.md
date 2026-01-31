# i18n 完整修復驗收標準與測試指南

## 🎯 Acceptance Criteria（驗收清單）

### ✅ 核心功能

#### 1. URL-based 語言路由
- [ ] 訪問 `/` 自動重定向到 `/ja/`（或用戶偏好語言）
- [ ] 訪問 `/ja/about` 顯示日文版關於頁面
- [ ] 訪問 `/zh/about` 顯示中文版關於頁面
- [ ] 訪問 `/en/about` 顯示英文版關於頁面

#### 2. 語言切換（無需刷新）
- [ ] 點擊「日本語」按鈕，URL 立即變為 `/ja/*`
- [ ] 點擊「中文」按鈕，URL 立即變為 `/zh/*`
- [ ] 點擊「EN」按鈕，URL 立即變為 `/en/*`
- [ ] 切換後所有可見文字即時更新
- [ ] 切換後 Navbar 高亮正確語言按鈕

#### 3. 語言持久化
- [ ] 切換語言後，cookie `NEXT_LOCALE` 被設置
- [ ] 刷新頁面（F5），語言保持一致
- [ ] 關閉瀏覽器重新打開，語言保持一致（1年有效期）
- [ ] 清除 cookie 後，根據 `Accept-Language` header 自動檢測

#### 4. 深連結（Direct Link）
- [ ] 直接訪問 `https://www.kanae-tokyo.com/en/about` 顯示英文
- [ ] 分享 `/zh/rent` 鏈接給朋友，朋友打開是中文
- [ ] 從搜索引擎進入 `/ja/philosophy` 是日文

#### 5. SEO Metadata
- [ ] `/ja/*` 頁面的 `<html lang="ja">`
- [ ] `/zh/*` 頁面的 `<html lang="zh">`
- [ ] `/en/*` 頁面的 `<html lang="en">`
- [ ] 每個語言版本的 `<title>` 不同
- [ ] 每個語言版本的 `<meta description>` 不同
- [ ] `og:locale` 正確設置（ja_JP, zh_CN, en_US）
- [ ] `<link rel="alternate">` 包含所有語言版本

#### 6. SSR/CSR 一致性
- [ ] 禁用 JavaScript，頁面仍顯示正確語言（SSR）
- [ ] 首次加載無閃爍（語言已在 SSR 確定）
- [ ] View Source 查看 HTML，語言正確

---

## 🧪 測試步驟

### Test Case 1: 首次訪問語言檢測

**步驟**:
1. 清除所有 cookie 和 localStorage
2. 設置瀏覽器語言為「英語」
3. 訪問 `https://www.kanae-tokyo.com`

**預期結果**:
- 自動重定向到 `/en/`
- 顯示英文內容
- URL 是 `https://www.kanae-tokyo.com/en/`

---

### Test Case 2: 語言切換（日文→中文）

**步驟**:
1. 訪問 `/ja/about`
2. 點擊 Navbar 的「中文」按鈕
3. 觀察變化

**預期結果**:
- URL 立即變為 `/zh/about`（無頁面刷新）
- 所有文字從日文變為中文
- 「中文」按鈕高亮顯示
- 開發者工具 > Network：無新的文檔請求（只有客戶端路由）

---

### Test Case 3: 刷新後語言保持

**步驟**:
1. 訪問 `/en/rent`
2. 按 F5 刷新頁面
3. 檢查 URL 和內容

**預期結果**:
- URL 仍是 `/en/rent`
- 內容仍是英文
- Cookie `NEXT_LOCALE=en` 存在

---

### Test Case 4: 深連結分享

**步驟**:
1. 用隱私模式打開瀏覽器（無歷史記錄）
2. 直接訪問 `https://www.kanae-tokyo.com/zh/philosophy`
3. 檢查頁面

**預期結果**:
- 直接顯示中文企業理念頁面
- URL 保持 `/zh/philosophy`
- 無重定向閃爍

---

### Test Case 5: SEO Metadata 驗證

**步驟**:
1. 訪問 `/ja/`
2. View Page Source（查看源代碼）
3. 搜索 `<html`, `<title>`, `<meta`

**預期結果**:
```html
<html lang="ja" ...>
<title>KANAE - 物心両面の幸福と利他の心で、世界に通じる価値を創造する</title>
<meta property="og:locale" content="ja_JP">
<link rel="alternate" hreflang="ja" href="/ja">
<link rel="alternate" hreflang="zh" href="/zh">
<link rel="alternate" hreflang="en" href="/en">
```

---

### Test Case 6: 所有頁面語言一致性

**步驟**:
1. 切換到英文（`/en/`）
2. 依次訪問以下頁面：
   - `/en/rent`
   - `/en/sale`
   - `/en/management`
   - `/en/minpaku`
   - `/en/about`
   - `/en/philosophy`

**預期結果**:
- 所有頁面都是英文
- Navbar、Footer、內容全部一致
- URL 前綴都是 `/en/`

---

### Test Case 7: 語言按鈕高亮狀態

**步驟**:
1. 訪問 `/ja/about`
2. 觀察 Navbar 語言按鈕

**預期結果**:
- 「日本語」按鈕有藍色背景（`bg-primary-600`）
- 「中文」和「EN」是灰色背景

**步驟**:
3. 點擊「中文」
4. 再次觀察

**預期結果**:
- 「中文」按鈕變為藍色背景
- 「日本語」和「EN」變為灰色

---

### Test Case 8: 移動端語言切換

**步驟**:
1. 開啟開發者工具，模擬移動設備（iPhone 12）
2. 訪問 `/ja/rent`
3. 點擊漢堡菜單
4. 點擊「EN」按鈕

**預期結果**:
- 菜單自動收起
- URL 變為 `/en/rent`
- 內容變為英文
- 移動菜單中「EN」按鈕高亮

---

### Test Case 9: Cookie 優先級測試

**步驟**:
1. 設置瀏覽器語言為「日語」
2. 手動設置 cookie: `NEXT_LOCALE=zh`
3. 訪問 `https://www.kanae-tokyo.com`

**預期結果**:
- 重定向到 `/zh/`（cookie 優先於瀏覽器語言）

---

### Test Case 10: 無效語言路徑處理

**步驟**:
1. 訪問 `/fr/about`（法語，不支援）
2. 觀察行為

**預期結果**:
- 重定向到 `/ja/about`（默認語言）或根據 cookie/header 選擇

---

## 🔧 開發者驗證命令

### 檢查 Middleware 配置
```bash
cd /home/user/webapp
cat middleware.ts
# 應該看到 locales = ['ja', 'zh', 'en']
```

### 檢查頁面結構
```bash
ls -la app/[locale]/
# 應該有: about/ philosophy/ rent/ sale/ management/ minpaku/ page.tsx layout.tsx
```

### 本地測試
```bash
npm run dev
# 訪問 http://localhost:3000
# 測試所有上述 Test Cases
```

### 生產環境測試
```bash
# 部署後訪問
https://www.kanae-tokyo.com/
https://www.kanae-tokyo.com/ja/about
https://www.kanae-tokyo.com/zh/about
https://www.kanae-tokyo.com/en/about
```

---

## 🐛 已知問題與解決方案

### 問題1: API routes 404
**症狀**: `/api/*` 路徑返回 404

**原因**: Middleware 錯誤攔截了 API routes

**解決**: 檢查 `middleware.ts` 的 `matcher` 配置
```typescript
matcher: [
  '/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)',
]
```

### 問題2: 靜態資源路徑錯誤
**症狀**: 圖片、CSS 無法加載

**原因**: 資源路徑沒有排除在 middleware 外

**解決**: 確保 `matcher` 排除 `_next/static`, `images` 等目錄

### 問題3: 首次加載閃爍
**症狀**: 頁面先顯示默認語言，然後跳轉

**原因**: SSR 語言與客戶端不一致

**解決**: 確保 `initialLocale` 從 URL params 正確傳遞

---

## ✅ 最終驗收檢查表

完成以下所有項目後，i18n 修復完成：

- [ ] 所有 10 個測試用例通過
- [ ] 三種語言（ja/zh/en）都能正常切換
- [ ] URL 包含語言 prefix（如 `/ja/`, `/zh/`, `/en/`）
- [ ] 刷新後語言不變
- [ ] 深連結正確
- [ ] SEO metadata 多語言
- [ ] 無 JavaScript 仍能顯示正確語言（SSR）
- [ ] 移動端語言切換正常
- [ ] Cookie 和 URL 同步
- [ ] 所有頁面（8個以上）都支援三種語言

---

## 📊 測試覆蓋率目標

- **頁面覆蓋**: 100%（所有公開頁面）
- **語言覆蓋**: 100%（ja/zh/en）
- **功能覆蓋**: 
  - 語言檢測: ✅
  - 語言切換: ✅
  - 持久化: ✅
  - SEO: ✅
  - SSR/CSR: ✅

---

**測試負責人**: DevOps Team  
**驗收標準版本**: v1.0  
**最後更新**: 2026-01-12
