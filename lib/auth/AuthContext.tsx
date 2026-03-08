"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/internal-auth';
import { parseJsonWithFallback } from '@/lib/safe-json';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  updateUser: (newData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LOCAL_USER_STORAGE_KEY = "arbre_user";
const LEGACY_LOCAL_USER_STORAGE_KEY = "arbre_session";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger la session au démarrage
  useEffect(() => {
    let active = true;

    const hydrateSession = async () => {
      const savedUser =
        localStorage.getItem(LOCAL_USER_STORAGE_KEY) || localStorage.getItem(LEGACY_LOCAL_USER_STORAGE_KEY);
      if (savedUser) {
        const parsedUser = parseJsonWithFallback<User | null>(savedUser, null);
        if (active && parsedUser) setUser(parsedUser);
      }

      try {
        const response = await fetch("/api/auth/me", { credentials: "include", cache: "no-store" });
        if (response.ok) {
          const payload = await response.json();
          if (payload?.authenticated && payload?.user && active) {
            setUser(payload.user);
            localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(payload.user));
            localStorage.removeItem(LEGACY_LOCAL_USER_STORAGE_KEY);
          }
        } else if (active) {
          setUser(null);
          localStorage.removeItem(LOCAL_USER_STORAGE_KEY);
          localStorage.removeItem(LEGACY_LOCAL_USER_STORAGE_KEY);
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
    localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.removeItem(LEGACY_LOCAL_USER_STORAGE_KEY);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      localStorage.removeItem(LOCAL_USER_STORAGE_KEY);
      localStorage.removeItem(LEGACY_LOCAL_USER_STORAGE_KEY);
      window.location.href = "/";
    }
  };

  const updateUser = (newData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...newData };
      setUser(updatedUser);
      localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(updatedUser));
      localStorage.removeItem(LEGACY_LOCAL_USER_STORAGE_KEY);
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
