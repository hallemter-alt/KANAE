/**
 * Favorites Page
 * Displays user's favorite properties
 */

'use client';

import { useState, useEffect } from 'react';
import { Heart, Trash2, Edit2, Save, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/properties/PropertyCard';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface Property {
  id: string;
  property_name: string;
  property_type: string;
  price: number;
  address_full: string;
  yield_surface?: number;
  building_structure?: string;
  total_units?: number;
  [key: string]: any;
}

export default function FavoritesPage() {
  const { locale } = useLanguage();
  const { favorites, removeFavorite, updateNotes } = useFavorites();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  useEffect(() => {
    const fetchFavoriteProperties = async () => {
      setLoading(true);
      try {
        // Fetch all favorite properties
        const propertyPromises = favorites.map(async (fav) => {
          try {
            const response = await fetch(`/api/properties/${fav.id}`);
            if (response.ok) {
              return await response.json();
            }
            return null;
          } catch (error) {
            console.error(`Failed to fetch property ${fav.id}:`, error);
            return null;
          }
        });

        const results = await Promise.all(propertyPromises);
        const validProperties = results.filter((p): p is Property => p !== null);
        setProperties(validProperties);
      } catch (error) {
        console.error('Failed to fetch favorite properties:', error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteProperties();
    } else {
      setProperties([]);
      setLoading(false);
    }
  }, [favorites]);

  const handleRemove = (propertyId: string) => {
    if (confirm('お気に入りから削除してもよろしいですか？')) {
      removeFavorite(propertyId);
    }
  };

  const startEditNotes = (propertyId: string) => {
    const fav = favorites.find(f => f.id === propertyId);
    setEditingNotes(propertyId);
    setNotesText(fav?.notes || '');
  };

  const saveNotes = (propertyId: string) => {
    updateNotes(propertyId, notesText);
    setEditingNotes(null);
    setNotesText('');
  };

  const cancelEditNotes = () => {
    setEditingNotes(null);
    setNotesText('');
  };

  const labels = {
    ja: {
      title: 'お気に入り物件',
      subtitle: '保存した物件を管理',
      count: '件',
      empty: 'お気に入り物件はありません',
      emptyDesc: '物件詳細ページからお気に入りに追加してください',
      notes: 'メモ',
      addNotes: 'メモを追加',
      editNotes: 'メモを編集',
      save: '保存',
      cancel: 'キャンセル',
      remove: '削除',
      addedOn: '追加日',
    },
    en: {
      title: 'Favorite Properties',
      subtitle: 'Manage your saved properties',
      count: 'properties',
      empty: 'No favorite properties',
      emptyDesc: 'Add properties to favorites from the property detail page',
      notes: 'Notes',
      addNotes: 'Add notes',
      editNotes: 'Edit notes',
      save: 'Save',
      cancel: 'Cancel',
      remove: 'Remove',
      addedOn: 'Added on',
    },
    zh: {
      title: '收藏房产',
      subtitle: '管理您保存的房产',
      count: '个',
      empty: '没有收藏的房产',
      emptyDesc: '从房产详情页添加到收藏',
      notes: '备注',
      addNotes: '添加备注',
      editNotes: '编辑备注',
      save: '保存',
      cancel: '取消',
      remove: '删除',
      addedOn: '添加日期',
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.ja;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8" />
              <h1 className="text-4xl font-bold">{t.title}</h1>
            </div>
            <p className="text-sky-100 text-lg">{t.subtitle}</p>
            <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-2xl font-bold">{favorites.length}</span>
              <span className="ml-2">{t.count}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
            </div>
          )}

          {!loading && properties.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.empty}</h3>
              <p className="text-gray-600">{t.emptyDesc}</p>
            </div>
          )}

          {!loading && properties.length > 0 && (
            <div className="space-y-6">
              {properties.map((property) => {
                const fav = favorites.find(f => f.id === property.id);
                const isEditing = editingNotes === property.id;

                return (
                  <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                      {/* Property Card */}
                      <div className="lg:col-span-2">
                        <PropertyCard
                          property={property as any}
                          language={locale as 'ja' | 'en' | 'zh'}
                          locale={locale}
                        />
                      </div>

                      {/* Notes & Actions */}
                      <div className="space-y-4">
                        {/* Added Date */}
                        {fav && (
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">{t.addedOn}: </span>
                            {new Date(fav.addedAt).toLocaleDateString(
                              locale === 'ja' ? 'ja-JP' : locale === 'zh' ? 'zh-CN' : 'en-US'
                            )}
                          </div>
                        )}

                        {/* Notes */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{t.notes}</h4>
                            {!isEditing && (
                              <button
                                onClick={() => startEditNotes(property.id)}
                                className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          {isEditing ? (
                            <div className="space-y-3">
                              <textarea
                                value={notesText}
                                onChange={(e) => setNotesText(e.target.value)}
                                placeholder={t.addNotes}
                                className="w-full px-3 py-2 border-2 border-sky-500 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                rows={4}
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveNotes(property.id)}
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                                >
                                  <Save className="w-4 h-4" />
                                  {t.save}
                                </button>
                                <button
                                  onClick={cancelEditNotes}
                                  className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-700 text-sm whitespace-pre-wrap">
                              {fav?.notes || <span className="text-gray-400 italic">{t.addNotes}</span>}
                            </p>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(property.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
                        >
                          <Trash2 className="w-5 h-5" />
                          {t.remove}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
