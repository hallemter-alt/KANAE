# Supabase セットアップガイド - kanae-tokyo.com 投資物件検索システム

## 📋 概要

このガイドでは、kanae-tokyo.com の投資収益物件検索システムのための Supabase データベースセットアップ手順を説明します。

## 🎯 前提条件

- Supabase アカウント（https://supabase.com）
- データベーススキーマファイル: `supabase/migrations/20260131_create_properties_system.sql`
- 物件データファイル: `extracted_properties.json`（22件の物件データ）

## 📦 ステップ 1: Supabase プロジェクト作成（所要時間: 5分）

### 1.1 プロジェクト作成

1. https://supabase.com にアクセス
2. 「New Project」をクリック
3. プロジェクト情報を入力:
   - **Name**: `kanae-tokyo-properties`
   - **Database Password**: 強力なパスワードを生成（保存してください！）
   - **Region**: `Northeast Asia (Tokyo)` を選択（日本のユーザー向け）
   - **Pricing Plan**: Free（開発用）または Pro（本番用）

4. 「Create new project」をクリック
5. プロジェクトの準備完了まで 2-3 分待機

### 1.2 接続情報の取得

プロジェクトダッシュボードで以下を取得:

1. 左サイドバー → **Settings** → **API**
2. 以下の情報をコピー:
   ```
   Project URL: https://xxx.supabase.co
   anon public key: eyJhbGc...（長いトークン）
   service_role key: eyJhbGc...（長いトークン、サーバー側のみ使用）
   ```

3. これらを安全な場所に保存

## 🗄️ ステップ 2: データベーススキーマの作成（所要時間: 5分）

### 2.1 SQL エディタを開く

1. Supabase ダッシュボードで左サイドバー → **SQL Editor**
2. 「New query」をクリック

### 2.2 マイグレーションSQL の実行

1. `supabase/migrations/20260131_create_properties_system.sql` の内容をコピー
2. SQL エディタに貼り付け
3. 「Run」ボタンをクリック
4. ✅ 成功メッセージを確認:
   ```
   Success. No rows returned
   ```

### 2.3 テーブル作成の確認

1. 左サイドバー → **Table Editor**
2. 以下のテーブルが作成されていることを確認:
   - ✅ `properties`（物件マスタ）
   - ✅ `railway_lines`（路線マスタ）
   - ✅ `stations`（駅マスタ）
   - ✅ `property_stations`（物件-駅 リレーション）
   - ✅ `inquiries`（問い合わせ）
   - ✅ `search_history`（検索履歴）

## 📊 ステップ 3: マスターデータのインポート（所要時間: 10分）

### 3.1 路線マスタの投入

SQL エディタで以下を実行:

```sql
-- 主要路線データ
INSERT INTO railway_lines (id, line_name, line_name_en, company, line_color, line_type) VALUES
('line_yamanote', '山手線', 'Yamanote Line', 'JR東日本', '#9ACD32', '在来線'),
('line_chuo', '中央線', 'Chuo Line', 'JR東日本', '#FF6600', '在来線'),
('line_tozai', '東西線', 'Tozai Line', '東京メトロ', '#00A7DB', '地下鉄'),
('line_fukutoshin', '副都心線', 'Fukutoshin Line', '東京メトロ', '#9B6E23', '地下鉄'),
('line_yurakucho', '有楽町線', 'Yurakucho Line', '東京メトロ', '#C1A470', '地下鉄'),
('line_marunouchi', '丸ノ内線', 'Marunouchi Line', '東京メトロ', '#F62E36', '地下鉄'),
('line_oedo', '大江戸線', 'Oedo Line', '都営地下鉄', '#E60073', '地下鉄'),
('line_shinjuku', '新宿線', 'Shinjuku Line', '都営地下鉄', '#6CBB5A', '地下鉄');
```

### 3.2 駅マスタの投入

