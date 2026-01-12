# ✅ 下一階段功能清單完成報告

## 📋 任務完成總結

已成功為 KANAE 不動產網站設計完整的「下一階段功能清單」，並以 GitHub Issues 格式輸出。

---

## 📊 功能清單統計

| 分類 | Issues 數量 | 功能說明 |
|------|-----------|---------|
| 🔷 CRM 顧客管理系統 | 5 | 完整的顧客 CRUD + 進階搜尋匯出 |
| 🔷 KPI 儀表板 | 3 | 賃貸/売買/民泊三大業務 KPI |
| 🔷 外部系統連接 | 4 | いえらぶ/ITANDI/OneStep PMS 整合 |
| **總計** | **12** | **完整的功能路線圖** |

---

## 🔷 功能詳細列表

### CRM 顧客管理系統（5 個 Issues）

#### Issue #1: CRM 顧客管理 - 顧客列表頁面
- **畫面**：`/admin/crm/customers`
- **功能**：顯示所有顧客、搜尋、篩選、排序、分頁
- **API**：`GET /api/admin/customers`

#### Issue #2: CRM 顧客管理 - 新增顧客功能
- **畫面**：`/admin/crm/customers/new`
- **功能**：完整的新增顧客表單（姓名、電話、Email、類型等）
- **API**：`POST /api/admin/customers`

#### Issue #3: CRM 顧客管理 - 顧客詳細頁面與編輯功能
- **畫面**：`/admin/crm/customers/:id`
- **功能**：查看詳細資料、編輯顧客資訊
- **API**：`GET /api/admin/customers/:id`, `PUT /api/admin/customers/:id`

#### Issue #4: CRM 顧客管理 - 刪除顧客功能
- **功能**：刪除顧客（含確認對話框）、軟刪除機制
- **API**：`DELETE /api/admin/customers/:id`

#### Issue #5: CRM 顧客管理 - 進階搜尋與匯出功能
- **功能**：多條件組合搜尋、匯出 CSV、日期範圍篩選
- **API**：`GET /api/admin/customers/search`, `GET /api/admin/customers/export`

---

### KPI 儀表板（3 個 Issues）

#### Issue #6: KPI 儀表板 - 賃貸業務 KPI 介面
- **畫面**：`/admin/dashboard/rental-kpi`
- **KPI 指標**：
  - 問合せ數（Inquiries）
  - 內見數（Property Viewings）+ 內見率
  - 申込數（Applications）+ 申込率
  - 成約數（Contracts Signed）+ 成約率
- **視覺化**：轉換漏斗圖、趨勢圖表、業務排行榜
- **API**：`GET /api/admin/kpi/rental`

#### Issue #7: KPI 儀表板 - 売買業務 KPI 介面
- **畫面**：`/admin/dashboard/sales-kpi`
- **KPI 指標**：
  - 査定件數（Property Appraisals）
  - 媒介契約件數（Listing Agreements）+ 締約率
  - 成約件數（Sales Contracts）+ 成約率
  - 成約金額統計（總額、平均、最高、最低）
- **視覺化**：轉換漏斗圖、趨勢圖表、物件類型分布、業務排行榜
- **API**：`GET /api/admin/kpi/sales`

#### Issue #8: KPI 儀表板 - 民泊業務 KPI 介面
- **畫面**：`/admin/dashboard/minpaku-kpi`
- **KPI 指標**（支援最多 30 件物件）：
  - 管理物件數
  - 總売上（Total Revenue）
  - 平均稼働率（Average Occupancy Rate）
  - 平均 ADR（Average Daily Rate）
- **物件列表**：每件物件的売上、稼働率、預訂天數、RevPAR
- **視覺化**：趨勢圖表、稼働率分布、Top 10 排行榜
- **API**：`GET /api/admin/kpi/minpaku`

---

### 外部系統連接（4 個 Issues）

#### Issue #9: 外部系統連接 - いえらぶ物件同步（讀取）
- **畫面**：`/admin/integrations/ierabu`
- **功能**：
  - API 金鑰設定與測試連接
  - 自動同步設定（頻率、範圍）
  - 立即同步按鈕
  - 同步歷史記錄
  - 物件對應狀態
- **背景任務**：Cron Job 自動定期同步
- **API**：
  - `POST /api/admin/integrations/ierabu/test-connection`
  - `POST /api/admin/integrations/ierabu/sync`
  - `GET /api/admin/integrations/ierabu/sync-history`
  - `GET /api/admin/integrations/ierabu/mappings`

#### Issue #10: 外部系統連接 - いえらぶ反響輸出（寫出）
- **畫面**：同 `/admin/integrations/ierabu`（新增輸出區塊）
- **功能**：
  - 自動輸出開關與觸發條件
  - 輸出歷史記錄
  - 失敗處理與重新輸出
