"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import ThemeProvider from "@/providers/ThemeProvider";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return getThemeValue();
  });

  useEffect(() => {
    localStorage.setItem("theme", theme as string);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext error");
  }

  return context;
}

export function getThemeValue() {
  const value = global?.window?.localStorage.getItem("theme");

  if (value === undefined || value === null) {
    return "light" as ThemeType;
  }

  return value as ThemeType;
}
