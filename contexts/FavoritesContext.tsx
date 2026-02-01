/**
 * Favorites Context
 * Manages favorite properties with localStorage
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FavoriteProperty {
  id: string;
  addedAt: string;
  notes?: string;
}

interface FavoritesContextType {
  favorites: FavoriteProperty[];
  isFavorite: (propertyId: string) => boolean;
  addFavorite: (propertyId: string, notes?: string) => void;
  removeFavorite: (propertyId: string) => void;
  toggleFavorite: (propertyId: string) => void;
  updateNotes: (propertyId: string, notes: string) => void;
  getFavoriteCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'kanae_favorite_properties';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProperty[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }, []);

  // Save to localStorage whenever favorites changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  const isFavorite = (propertyId: string): boolean => {
    return favorites.some(fav => fav.id === propertyId);
  };

  const addFavorite = (propertyId: string, notes?: string) => {
    if (!isFavorite(propertyId)) {
      const newFavorite: FavoriteProperty = {
        id: propertyId,
        addedAt: new Date().toISOString(),
        notes,
      };
      setFavorites(prev => [newFavorite, ...prev]);
    }
  };

  const removeFavorite = (propertyId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== propertyId));
  };

  const toggleFavorite = (propertyId: string) => {
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId);
    } else {
      addFavorite(propertyId);
    }
  };

  const updateNotes = (propertyId: string, notes: string) => {
    setFavorites(prev =>
      prev.map(fav =>
        fav.id === propertyId ? { ...fav, notes } : fav
      )
    );
  };

  const getFavoriteCount = (): number => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        updateNotes,
        getFavoriteCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