- **自動觸發**：收到新問合せ時自動輸出到いえらぶ
- **API**：
  - `POST /api/admin/integrations/ierabu/export-inquiry`
  - `POST /api/admin/integrations/ierabu/batch-export`
  - `GET /api/admin/integrations/ierabu/export-history`
  - `POST /api/admin/integrations/ierabu/retry-export/:id`

#### Issue #11: 外部系統連接 - ITANDI 申込/契約預留欄位與 API 連接
- **資料庫結構**：
  - 申込表新增：`itandi_application_id`, `itandi_sync_status`, `itandi_sync_at`
  - 契約表新增：`itandi_contract_id`, `itandi_sync_status`, `itandi_sync_at`
- **畫面**：`/admin/integrations/itandi`（預留介面）
- **狀態**：功能預留，暫不實作完整功能
- **API**：預留端點，回傳「功能開發中」訊息

#### Issue #12: 外部系統連接 - OneStep PMS 民泊月次 CSV 匯入
- **資料庫結構**：
  - 「民泊月次資料」表（Minpaku Monthly Data）
  - 「物件-OneStep 對應」表（Property OneStep Mapping）
- **畫面**：`/admin/integrations/onestep`
- **功能**：
  - CSV 上傳（拖放或點擊）
  - 資料預覽與驗證
  - 欄位映射設定
  - 確認匯入
  - 匯入歷史記錄
  - 物件對應管理
- **API**：
  - `POST /api/admin/integrations/onestep/upload-csv`
  - `POST /api/admin/integrations/onestep/import`
  - `GET /api/admin/integrations/onestep/import-history`
  - `GET /api/admin/integrations/onestep/mappings`
  - `POST /api/admin/integrations/onestep/mappings`

---

## 🎯 開發優先級建議

### 🔴 高優先級（P0）- Sprint 1（2 週）
1. Issue #1: CRM 顧客列表頁面
2. Issue #2: CRM 新增顧客功能
3. Issue #3: CRM 顧客詳細頁面與編輯功能

**交付成果**：完整的 CRM 基本 CRUD 功能

---

### 🟠 中高優先級（P1）- Sprint 2（2 週）
4. Issue #4: CRM 刪除顧客功能
5. Issue #6: 賃貸業務 KPI 介面
6. Issue #9: いえらぶ物件同步（讀取）- 第一階段

**交付成果**：完善 CRM 功能，建立第一個 KPI 儀表板

---

### 🟡 中優先級（P2）- Sprint 3-4（4 週）
7. Issue #7: 売買業務 KPI 介面
8. Issue #8: 民泊業務 KPI 介面
9. Issue #9: いえらぶ物件同步（讀取）- 第二階段
10. Issue #12: OneStep PMS 民泊月次 CSV 匯入
11. Issue #11: ITANDI 預留欄位

**交付成果**：完整 KPI 儀表板系統，民泊資料匯入功能

---

### 🟢 低優先級（P3）- Sprint 5（2 週）
12. Issue #5: CRM 進階搜尋與匯出功能
13. Issue #10: いえらぶ反響輸出（寫出）

**交付成果**：CRM 進階功能，完成いえらぶ雙向整合

---

## 📅 開發時程規劃

| Sprint | 週數 | Issues | 功能重點 |
|--------|-----|--------|---------|
| Sprint 1 | 第 1-2 週 | #1, #2, #3 | CRM 基本 CRUD |
| Sprint 2 | 第 3-4 週 | #4, #6, #9(1) | 完善 CRM + 賃貸 KPI |
| Sprint 3 | 第 5-6 週 | #7, #9(2), #11 | 売買 KPI + いえらぶ同步 |
| Sprint 4 | 第 7-8 週 | #8, #12 | 民泊 KPI + OneStep 匯入 |
| Sprint 5 | 第 9-10 週 | #5, #10 | CRM 進階 + いえらぶ輸出 |

**總開發時程**：約 10 週（2.5 個月）

---

## 🛠️ 技術建議摘要

### 前端技術
- **UI 框架**：Next.js + React（已使用）
- **圖表庫**：Recharts 或 Chart.js（KPI 視覺化）
- **表格元件**：TanStack Table（複雜表格功能）
- **日期選擇器**：react-datepicker
- **CSV 處理**：Papa Parse

### 後端技術
- **API 框架**：Next.js API Routes 或 Node.js + Express
- **資料庫**：PostgreSQL 或 MySQL
- **ORM**：Prisma 或 TypeORM
- **背景任務**：node-cron（Cron Job）+ Bull/BullMQ（任務佇列）
- **CSV 處理**：csv-parser
- **API 整合**：axios 或 node-fetch

