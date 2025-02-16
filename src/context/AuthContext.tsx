import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  hasProvidedLocation: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setHasProvidedLocation: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProvidedLocation, setHasProvidedLocation] = useState(false);

  const value = {
    isAuthenticated,
    hasProvidedLocation,
    setIsAuthenticated,
    setHasProvidedLocation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
