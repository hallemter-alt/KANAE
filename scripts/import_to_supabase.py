#!/usr/bin/env python3
"""
Supabase データインポートスクリプト
extracted_properties.json から Supabase へ物件データを自動インポート
"""

import json
import os
from datetime import datetime

# Supabase クライアントのインポート
try:
    from supabase import create_client, Client
except ImportError:
    print("❌ supabase パッケージがインストールされていません")
    print("   インストール方法: pip install supabase")
    exit(1)

# 環境変数から接続情報を取得
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_KEY')  # service_role key

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("❌ 環境変数が設定されていません")
    print("   必要な環境変数:")
    print("   - SUPABASE_URL")
    print("   - SUPABASE_SERVICE_KEY")
    print("\n   設定例:")
    print("   export SUPABASE_URL='https://xxx.supabase.co'")
    print("   export SUPABASE_SERVICE_KEY='your-service-role-key'")
    exit(1)

# Supabase クライアント作成
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def import_railway_lines():
    """路線マスタをインポート"""
    print("\n📍 路線マスタをインポート中...")
    
    lines = [
        {'id': 'line_yamanote', 'line_name': '山手線', 'line_name_en': 'Yamanote Line', 'company': 'JR東日本', 'line_color': '#9ACD32', 'line_type': '在来線'},
        {'id': 'line_chuo', 'line_name': '中央線', 'line_name_en': 'Chuo Line', 'company': 'JR東日本', 'line_color': '#FF6600', 'line_type': '在来線'},
        {'id': 'line_tozai', 'line_name': '東西線', 'line_name_en': 'Tozai Line', 'company': '東京メトロ', 'line_color': '#00A7DB', 'line_type': '地下鉄'},
        {'id': 'line_fukutoshin', 'line_name': '副都心線', 'line_name_en': 'Fukutoshin Line', 'company': '東京メトロ', 'line_color': '#9B6E23', 'line_type': '地下鉄'},
        {'id': 'line_yurakucho', 'line_name': '有楽町線', 'line_name_en': 'Yurakucho Line', 'company': '東京メトロ', 'line_color': '#C1A470', 'line_type': '地下鉄'},
        {'id': 'line_marunouchi', 'line_name': '丸ノ内線', 'line_name_en': 'Marunouchi Line', 'company': '東京メトロ', 'line_color': '#F62E36', 'line_type': '地下鉄'},
        {'id': 'line_oedo', 'line_name': '大江戸線', 'line_name_en': 'Oedo Line', 'company': '都営地下鉄', 'line_color': '#E60073', 'line_type': '地下鉄'},
        {'id': 'line_shinjuku', 'line_name': '新宿線', 'line_name_en': 'Shinjuku Line', 'company': '都営地下鉄', 'line_color': '#6CBB5A', 'line_type': '地下鉄'},
    ]
    
    success_count = 0
    for line in lines:
        try:
            result = supabase.table('railway_lines').upsert(line).execute()
            print(f"  ✅ {line['line_name']}")
            success_count += 1
        except Exception as e:
            print(f"  ❌ {line['line_name']}: {e}")
    
    print(f"\n✅ 路線マスタ: {success_count}/{len(lines)} 件インポート完了")

