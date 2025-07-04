// @/components/pages/LoginPage/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
  imageUri?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (userData: User) => {
  try {
    if (!userData?.email || !userData?.name) {
      throw new Error("Invalid user data");
    }
    
    // Vérifiez et nettoyez les données
    const userToStore = {
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      imageUri: userData.imageUri?.trim() || null
    };

    setUser(userToStore);
    await AsyncStorage.setItem('user', JSON.stringify(userToStore));
    
    console.log('Login successful for:', userToStore.email);
    return true; // Indique le succès
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Propage l'erreur
  }
};
  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to remove user', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('useAuth context:', context); // Debugging line
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};