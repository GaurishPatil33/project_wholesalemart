"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { getTheme } from "@/lib/theme";

interface ThemeContextType {
  theme: any;
}

const ThemeContext = createContext<ThemeContextType>({ theme: getTheme("chhabi") });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(getTheme("chhabi"));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const client = params.get("client")?.toLowerCase() || "chhabi";
    const selectedTheme = getTheme(client);
    setTheme(selectedTheme);

    // Update CSS variables dynamically
    Object.entries(selectedTheme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value as string);
    });
    Object.entries(selectedTheme.shades).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value as string);
    });
    document.documentElement.style.setProperty("--logo", `url(${selectedTheme.logo})`);
  }, []);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext).theme;
