import { createContext, SetStateAction, Dispatch } from "react";

interface ThemeType {
    theme: string,
    setTheme: Dispatch<SetStateAction<string>>,
}

const theme: ThemeType = {
    theme: "",
    setTheme: () => {},
}

export const ThemeContext = createContext(theme);