import { User } from './types';

const API_BASE = '/api';

// Stocker l'utilisateur actuel dans localStorage (session côté client)
const STORAGE_KEY = 'fc_user';

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(STORAGE_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export async function login(username: string, password: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    setCurrentUser(user);
    return user;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function register(username: string, password: string, email?: string, pseudo?: string, discord?: string, experience?: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email, pseudo, discord, experience }),
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    setCurrentUser(user);
    return user;
  } catch (error) {
    console.error('Register error:', error);
    return null;
  }
}

export function logout(): void {
  setCurrentUser(null);
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      return null;
    }

    const updatedUser = await response.json();
    
    // Mettre à jour l'utilisateur actuel si c'est lui
    const currentUser = getCurrentUser();
    if (currentUser?.id === userId) {
      setCurrentUser(updatedUser);
    }

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

export async function addUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return false;
    }

    // Si l'utilisateur supprimé est l'utilisateur actuel, déconnecter
    const currentUser = getCurrentUser();
    if (currentUser?.id === userId) {
      logout();
    }

    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}