### 資料庫設計
- 適當的索引（提升查詢效能）
- 外鍵約束（資料完整性）
- 軟刪除機制（`deleted_at` 欄位）
- 審計欄位（`created_at`, `updated_at`, `created_by`, `updated_by`）

### 安全性
- API 金鑰加密儲存
- HTTPS 連接外部 API
- 輸入驗證與防止 SQL Injection
- CORS 設定與 Rate Limiting
- 使用者權限控制（RBAC）

---

## 📄 每個 Issue 包含的內容

每個 GitHub Issue 都包含以下三個部分：

### 1️⃣ 概要
清楚說明功能的目的和主要內容

### 2️⃣ 預期畫面／API
- **畫面**：
  - 頁面路徑
  - 詳細的畫面規格
  - 欄位說明
  - 互動行為
- **API**：
  - 端點路徑
  - HTTP 方法
  - 請求參數
  - 回應格式

### 3️⃣ 驗收標準
- [ ] 具體的驗收條件（可勾選）
- [ ] 功能正確性驗證
- [ ] 效能要求
- [ ] 響應式設計
- [ ] 錯誤處理

---

## 📊 功能涵蓋範圍

| 功能類別 | 涵蓋內容 |
|---------|---------|
| **CRM 基本功能** | ✅ 列表、新增、編輯、刪除、搜尋 |
| **CRM 進階功能** | ✅ 進階搜尋、匯出 CSV、多條件篩選 |
| **賃貸 KPI** | ✅ 問合せ數、內見數、申込數、成約數、轉換率 |
| **売買 KPI** | ✅ 査定件數、媒介契約數、成約數、成約金額統計 |
| **民泊 KPI** | ✅ 売上、稼働率、ADR、RevPAR（支援 30 件物件） |
| **いえらぶ整合** | ✅ 物件同步（讀取）+ 反響輸出（寫出） |
| **ITANDI 整合** | ✅ 資料庫欄位預留 + API 端點預留 |
| **OneStep PMS 整合** | ✅ CSV 匯入 + 資料驗證 + 物件對應管理 |

---

## 🎯 使用方式

### 1. 查看完整文檔
開啟 `FEATURE_ROADMAP_GITHUB_ISSUES.md` 查看所有 12 個 Issues 的詳細內容。

### 2. 建立 GitHub Issues
- 複製每個 Issue 的內容
- 在 GitHub 倉庫建立新 Issue
- 貼上內容（標題 + 概要 + 預期畫面／API + 驗收標準）
- 設定 Labels（如：enhancement, CRM, KPI, integration）
- 指派給相關開發人員
- 設定 Milestone（如：Sprint 1, Sprint 2）

### 3. 開發流程
1. 按優先級順序開發
2. 參考驗收標準進行開發
3. 完成後勾選驗收標準
4. 通過所有驗收標準後關閉 Issue

### 4. 專案管理
- 使用 GitHub Projects 建立看板
- 將 Issues 加入看板
- 追蹤開發進度

---

## 📈 預期成果

完成所有功能後，KANAE 不動產網站將具備：

### ✅ 完整的 CRM 系統
- 顧客資料管理
- 進階搜尋與匯出
- 互動記錄追蹤（未來擴充）

### ✅ 全面的 KPI 儀表板
- 賃貸業務監控
- 売買業務監控
- 民泊業務監控（最多 30 件物件）
- 視覺化圖表與趨勢分析

### ✅ 外部系統整合
- いえらぶ：物件同步 + 反響輸出
- ITANDI：欄位預留（未來擴充）
- OneStep PMS：民泊資料匯入

---

## 🔗 相關文檔

| 文檔名稱 | 說明 |
|---------|------|
| `FEATURE_ROADMAP_GITHUB_ISSUES.md` | 完整的功能清單與 GitHub Issues 格式 |
| `TESTING_TABLE_3COLUMN.md` | 網站測試清單（三欄表格） |
| `WEBSITE_TESTING_CHECKLIST.md` | 完整測試清單（五欄表格） |
| `PROJECT_OVERVIEW.md` | 專案總覽 |
| `CLOUDFLARE_DEPLOYMENT_WALKTHROUGH.md` | 部署指南 |

---

## 🎉 任務完成！

✅ 已完成 12 個 GitHub Issues 的設計  
✅ 每個 Issue 包含概要、畫面/API、驗收標準  
✅ 提供優先級建議與開發時程規劃  
✅ 包含技術建議與安全性考量  
✅ 文檔已推送到 GitHub

**下一步**：
1. 在 GitHub 建立 Issues
2. 建立 Project 看板
3. 開始 Sprint 1 開發

需要協助建立 GitHub Issues 或其他功能，隨時告訴我！

---

**建立日期**：2026-01-12  
**文檔版本**：v1.0  
**狀態**：✅ 已完成
