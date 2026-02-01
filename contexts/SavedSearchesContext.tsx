/**
 * Saved Searches Context
 * Manages saved search functionality with localStorage
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PropertyFilterParams } from '@/lib/types/premium-property';

export interface SavedSearch {
  id: string;
  name: string;
  filters: PropertyFilterParams;
  createdAt: string;
  lastUsed?: string;
  category?: 'all' | 'residential' | 'investment';
}

interface SavedSearchesContextType {
  savedSearches: SavedSearch[];
  saveSearch: (name: string, filters: PropertyFilterParams, category?: string) => void;
  loadSearch: (id: string) => SavedSearch | undefined;
  deleteSearch: (id: string) => void;
  updateSearch: (id: string, updates: Partial<SavedSearch>) => void;
  markAsUsed: (id: string) => void;
}

const SavedSearchesContext = createContext<SavedSearchesContextType | undefined>(undefined);

const STORAGE_KEY = 'kanae_saved_searches';

export function SavedSearchesProvider({ children }: { children: React.ReactNode }) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Load saved searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedSearches(parsed);
      }
    } catch (error) {
      console.error('Failed to load saved searches:', error);
    }
  }, []);

  // Save to localStorage whenever savedSearches changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSearches));
    } catch (error) {
      console.error('Failed to save searches:', error);
    }
  }, [savedSearches]);

  const saveSearch = (name: string, filters: PropertyFilterParams, category?: string) => {
    const newSearch: SavedSearch = {
      id: `search_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      name,
      filters,
      category: (category as any) || 'all',
      createdAt: new Date().toISOString(),
    };

    setSavedSearches(prev => [newSearch, ...prev]);
    return newSearch;
  };

  const loadSearch = (id: string): SavedSearch | undefined => {
    return savedSearches.find(search => search.id === id);
  };

  const deleteSearch = (id: string) => {
    setSavedSearches(prev => prev.filter(search => search.id !== id));
  };

  const updateSearch = (id: string, updates: Partial<SavedSearch>) => {
    setSavedSearches(prev =>
      prev.map(search =>
        search.id === id ? { ...search, ...updates } : search
      )
    );
  };

  const markAsUsed = (id: string) => {
    updateSearch(id, { lastUsed: new Date().toISOString() });
  };

  return (
    <SavedSearchesContext.Provider
      value={{
        savedSearches,
        saveSearch,
        loadSearch,
        deleteSearch,
        updateSearch,
        markAsUsed,
      }}
    >
      {children}
    </SavedSearchesContext.Provider>
  );
}

export function useSavedSearches() {
  const context = useContext(SavedSearchesContext);
  if (!context) {
    throw new Error('useSavedSearches must be used within SavedSearchesProvider');
  }
  return context;
}
