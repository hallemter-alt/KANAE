/**
 * Saved Searches Panel Component
 * Displays and manages saved search queries
 */

'use client';

import React, { useState } from 'react';
import { Save, Bookmark, Trash2, Clock, X, Edit2, Check } from 'lucide-react';
import { useSavedSearches, type SavedSearch } from '@/contexts/SavedSearchesContext';
import type { PropertyFilterParams } from '@/lib/types/premium-property';

interface SavedSearchesPanelProps {
  onLoadSearch: (filters: PropertyFilterParams, category?: string) => void;
  currentFilters?: PropertyFilterParams;
  currentCategory?: 'all' | 'residential' | 'investment';
  language?: 'ja' | 'en' | 'zh';
}

export default function SavedSearchesPanel({
  onLoadSearch,
  currentFilters = {},
  currentCategory = 'all',
  language = 'ja',
}: SavedSearchesPanelProps) {
  const { savedSearches, saveSearch, deleteSearch, updateSearch, markAsUsed } = useSavedSearches();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const labels = {
    ja: {
      savedSearches: '保存された検索',
      save: '現在の検索を保存',
      searchName: '検索名',
      savePlaceholder: '例: 新宿区の高利回り物件',
      cancel: 'キャンセル',
      confirm: '保存',
      load: '読み込む',
      delete: '削除',
      edit: '編集',
      noSearches: '保存された検索はありません',
      saveFirst: '検索条件を設定して保存してください',
      created: '作成日',
      lastUsed: '最終使用',
      never: '未使用',
    },
    en: {
      savedSearches: 'Saved Searches',
      save: 'Save Current Search',
      searchName: 'Search Name',
      savePlaceholder: 'e.g., High Yield in Shinjuku',
      cancel: 'Cancel',
      confirm: 'Save',
      load: 'Load',
      delete: 'Delete',
      edit: 'Edit',
      noSearches: 'No saved searches',
      saveFirst: 'Set search criteria and save',
      created: 'Created',
      lastUsed: 'Last Used',
      never: 'Never',
    },
    zh: {
      savedSearches: '已保存的搜索',
      save: '保存当前搜索',
      searchName: '搜索名称',
      savePlaceholder: '例如：新宿区高收益房产',
      cancel: '取消',
      confirm: '保存',
      load: '加载',
      delete: '删除',
      edit: '编辑',
      noSearches: '没有保存的搜索',
      saveFirst: '设置搜索条件并保存',
      created: '创建日期',
      lastUsed: '上次使用',
      never: '从未',
    },
  };

  const t = labels[language];

  const handleSave = () => {
    if (searchName.trim()) {
      saveSearch(searchName.trim(), currentFilters, currentCategory);
      setSearchName('');
      setShowSaveDialog(false);
    }
  };

  const handleLoad = (search: SavedSearch) => {
    markAsUsed(search.id);
    onLoadSearch(search.filters, search.category);
  };

  const handleDelete = (id: string) => {
    if (confirm('この検索を削除してもよろしいですか？')) {
      deleteSearch(id);
    }
  };

  const startEdit = (search: SavedSearch) => {
    setEditingId(search.id);
    setEditName(search.name);
  };

  const saveEdit = (id: string) => {
    if (editName.trim()) {
      updateSearch(id, { name: editName.trim() });
      setEditingId(null);
      setEditName('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return t.never;
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ja' ? 'ja-JP' : language === 'zh' ? 'zh-CN' : 'en-US');
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'investment': return language === 'ja' ? '投資用' : language === 'zh' ? '投资用' : 'Investment';
      case 'residential': return language === 'ja' ? '住宅用' : language === 'zh' ? '住宅用' : 'Residential';
      default: return language === 'ja' ? 'すべて' : language === 'zh' ? '全部' : 'All';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'investment': return 'bg-green-100 text-green-800';
      case 'residential': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-bold text-gray-900">{t.savedSearches}</h3>
        </div>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-semibold"
        >
          <Save className="w-4 h-4" />
          {t.save}
        </button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t.save}</h3>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder={t.savePlaceholder}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent mb-4"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSaveDialog(false);
                  setSearchName('');
                }}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSave}
                disabled={!searchName.trim()}
                className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Searches List */}
      {savedSearches.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-2">{t.noSearches}</p>
          <p className="text-sm text-gray-400">{t.saveFirst}</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {savedSearches.map((search) => (
            <div
              key={search.id}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-sky-300 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                {editingId === search.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-3 py-1 border-2 border-sky-500 rounded focus:ring-2 focus:ring-sky-500"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit(search.id)}
                    />
                    <button
                      onClick={() => saveEdit(search.id)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{search.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className={`px-2 py-0.5 rounded-full ${getCategoryColor(search.category)}`}>
                          {getCategoryLabel(search.category)}
                        </span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(search.lastUsed || search.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(search)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title={t.edit}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(search.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title={t.delete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {editingId !== search.id && (
                <button
                  onClick={() => handleLoad(search)}
                  className="w-full mt-2 px-4 py-2 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Bookmark className="w-4 h-4" />
                  {t.load}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
