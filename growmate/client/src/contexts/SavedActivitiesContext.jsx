import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedActivitiesContext = createContext();

export const useSavedActivities = () => useContext(SavedActivitiesContext);

export function SavedActivitiesProvider({ children }) {
  // Lade gespeicherte Aktivitäten aus localStorage beim Start
  const [savedActivities, setSavedActivities] = useState(() => {
    const saved = localStorage.getItem('savedActivities');
    return saved ? JSON.parse(saved) : [];
  });

  // Speichere in localStorage, wenn sich savedActivities ändert
  useEffect(() => {
    localStorage.setItem('savedActivities', JSON.stringify(savedActivities));
  }, [savedActivities]);

  const saveActivity = (activity) => {
    // Prüfe, ob die Activity bereits gespeichert ist
    const isAlreadySaved = savedActivities.some(saved => saved.id === activity.id);
    if (!isAlreadySaved) {
      setSavedActivities(prev => [...prev, activity]);
      return true; // Erfolgreich gespeichert
    }
    return false; // Bereits gespeichert
  };

  const removeActivity = (activityId) => {
    setSavedActivities(prev => prev.filter(activity => activity.id !== activityId));
  };

  const clearAllActivities = () => {
    setSavedActivities([]);
  };

  const isActivitySaved = (activityId) => {
    return savedActivities.some(activity => activity.id === activityId);
  };

  const value = {
    savedActivities,
    saveActivity,
    removeActivity,
    clearAllActivities,
    isActivitySaved,
  };

  return (
    <SavedActivitiesContext.Provider value={value}>
      {children}
    </SavedActivitiesContext.Provider>
  );
}

