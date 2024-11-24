import React, { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'restaurant';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'customer' | 'restaurant') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'customer' | 'restaurant') => {
    // Check for test credentials
    if (email === 'test@test.com' && password === 'admin') {
      setUser({
        name: role === 'customer' ? 'Test User' : 'Test Restaurant',
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${role === 'customer' ? 'Test+User' : 'Test+Restaurant'}&background=22C55E&color=fff`
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}