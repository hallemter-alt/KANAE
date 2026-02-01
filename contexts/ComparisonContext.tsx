/**
 * Comparison Context
 * Manages property comparison functionality
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ComparisonProperty {
  id: string;
  addedAt: string;
}

interface ComparisonContextType {
  comparisonList: ComparisonProperty[];
  isInComparison: (propertyId: string) => boolean;
  addToComparison: (propertyId: string) => boolean;
  removeFromComparison: (propertyId: string) => void;
  toggleComparison: (propertyId: string) => void;
  clearComparison: () => void;
  getComparisonCount: () => number;
  canAddMore: () => boolean;
  maxComparison: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const STORAGE_KEY = 'kanae_property_comparison';
const MAX_COMPARISON = 4; // Maximum 4 properties can be compared

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparisonList, setComparisonList] = useState<ComparisonProperty[]>([]);

  // Load comparison list from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setComparisonList(parsed);
      }
    } catch (error) {
      console.error('Failed to load comparison list:', error);
    }
  }, []);

  // Save to localStorage whenever comparison list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comparisonList));
    } catch (error) {
      console.error('Failed to save comparison list:', error);
    }
  }, [comparisonList]);

  const isInComparison = (propertyId: string): boolean => {
    return comparisonList.some(item => item.id === propertyId);
  };

  const canAddMore = (): boolean => {
    return comparisonList.length < MAX_COMPARISON;
  };

  const addToComparison = (propertyId: string): boolean => {
    if (comparisonList.length >= MAX_COMPARISON) {
      return false;
    }

    if (!isInComparison(propertyId)) {
      const newItem: ComparisonProperty = {
        id: propertyId,
        addedAt: new Date().toISOString(),
      };
      setComparisonList(prev => [...prev, newItem]);
      return true;
    }
    return false;
  };

  const removeFromComparison = (propertyId: string) => {
    setComparisonList(prev => prev.filter(item => item.id !== propertyId));
  };

  const toggleComparison = (propertyId: string) => {
    if (isInComparison(propertyId)) {
      removeFromComparison(propertyId);
    } else {
      addToComparison(propertyId);
    }
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const getComparisonCount = (): number => {
    return comparisonList.length;
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        isInComparison,
        addToComparison,
        removeFromComparison,
        toggleComparison,
        clearComparison,
        getComparisonCount,
        canAddMore,
        maxComparison: MAX_COMPARISON,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
}
