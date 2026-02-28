"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/internal-auth';
import { logoutUserAction } from '@/lib/actions/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  updateUser: (newData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger la session au démarrage
  useEffect(() => {
    let active = true;

    const hydrateSession = async () => {
      const savedUser = localStorage.getItem('arbre_session');
      if (savedUser) {
        try {
          if (active) setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Erreur de parsing session:", e);
        }
      }

      try {
        const response = await fetch("/api/auth/me", { credentials: "include", cache: "no-store" });
        if (response.ok) {
          const payload = await response.json();
          if (payload?.authenticated && payload?.user && active) {
            setUser(payload.user);
            localStorage.setItem("arbre_session", JSON.stringify(payload.user));
          }
        }
      } catch {
        // La session locale reste le fallback offline.
      } finally {
        if (active) setIsLoading(false);
      }
    };

    hydrateSession();
    return () => {
      active = false;
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('arbre_session', JSON.stringify(userData));
    
  };

  const logout = async () => {
    await logoutUserAction();
    setUser(null);
    localStorage.removeItem('arbre_session');
    window.location.href = "/";
  };

  const updateUser = (newData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...newData };
      setUser(updatedUser);
      // Forcer la mise à jour du stockage local pour persistance immédiate
      localStorage.setItem('arbre_session', JSON.stringify(updatedUser));
      console.log("Session Mycélium mise à jour localement.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans un AuthProvider');
  return context;
};
