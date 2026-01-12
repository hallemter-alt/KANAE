# KANAE 不動產網站 - 下一階段功能清單（GitHub Issues 格式）

## 📋 功能清單總覽

本文檔列出 KANAE 不動產網站下一階段要開發的功能，每個功能都以 GitHub Issue 的格式撰寫，可直接複製使用。

**功能分類**：
- CRM 顧客管理系統（5 個 Issues）
- KPI 儀表板（3 個 Issues）
- 外部系統連接（3 個 Issues）

**總計**：11 個 Issues

---

## 🔷 CRM 顧客管理系統

### Issue #1: CRM 顧客管理 - 顧客列表頁面

**概要**  
建立 CRM 顧客管理系統的主要列表頁面，顯示所有顧客資料，並提供基本的搜尋、篩選和排序功能。

**預期畫面／API**
- **畫面**：`/admin/crm/customers`
  - 顯示顧客列表表格，包含欄位：
    - 顧客 ID
    - 姓名（姓 + 名）
    - 聯絡電話
    - Email
    - 顧客類型（賃貸/売買/民泊）
    - 顧客階段（潛在/洽談中/成交/流失）
    - 最後聯絡日期
    - 負責業務
    - 操作按鈕（查看/編輯/刪除）
  - 搜尋框：支援姓名、電話、Email 搜尋
  - 篩選器：顧客類型、顧客階段、負責業務
  - 排序功能：可按姓名、最後聯絡日期排序
  - 分頁功能：每頁顯示 20 筆
  - 「新增顧客」按鈕
- **API**：
  - `GET /api/admin/customers` - 取得顧客列表
    - Query 參數：`page`, `limit`, `search`, `type`, `stage`, `sort`
    - Response：顧客列表 + 分頁資訊

**驗收標準**
- [ ] 顧客列表正確顯示所有必要欄位
- [ ] 搜尋功能可正確搜尋姓名、電話、Email
- [ ] 篩選器可正確篩選顧客類型、階段、負責業務
- [ ] 排序功能正常運作
- [ ] 分頁功能正確，顯示總筆數
- [ ] 「新增顧客」按鈕可跳轉到新增頁面
- [ ] 查看/編輯/刪除按鈕可正常運作
- [ ] 響應式設計，手機版可正常使用
- [ ] API 回應時間 < 500ms（1000 筆資料內）

---

### Issue #2: CRM 顧客管理 - 新增顧客功能

**概要**  
建立新增顧客的表單頁面，允許業務人員輸入新顧客的完整資訊。

**預期畫面／API**
- **畫面**：`/admin/crm/customers/new`
  - 表單欄位：
    - *姓名（必填）：姓 + 名（分開欄位）
    - *聯絡電話（必填）：格式驗證
    - *Email（必填）：格式驗證
    - *顧客類型（必填）：賃貸/売買/民泊（下拉選單）
    - 顧客階段：潛在/洽談中/成交/流失（預設：潛在）
    - 負責業務：從員工列表選擇
    - 地址：完整地址輸入
    - 備註：多行文字輸入
    - 來源：廣告/官網/轉介/其他
  - 「儲存」和「取消」按鈕
  - 必填欄位標示清楚
  - 即時驗證與錯誤提示
- **API**：
  - `POST /api/admin/customers` - 新增顧客
    - Request Body：顧客資料（JSON）
    - Response：新增成功的顧客資料 + 顧客 ID

**驗收標準**
- [ ] 表單顯示所有必要欄位
- [ ] 必填欄位驗證正常（姓名、電話、Email、類型）
- [ ] Email 格式驗證正確
- [ ] 電話號碼格式驗證正確
- [ ] 顧客類型下拉選單正常運作
- [ ] 負責業務選擇器正常運作
- [ ] 「儲存」後成功新增顧客並跳轉到顧客詳細頁
- [ ] 「取消」按鈕返回列表頁
- [ ] 顯示成功/失敗訊息
- [ ] API 正確處理重複資料（如同一 Email）
- [ ] 響應式設計，手機版可正常使用

---

### Issue #3: CRM 顧客管理 - 顧客詳細頁面與編輯功能

**概要**  
建立顧客詳細資料頁面，顯示完整顧客資訊，並提供編輯功能。

