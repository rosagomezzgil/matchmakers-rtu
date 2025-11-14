import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService'; // <<< NEU

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Initialisiert den Login-Status basierend auf einem vorhandenen Token
const initialIsLoggedIn = !!AuthService.getCurrentUserToken();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ECHTE LOGIN FUNKTION
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Wenn API funktioniert, wird der Token gespeichert
      await AuthService.login(email, password); 
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
      // Wenn der Fallback im AuthService genutzt wurde, wird der State trotzdem true
      if (AuthService.getCurrentUserToken()) {
         setIsLoggedIn(true); 
      }
      console.error('Login Error:', err);
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
    } catch (err) {
      setError(err.message);
      if (AuthService.getCurrentUserToken()) {
         setIsLoggedIn(true); 
      }
      console.error('Registration Error:', err);
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
  
  // Überprüft beim Laden, ob ein Token vorhanden ist
  useEffect(() => {
      setIsLoggedIn(!!AuthService.getCurrentUserToken());
  }, []);


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