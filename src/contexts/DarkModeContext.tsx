// DarkModeContext.tsx

'use client'; // Add this line

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the type of the context
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Set default values for context
const defaultContext: DarkModeContextType = {
  isDarkMode: false,
  toggleDarkMode: () => {},
};

// Create context
const DarkModeContext = createContext<DarkModeContextType>(defaultContext);

// Custom hook to access the context
export const useDarkMode = () => useContext(DarkModeContext);

// DarkModeProvider component to wrap your app
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(defaultContext.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