**預期畫面／API**
- **畫面**：`/admin/crm/customers/:id`
  - **檢視模式**：
    - 顯示所有顧客資訊（區塊化呈現）
    - 基本資料區塊
    - 聯絡資訊區塊
    - 業務資訊區塊（類型、階段、負責人）
    - 備註區塊
    - 「編輯」按鈕
    - 「返回列表」按鈕
  - **編輯模式**：
    - 與新增表單相同的欄位
    - 預填現有資料
    - 「儲存」和「取消」按鈕
  - **互動記錄區塊**（未來擴充預留）：
    - 顯示與此顧客的互動歷史
- **API**：
  - `GET /api/admin/customers/:id` - 取得單一顧客詳細資料
    - Response：完整顧客資料
  - `PUT /api/admin/customers/:id` - 更新顧客資料
    - Request Body：更新的顧客資料（JSON）
    - Response：更新後的顧客資料

**驗收標準**
- [ ] 顧客詳細頁正確顯示所有資訊
- [ ] 資訊以區塊化方式清楚呈現
- [ ] 「編輯」按鈕切換到編輯模式
- [ ] 編輯模式預填所有現有資料
- [ ] 編輯後可成功儲存
- [ ] 驗證規則與新增功能一致
- [ ] 「取消」按鈕返回檢視模式
- [ ] 顯示成功/失敗訊息
- [ ] API 正確處理不存在的顧客 ID（404）
- [ ] 響應式設計，手機版可正常使用

---

### Issue #4: CRM 顧客管理 - 刪除顧客功能

**概要**  
提供刪除顧客的功能，並包含確認機制以防止誤刪。

**預期畫面／API**
- **畫面**：
  - 在顧客列表頁和詳細頁的「刪除」按鈕
  - 點擊後彈出確認對話框
    - 標題：「確認刪除」
    - 內容：「確定要刪除顧客「XXX」嗎？此操作無法復原。」
    - 「確認刪除」按鈕（紅色）
    - 「取消」按鈕
  - 刪除後顯示成功訊息並返回列表頁
- **API**：
  - `DELETE /api/admin/customers/:id` - 刪除顧客
    - Response：刪除成功訊息

**驗收標準**
- [ ] 「刪除」按鈕在列表頁和詳細頁都可正常顯示
- [ ] 點擊後彈出確認對話框
- [ ] 確認對話框顯示正確的顧客姓名
- [ ] 「確認刪除」成功刪除顧客
- [ ] 刪除後返回列表頁並顯示成功訊息
- [ ] 「取消」關閉對話框，不執行刪除
- [ ] API 正確處理不存在的顧客 ID（404）
- [ ] 刪除後該顧客不再出現在列表中
- [ ] 考慮軟刪除（soft delete）機制（資料標記為已刪除，不實際刪除）

---

### Issue #5: CRM 顧客管理 - 進階搜尋與匯出功能

**概要**  
提供進階搜尋功能，允許多條件組合查詢，並支援匯出顧客資料為 CSV 格式。

**預期畫面／API**
- **畫面**：
  - 在顧客列表頁新增「進階搜尋」按鈕
  - 點擊後展開進階搜尋面板：
    - 姓名（部分匹配）
    - 電話（部分匹配）
    - Email（部分匹配）
    - 顧客類型（多選）
    - 顧客階段（多選）
    - 負責業務（多選）
    - 來源（多選）
    - 建立日期範圍（開始日期 - 結束日期）
    - 最後聯絡日期範圍
    - 「搜尋」和「重置」按鈕
  - 「匯出 CSV」按鈕（匯出當前搜尋結果）
- **API**：
  - `GET /api/admin/customers/search` - 進階搜尋
    - Query 參數：所有搜尋條件
    - Response：符合條件的顧客列表
  - `GET /api/admin/customers/export` - 匯出 CSV
    - Query 參數：與搜尋相同的條件
    - Response：CSV 檔案下載

**驗收標準**
- [ ] 進階搜尋面板可正常展開/收合
- [ ] 所有搜尋條件欄位正常運作
- [ ] 多選欄位可正確選擇多個選項
- [ ] 日期範圍選擇器正常運作
- [ ] 「搜尋」按鈕執行搜尋並顯示結果
- [ ] 「重置」按鈕清除所有搜尋條件
- [ ] 搜尋結果正確顯示符合條件的顧客
- [ ] 「匯出 CSV」按鈕可下載 CSV 檔案
- [ ] CSV 檔案包含所有必要欄位
- [ ] CSV 檔案編碼正確（支援日文）
- [ ] 匯出的資料與搜尋結果一致
- [ ] API 正確處理多條件組合查詢

---

## 🔷 KPI 儀表板

### Issue #6: KPI 儀表板 - 賃貸業務 KPI 介面

