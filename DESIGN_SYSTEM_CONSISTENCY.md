# 🎨 網站設計系統與一致性規範

**制定日期**: 2026-01-12  
**目的**: 確保全站設計風格一致性  
**適用範圍**: 所有頁面和組件

---

## 📋 當前問題分析

### 發現的不一致問題

| 頁面 | Hero 背景 | 頁面背景 | 問題 |
|------|----------|---------|------|
| **首頁** (/) | Hero 組件（深色漸變） | 各 Section 自定義 | ✅ 正確 |
| **會社概要** (/about) | gradient (深色) | bg-gray-50 | ❌ gradient 無白色文字 |
| **企業理念** (/philosophy) | gradient (深色) | bg-gray-50 | ❌ gradient 無白色文字 |
| **賃貸檢索** (/rent) | gradient (深色) | bg-gray-50 | ✅ 已修復（有白色文字） |
| **賃貸管理** (/management) | gradient (深色) | bg-gray-50 | ✅ 已修復（有白色文字） |
| **売買物件** (/sale) | 無 gradient | bg-gradient-to-b from-gray-50 to-white | ❌ 沒有統一 Hero |
| **民泊事業** (/minpaku) | 無 gradient | bg-gradient-to-b from-gray-50 to-white | ❌ 沒有統一 Hero |

---

## 🎯 統一設計規範

### 1. 頁面結構標準

所有內頁（非首頁）應使用以下結構：

```typescript
export default function PageName() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section - 深色漸變背景 + 白色文字 */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="text-center">
            <Heading level={1} align="center" className="mb-6 text-white">
              頁面標題
            </Heading>
            <Text size="xl" className="max-w-3xl mx-auto text-white/90">
              副標題或描述
            </Text>
          </div>
        </Container>
      </Section>

      {/* Content Sections */}
      <Section background="white" spacing="lg">
        {/* 內容 */}
      </Section>

      <Footer />
    </main>
  )
}
```

### 2. 顏色系統

#### 主色調 (Primary)
```
深色：primary-900 (#0c4a6e), primary-800 (#075985)
中色：primary-600 (#0284c7), primary-700 (#0369a1)
淺色：primary-50 (#f0f9ff), primary-100 (#e0f2fe)
```

#### 輔助色 (Secondary)
```
紫色：purple-900 (#701a75), purple-600 (#c026d3)
金色：gold-300, gold-500 (用於強調)
```

#### 灰階
```
文字：gray-900 (#111827), gray-700 (#374151)
背景：gray-50 (#f9fafb), white (#ffffff)
```

### 3. Hero Section 規範

#### 背景設定
```typescript
// 統一使用深色漸變
<Section background="gradient">
  // gradient = 'bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-purple-900/90'
```

#### 文字顏色
```typescript
// 標題：白色
<Heading level={1} className="text-white">

// 副標題：半透明白色
<Text className="text-white/90">
```

#### 間距
```typescript
// Hero section 使用 lg 間距
<Section spacing="lg">  // py-16 sm:py-24
```

### 4. Content Section 規範

#### 背景選擇
```typescript
// 白色背景：主要內容區
<Section background="white">

// 灰色背景：次要內容或分隔區
<Section background="gray">

// Primary 背景：強調區塊（很少使用）
<Section background="primary">
```

#### 文字顏色
```typescript
// 自動適配背景
<Heading level={2}>  // 自動使用 text-gray-900
<Text>               // 自動使用 text-gray-700
```

### 5. 響應式設計

#### 容器寬度
```typescript
<Container>              // 默認 xl (1280px)
<Container maxWidth="lg"> // 1024px（表單、詳細內容）
<Container maxWidth="md"> // 768px（文章、狹窄內容）
```

#### 間距
```typescript
spacing="sm"   // py-8 sm:py-12
spacing="md"   // py-12 sm:py-16
spacing="lg"   // py-16 sm:py-24  ← 標準
spacing="xl"   // py-24 sm:py-32
```

---

## 🔧 需要修復的頁面

### 1. About Page (/about)
**問題**: Hero section 使用 gradient 但文字沒有設置為白色

**修復**:
```typescript
<Heading level={1} align="center" className="mb-6 text-white">
  会社概要
</Heading>
<Text size="xl" className="max-w-3xl mx-auto text-white/90">
  物心両面の幸福と利他の心で、世界に通じる価値を創造する
</Text>
```

### 2. Philosophy Page (/philosophy)
**問題**: Hero section 使用 gradient 但文字沒有設置為白色

