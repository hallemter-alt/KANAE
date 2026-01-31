#!/usr/bin/env python3
"""
PDF物件情報抽出スクリプト
PDFから投資収益物件の情報を抽出してJSONファイルに保存
"""

import fitz  # PyMuPDF
import json
import re
from typing import List, Dict, Optional
from datetime import datetime

class PropertyExtractor:
    def __init__(self, pdf_path: str):
        self.pdf_path = pdf_path
        self.doc = fitz.open(pdf_path)
        self.properties = []
        
    def extract_number(self, text: str) -> Optional[float]:
        """数値を抽出"""
        # カンマを削除して数値を抽出
        match = re.search(r'[\d,]+\.?\d*', text)
        if match:
            return float(match.group().replace(',', ''))
        return None
    
    def extract_price(self, text: str) -> Optional[int]:
        """価格を抽出（万円 → 円）"""
        patterns = [
            r'価格[：:\s]*(\d[\d,]*)\s*万円',
            r'(\d[\d,]*)\s*万円',
            r'価\s*格\s*(\d[\d,]*)\s*万円'
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                man_yen = match.group(1).replace(',', '')
                return int(man_yen) * 10000
        return None
    
    def extract_area(self, text: str) -> tuple[Optional[float], Optional[float]]:
        """面積を抽出（㎡と坪）"""
        sqm = None
        tsubo = None
        
        # ㎡を抽出
        sqm_match = re.search(r'(\d+\.?\d*)\s*㎡', text)
        if sqm_match:
            sqm = float(sqm_match.group(1))
        
        # 坪を抽出
        tsubo_match = re.search(r'[（(](\d+\.?\d*)\s*坪[）)]', text)
        if tsubo_match:
            tsubo = float(tsubo_match.group(1))
            
        return sqm, tsubo
    
    def extract_yield(self, text: str) -> Optional[float]:
        """利回りを抽出"""
        patterns = [
            r'利回り[：:\s]*約?(\d+\.?\d*)%',
            r'表面利回り[：:\s]*約?(\d+\.?\d*)%',
            r'(\d+\.?\d*)%',
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return float(match.group(1))
        return None
    
    def extract_access(self, text: str) -> List[Dict]:
        """アクセス情報を抽出"""
        access_list = []
        
        # 路線・駅・徒歩時間のパターン
        patterns = [
            r'([\u4E00-\u9FFF]+線)\s*([\u4E00-\u9FFF]+駅)\s*徒[歩步]\s*(\d+)\s*分',
            r'([\u4E00-\u9FFF]+)\s*[「『]?([\u4E00-\u9FFF]+駅?)[」』]?\s*徒[歩步]\s*(\d+)\s*分',
        ]
        
        for pattern in patterns:
            matches = re.finditer(pattern, text)
            for match in matches:
                access_list.append({
                    'line': match.group(1),
                    'station': match.group(2).replace('駅', '') + '駅',
                    'walk_time': int(match.group(3))
                })
        
        return access_list if access_list else None
    
    def extract_structure(self, text: str) -> Optional[str]:
        """構造を抽出"""
        patterns = [
            r'(RC造|鉄筋コンクリート造|鉄骨造|木造)[^\n]*建',
            r'構\s*造[：:\s]*(.*?造[^\n]*建)',
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(1)
        return None
    
    def extract_location(self, text: str) -> Dict:
        """所在地情報を抽出"""
        location = {
            'full': None,
            'prefecture': None,
            'city': None,
            'town': None
        }
        
        # 完全な住所
        addr_match = re.search(r'東京都([^\s]+区)([^\n]+)', text)
        if addr_match:
            location['prefecture'] = '東京都'
            location['city'] = addr_match.group(1)
            location['town'] = addr_match.group(2).strip()
            location['full'] = f"東京都{addr_match.group(1)}{addr_match.group(2).strip()}"
        
        return location
    
    def extract_units(self, text: str) -> Optional[int]:
        """総戸数を抽出"""
        match = re.search(r'総?戸数[：:\s]*(\d+)\s*戸', text)
        if match:
            return int(match.group(1))
        
        # 1K×9戸のようなパターン
        match = re.search(r'×(\d+)戸', text)
        if match:
            return int(match.group(1))
            
        return None
    
    def extract_construction_date(self, text: str) -> Optional[str]:
        """築年月を抽出"""
        patterns = [
            r'(\d{4})年(\d{1,2})月',
            r'令和(\d+)年(\d{1,2})月',
            r'平成(\d+)年(\d{1,2})月',
            r'昭和(\d+)年(\d{1,2})月',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                if '令和' in pattern:
                    year = 2019 + int(match.group(1))
                elif '平成' in pattern:
                    year = 1989 + int(match.group(1))
                elif '昭和' in pattern:
                    year = 1926 + int(match.group(1))
                else:
                    year = int(match.group(1))
                
                month = int(match.group(2))
                return f"{year}-{month:02d}-01"
        
        return None
    
    def extract_property_from_page(self, page_num: int, text: str) -> Optional[Dict]:
        """1ページから物件情報を抽出"""
        # 空ページや広告不可ページをスキップ
        if not text.strip() or '広告掲載不可' in text:
            return None
        
        # 最低限の情報（価格または住所）がない場合はスキップ
        price = self.extract_price(text)
        location = self.extract_location(text)
        
        if not price and not location['full']:
            return None
        
        # 物件名を抽出
        property_name = None
        name_patterns = [
            r'物件名[：:\s]*([^\n]+)',
            r'名称[：:\s]*([^\n]+)',
        ]
        for pattern in name_patterns:
            match = re.search(pattern, text)
            if match:
                property_name = match.group(1).strip()
                break
        
        # 物件タイプを判定
        property_type = '一棟収益'
        if 'マンション' in text:
            property_type = '一棟マンション'
        elif 'ビル' in text:
            property_type = '一棟ビル'
        elif 'アパート' in text:
            property_type = 'アパート'
        
        # 土地面積
        land_sqm, land_tsubo = None, None
        land_patterns = [
            r'土\s*地.*?面\s*積[：:\s]*(\d+\.?\d*)\s*㎡[（(](\d+\.?\d*)\s*坪[）)]',
            r'敷地.*?面積[：:\s]*(\d+\.?\d*)\s*㎡',
        ]
        for pattern in land_patterns:
            match = re.search(pattern, text)
            if match:
                land_sqm = float(match.group(1))
                if match.lastindex >= 2:
                    land_tsubo = float(match.group(2))
                break
        
        # 建物面積
        building_sqm, building_tsubo = None, None
        building_patterns = [
            r'延床面積[：:\s]*(\d+\.?\d*)\s*㎡[（(](\d+\.?\d*)\s*坪[）)]',
            r'建物.*?面積[：:\s]*(\d+\.?\d*)\s*㎡',
        ]
        for pattern in building_patterns:
            match = re.search(pattern, text)
            if match:
                building_sqm = float(match.group(1))
                if match.lastindex >= 2:
                    building_tsubo = float(match.group(2))
                break
        
        # 用途地域
        use_district = None
        district_match = re.search(r'用途地域[：:\s]*([^\n]+)', text)
        if district_match:
            use_district = district_match.group(1).strip()
        
        # 建ぺい率・容積率
        coverage_ratio = None
        floor_ratio = None
        ratio_match = re.search(r'(\d+)%\s*/\s*(\d+)%', text)
        if ratio_match:
            coverage_ratio = int(ratio_match.group(1))
            floor_ratio = int(ratio_match.group(2))
        
        # 年間賃料
        annual_rent = None
        rent_patterns = [
            r'年間.*?賃料[：:\s]*(\d[\d,]+)\s*円',
            r'(\d[\d,]+)\s*円.*?年',
        ]
        for pattern in rent_patterns:
            match = re.search(pattern, text)
            if match:
                annual_rent = int(match.group(1).replace(',', ''))
                break
        
        property_data = {
            'page_number': page_num + 1,
            'property_name': property_name,
            'property_type': property_type,
            'price': price,
            'location': location,
            'access_info': self.extract_access(text),
            'land_area_sqm': land_sqm,
            'land_area_tsubo': land_tsubo,
            'building_area_sqm': building_sqm,
            'building_area_tsubo': building_tsubo,
            'structure': self.extract_structure(text),
            'construction_date': self.extract_construction_date(text),
            'total_units': self.extract_units(text),
            'use_district': use_district,
            'building_coverage_ratio': coverage_ratio,
            'floor_area_ratio': floor_ratio,
            'annual_rent': annual_rent,
            'yield_surface': self.extract_yield(text),
            'raw_text': text[:500]  # デバッグ用に最初の500文字を保存
        }
        
        return property_data
    
    def extract_all(self) -> List[Dict]:
        """全ページから物件情報を抽出"""
        print(f"Processing {len(self.doc)} pages...")
        
        for page_num in range(len(self.doc)):
            page = self.doc[page_num]
            text = page.get_text()
            
            property_data = self.extract_property_from_page(page_num, text)
            if property_data:
                self.properties.append(property_data)
                print(f"✓ Page {page_num + 1}: Found property - {property_data.get('property_name', 'Unknown')}")
            else:
                print(f"  Page {page_num + 1}: No property data")
        
        self.doc.close()
        print(f"\nTotal properties extracted: {len(self.properties)}")
        return self.properties
    
    def save_to_json(self, output_path: str):
        """JSON形式で保存"""
        output_data = {
            'extracted_at': datetime.now().isoformat(),
            'source_pdf': self.pdf_path,
            'total_properties': len(self.properties),
            'properties': self.properties
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        print(f"Saved to {output_path}")

def main():
    pdf_path = '/home/user/uploaded_files/zmn_list_20260131223902_1.pdf'
    output_path = '/home/user/webapp/extracted_properties.json'
    
    extractor = PropertyExtractor(pdf_path)
    extractor.extract_all()
    extractor.save_to_json(output_path)
    
    # 統計情報を表示
    print("\n" + "="*80)
    print("Extraction Summary:")
    print("="*80)
    print(f"Properties with price: {sum(1 for p in extractor.properties if p.get('price'))}")
    print(f"Properties with location: {sum(1 for p in extractor.properties if p.get('location', {}).get('full'))}")
    print(f"Properties with access info: {sum(1 for p in extractor.properties if p.get('access_info'))}")
    print(f"Properties with yield data: {sum(1 for p in extractor.properties if p.get('yield_surface'))}")

if __name__ == '__main__':
    main()
