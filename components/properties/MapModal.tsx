/**
 * Interactive Map Modal Component
 * Allows users to select areas on a map for property filtering
 */

'use client';

import React, { useState, useEffect } from 'react';
import { X, MapPin, Check } from 'lucide-react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAreaSelect: (areas: string[]) => void;
  selectedAreas?: string[];
  language?: 'ja' | 'en' | 'zh';
}

interface AreaRegion {
  id: string;
  name_ja: string;
  name_en: string;
  name_zh: string;
  coordinates: { x: number; y: number }[];
  category: 'tokyo-23' | 'tokyo-city' | 'kanagawa' | 'saitama' | 'chiba';
}

const TOKYO_AREAS: AreaRegion[] = [
  // Tokyo 23 Wards - Central
  { id: 'chiyoda', name_ja: '千代田区', name_en: 'Chiyoda', name_zh: '千代田区', coordinates: [{ x: 50, y: 48 }], category: 'tokyo-23' },
  { id: 'chuo', name_ja: '中央区', name_en: 'Chuo', name_zh: '中央区', coordinates: [{ x: 55, y: 50 }], category: 'tokyo-23' },
  { id: 'minato', name_ja: '港区', name_en: 'Minato', name_zh: '港区', coordinates: [{ x: 48, y: 53 }], category: 'tokyo-23' },
  { id: 'shinjuku', name_ja: '新宿区', name_en: 'Shinjuku', name_zh: '新宿区', coordinates: [{ x: 45, y: 45 }], category: 'tokyo-23' },
  { id: 'bunkyo', name_ja: '文京区', name_en: 'Bunkyo', name_zh: '文京区', coordinates: [{ x: 50, y: 43 }], category: 'tokyo-23' },
  { id: 'shibuya', name_ja: '渋谷区', name_en: 'Shibuya', name_zh: '渋谷区', coordinates: [{ x: 43, y: 50 }], category: 'tokyo-23' },
  { id: 'toshima', name_ja: '豊島区', name_en: 'Toshima', name_zh: '豊島区', coordinates: [{ x: 47, y: 40 }], category: 'tokyo-23' },
  
  // Tokyo 23 Wards - East
  { id: 'taito', name_ja: '台東区', name_en: 'Taito', name_zh: '台东区', coordinates: [{ x: 55, y: 43 }], category: 'tokyo-23' },
  { id: 'sumida', name_ja: '墨田区', name_en: 'Sumida', name_zh: '墨田区', coordinates: [{ x: 60, y: 45 }], category: 'tokyo-23' },
  { id: 'koto', name_ja: '江東区', name_en: 'Koto', name_zh: '江东区', coordinates: [{ x: 62, y: 50 }], category: 'tokyo-23' },
  { id: 'edogawa', name_ja: '江戸川区', name_en: 'Edogawa', name_zh: '江户川区', coordinates: [{ x: 68, y: 48 }], category: 'tokyo-23' },
  { id: 'katsushika', name_ja: '葛飾区', name_en: 'Katsushika', name_zh: '葛饰区', coordinates: [{ x: 65, y: 42 }], category: 'tokyo-23' },
  
  // Tokyo 23 Wards - South
  { id: 'shinagawa', name_ja: '品川区', name_en: 'Shinagawa', name_zh: '品川区', coordinates: [{ x: 50, y: 58 }], category: 'tokyo-23' },
  { id: 'meguro', name_ja: '目黒区', name_en: 'Meguro', name_zh: '目黒区', coordinates: [{ x: 45, y: 55 }], category: 'tokyo-23' },
  { id: 'ota', name_ja: '大田区', name_en: 'Ota', name_zh: '大田区', coordinates: [{ x: 48, y: 63 }], category: 'tokyo-23' },
  
  // Tokyo 23 Wards - West
  { id: 'setagaya', name_ja: '世田谷区', name_en: 'Setagaya', name_zh: '世田谷区', coordinates: [{ x: 38, y: 55 }], category: 'tokyo-23' },
  { id: 'nakano', name_ja: '中野区', name_en: 'Nakano', name_zh: '中野区', coordinates: [{ x: 42, y: 43 }], category: 'tokyo-23' },
  { id: 'suginami', name_ja: '杉並区', name_en: 'Suginami', name_zh: '杉并区', coordinates: [{ x: 38, y: 48 }], category: 'tokyo-23' },
  { id: 'nerima', name_ja: '練馬区', name_en: 'Nerima', name_zh: '练马区', coordinates: [{ x: 40, y: 38 }], category: 'tokyo-23' },
  
  // Tokyo 23 Wards - North
  { id: 'kita', name_ja: '北区', name_en: 'Kita', name_zh: '北区', coordinates: [{ x: 50, y: 35 }], category: 'tokyo-23' },
  { id: 'arakawa', name_ja: '荒川区', name_en: 'Arakawa', name_zh: '荒川区', coordinates: [{ x: 55, y: 38 }], category: 'tokyo-23' },
  { id: 'itabashi', name_ja: '板橋区', name_en: 'Itabashi', name_zh: '板桥区', coordinates: [{ x: 45, y: 35 }], category: 'tokyo-23' },
  { id: 'adachi', name_ja: '足立区', name_en: 'Adachi', name_zh: '足立区', coordinates: [{ x: 58, y: 35 }], category: 'tokyo-23' },
];

