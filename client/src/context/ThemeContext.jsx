import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [ theme, setTheme ] = useState(() => localStorage.getItem('theme') || 'light');
    console.log(theme)
    useEffect(() => {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }, [theme]);


    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    )
}