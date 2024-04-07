import { FC, useContext } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Switch from "@mui/material/Switch";
import HighlightIcon from "@mui/icons-material/Highlight";
import { ThemeContext } from "../utils/context/context";

const Header: FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    
    function handleTheme() {
      setTheme(theme === "light" ? "dark" : "light");
    }

    return (
      <header>
        <h1>
          <HighlightIcon />
          Keeper
        </h1>
        <nav>
          <div className="flex items-center gap-4">
            {theme === "dark" ? (
              <ModeNightIcon className="h-5 w-5 rounded-full" />
            ) : (
              <LightModeIcon className="h-5 w-5 rounded-full" />
            )}
            <Switch
              onChange={handleTheme}
              checked={theme === "dark"}
            />
          </div>
        </nav>
      </header>
    );
}

export default Header;