**概要**  
建立賃貸業務的 KPI 儀表板，顯示問合せ數、內見數、申込數、成約數等關鍵指標。

**預期畫面／API**
- **畫面**：`/admin/dashboard/rental-kpi`
  - **時間選擇器**：
    - 本月/上月/本季/上季/本年/自訂日期範圍
  - **KPI 卡片區塊**（4 個並排）：
    - 問合せ數（Inquiries）
      - 本期數字（大字體）
      - 與上期比較（百分比 + 箭頭）
    - 內見數（Property Viewings）
      - 本期數字
      - 與上期比較
      - 內見率（內見數/問合せ數）
    - 申込數（Applications）
      - 本期數字
      - 與上期比較
      - 申込率（申込數/內見數）
    - 成約數（Contracts Signed）
      - 本期數字
      - 與上期比較
      - 成約率（成約數/申込數）
  - **轉換漏斗圖**：
    - 視覺化顯示從問合せ → 內見 → 申込 → 成約的流程
    - 每個階段顯示數量和轉換率
  - **趨勢圖表**：
    - 折線圖顯示各 KPI 的時間趨勢（過去 6 個月或自訂期間）
  - **業務排行榜**：
    - 顯示各業務人員的成約數排名（Top 10）
- **API**：
  - `GET /api/admin/kpi/rental` - 取得賃貸 KPI 資料
    - Query 參數：`start_date`, `end_date`
    - Response：各項 KPI 數據 + 趨勢資料

**驗收標準**
- [ ] 時間選擇器正常運作，可選擇不同時間範圍
- [ ] KPI 卡片正確顯示所有數據
- [ ] 與上期比較的百分比計算正確
- [ ] 各項轉換率計算正確
- [ ] 轉換漏斗圖視覺化清楚易懂
- [ ] 趨勢圖表正確顯示時間序列資料
- [ ] 業務排行榜正確顯示 Top 10
- [ ] 更改時間範圍後，所有資料即時更新
- [ ] 響應式設計，手機版可正常檢視
- [ ] API 回應時間 < 1 秒

---

### Issue #7: KPI 儀表板 - 売買業務 KPI 介面

**概要**  
建立売買業務的 KPI 儀表板，顯示査定件數、媒介契約件數、成約件數等關鍵指標。

**預期畫面／API**
- **畫面**：`/admin/dashboard/sales-kpi`
  - **時間選擇器**：
    - 本月/上月/本季/上季/本年/自訂日期範圍
  - **KPI 卡片區塊**（3 個並排）：
    - 査定件數（Property Appraisals）
      - 本期數字（大字體）
      - 與上期比較（百分比 + 箭頭）
    - 媒介契約件數（Listing Agreements）
      - 本期數字
      - 與上期比較
      - 締約率（媒介契約數/査定數）
    - 成約件數（Sales Contracts）
      - 本期數字
      - 與上期比較
      - 成約率（成約數/媒介契約數）
  - **成約金額統計**：
    - 總成約金額（億円単位）
    - 平均成約金額
    - 最高/最低成約金額
  - **轉換漏斗圖**：
    - 視覺化顯示從査定 → 媒介契約 → 成約的流程
  - **趨勢圖表**：
    - 折線圖顯示各 KPI 的時間趨勢
    - 長條圖顯示成約金額趨勢
  - **物件類型分布**：
    - 圓餅圖顯示成約物件類型（マンション/一戸建て/土地）
  - **業務排行榜**：
    - 顯示各業務人員的成約件數和成約金額排名
- **API**：
  - `GET /api/admin/kpi/sales` - 取得売買 KPI 資料
    - Query 參數：`start_date`, `end_date`
    - Response：各項 KPI 數據 + 趨勢資料 + 金額統計

**驗收標準**
- [ ] 時間選擇器正常運作
- [ ] KPI 卡片正確顯示所有數據
- [ ] 與上期比較的百分比計算正確
- [ ] 各項轉換率計算正確
- [ ] 成約金額統計正確（總額、平均、最高、最低）
- [ ] 轉換漏斗圖視覺化清楚
- [ ] 趨勢圖表和長條圖正確顯示
- [ ] 圓餅圖正確顯示物件類型分布
- [ ] 業務排行榜正確顯示排名
- [ ] 更改時間範圍後，所有資料即時更新
- [ ] 金額格式正確（千分位逗號、貨幣符號）
- [ ] 響應式設計，手機版可正常檢視
- [ ] API 回應時間 < 1 秒

