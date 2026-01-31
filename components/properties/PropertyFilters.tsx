/**
 * Premium Property Filters Component
 * Advanced filtering system for high-end investment properties
 */

'use client';

import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { PropertyFilterParams } from '@/lib/types/premium-property';
import { FILTER_PRESETS } from '@/lib/types/premium-property';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilterParams) => void;
  initialFilters?: PropertyFilterParams;
  language?: 'ja' | 'en' | 'zh';
}

export default function PropertyFilters({
  onFilterChange,
  initialFilters = {},
  language = 'ja',
}: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilterParams>(initialFilters);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    yield: true,
    location: true,
    features: true,
    completion: false,
  });

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

      {/* Quick Search Presets */}
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

      {/* Yield Range */}
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
            <option value="新宿区">新宿区 (Shinjuku)</option>
            <option value="渋谷区">渋谷区 (Shibuya)</option>
            <option value="港区">港区 (Minato)</option>
            <option value="千代田区">千代田区 (Chiyoda)</option>
          </select>
        </div>
      </FilterSection>

      {/* Special Features */}
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
