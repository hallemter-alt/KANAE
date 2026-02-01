/**
 * Premium Property Filters Component
 * Advanced filtering system for high-end investment properties
 */

'use client';

import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { PropertyFilterParams } from '@/lib/types/premium-property';
import { FILTER_PRESETS } from '@/lib/types/premium-property';
import MapModal from './MapModal';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilterParams) => void;
  initialFilters?: PropertyFilterParams;
  language?: 'ja' | 'en' | 'zh';
  propertyCategory?: 'all' | 'residential' | 'investment';
}

export default function PropertyFilters({
  onFilterChange,
  initialFilters = {},
  language = 'ja',
  propertyCategory = 'all',
}: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilterParams>(initialFilters);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    yield: true,
    location: true,
    area: false,
    structure: false,
    features: true,
    completion: false,
    station: false,
  });
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedMapAreas, setSelectedMapAreas] = useState<string[]>([]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilter = (key: keyof PropertyFilterParams, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const applyPreset = (presetId: string) => {
    const preset = FILTER_PRESETS.find(p => p.id === presetId);
    if (preset) {
      const newFilters = { ...filters, ...preset.filters };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const labels = {
    ja: {
      title: '物件を絞り込む',
      clearAll: 'クリア',
      presets: 'クイック検索',
      price: '価格帯',
      priceMin: '最低価格',
      priceMax: '最高価格',
      yield: '期待利回り',
      yieldMin: '最低利回り (%)',
      yieldMax: '最高利回り (%)',
      location: 'エリア',
      prefecture: '都道府県',
      city: '市区町村',
      selectArea: 'エリアを選択',
      mapAreaSelection: '地図でエリアを選択',
      area: '面積',
      landAreaMin: '土地面積（最小）',
      landAreaMax: '土地面積（最大）',
      buildingAreaMin: '建物面積（最小）',
      buildingAreaMax: '建物面積（最大）',
      structure: '建物構造',
      structureType: '構造タイプ',
      rc: 'RC（鉄筋コンクリート）',
      src: 'SRC（鉄骨鉄筋コンクリート）',
      steel: '鉄骨造',
      wood: '木造',
      floors: '階数',
      floorsMin: '最小階数',
      floorsMax: '最大階数',
      station: '駅・交通',
      stationName: '駅名',
      walkTime: '徒歩時間（分）',
      walkTimeMax: '最大徒歩時間',
      features: '設備・特徴',
      iot: 'IoTシステム',
      faceRecognition: '顔認証',
      soundproof: '防音構造',
      minpaku: '民泊運営中',
      rentalGuarantee: '一括借上',
      smartHome: 'スマートホーム',
      nearPark: '公園至近',
      multiLine: '複数路線',
      urbanPlanning: '都市計画受益',
      completion: '竣工年',
      completionMin: '竣工年（開始）',
      completionMax: '竣工年（終了）',
      apply: '検索',
    },
    en: {
      title: 'Filter Properties',
      clearAll: 'Clear All',
      presets: 'Quick Search',
      price: 'Price Range',
      priceMin: 'Min Price',
      priceMax: 'Max Price',
      yield: 'Expected Yield',
      yieldMin: 'Min Yield (%)',
      yieldMax: 'Max Yield (%)',
      location: 'Location',
      prefecture: 'Prefecture',
      city: 'City',
      selectArea: 'Select Area',
      mapAreaSelection: 'Select Area on Map',
      area: 'Area',
      landAreaMin: 'Min Land Area',
      landAreaMax: 'Max Land Area',
      buildingAreaMin: 'Min Building Area',
      buildingAreaMax: 'Max Building Area',
      structure: 'Building Structure',
      structureType: 'Structure Type',
      rc: 'RC (Reinforced Concrete)',
      src: 'SRC (Steel Reinforced Concrete)',
      steel: 'Steel Frame',
      wood: 'Wooden',
      floors: 'Floors',
      floorsMin: 'Min Floors',
      floorsMax: 'Max Floors',
      station: 'Station & Transport',
      stationName: 'Station Name',
      walkTime: 'Walk Time (min)',
      walkTimeMax: 'Max Walk Time',
      features: 'Features',
      iot: 'IoT System',
      faceRecognition: 'Face Recognition',
      soundproof: 'Soundproof',
      minpaku: 'Minpaku Operating',
      rentalGuarantee: 'Rental Guarantee',
      smartHome: 'Smart Home',
      nearPark: 'Near Park',
      multiLine: 'Multi-Line Access',
      urbanPlanning: 'Urban Planning Benefit',
      completion: 'Completion Year',
      completionMin: 'From Year',
      completionMax: 'To Year',
      apply: 'Search',
    },
    zh: {
      title: '筛选物件',
      clearAll: '清除全部',
      presets: '快速搜索',
      price: '价格范围',
      priceMin: '最低价格',
      priceMax: '最高价格',
      yield: '预期收益率',
      yieldMin: '最低收益率 (%)',
      yieldMax: '最高收益率 (%)',
      location: '区域',
      prefecture: '都道府县',
      city: '市区町村',
      selectArea: '选择区域',
      mapAreaSelection: '在地图上选择区域',
      area: '面积',
      landAreaMin: '土地面积（最小）',
      landAreaMax: '土地面积（最大）',
      buildingAreaMin: '建筑面积（最小）',
      buildingAreaMax: '建筑面积（最大）',
      structure: '建筑结构',
      structureType: '结构类型',
      rc: 'RC（钢筋混凝土）',
      src: 'SRC（钢骨钢筋混凝土）',
      steel: '钢结构',
      wood: '木结构',
      floors: '楼层数',
      floorsMin: '最小楼层',
      floorsMax: '最大楼层',
      station: '车站与交通',
      stationName: '车站名称',
      walkTime: '步行时间（分钟）',
      walkTimeMax: '最大步行时间',
      features: '设备特征',
      iot: 'IoT系统',
      faceRecognition: '人脸识别',
      soundproof: '隔音结构',
      minpaku: '民宿运营中',
      rentalGuarantee: '整租合同',
      smartHome: '智能家居',
      nearPark: '近公园',
      multiLine: '多路线',
      urbanPlanning: '都市规划红利',
      completion: '竣工年份',
      completionMin: '起始年份',
      completionMax: '结束年份',
      apply: '搜索',
    },
  };

  const t = labels[language];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-sky-600 flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          {t.clearAll}
        </button>
      </div>

      {/* Quick Search Presets - Only for investment properties */}
      {propertyCategory === 'investment' && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">{t.presets}</h4>
          <div className="grid grid-cols-2 gap-2">
            {FILTER_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <span>{preset.icon}</span>
                  <span className="font-medium">
                    {language === 'ja' && preset.name_ja}
                    {language === 'en' && preset.name_en}
                    {language === 'zh' && preset.name_zh}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <FilterSection
        title={t.price}
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-3">
          <input
            type="number"
            placeholder={t.priceMin}
            value={filters.price_min || ''}
            onChange={e => updateFilter('price_min', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder={t.priceMax}
            value={filters.price_max || ''}
            onChange={e => updateFilter('price_max', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
      </FilterSection>

      {/* Yield Range - Only for investment properties */}
      {propertyCategory === 'investment' && (
        <FilterSection
          title={t.yield}
          isExpanded={expandedSections.yield}
          onToggle={() => toggleSection('yield')}
        >
          <div className="space-y-3">
            <input
              type="number"
              step="0.1"
              placeholder={t.yieldMin}
              value={filters.yield_min || ''}
              onChange={e => updateFilter('yield_min', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <input
              type="number"
              step="0.1"
              placeholder={t.yieldMax}
              value={filters.yield_max || ''}
              onChange={e => updateFilter('yield_max', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </FilterSection>
      )}

      {/* Location */}
      <FilterSection
        title={t.location}
        isExpanded={expandedSections.location}
        onToggle={() => toggleSection('location')}
      >
        <div className="space-y-3">
          <select
            value={filters.city || ''}
            onChange={e => updateFilter('city', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="">{t.city}</option>
            <optgroup label="東京23区 / Tokyo 23 Wards / 东京23区">
              <option value="千代田区">千代田区 (Chiyoda)</option>
              <option value="中央区">中央区 (Chuo)</option>
              <option value="港区">港区 (Minato)</option>
              <option value="新宿区">新宿区 (Shinjuku)</option>
              <option value="文京区">文京区 (Bunkyo)</option>
              <option value="台東区">台東区 (Taito)</option>
              <option value="墨田区">墨田区 (Sumida)</option>
              <option value="江東区">江東区 (Koto)</option>
              <option value="品川区">品川区 (Shinagawa)</option>
              <option value="目黒区">目黒区 (Meguro)</option>
              <option value="大田区">大田区 (Ota)</option>
              <option value="世田谷区">世田谷区 (Setagaya)</option>
              <option value="渋谷区">渋谷区 (Shibuya)</option>
              <option value="中野区">中野区 (Nakano)</option>
              <option value="杉並区">杉並区 (Suginami)</option>
              <option value="豊島区">豊島区 (Toshima)</option>
              <option value="北区">北区 (Kita)</option>
              <option value="荒川区">荒川区 (Arakawa)</option>
              <option value="板橋区">板橋区 (Itabashi)</option>
              <option value="練馬区">練馬区 (Nerima)</option>
              <option value="足立区">足立区 (Adachi)</option>
              <option value="葛飾区">葛飾区 (Katsushika)</option>
              <option value="江戸川区">江戸川区 (Edogawa)</option>
            </optgroup>
            <optgroup label="東京都市部 / Tokyo Cities / 东京都市部">
              <option value="八王子市">八王子市 (Hachioji)</option>
              <option value="立川市">立川市 (Tachikawa)</option>
              <option value="武蔵野市">武蔵野市 (Musashino)</option>
              <option value="三鷹市">三鷹市 (Mitaka)</option>
              <option value="府中市">府中市 (Fuchu)</option>
              <option value="調布市">調布市 (Chofu)</option>
            </optgroup>
            <optgroup label="神奈川県 / Kanagawa / 神奈川县">
              <option value="横浜市">横浜市 (Yokohama)</option>
              <option value="川崎市">川崎市 (Kawasaki)</option>
              <option value="相模原市">相模原市 (Sagamihara)</option>
            </optgroup>
            <optgroup label="埼玉県 / Saitama / 埼玉县">
              <option value="さいたま市">さいたま市 (Saitama)</option>
              <option value="川口市">川口市 (Kawaguchi)</option>
            </optgroup>
            <optgroup label="千葉県 / Chiba / 千叶县">
              <option value="千葉市">千葉市 (Chiba)</option>
              <option value="船橋市">船橋市 (Funabashi)</option>
            </optgroup>
          </select>
          
          {/* Map Area Selection Button */}
          <button
            onClick={() => setShowMapModal(true)}
            className="w-full px-3 py-2 border-2 border-dashed border-sky-300 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>{t.mapAreaSelection}</span>
            {selectedMapAreas.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-sky-600 text-white text-xs rounded-full">
                {selectedMapAreas.length}
              </span>
            )}
          </button>
          
          {/* Selected Areas Display */}
          {selectedMapAreas.length > 0 && (
            <div className="mt-2 p-2 bg-sky-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">選択中のエリア:</div>
              <div className="flex flex-wrap gap-1">
                {selectedMapAreas.slice(0, 3).map((areaId) => (
                  <span key={areaId} className="px-2 py-1 bg-sky-100 text-sky-800 text-xs rounded">
                    {areaId}
                  </span>
                ))}
                {selectedMapAreas.length > 3 && (
                  <span className="px-2 py-1 bg-sky-100 text-sky-800 text-xs rounded">
                    +{selectedMapAreas.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </FilterSection>

      {/* Area (Land & Building) */}
      <FilterSection
        title={t.area}
        isExpanded={expandedSections.area}
        onToggle={() => toggleSection('area')}
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">土地面積 (m²)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder={t.landAreaMin}
                value={filters.land_area_min || ''}
                onChange={e => updateFilter('land_area_min', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
              />
              <input
                type="number"
                placeholder={t.landAreaMax}
                value={filters.land_area_max || ''}
                onChange={e => updateFilter('land_area_max', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">建物面積 (m²)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder={t.buildingAreaMin}
                value={filters.building_area_min || ''}
                onChange={e => updateFilter('building_area_min', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
              />
              <input
                type="number"
                placeholder={t.buildingAreaMax}
                value={filters.building_area_max || ''}
                onChange={e => updateFilter('building_area_max', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Building Structure */}
      <FilterSection
        title={t.structure}
        isExpanded={expandedSections.structure}
        onToggle={() => toggleSection('structure')}
      >
        <div className="space-y-3">
          <div className="space-y-2">
            <CheckboxFilter
              label={t.rc}
              checked={filters.structure_rc || false}
              onChange={checked => updateFilter('structure_rc', checked || undefined)}
            />
            <CheckboxFilter
              label={t.src}
              checked={filters.structure_src || false}
              onChange={checked => updateFilter('structure_src', checked || undefined)}
            />
            <CheckboxFilter
              label={t.steel}
              checked={filters.structure_steel || false}
              onChange={checked => updateFilter('structure_steel', checked || undefined)}
            />
            <CheckboxFilter
              label={t.wood}
              checked={filters.structure_wood || false}
              onChange={checked => updateFilter('structure_wood', checked || undefined)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">{t.floors}</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder={t.floorsMin}
                value={filters.floors_min || ''}
                onChange={e => updateFilter('floors_min', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
              />
              <input
                type="number"
                placeholder={t.floorsMax}
                value={filters.floors_max || ''}
                onChange={e => updateFilter('floors_max', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Station & Transportation */}
      <FilterSection
        title={t.station}
        isExpanded={expandedSections.station}
        onToggle={() => toggleSection('station')}
      >
        <div className="space-y-3">
          <input
            type="text"
            placeholder={t.stationName}
            value={filters.station_name || ''}
            onChange={e => updateFilter('station_name', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
          <div>
            <label className="text-xs text-gray-600 mb-1 block">{t.walkTime}</label>
            <input
              type="number"
              placeholder={t.walkTimeMax}
              value={filters.walk_time_max || ''}
              onChange={e => updateFilter('walk_time_max', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>
      </FilterSection>

      {/* Special Features - Only for investment properties */}
      {propertyCategory === 'investment' && (
        <FilterSection
          title={t.features}
          isExpanded={expandedSections.features}
          onToggle={() => toggleSection('features')}
        >
          <div className="space-y-2">
            <CheckboxFilter
              label={t.iot}
              checked={filters.has_iot || false}
              onChange={checked => updateFilter('has_iot', checked || undefined)}
            />
            <CheckboxFilter
              label={t.faceRecognition}
              checked={filters.has_face_recognition || false}
              onChange={checked => updateFilter('has_face_recognition', checked || undefined)}
            />
            <CheckboxFilter
              label={t.soundproof}
              checked={filters.has_soundproof || false}
              onChange={checked => updateFilter('has_soundproof', checked || undefined)}
            />
            <CheckboxFilter
              label={t.minpaku}
              checked={filters.is_minpaku_operating || false}
              onChange={checked => updateFilter('is_minpaku_operating', checked || undefined)}
            />
            <CheckboxFilter
              label={t.rentalGuarantee}
              checked={filters.has_rental_guarantee || false}
              onChange={checked => updateFilter('has_rental_guarantee', checked || undefined)}
            />
            <CheckboxFilter
              label={t.smartHome}
              checked={filters.has_smart_home || false}
              onChange={checked => updateFilter('has_smart_home', checked || undefined)}
            />
            <CheckboxFilter
              label={t.nearPark}
              checked={filters.near_park || false}
              onChange={checked => updateFilter('near_park', checked || undefined)}
            />
            <CheckboxFilter
              label={t.multiLine}
              checked={filters.multi_line_access || false}
              onChange={checked => updateFilter('multi_line_access', checked || undefined)}
            />
            <CheckboxFilter
              label={t.urbanPlanning}
              checked={filters.urban_planning_benefit || false}
              onChange={checked => updateFilter('urban_planning_benefit', checked || undefined)}
            />
          </div>
        </FilterSection>
      )}

      {/* Completion Year */}
      <FilterSection
        title={t.completion}
        isExpanded={expandedSections.completion}
        onToggle={() => toggleSection('completion')}
      >
        <div className="space-y-3">
          <input
            type="number"
            placeholder={t.completionMin}
            value={filters.completion_year_min || ''}
            onChange={e => updateFilter('completion_year_min', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder={t.completionMax}
            value={filters.completion_year_max || ''}
            onChange={e => updateFilter('completion_year_max', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
      </FilterSection>
      
      {/* Map Modal */}
      <MapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        onAreaSelect={(areas) => {
          setSelectedMapAreas(areas);
          // Update city filter with first selected area
          if (areas.length > 0) {
            // For now, just update the city filter with the first area
            updateFilter('city', areas[0]);
          } else {
            updateFilter('city', undefined);
          }
        }}
        selectedAreas={selectedMapAreas}
        language={language}
      />
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left mb-3"
      >
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {isExpanded && <div>{children}</div>}
    </div>
  );
}

interface CheckboxFilterProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function CheckboxFilter({ label, checked, onChange }: CheckboxFilterProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-2 focus:ring-sky-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