---

### Issue #8: KPI 儀表板 - 民泊業務 KPI 介面

**概要**  
建立民泊業務的 KPI 儀表板，支援每月最多 30 件物件的売上、稼働率等關鍵指標。

**預期畫面／API**
- **畫面**：`/admin/dashboard/minpaku-kpi`
  - **月份選擇器**：
    - 選擇特定月份（年/月下拉選單）
  - **總覽 KPI 卡片**（4 個並排）：
    - 管理物件數
      - 本月管理的物件總數（最多 30 件）
    - 總売上（Total Revenue）
      - 本月總収入金額
      - 與上月比較
    - 平均稼働率（Average Occupancy Rate）
      - 所有物件的平均稼働率
      - 與上月比較
    - 平均 ADR（Average Daily Rate）
      - 平均每晚房價
      - 與上月比較
  - **物件列表表格**（最多顯示 30 件）：
    - 物件名稱
    - 所在地
    - 本月売上
    - 本月稼働率
    - 本月預訂天數
    - 本月平均房價
    - RevPAR（Revenue Per Available Room）
    - 操作按鈕（查看詳情）
    - 支援排序（按売上、稼働率等）
  - **趨勢圖表**：
    - 折線圖顯示過去 12 個月的總売上趨勢
    - 折線圖顯示過去 12 個月的平均稼働率趨勢
  - **稼働率分布**：
    - 長條圖顯示不同稼働率區間的物件數
    - 如：0-20%, 21-40%, 41-60%, 61-80%, 81-100%
  - **前 10 名物件**：
    - 売上 Top 10
    - 稼働率 Top 10
- **API**：
  - `GET /api/admin/kpi/minpaku` - 取得民泊 KPI 資料
    - Query 參數：`year`, `month`
    - Response：總覽 KPI + 30 件物件詳細資料 + 趨勢資料

**驗收標準**
- [ ] 月份選擇器正常運作
- [ ] 總覽 KPI 卡片正確顯示所有數據
- [ ] 支援最多 30 件物件的資料顯示
- [ ] 物件列表表格正確顯示所有欄位
- [ ] 売上、稼働率、ADR、RevPAR 計算正確
- [ ] 表格支援按不同欄位排序
- [ ] 趨勢圖表正確顯示 12 個月資料
- [ ] 稼働率分布長條圖正確顯示
- [ ] Top 10 排行榜正確顯示
- [ ] 更改月份後，所有資料即時更新
- [ ] 金額格式正確（千分位逗號、貨幣符號）
- [ ] 百分比格式正確（小數點後 1 位）
- [ ] 響應式設計，手機版可正常檢視
- [ ] API 回應時間 < 1 秒（30 件物件資料）

---

## 🔷 外部系統連接

### Issue #9: 外部系統連接 - いえらぶ物件同步（讀取）

**概要**  
建立與いえらぶ系統的物件資料同步功能，定期從いえらぶ讀取最新物件資料並同步到本系統資料庫。

**預期畫面／API**
- **畫面**：`/admin/integrations/ierabu`
  - **連接狀態區塊**：
    - 顯示連接狀態（已連接/未連接）
    - API 金鑰設定欄位（遮蔽顯示）
    - 「測試連接」按鈕
    - 「儲存設定」按鈕
  - **同步設定區塊**：
    - 自動同步開關
    - 同步頻率（每小時/每 4 小時/每日/手動）
    - 同步範圍（賃貸物件/売買物件/全部）
    - 「立即同步」按鈕
  - **同步歷史記錄**：
    - 顯示過去的同步記錄（時間、狀態、同步筆數、錯誤訊息）
    - 最近 20 筆記錄
  - **物件對應狀態**：
    - 顯示いえらぶ物件 ID 與本系統物件 ID 的對應關係
    - 可搜尋和查看對應表
- **API**：
  - `POST /api/admin/integrations/ierabu/test-connection` - 測試連接
    - Request Body：API 金鑰
    - Response：連接狀態
  - `POST /api/admin/integrations/ierabu/sync` - 立即同步
    - Request Body：同步範圍
    - Response：同步結果（成功筆數、失敗筆數、錯誤訊息）
  - `GET /api/admin/integrations/ierabu/sync-history` - 取得同步歷史
    - Response：同步記錄列表
  - `GET /api/admin/integrations/ierabu/mappings` - 取得物件對應關係
    - Query 參數：`search`, `page`, `limit`
    - Response：對應關係列表
