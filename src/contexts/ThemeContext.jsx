import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always use dark mode
  const theme = 'dark';

  useEffect(() => {
    // Apply dark mode to document root
    const root = window.document.documentElement;
    root.classList.add('dark');
  }, []);

  const value = {
    theme,
    toggleTheme: () => {}, // No-op function
    isDark: true
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
