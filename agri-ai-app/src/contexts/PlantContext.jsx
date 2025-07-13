import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import "../styles/PlantContext.css"
const PlantContext = createContext();

export const usePlant = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlant must be used within a PlantProvider');
  }
  return context;
};

export const PlantProvider = ({ children }) => {
  const { user } = useAuth();
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      // Load user's analysis history from localStorage
      const savedHistory = localStorage.getItem(`plantdoc_history_${user.id}`);
      if (savedHistory) {
        setAnalysisHistory(JSON.parse(savedHistory));
      }

      const savedFavorites = localStorage.getItem(`plantdoc_favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      setAnalysisHistory([]);
      setFavorites([]);
    }
  }, [user]);

  const addAnalysis = (analysisData) => {
    const newAnalysis = {
      id: Date.now().toString(),
      ...analysisData,
      timestamp: new Date().toISOString(),
      userId: user?.id
    };

    const updatedHistory = [newAnalysis, ...analysisHistory];
    setAnalysisHistory(updatedHistory);
    
    if (user) {
      localStorage.setItem(`plantdoc_history_${user.id}`, JSON.stringify(updatedHistory));
    }

    return newAnalysis;
  };

  const deleteAnalysis = (analysisId) => {
    const updatedHistory = analysisHistory.filter(analysis => analysis.id !== analysisId);
    setAnalysisHistory(updatedHistory);
    
    if (user) {
      localStorage.setItem(`plantdoc_history_${user.id}`, JSON.stringify(updatedHistory));
    }
  };

  const addToFavorites = (plantData) => {
    const newFavorite = {
      id: Date.now().toString(),
      ...plantData,
      addedAt: new Date().toISOString()
    };

    const updatedFavorites = [newFavorite, ...favorites];
    setFavorites(updatedFavorites);
    
    if (user) {
      localStorage.setItem(`plantdoc_favorites_${user.id}`, JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (favoriteId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
    setFavorites(updatedFavorites);
    
    if (user) {
      localStorage.setItem(`plantdoc_favorites_${user.id}`, JSON.stringify(updatedFavorites));
    }
  };

  const value = {
    analysisHistory,
    favorites,
    addAnalysis,
    deleteAnalysis,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
};