def import_stations():
    """駅マスタをインポート"""
    print("\n🚉 駅マスタをインポート中...")
    
    stations = [
        {'id': 'sta_takadanobaba', 'station_name': '高田馬場', 'station_name_en': 'Takadanobaba', 'prefecture': '東京都', 'city': '新宿区', 'ward': '高田馬場', 'latitude': 35.7127, 'longitude': 139.7038},
        {'id': 'sta_nishiwaseda', 'station_name': '西早稲田', 'station_name_en': 'Nishi-waseda', 'prefecture': '東京都', 'city': '新宿区', 'ward': '西早稲田', 'latitude': 35.7087, 'longitude': 139.7148},
        {'id': 'sta_waseda', 'station_name': '早稲田', 'station_name_en': 'Waseda', 'prefecture': '東京都', 'city': '新宿区', 'ward': '早稲田', 'latitude': 35.7076, 'longitude': 139.7188},
        {'id': 'sta_shinanomachi', 'station_name': '信濃町', 'station_name_en': 'Shinanomachi', 'prefecture': '東京都', 'city': '新宿区', 'ward': '信濃町', 'latitude': 35.6799, 'longitude': 139.7195},
        {'id': 'sta_yotsuya', 'station_name': '四ツ谷', 'station_name_en': 'Yotsuya', 'prefecture': '東京都', 'city': '新宿区', 'ward': '四ツ谷', 'latitude': 35.6857, 'longitude': 139.7302},
        {'id': 'sta_ichigaya', 'station_name': '市ヶ谷', 'station_name_en': 'Ichigaya', 'prefecture': '東京都', 'city': '千代田区', 'ward': '九段南', 'latitude': 35.6938, 'longitude': 139.7447},
        {'id': 'sta_iidabashi', 'station_name': '飯田橋', 'station_name_en': 'Iidabashi', 'prefecture': '東京都', 'city': '千代田区', 'ward': '飯田橋', 'latitude': 35.7021, 'longitude': 139.7463},
        {'id': 'sta_kagurazaka', 'station_name': '神楽坂', 'station_name_en': 'Kagurazaka', 'prefecture': '東京都', 'city': '新宿区', 'ward': '神楽坂', 'latitude': 35.7014, 'longitude': 139.7395},
        {'id': 'sta_edogawabashi', 'station_name': '江戸川橋', 'station_name_en': 'Edogawabashi', 'prefecture': '東京都', 'city': '文京区', 'ward': '関口', 'latitude': 35.7120, 'longitude': 139.7262},
        {'id': 'sta_gokokuji', 'station_name': '護国寺', 'station_name_en': 'Gokokuji', 'prefecture': '東京都', 'city': '文京区', 'ward': '大塚', 'latitude': 35.7191, 'longitude': 139.7284},
    ]
    
    success_count = 0
    for station in stations:
        try:
            result = supabase.table('stations').upsert(station).execute()
            print(f"  ✅ {station['station_name']}")
            success_count += 1
        except Exception as e:
            print(f"  ❌ {station['station_name']}: {e}")
    
    print(f"\n✅ 駅マスタ: {success_count}/{len(stations)} 件インポート完了")

def import_properties():
    """物件データをインポート"""
    print("\n🏢 物件データをインポート中...")
    
    # JSON ファイル読み込み
    json_path = 'extracted_properties.json'
    if not os.path.exists(json_path):
        print(f"❌ {json_path} が見つかりません")
        return
    
    with open(json_path, 'r', encoding='utf-8') as f:
        properties = json.load(f)
    
    print(f"   読み込み: {len(properties)} 件")
    
    success_count = 0
    for i, prop in enumerate(properties, 1):
        try:
            # データクリーニング
            property_data = {
                'property_name': prop.get('property_name', f'物件 #{i}'),
                'property_type': prop.get('property_type', '一棟マンション'),
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
                'yield_actual': prop.get('yield_actual'),
                'total_units': prop.get('total_units'),
                'construction_date': prop.get('construction_date'),
                'building_structure': prop.get('building_structure'),
                'occupancy_status': prop.get('occupancy_status'),
                'status': '販売中',
            }
            
            result = supabase.table('properties').insert(property_data).execute()
            print(f"  ✅ [{i}/{len(properties)}] {prop.get('property_name', 'Unknown')}")
            success_count += 1
            
        except Exception as e:
            print(f"  ❌ [{i}/{len(properties)}] {prop.get('property_name', 'Unknown')}: {e}")
    
    print(f"\n✅ 物件データ: {success_count}/{len(properties)} 件インポート完了")

def main():
    """メイン処理"""
    print("=" * 60)
    print("  Supabase データインポートスクリプト")
    print("  kanae-tokyo.com - 投資収益物件検索システム")
    print("=" * 60)
    print(f"\n📊 接続先: {SUPABASE_URL}")
    print(f"⏰ 実行時刻: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    try:
        # マスターデータをインポート
        import_railway_lines()
        import_stations()
        
        # 物件データをインポート
        import_properties()
        
        print("\n" + "=" * 60)
        print("  🎉 すべてのインポートが完了しました！")
        print("=" * 60)
        print("\n次のステップ:")
        print("  1. Supabase ダッシュボードでデータを確認")
        print("  2. https://www.kanae-tokyo.com/ja/properties で動作確認")
        print("  3. 物件画像のアップロード")
        print("  4. property_stations リレーションの設定")
        
    except Exception as e:
        print(f"\n❌ エラーが発生しました: {e}")
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())
