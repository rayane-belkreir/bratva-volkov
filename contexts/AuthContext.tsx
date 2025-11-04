"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/lib/types";
import * as auth from "@/lib/auth";
import { useDataSync } from "@/hooks/useDataSync";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email?: string, pseudo?: string, discord?: string, experience?: string) => Promise<boolean>;
  logout: () => void;
  updateUserData: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      // Mettre à jour avec les données les plus récentes depuis MongoDB
      try {
        const allUsers = await auth.getAllUsers();
        const updatedUser = allUsers.find(u => u.id === currentUser.id);
        if (updatedUser) {
          const { password: _, ...userWithoutPassword } = updatedUser;
          auth.setCurrentUser(userWithoutPassword as User);
          setUser(userWithoutPassword as User);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error refreshing user:', error);
        // Garder l'utilisateur actuel en cas d'erreur
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  // Synchroniser les données utilisateur automatiquement
  useDataSync(() => {
    refreshUser();
  }, 2000);

  const login = async (username: string, password: string): Promise<boolean> => {
    const loggedInUser = await auth.login(username, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const register = async (username: string, password: string, email?: string, pseudo?: string, discord?: string, experience?: string): Promise<boolean> => {
    const newUser = await auth.register(username, password, email, pseudo, discord, experience);
    if (newUser) {
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  const updateUserData = async (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = await auth.updateUser(user.id, updates);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  // Un utilisateur est considéré comme authentifié uniquement s'il est approuvé
  // Les utilisateurs "pending" ont un accès visiteur limité
  const isAuthenticated = !!user && user.status !== 'pending' && user.status !== 'rejected';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUserData,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