```sql
-- 主要駅データ
INSERT INTO stations (id, station_name, station_name_en, prefecture, city, ward, latitude, longitude) VALUES
('sta_takadanobaba', '高田馬場', 'Takadanobaba', '東京都', '新宿区', '高田馬場', 35.7127, 139.7038),
('sta_nishiwaseda', '西早稲田', 'Nishi-waseda', '東京都', '新宿区', '西早稲田', 35.7087, 139.7148),
('sta_waseda', '早稲田', 'Waseda', '東京都', '新宿区', '早稲田', 35.7076, 139.7188),
('sta_shinanomachi', '信濃町', 'Shinanomachi', '東京都', '新宿区', '信濃町', 35.6799, 139.7195),
('sta_yotsuya', '四ツ谷', 'Yotsuya', '東京都', '新宿区', '四ツ谷', 35.6857, 139.7302),
('sta_ichigaya', '市ヶ谷', 'Ichigaya', '東京都', '千代田区', '九段南', 35.6938, 139.7447),
('sta_iidabashi', '飯田橋', 'Iidabashi', '東京都', '千代田区', '飯田橋', 35.7021, 139.7463),
('sta_kagurazaka', '神楽坂', 'Kagurazaka', '東京都', '新宿区', '神楽坂', 35.7014, 139.7395),
('sta_edogawabashi', '江戸川橋', 'Edogawabashi', '東京都', '文京区', '関口', 35.7120, 139.7262),
('sta_gokokuji', '護国寺', 'Gokokuji', '東京都', '文京区', '大塚', 35.7191, 139.7284);
```

### 3.3 路線-駅 リレーションの投入

```sql
-- 路線と駅の紐付け（例: 山手線）
INSERT INTO line_stations (line_id, station_id, station_order) VALUES
('line_yamanote', 'sta_takadanobaba', 17),
('line_yamanote', 'sta_shinanomachi', 3),
('line_yamanote', 'sta_yotsuya', 4);

-- 中央線
INSERT INTO line_stations (line_id, station_id, station_order) VALUES
('line_chuo', 'sta_yotsuya', 5),
('line_chuo', 'sta_iidabashi', 6);

-- 東西線
INSERT INTO line_stations (line_id, station_id, station_order) VALUES
('line_tozai', 'sta_takadanobaba', 3),
('line_tozai', 'sta_waseda', 4),
('line_tozai', 'sta_kagurazaka', 5),
('line_tozai', 'sta_iidabashi', 6);
```

### 3.4 物件データのインポート

#### オプション A: SQL で直接投入

`extracted_properties.json` のデータを SQL INSERT 文に変換して実行。

例:
```sql
INSERT INTO properties (
  property_name, property_type, price, address_prefecture, address_city, 
  address_ward, address_full, land_area_sqm, building_area_sqm, 
  yield_surface, total_units, construction_date, building_structure
) VALUES 
('西早稲田 一棟収益マンション', '一棟マンション', 318000000, '東京都', '新宿区', 
 '西早稲田', '東京都新宿区西早稲田3丁目', 105.42, 243.15, 
 4.86, 10, '1990-03-01', 'RC造'),
-- ... 他の物件データ
;
```

#### オプション B: Supabase Table Editor で手動入力

1. Table Editor → `properties` テーブル
2. 「Insert row」で各物件を追加
3. 22件のデータを順次入力

#### オプション C: Python スクリプトでインポート（推奨）

後述の「データインポートスクリプト」を使用

## 🔐 ステップ 4: Row Level Security (RLS) の設定（所要時間: 3分）

### 4.1 RLS ポリシーの有効化確認

マイグレーションファイルで既に有効化されていますが、確認:

1. Table Editor → `properties` テーブル
2. 右上の「...」メニュー → 「Edit table」
3. 「Enable Row Level Security」が ON になっていることを確認

### 4.2 公開読み取りポリシーの確認

SQL エディタで確認:

```sql
-- properties テーブルの RLS ポリシー確認
SELECT * FROM pg_policies 
WHERE tablename = 'properties';
```

以下のポリシーが存在することを確認:
- ✅ `properties_public_read`（公開読み取り許可）

## 🌐 ステップ 5: Vercel 環境変数の設定（所要時間: 5分）

### 5.1 Vercel ダッシュボードにアクセス

1. https://vercel.com にログイン
2. `kanae-tokyo` プロジェクトを選択
3. **Settings** → **Environment Variables**

### 5.2 環境変数の追加

