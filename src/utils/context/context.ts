import { createContext, SetStateAction, Dispatch } from "react";

interface ThemeType {
    theme: string,
    setTheme: Dispatch<SetStateAction<string>>,
    toggleTheme: () => void;
}

const theme: ThemeType = {
    theme: "light",
    setTheme: () => {},
    toggleTheme: () => {},
}

export const ThemeContext = createContext(theme);