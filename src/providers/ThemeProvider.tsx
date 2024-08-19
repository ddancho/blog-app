"use client";

import { useThemeContext } from "@/hooks/ThemeContext";
import { useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <>{mounted && <div className={theme}>{children}</div>}</>;
}

export default ThemeProvider;
