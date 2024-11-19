import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { signInAnonymously } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error('Auth error:', error);
        setError(error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error);
      setError(error);
      setLoading(false);
    });

    if (!auth.currentUser) {
      initAuth();
    }

    return unsubscribe;
  }, []);

  if (error) {
    return <div>Error initializing app: {error.message}</div>;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};