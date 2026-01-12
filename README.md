# KANAE 不動產網站

## 株式会社KANAE - 物心両面の幸福と利他の心で、世界に通じる価値を創造する

高級且有設計感的不動產網站，基於KANAE公司的企業理念打造。

## 🎯 項目特色

### 設計理念
- **企業哲學驅動**: 完全基於KANAE的「誠意正心 知行合一」社是和七大經營原則
- **高級視覺設計**: 使用漸變色、動畫效果和現代化UI組件
- **響應式設計**: 完美適配桌面、平板和手機
- **多語言支持**: 日語、中文、英語三語切換

### 技術棧
- **框架**: Next.js 15 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **字體**: Inter + Noto Sans JP

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 開發環境運行
```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000) 查看網站。

### 構建生產版本
```bash
npm run build
npm start
```

## 📋 網站架構

### 首頁組件
1. **Navbar** - 導航欄（帶語言切換和滾動效果）
2. **Hero** - 英雄區域（包含公司理念和快速搜索）
3. **Services** - 四大業務展示
   - 賃貸事業
   - 売買事業
   - 管理事業
   - 民泊事業
4. **Philosophy** - 企業理念展示
   - Mission（使命）
   - Vision（願景）
   - Values（價值觀）
   - 七大經營原則
5. **Features** - 特色優勢
6. **Stats** - 數據統計
7. **CTA** - 行動召喚
8. **Footer** - 頁腳（包含公司信息和聯繫方式）

### 計劃中的頁面
- `/rent` - 賃貸物件搜索
- `/sale` - 売買物件搜索
- `/management` - 管理服務
- `/minpaku` - 民泊業務（OneStep PMS集成）
- `/about` - 公司概要
- `/philosophy` - 企業理念詳情
- `/contact` - 聯繫我們

## 🎨 設計系統

### 顏色配置
- **主色調**: Primary Blue (`#0ea5e9` - `#0c4a6e`)
- **輔助色**: Gold (`#eab308` - `#713f12`)
- **中性色**: Gray scale

### 組件風格
- 圓角設計（rounded-lg, rounded-xl, rounded-2xl）
- 陰影效果（shadow-lg, shadow-xl, shadow-2xl）
- 懸停動畫（hover:scale-105, hover:-translate-y-2）
- 漸變背景（gradient-to-br, gradient-to-r）

## 🌍 多語言支持

語言配置文件位於 `lib/i18n.ts`，支持：
- 日語（ja）- 默認語言
- 中文（zh）- 簡體中文
- 英語（en）

可通過導航欄的語言切換按鈕進行切換。

## 📱 響應式斷點

- **移動端**: < 768px
- **平板**: 768px - 1024px
- **桌面**: > 1024px

## 🔧 配置文件

- `next.config.ts` - Next.js配置
- `tailwind.config.ts` - Tailwind CSS配置
- `tsconfig.json` - TypeScript配置
- `postcss.config.mjs` - PostCSS配置

## 📞 公司信息

**株式会社KANAE**
- 住所: 〒169-0075 東京都豊島区高田3-16-4 Golje Bld.6F
- 電話: 03-6914-3633
- メール: info@kanae-tokyo.com
- 免許番号: 東京都知事(1)第107157号

## 🎓 企業理念

### 社是
**誠意正心 知行合一**
- 誠実な心を正しく保ち、学んだことを必ず実践する

### ビジョン
世界で戦えるブランドへの飛躍、永続的発展の実現

### ミッション
他社を凌駕する速さ・安さ・便利さでお客様の笑顔を創造する

### 経営理念 7つの原則
1. 全従業員の物心両面の幸福追求
2. 人として正しいことを判断基準
3. お取引先とのWin-Winパートナーシップ
4. 売上最大・経費最小／値決めは経営
5. 全員参加経営と創造的仕事
6. 誰にも負けない努力と六つの精進
7. 明るく前向き、夢と希望、素直な心

## 🔄 未來開發計劃

### 第一階段（已完成）
- ✅ 項目初始化和基礎配置
- ✅ 首頁設計和實現
- ✅ 多語言支持
- ✅ 響應式設計

### 第二階段（計劃中）
- 🔄 物件搜索功能（賃貸/売買）
- 🔄 物件詳情頁面
- 🔄 初期費用/稅金計算器
- 🔄 民泊業務頁面
- 🔄 OneStep PMS集成準備

### 第三階段（計劃中）
- 🔄 いえらぶ API集成
- 🔄 ITANDI集成
- 🔄 後台管理系統
- 🔄 CRM功能
- 🔄 民泊收益報表

## 📝 開發規範

### Git提交規範
- `feat:` - 新功能
- `fix:` - 錯誤修復
- `docs:` - 文檔更新
- `style:` - 代碼格式化
- `refactor:` - 代碼重構
- `test:` - 測試相關
- `chore:` - 構建/工具變動

### 代碼風格
- 使用TypeScript嚴格模式
- 遵循ESLint規則
- 組件使用函數式組件
- 優先使用Tailwind CSS類名

## 📄 許可證

© 2026 株式会社KANAE. All rights reserved.

---

**開發者備註**: 此網站基於KANAE公司的真實企業理念和價值觀打造，所有設計元素都反映了公司的「誠意正心 知行合一」精神。
