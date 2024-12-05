import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the type for the theme context
type ThemeContextType = {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props type for the ThemeProvider component
type ThemeProviderProps = {
  children: ReactNode;  // Explicitly define the children prop as ReactNode
};

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme ? (savedTheme as 'light' | 'dark' | 'system') : 'dark');
    };
    loadTheme();
  }, []);

  const updateTheme = async (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};