export default function MapModal({
  isOpen,
  onClose,
  onAreaSelect,
  selectedAreas = [],
  language = 'ja',
}: MapModalProps) {
  const [tempSelectedAreas, setTempSelectedAreas] = useState<string[]>(selectedAreas);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  useEffect(() => {
    setTempSelectedAreas(selectedAreas);
  }, [selectedAreas]);

  if (!isOpen) return null;

  const getAreaName = (area: AreaRegion) => {
    switch (language) {
      case 'en': return area.name_en;
      case 'zh': return area.name_zh;
      default: return area.name_ja;
    }
  };

  const toggleArea = (areaId: string) => {
    setTempSelectedAreas(prev =>
      prev.includes(areaId)
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleApply = () => {
    onAreaSelect(tempSelectedAreas);
    onClose();
  };

  const clearAll = () => {
    setTempSelectedAreas([]);
  };

  const selectAll = () => {
    setTempSelectedAreas(TOKYO_AREAS.map(a => a.id));
  };

  const labels = {
    ja: {
      title: '地図でエリアを選択',
      selected: '選択中',
      clear: 'クリア',
      selectAll: 'すべて選択',
      apply: '適用',
      close: '閉じる',
      tokyo23: '東京23区',
      clickToSelect: 'クリックして選択',
    },
    en: {
      title: 'Select Areas on Map',
      selected: 'Selected',
      clear: 'Clear',
      selectAll: 'Select All',
      apply: 'Apply',
      close: 'Close',
      tokyo23: 'Tokyo 23 Wards',
      clickToSelect: 'Click to select',
    },
    zh: {
      title: '在地图上选择区域',
      selected: '已选择',
      clear: '清除',
      selectAll: '全选',
      apply: '应用',
      close: '关闭',
      tokyo23: '东京23区',
      clickToSelect: '点击选择',
    },
  };

  const t = labels[language];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tokyo-23': return 'bg-sky-500';
      case 'tokyo-city': return 'bg-green-500';
      case 'kanagawa': return 'bg-purple-500';
      case 'saitama': return 'bg-orange-500';
      case 'chiba': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-sky-600" />
            <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Area */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-8 relative" style={{ minHeight: '500px' }}>
                {/* SVG Map Representation */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Tokyo Bay (background) */}
                  <path
                    d="M 55 55 Q 65 60, 70 70 L 70 100 L 40 100 L 40 65 Q 45 55, 55 55 Z"
                    fill="#E0F2FE"
                    opacity="0.5"
                  />
                  
                  {/* Area Circles */}
                  {TOKYO_AREAS.map((area) => {
                    const isSelected = tempSelectedAreas.includes(area.id);
                    const isHovered = hoveredArea === area.id;
                    
                    return (
                      <g key={area.id}>
                        <circle
                          cx={area.coordinates[0].x}
                          cy={area.coordinates[0].y}
                          r={isHovered ? "4" : "3"}
                          className={`cursor-pointer transition-all ${
                            isSelected
                              ? 'fill-sky-600 stroke-sky-800'
                              : 'fill-gray-300 stroke-gray-500 hover:fill-sky-400'
                          }`}
                          strokeWidth="0.5"
                          onClick={() => toggleArea(area.id)}
                          onMouseEnter={() => setHoveredArea(area.id)}
                          onMouseLeave={() => setHoveredArea(null)}
                        />
                        {isSelected && (
                          <circle
                            cx={area.coordinates[0].x}
                            cy={area.coordinates[0].y}
                            r="2"
                            fill="white"
                            pointerEvents="none"
                          />
                        )}
                      </g>
                    );
                  })}
                  
                  {/* Labels for hovered area */}
                  {hoveredArea && TOKYO_AREAS.find(a => a.id === hoveredArea) && (
                    <text
                      x={TOKYO_AREAS.find(a => a.id === hoveredArea)!.coordinates[0].x}
                      y={TOKYO_AREAS.find(a => a.id === hoveredArea)!.coordinates[0].y - 5}
                      textAnchor="middle"
                      className="text-xs font-bold fill-gray-900"
                      style={{ fontSize: '3px' }}
                    >
                      {getAreaName(TOKYO_AREAS.find(a => a.id === hoveredArea)!)}
                    </text>
                  )}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                  <div className="text-xs font-semibold text-gray-700 mb-2">{t.clickToSelect}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-sky-600"></div>
                    <span className="text-xs text-gray-600">{t.selected}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Area List */}
            <div className="space-y-4">
              {/* Stats */}
              <div className="bg-sky-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t.selected}</div>
                <div className="text-2xl font-bold text-sky-600">
                  {tempSelectedAreas.length} / {TOKYO_AREAS.length}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="flex-1 px-4 py-2 border-2 border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-semibold"
                >
                  {t.selectAll}
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
                >
                  {t.clear}
                </button>
              </div>

              {/* Area Checkboxes */}
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <h3 className="font-semibold text-gray-900 mb-3">{t.tokyo23}</h3>
                <div className="space-y-2">
                  {TOKYO_AREAS.map((area) => (
                    <label
                      key={area.id}
                      className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded transition-colors"
                      onMouseEnter={() => setHoveredArea(area.id)}
                      onMouseLeave={() => setHoveredArea(null)}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          tempSelectedAreas.includes(area.id)
                            ? 'bg-sky-600 border-sky-600'
                            : 'border-gray-300 hover:border-sky-400'
                        }`}
                      >
                        {tempSelectedAreas.includes(area.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{getAreaName(area)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            {t.close}
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl"
          >
            {t.apply} ({tempSelectedAreas.length})
          </button>
        </div>
      </div>
    </div>
  );
}
