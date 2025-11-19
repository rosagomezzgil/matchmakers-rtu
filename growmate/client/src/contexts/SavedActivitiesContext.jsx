import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedActivitiesContext = createContext();

export const useSavedActivities = () => useContext(SavedActivitiesContext);

export function SavedActivitiesProvider({ children }) {
  const [savedActivities, setSavedActivities] = useState(() => {
    const saved = localStorage.getItem('savedActivities');
    return saved ? JSON.parse(saved) : [];
  });
  const [joinedActivities, setJoinedActivities] = useState(() => {
    const joined = localStorage.getItem('joinedActivities');
    return joined ? JSON.parse(joined) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedActivities', JSON.stringify(savedActivities));
  }, [savedActivities]);

  useEffect(() => {
    localStorage.setItem('joinedActivities', JSON.stringify(joinedActivities));
  }, [joinedActivities]);

  const normalizeId = (value) => {
    if (!value && value !== 0) return "";
    return value.toString();
  };

  const saveActivity = (activity) => {
    const normalizedId = normalizeId(activity.id);
    const isAlreadySaved = savedActivities.some(
      (saved) => normalizeId(saved.id) === normalizedId
    );
    if (!isAlreadySaved) {
      setSavedActivities((prev) => [
        ...prev,
        { ...activity, id: normalizedId },
      ]);
      return true;
    }
    return false; 
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

  const joinActivity = (activity) => {
    const normalizedId = normalizeId(activity.id);
    const isAlreadyJoined = joinedActivities.some(
      (joined) => normalizeId(joined.id) === normalizedId
    );
    if (!isAlreadyJoined) {
      setJoinedActivities((prev) => [
        ...prev,
        { ...activity, id: normalizedId },
      ]);
      return true;
    }
    return false;
  };

  const leaveActivity = (activityId) => {
    const normalizedId = normalizeId(activityId);
    setJoinedActivities((prev) =>
      prev.filter((activity) => normalizeId(activity.id) !== normalizedId)
    );
  };

  const isActivitySaved = (activityId) => {
    const normalizedId = normalizeId(activityId);
    return savedActivities.some(
      (activity) => normalizeId(activity.id) === normalizedId
    );
  };

  const isActivityJoined = (activityId) => {
    const normalizedId = normalizeId(activityId);
    return joinedActivities.some(
      (activity) => normalizeId(activity.id) === normalizedId
    );
  };

  const value = {
    savedActivities,
    joinedActivities,
    saveActivity,
    removeActivity,
    clearAllActivities,
    isActivitySaved,
    joinActivity,
    leaveActivity,
    isActivityJoined,
  };

  return (
    <SavedActivitiesContext.Provider value={value}>
      {children}
    </SavedActivitiesContext.Provider>
  );
}