- **背景任務**：
  - Cron Job：根據設定的同步頻率自動執行同步
  - 同步流程：
    1. 從いえらぶ API 讀取物件資料
    2. 比對本系統現有物件（使用いえらぶ物件 ID）
    3. 新增不存在的物件
    4. 更新已存在的物件
    5. 標記已下架的物件
    6. 記錄同步結果

**驗收標準**
- [ ] 可正確設定いえらぶ API 金鑰
- [ ] 「測試連接」功能正常，顯示連接成功/失敗
- [ ] 「儲存設定」成功儲存 API 金鑰（加密儲存）
- [ ] 自動同步開關正常運作
- [ ] 同步頻率設定正常運作
- [ ] 「立即同步」可手動觸發同步
- [ ] 同步流程正確執行（新增/更新/標記下架）
- [ ] 同步歷史記錄正確顯示
- [ ] 錯誤訊息清楚明確
- [ ] 物件對應關係正確建立和顯示
- [ ] 支援大量物件同步（1000+ 筆）
- [ ] 同步失敗時有重試機制
- [ ] Cron Job 正確按設定頻率執行
- [ ] 資料庫建立いえらぶ物件 ID 欄位和索引
- [ ] API 錯誤處理完善（如：いえらぶ API 無回應）

---

### Issue #10: 外部系統連接 - いえらぶ反響輸出（寫出）

**概要**  
建立將本系統收到的問合せ（反響）資料自動傳送到いえらぶ系統的功能。

**預期畫面／API**
- **畫面**：`/admin/integrations/ierabu`（與 Issue #9 同頁面，新增以下區塊）
  - **反響輸出設定區塊**：
    - 自動輸出開關
    - 輸出觸發條件：
      - 收到新問合せ時立即輸出
      - 批次輸出（每小時/每日）
    - 輸出範圍篩選：
      - 僅輸出與いえらぶ物件相關的問合せ
      - 輸出所有問合せ
    - 「測試輸出」按鈕（使用測試資料）
  - **輸出歷史記錄**：
    - 顯示過去的輸出記錄
    - 欄位：時間、問合せ ID、物件 ID、客戶姓名、輸出狀態、錯誤訊息
    - 最近 50 筆記錄
    - 支援搜尋和篩選（按狀態、日期）
  - **失敗處理區塊**：
    - 顯示輸出失敗的問合せ
    - 「重新輸出」按鈕
- **API**：
  - `POST /api/admin/integrations/ierabu/export-inquiry` - 輸出單一問合せ
    - Request Body：問合せ資料
    - Response：輸出結果
  - `POST /api/admin/integrations/ierabu/batch-export` - 批次輸出
    - Request Body：問合せ ID 列表
    - Response：批次輸出結果
  - `GET /api/admin/integrations/ierabu/export-history` - 取得輸出歷史
    - Query 參數：`status`, `start_date`, `end_date`, `page`, `limit`
    - Response：輸出記錄列表
  - `POST /api/admin/integrations/ierabu/retry-export/:id` - 重新輸出
    - Response：重新輸出結果
- **自動觸發機制**：
  - Webhook：當收到新問合せ時自動觸發輸出
  - 資料映射：將本系統問合せ欄位映射到いえらぶ反響格式
  - 錯誤重試：輸出失敗時自動重試 3 次（指數退避）

**驗收標準**
- [ ] 自動輸出開關正常運作
- [ ] 輸出觸發條件設定正常運作
- [ ] 「測試輸出」功能正常，可使用測試資料驗證
- [ ] 收到新問合せ時自動觸發輸出（如開啟自動輸出）
- [ ] 資料映射正確（本系統欄位 → いえらぶ格式）
- [ ] 輸出歷史記錄正確顯示
- [ ] 可搜尋和篩選輸出記錄
- [ ] 失敗的問合せ正確顯示在失敗處理區塊
- [ ] 「重新輸出」功能正常
- [ ] 批次輸出功能正常
- [ ] 錯誤重試機制正常運作
- [ ] 輸出失敗時記錄詳細錯誤訊息
- [ ] API 錯誤處理完善
- [ ] 資料庫建立輸出記錄表
- [ ] 效能測試：可處理大量問合せ輸出

---

### Issue #11: 外部系統連接 - ITANDI 申込/契約預留欄位與 API 連接

**概要**  
在資料庫中預留 ITANDI 申込 ID 和契約 ID 的欄位，並建立與 ITANDI API 連接的基礎架構（預留介面，暫不實作完整功能）。

