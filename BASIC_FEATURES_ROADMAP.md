# 基本機能実装ロードマップ

## 🎯 目的

Task 0-2（Vercel デプロイ）と Task 0-3（ドメイン接続）の合間に、基本機能の実装を進める。

---

## 📋 実装優先順位

### Phase 1：データ基盤（Week 1-2）
| 機能 | 優先度 | 所要時間 | ステータス |
|------|--------|---------|-----------|
| データベース設計 | P0 | 1 日 | ⏳ 待機中 |
| Prisma セットアップ | P0 | 0.5 日 | ⏳ 待機中 |
| 基本モデル実装 | P0 | 1 日 | ⏳ 待機中 |
| マイグレーション | P0 | 0.5 日 | ⏳ 待機中 |

### Phase 2：CRM 基本機能（Week 2-3）
| 機能 | 優先度 | 所要時間 | ステータス |
|------|--------|---------|-----------|
| CRM CRUD API | P0 | 1 日 | ⏳ 待機中 |
| CRM 検索 API | P0 | 0.5 日 | ⏳ 待機中 |
| CRM UI（一覧） | P0 | 1 日 | ⏳ 待機中 |
| CRM UI（詳細） | P0 | 0.5 日 | ⏳ 待機中 |
| CRM UI（新規・編集） | P0 | 1 日 | ⏳ 待機中 |

### Phase 3：認証機能（Week 3-4）
| 機能 | 優先度 | 所要時間 | ステータス |
|------|--------|---------|-----------|
| NextAuth.js セットアップ | P1 | 0.5 日 | ⏳ 待機中 |
| ログイン機能 | P1 | 1 日 | ⏳ 待機中 |
| ユーザー管理 | P1 | 1 日 | ⏳ 待機中 |
| 権限管理（RBAC） | P2 | 1 日 | ⏳ 待機中 |

### Phase 4：KPI ダッシュボード（Week 4-6）
| 機能 | 優先度 | 所要時間 | ステータス |
|------|--------|---------|-----------|
| KPI データモデル | P1 | 0.5 日 | ⏳ 待機中 |
| 賃貸 KPI API | P1 | 1 日 | ⏳ 待機中 |
| 売買 KPI API | P1 | 1 日 | ⏳ 待機中 |
| 民泊 KPI API | P2 | 1 日 | ⏳ 待機中 |
| KPI ダッシュボード UI | P1 | 2 日 | ⏳ 待機中 |

---

## 🚀 Phase 1：データ基盤（最優先）

### 1-1. データベース設計

#### スキーマ設計
```prisma
// prisma/schema.prisma

// 顧客テーブル
model Customer {
  id           String   @id @default(cuid())
  name         String
  nameKana     String?
  email        String   @unique
  phone        String?
  address      String?
  notes        String?
  type         String   // 'rent', 'sale', 'minpaku'
  status       String   @default("active") // 'active', 'inactive'
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // リレーション
  inquiries    Inquiry[]
  properties   PropertyInterest[]
}

// 物件テーブル
model Property {
  id           String   @id @default(cuid())
  title        String
  type         String   // 'rent', 'sale', 'minpaku'
  price        Float
  address      String
  area         Float?
  rooms        String?
  imageUrls    String[] // JSON array
  description  String?
  status       String   @default("available") // 'available', 'rented', 'sold'
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // リレーション
  interests    PropertyInterest[]
  inquiries    Inquiry[]
}

// 問合せテーブル
model Inquiry {
  id           String   @id @default(cuid())
  customerId   String
  propertyId   String?
  type         String   // 'viewing', 'inquiry', 'application'
  message      String
  status       String   @default("pending") // 'pending', 'processing', 'completed'
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // リレーション
  customer     Customer @relation(fields: [customerId], references: [id])
  property     Property? @relation(fields: [propertyId], references: [id])
}

// 物件興味テーブル（多対多）
model PropertyInterest {
  id           String   @id @default(cuid())
  customerId   String
  propertyId   String
  createdAt    DateTime @default(now())
  
  // リレーション
  customer     Customer @relation(fields: [customerId], references: [id])
  property     Property @relation(fields: [propertyId], references: [id])
  
  @@unique([customerId, propertyId])
}

// KPI データテーブル
model KPI {
  id           String   @id @default(cuid())
  type         String   // 'rent', 'sale', 'minpaku'
  metric       String   // 'inquiry_count', 'viewing_count', etc.
  value        Float
  date         DateTime
  createdAt    DateTime @default(now())
  
  @@index([type, date])
}
```

#### 実装手順
1. PostgreSQL データベースを準備
2. Prisma をインストール・設定
3. スキーマを定義
4. マイグレーションを実行
5. Seed データを投入

---

### 1-2. Prisma セットアップ

#### インストール
```bash
cd /home/user/webapp
npm install prisma @prisma/client
npx prisma init
```

#### 設定ファイル
```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/kanae?schema=public"
```