**修復**:
```typescript
<Heading level={1} align="center" className="mb-6 text-white">
  企業理念
</Heading>
<Text size="xl" className="max-w-3xl mx-auto text-white/90">
  物心両面の幸福と利他の心で、世界に通じる価値を創造する
</Text>
```

### 3. Sale Page (/sale)
**問題**: 
- 沒有使用統一的 Section 組件
- 背景是 `bg-gradient-to-b from-gray-50 to-white`
- Hero section 結構不統一

**完整重構**: 需要改為使用 Section + Container 組件結構

### 4. Minpaku Page (/minpaku)
**問題**: 
- 沒有使用統一的 Section 組件
- 背景是 `bg-gradient-to-b from-gray-50 to-white`
- Hero section 結構不統一

**完整重構**: 需要改為使用 Section + Container 組件結構

---

## 📐 設計原則

### 視覺層級
```
1. Hero Section (深色漸變 + 白色大標題)
   ↓
2. 主要內容區 (白色背景 + 深色文字)
   ↓
3. 次要內容區 (灰色背景 + 深色文字)
   ↓
4. CTA Section (可選：深色或彩色背景)
```

### 對比度要求
```
深色背景 + 白色文字: 10:1+ (AAA)
白色背景 + 深色文字: 7:1+ (AAA)
```

### 間距規律
```
Section 間距: 固定使用 spacing="lg"
Container 內間距: Card padding="lg"
文字行距: body 1.75, paragraph 1.8
```

---

## 🎨 品牌視覺識別

### 風格定位
- **專業優雅** - 深色漸變創造質感
- **現代簡約** - 清晰的版面和留白
- **易讀親和** - 高對比度文字和充足間距

### 配色哲學
- **主色（藍色）**: 信任、專業、穩定
- **輔色（紫色）**: 創新、品質、高端
- **點綴（金色）**: 優雅、成功、價值

### 字體使用
- **Noto Sans JP**: 主字體（日文優化）
- **Inter**: 英文和數字
- **行距**: 1.75-1.8（舒適閱讀）
- **字重**: 標題 bold/semibold，正文 normal

---

## ✅ 檢查清單

### 每個頁面必須包含
- [ ] Navbar（固定頂部）
- [ ] Hero Section（深色漸變 + 白色文字）
- [ ] Content Sections（白色/灰色背景）
- [ ] Footer（底部）

### Hero Section 必須
- [ ] 使用 `<Section background="gradient">`
- [ ] 標題使用 `text-white`
- [ ] 副標題使用 `text-white/90`
- [ ] 間距使用 `spacing="lg"`

### Content Sections 必須
- [ ] 使用 `<Section background="white">` 或 `"gray"`
- [ ] 標題自動使用深色（text-gray-900）
- [ ] 正文自動使用深色（text-gray-700）
- [ ] 適當的 Container maxWidth

### 響應式必須
- [ ] 移動端: 字體自動縮小
- [ ] 平板端: 適當的欄位調整
- [ ] 桌面端: 最大寬度限制

---

## 🚀 實施計畫

### Phase 1: 修復現有頁面 ✅
- [x] Rent page - 已修復
- [x] Management page - 已修復
- [ ] About page - 需要添加白色文字
- [ ] Philosophy page - 需要添加白色文字

### Phase 2: 重構不一致頁面
- [ ] Sale page - 完全重構
- [ ] Minpaku page - 完全重構

### Phase 3: 驗證與測試
- [ ] 視覺一致性檢查
- [ ] 響應式測試
- [ ] 對比度驗證
- [ ] 用戶體驗測試

---

## 📝 維護指南

### 新增頁面時
1. 複製標準頁面模板
2. 使用統一的 Section 組件
3. Hero section 必須使用 gradient + 白色文字
4. Content sections 使用 white/gray 背景

### 修改現有頁面時
1. 保持 Hero section 結構不變
2. 不要使用自定義背景色
3. 使用設計系統的顏色變量
4. 測試響應式效果

### 組件開發時
1. 使用 Layout.tsx 中的組件
2. 不要硬編碼顏色值
3. 支援自定義 className 覆寫
4. 保持 API 一致性

---

## 🎯 目標

### 用戶體驗
- ✅ 全站視覺一致
- ✅ 清晰的信息層級
- ✅ 舒適的閱讀體驗
- ✅ 專業的品牌形象

### 開發效率
- ✅ 標準化組件使用
- ✅ 可維護的代碼結構
- ✅ 快速的頁面開發
- ✅ 減少設計決策

---

**制定者**: Claude (AI Assistant)  
**版本**: v1.0  
**狀態**: 待實施

---

🎨 **設計系統規範完成！接下來執行頁面修復。**