**預期畫面／API**
- **資料庫結構**：
  - 在「申込」（Applications）表新增欄位：
    - `itandi_application_id`（VARCHAR, 索引）
    - `itandi_sync_status`（ENUM: pending/synced/failed）
    - `itandi_sync_at`（TIMESTAMP）
  - 在「契約」（Contracts）表新增欄位：
    - `itandi_contract_id`（VARCHAR, 索引）
    - `itandi_sync_status`（ENUM: pending/synced/failed）
    - `itandi_sync_at`（TIMESTAMP）
- **畫面**：`/admin/integrations/itandi`
  - **連接狀態區塊**：
    - 顯示連接狀態（未設定/已設定）
    - API 金鑰設定欄位
    - 「測試連接」按鈕
    - 「儲存設定」按鈕
    - 狀態提示：「ITANDI 連接功能將在後續版本實作」
  - **欄位映射預覽**：
    - 顯示本系統欄位 → ITANDI 欄位的映射關係
    - 僅供參考，暫不可編輯
  - **預留功能說明**：
    - 說明未來將支援的功能：
      - 申込資料同步到 ITANDI
      - 契約資料同步到 ITANDI
      - 從 ITANDI 讀取申込/契約狀態
- **API**（預留端點，回傳「功能開發中」訊息）：
  - `POST /api/admin/integrations/itandi/test-connection` - 測試連接（預留）
  - `POST /api/admin/integrations/itandi/sync-application` - 同步申込（預留）
  - `POST /api/admin/integrations/itandi/sync-contract` - 同步契約（預留）
  - `GET /api/admin/integrations/itandi/sync-status/:id` - 查詢同步狀態（預留）

**驗收標準**
- [ ] 資料庫成功新增 ITANDI 相關欄位
- [ ] 欄位類型和索引正確建立
- [ ] ITANDI 設定頁面正確顯示
- [ ] 可設定並儲存 API 金鑰（加密儲存）
- [ ] 「測試連接」按鈕回傳「功能開發中」訊息
- [ ] 欄位映射預覽正確顯示
- [ ] 預留功能說明清楚明確
- [ ] API 端點已建立但回傳「功能開發中」
- [ ] 資料庫 Migration 腳本正確
- [ ] 現有申込/契約資料不受影響
- [ ] 文檔記錄 ITANDI 欄位說明和未來實作計畫

---

### Issue #12: 外部系統連接 - OneStep PMS 民泊月次 CSV 匯入

**概要**  
建立從 OneStep PMS 匯入民泊月次資料的 CSV 上傳功能，並建立對應的資料庫結構。

**預期畫面／API**
- **資料庫結構**：
  - 建立「民泊月次資料」（Minpaku Monthly Data）表：
    - `id`（主鑰）
    - `property_id`（外鍵，關聯物件表）
    - `year_month`（年月，如：2026-01）
    - `onestep_property_id`（OneStep PMS 物件 ID）
    - `revenue`（売上）
    - `occupancy_rate`（稼働率）
    - `booked_nights`（預訂天數）
    - `available_nights`（可預訂天數）
    - `average_daily_rate`（平均房價）
    - `rev_par`（RevPAR）
    - `cleaning_fee`（清潔費）
    - `platform_fee`（平台手續費）
    - `net_revenue`（淨收入）
    - `imported_at`（匯入時間）
    - `created_at`, `updated_at`
  - 建立「物件-OneStep 對應」（Property OneStep Mapping）表：
    - `property_id`（本系統物件 ID）
    - `onestep_property_id`（OneStep PMS 物件 ID）
    - `property_name`（物件名稱）
    - `created_at`, `updated_at`
- **畫面**：`/admin/integrations/onestep`
  - **CSV 上傳區塊**：
    - 拖放上傳或點擊上傳 CSV 檔案
    - 顯示上傳檔案名稱和大小
    - 「上傳並預覽」按鈕
  - **CSV 格式說明**：
    - 說明必要欄位和格式
    - 提供範例 CSV 下載
    - 必要欄位列表：
      - OneStep 物件 ID
      - 年月（YYYY-MM）
      - 売上
      - 稼働率
      - 預訂天數
      - 可預訂天數
      - 平均房價
      - 等
  - **資料預覽區塊**：
    - 上傳後顯示 CSV 資料預覽（前 10 筆）
    - 欄位映射確認：
      - CSV 欄位 → 資料庫欄位
      - 可調整映射關係
    - 顯示資料驗證結果：
      - 有效筆數
      - 錯誤筆數
      - 錯誤詳情（如：缺少必要欄位、格式錯誤）
    - 「確認匯入」按鈕
  - **匯入歷史記錄**：
    - 顯示過去的匯入記錄
    - 欄位：時間、檔案名稱、匯入筆數、成功筆數、失敗筆數、狀態
    - 可下載匯入結果報告
  - **物件對應管理**：
    - 顯示 OneStep 物件 ID 與本系統物件的對應關係
    - 「新增對應」功能
    - 可編輯和刪除對應