#### マイグレーション
```bash
# スキーマを作成
npx prisma migrate dev --name init

# Prisma Client を生成
npx prisma generate

# データベースをリセット（開発時のみ）
npx prisma migrate reset
```

---

## 🔧 Phase 2：CRM 基本機能

### 2-1. CRM CRUD API

#### エンドポイント設計
```typescript
// app/api/crm/customers/route.ts

// GET /api/crm/customers - 顧客一覧取得
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  
  // Prisma でクエリ
  const customers = await prisma.customer.findMany({
    where: {
      ...(type && { type }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } }
        ]
      })
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return Response.json({ customers });
}

// POST /api/crm/customers - 顧客新規登録
export async function POST(request: Request) {
  const data = await request.json();
  
  const customer = await prisma.customer.create({
    data: {
      name: data.name,
      email: data.email,
      // ...その他のフィールド
    }
  });
  
  return Response.json({ customer }, { status: 201 });
}
```

```typescript
// app/api/crm/customers/[id]/route.ts

// GET /api/crm/customers/:id - 顧客詳細取得
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const customer = await prisma.customer.findUnique({
    where: { id: params.id },
    include: {
      inquiries: true,
      properties: {
        include: {
          property: true
        }
      }
    }
  });
  
  if (!customer) {
    return Response.json({ error: 'Customer not found' }, { status: 404 });
  }
  
  return Response.json({ customer });
}

// PUT /api/crm/customers/:id - 顧客更新
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  
  const customer = await prisma.customer.update({
    where: { id: params.id },
    data
  });
  
  return Response.json({ customer });
}

// DELETE /api/crm/customers/:id - 顧客削除
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.customer.delete({
    where: { id: params.id }
  });
  
  return Response.json({ success: true });
}
```

---

### 2-2. CRM UI 実装

#### 顧客一覧ページ
```typescript
// app/crm/customers/page.tsx

import { CustomerList } from '@/components/crm/CustomerList';
import { SearchBar } from '@/components/crm/SearchBar';

export default function CustomersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">顧客管理</h1>
      
      <SearchBar />
      
      <CustomerList />
    </div>
  );
}
```

#### コンポーネント構成
```
components/crm/
├── CustomerList.tsx       # 顧客一覧テーブル
├── CustomerCard.tsx       # 顧客カード
├── CustomerDetail.tsx     # 顧客詳細
├── CustomerForm.tsx       # 顧客フォーム（新規・編集）
├── SearchBar.tsx          # 検索バー
└── FilterMenu.tsx         # フィルターメニュー
```

---

## 📊 実装スケジュール

### Week 1：データ基盤
| 日 | タスク | 成果物 |
|----|--------|--------|
| Day 1 | データベース設計 | `schema.prisma` |
| Day 2 | Prisma セットアップ | マイグレーション完了 |
| Day 3 | Seed データ作成 | テストデータ投入 |

### Week 2：CRM API
| 日 | タスク | 成果物 |
|----|--------|--------|
| Day 4 | CRUD API 実装 | `/api/crm/customers` |
| Day 5 | 検索 API 実装 | 検索・フィルター機能 |

### Week 3：CRM UI
| 日 | タスク | 成果物 |
|----|--------|--------|
| Day 6 | 一覧ページ | `app/crm/customers/page.tsx` |
| Day 7 | 詳細ページ | `app/crm/customers/[id]/page.tsx` |
| Day 8 | フォーム実装 | 新規・編集フォーム |

---

## 🔍 完了基準

### Phase 1：データ基盤
- [ ] Prisma がインストールされている
- [ ] `schema.prisma` が定義されている
- [ ] マイグレーションが実行されている
- [ ] Seed データが投入されている
- [ ] Prisma Client が動作する

### Phase 2：CRM API
- [ ] 顧客 CRUD API が実装されている
- [ ] 検索・フィルター API が動作する
- [ ] エラーハンドリングが実装されている
- [ ] API ドキュメントが作成されている

### Phase 3：CRM UI
- [ ] 顧客一覧ページが表示される
- [ ] 顧客詳細ページが表示される
- [ ] 新規登録フォームが動作する
- [ ] 編集フォームが動作する
- [ ] 削除機能が動作する

---

## 🛠️ 必要なツール・ライブラリ

### データベース
```bash
npm install @prisma/client
npm install -D prisma
```

### UI コンポーネント
```bash
npm install @tanstack/react-table      # テーブル
npm install react-hook-form            # フォーム
npm install zod                        # バリデーション
npm install date-fns                   # 日付処理
```

### チャート（KPI 用）
```bash
npm install recharts                   # チャート
npm install @tremor/react              # ダッシュボード UI
```

---

## 📝 次のステップ

1. **Task 0-2 完了後**、すぐに Phase 1 を開始
2. データベース設計を確定
3. Prisma をセットアップ
4. CRM 基本機能の実装に着手

---

**作成日**: 2026-01-12  
**ステータス**: ロードマップ作成完了  
**開始予定**: Task 0-2 完了後
