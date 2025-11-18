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

  const normalizeId = (value) => {
    if (!value && value !== 0) return "";
    return value.toString();
  };

  const saveActivity = (activity) => {
    // Prüfe, ob die Activity bereits gespeichert ist
    const normalizedId = normalizeId(activity.id);
    const isAlreadySaved = savedActivities.some(
      (saved) => normalizeId(saved.id) === normalizedId
    );
    if (!isAlreadySaved) {
      setSavedActivities((prev) => [
        ...prev,
        { ...activity, id: normalizedId },
      ]);
      return true; // Erfolgreich gespeichert
    }
    return false; // Bereits gespeichert
  };

  const removeActivity = (activityId) => {
    const normalizedId = normalizeId(activityId);
    setSavedActivities((prev) =>
      prev.filter((activity) => normalizeId(activity.id) !== normalizedId)
    );
  };

  const clearAllActivities = () => {
    setSavedActivities([]);
  };

  const isActivitySaved = (activityId) => {
    const normalizedId = normalizeId(activityId);
    return savedActivities.some(
      (activity) => normalizeId(activity.id) === normalizedId
    );
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