- **API**：
  - `POST /api/admin/integrations/onestep/upload-csv` - 上傳 CSV 檔案
    - Request：multipart/form-data（CSV 檔案）
    - Response：CSV 資料預覽 + 驗證結果
  - `POST /api/admin/integrations/onestep/import` - 確認匯入
    - Request Body：欄位映射設定 + CSV 資料
    - Response：匯入結果（成功筆數、失敗筆數、錯誤詳情）
  - `GET /api/admin/integrations/onestep/import-history` - 取得匯入歷史
    - Response：匯入記錄列表
  - `GET /api/admin/integrations/onestep/mappings` - 取得物件對應關係
    - Response：對應關係列表
  - `POST /api/admin/integrations/onestep/mappings` - 新增物件對應
    - Request Body：OneStep 物件 ID + 本系統物件 ID
    - Response：新增成功訊息
  - `PUT /api/admin/integrations/onestep/mappings/:id` - 更新物件對應
  - `DELETE /api/admin/integrations/onestep/mappings/:id` - 刪除物件對應

**驗收標準**
- [ ] 資料庫表成功建立，欄位類型正確
- [ ] 索引正確建立（property_id, year_month, onestep_property_id）
- [ ] CSV 上傳功能正常（拖放和點擊上傳）
- [ ] 上傳後正確解析 CSV 檔案
- [ ] 資料預覽正確顯示前 10 筆
- [ ] 欄位映射功能正常，可調整映射關係
- [ ] 資料驗證正確（檢查必要欄位、格式、範圍）
- [ ] 驗證錯誤訊息清楚明確
- [ ] 「確認匯入」成功匯入資料
- [ ] 匯入時正確處理：
  - 新增不存在的資料
  - 更新已存在的資料（相同物件 + 年月）
  - 跳過無效資料
- [ ] 匯入歷史記錄正確顯示
- [ ] 可下載匯入結果報告（CSV 或 PDF）
- [ ] 物件對應管理功能完整（新增/編輯/刪除/查看）
- [ ] 支援大型 CSV 檔案（1000+ 筆）
- [ ] CSV 檔案編碼正確處理（支援 UTF-8, Shift-JIS）
- [ ] 範例 CSV 檔案可正確下載
- [ ] API 錯誤處理完善
- [ ] 效能測試：1000 筆資料匯入 < 30 秒

---

## 📊 功能開發優先級建議

### 🔴 高優先級（P0）
1. **Issue #1**: CRM 顧客列表頁面
2. **Issue #2**: CRM 新增顧客功能
3. **Issue #3**: CRM 顧客詳細頁面與編輯功能

**理由**：CRM 基本 CRUD 是核心功能，需要優先完成才能進行顧客管理。

---

### 🟠 中高優先級（P1）
4. **Issue #4**: CRM 刪除顧客功能
5. **Issue #6**: 賃貸業務 KPI 介面
6. **Issue #7**: 売買業務 KPI 介面
7. **Issue #9**: いえらぶ物件同步（讀取）

**理由**：完善 CRM 功能，並建立主要業務的 KPI 監控，以及重要的外部系統連接。

---

### 🟡 中優先級（P2）
8. **Issue #8**: 民泊業務 KPI 介面
9. **Issue #12**: OneStep PMS 民泊月次 CSV 匯入
10. **Issue #5**: CRM 進階搜尋與匯出功能
11. **Issue #10**: いえらぶ反響輸出（寫出）

**理由**：民泊相關功能和 CRM 進階功能，以及外部系統的寫出功能。

---

### 🟢 低優先級（P3）
12. **Issue #11**: ITANDI 申込/契約預留欄位與 API 連接

**理由**：此為預留功能，不影響現階段業務運作，可在後續版本實作。

---

## 📝 開發時程建議

### Sprint 1（2 週）
- Issue #1: CRM 顧客列表頁面
- Issue #2: CRM 新增顧客功能
- Issue #3: CRM 顧客詳細頁面與編輯功能

**交付成果**：完整的 CRM 基本 CRUD 功能