以下の3つの変数を追加:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...`（anon key） | Production, Preview, Development |

**重要**: `NEXT_PUBLIC_` プレフィックスが必須です（クライアントサイドで使用するため）

### 5.3 再デプロイ

1. **Deployments** タブへ移動
2. 最新のデプロイメントの「...」メニュー → 「Redeploy」
3. 「Redeploy」を確認
4. デプロイ完了を待機（約 2-3 分）

## ✅ ステップ 6: 動作確認（所要時間: 5分）

### 6.1 API エンドポイントのテスト

ブラウザまたは curl で以下を確認:

```bash
# 路線一覧の取得
curl https://www.kanae-tokyo.com/api/railway-lines

# 駅一覧の取得
curl https://www.kanae-tokyo.com/api/stations

# 物件検索
curl https://www.kanae-tokyo.com/api/properties/search
```

### 6.2 フロントエンドのテスト

1. https://www.kanae-tokyo.com/ja/properties にアクセス
2. 以下を確認:
   - ✅ 物件カードが表示される
   - ✅ 検索フィルターが動作する
   - ✅ ソート機能が動作する
   - ✅ ページネーションが動作する

### 6.3 多言語対応の確認

- https://www.kanae-tokyo.com/ja/properties（日本語）
- https://www.kanae-tokyo.com/zh/properties（中国語）
- https://www.kanae-tokyo.com/en/properties（英語）

## 📊 データインポートスクリプト（Python）

`extracted_properties.json` から Supabase へ自動インポート:

```python
import json
from supabase import create_client, Client

# Supabase 接続
url = "https://xxx.supabase.co"
key = "your-service-role-key"  # service_role key を使用
supabase: Client = create_client(url, key)

# JSON ファイル読み込み
with open('extracted_properties.json', 'r', encoding='utf-8') as f:
    properties = json.load(f)

# 物件データをインポート
for prop in properties:
    try:
        result = supabase.table('properties').insert({
            'property_name': prop.get('property_name'),
            'property_type': prop.get('property_type'),
            'price': prop.get('price'),
            'address_prefecture': '東京都',
            'address_city': prop.get('address_city'),
            'address_ward': prop.get('address_ward'),
            'address_full': prop.get('address_full'),
            'land_area_sqm': prop.get('land_area_sqm'),
            'land_area_tsubo': prop.get('land_area_tsubo'),
            'building_area_sqm': prop.get('building_area_sqm'),
            'building_area_tsubo': prop.get('building_area_tsubo'),
            'yield_surface': prop.get('yield_surface'),
            'total_units': prop.get('total_units'),
            'construction_date': prop.get('construction_date'),
            'building_structure': prop.get('building_structure'),
            'status': '販売中',
        }).execute()
        print(f"✅ Imported: {prop.get('property_name')}")
    except Exception as e:
        print(f"❌ Error: {prop.get('property_name')} - {e}")

print(f"\n🎉 インポート完了！")
```

実行方法:
```bash
pip install supabase
python import_properties.py
```

## 🚀 完了チェックリスト

- [ ] Supabase プロジェクト作成完了
- [ ] データベーススキーマ作成完了（6テーブル）
- [ ] 路線マスタデータ投入完了
- [ ] 駅マスタデータ投入完了
- [ ] 物件データ投入完了（22件）
- [ ] RLS ポリシー確認完了
- [ ] Vercel 環境変数設定完了
- [ ] 再デプロイ完了
- [ ] API 動作確認完了
- [ ] フロントエンド表示確認完了
- [ ] 多言語対応確認完了

## 📞 トラブルシューティング

### 問題: API が 503 エラーを返す
**解決策**: Vercel 環境変数が正しく設定されているか確認。再デプロイを実行。

### 問題: 物件が表示されない
**解決策**: 
1. Supabase で `properties` テーブルにデータが存在するか確認
2. RLS ポリシーが有効になっているか確認
3. ブラウザの開発者ツールで API レスポンスを確認

### 問題: 検索が動作しない
**解決策**: 
1. 駅・路線マスタデータが投入されているか確認
2. `property_stations` リレーションテーブルにデータがあるか確認

## 📚 次のステップ

1. ✅ Supabase セットアップ完了
2. 🔄 物件詳細ページの実装
3. 🔄 画像アップロード機能の追加
4. 🔄 問い合わせフォームの統合
5. 🔄 検索履歴の分析

---

**作成日**: 2026-01-31  
**対象プロジェクト**: kanae-tokyo.com  
**バージョン**: 1.0
