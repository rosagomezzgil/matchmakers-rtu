import React, { createContext, useContext, useState } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ECHTE LOGIN FUNKTION
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await AuthService.login(email, password); 
      setIsLoggedIn(true);
      return { ok: true };
    } catch (err) {
      setError(err.message);
      console.error('Login Error:', err);
      setIsLoggedIn(false);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };
  
  // ECHTE REGISTRIER FUNKTION
  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await AuthService.register(email, password);
      setIsLoggedIn(true);
      return { ok: true };
    } catch (err) {
      setError(err.message);
      setIsLoggedIn(false);
      console.error('Registration Error:', err);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ECHTE LOGOUT FUNKTION
  const signOut = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    // Optional: Navigation zur Landing Page
    // navigate('/'); 
  };
  
  const value = {
    isLoggedIn,
    loading,
    error,
    signIn,
    signUp, // <<< NEU
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}