---

### Sprint 2（2 週）
- Issue #4: CRM 刪除顧客功能
- Issue #6: 賃貸業務 KPI 介面
- Issue #9: いえらぶ物件同步（讀取）- 第一階段（連接設定）

**交付成果**：完善 CRM 功能，建立第一個 KPI 儀表板，開始外部系統連接

---

### Sprint 3（2 週）
- Issue #7: 売買業務 KPI 介面
- Issue #9: いえらぶ物件同步（讀取）- 第二階段（同步功能）
- Issue #11: ITANDI 預留欄位（小任務，可穿插）

**交付成果**：第二個 KPI 儀表板，完成いえらぶ物件同步功能

---

### Sprint 4（2 週）
- Issue #8: 民泊業務 KPI 介面
- Issue #12: OneStep PMS 民泊月次 CSV 匯入

**交付成果**：第三個 KPI 儀表板，民泊資料匯入功能

---

### Sprint 5（2 週）
- Issue #5: CRM 進階搜尋與匯出功能
- Issue #10: いえらぶ反響輸出（寫出）

**交付成果**：CRM 進階功能，完成いえらぶ雙向整合

---

## 🛠️ 技術建議

### 前端技術
- **UI 框架**：繼續使用 Next.js + React
- **圖表庫**：推薦使用 [Recharts](https://recharts.org/) 或 [Chart.js](https://www.chartjs.org/) 製作 KPI 圖表
- **表格元件**：推薦使用 [TanStack Table](https://tanstack.com/table) 處理複雜表格功能
- **日期選擇器**：推薦使用 [react-datepicker](https://reactdatepicker.com/)
- **CSV 處理**：使用 [Papa Parse](https://www.papaparse.com/) 解析 CSV

### 後端技術
- **API 框架**：推薦使用 Next.js API Routes 或獨立的 Node.js + Express 後端
- **資料庫**：PostgreSQL 或 MySQL（支援複雜查詢和 JSON 欄位）
- **ORM**：Prisma 或 TypeORM
- **背景任務**：
  - Cron Job：使用 [node-cron](https://www.npmjs.com/package/node-cron)
  - 任務佇列：推薦使用 [Bull](https://github.com/OptimalBits/bull) 或 [BullMQ](https://docs.bullmq.io/)
- **CSV 處理**：使用 [csv-parser](https://www.npmjs.com/package/csv-parser)
- **API 整合**：使用 [axios](https://axios-http.com/) 或 [node-fetch](https://www.npmjs.com/package/node-fetch)

### 資料庫設計建議
- 建立適當的索引以提升查詢效能
- 考慮使用 UUID 作為主鍵（便於分散式系統）
- 外鍵約束確保資料完整性
- 軟刪除機制（使用 `deleted_at` 欄位）
- 審計欄位（`created_at`, `updated_at`, `created_by`, `updated_by`）

### 安全性建議
- API 金鑰加密儲存（使用環境變數或加密儲存）
- HTTPS 連接外部 API
- 輸入驗證和防止 SQL Injection
- CORS 設定
- Rate Limiting 防止 API 濫用
- 使用者權限控制（RBAC）

---

## 📄 文檔建議

為每個功能建立以下文檔：
1. **API 文檔**：使用 OpenAPI/Swagger
2. **資料庫 Schema 文檔**：ER 圖和欄位說明
3. **使用者操作手冊**：截圖 + 步驟說明
4. **開發者文檔**：技術架構、程式碼規範
5. **部署文檔**：環境設定、部署步驟

---

## 🎯 驗收流程建議

1. **單元測試**：每個 API 端點編寫單元測試
2. **整合測試**：測試與外部系統的整合
3. **UI 測試**：使用 Cypress 或 Playwright 進行 E2E 測試
4. **效能測試**：使用 Apache JMeter 或 k6 進行負載測試
5. **安全測試**：檢查 SQL Injection、XSS 等漏洞
6. **UAT（使用者驗收測試）**：由實際使用者進行測試

---

## ✅ 完成

以上 12 個 GitHub Issues 涵蓋了 CRM 顧客管理、KPI 儀表板、外部系統連接的所有功能需求。

每個 Issue 都包含：
- ✅ 清楚的概要說明
- ✅ 詳細的畫面和 API 規格
- ✅ 具體的驗收標準

可直接複製到 GitHub Issues 使用，並根據團隊需求調整細節。

---

**建立日期**：2026-01-12  
**版本**：v1.0  
**狀態**：✅ 已完成
