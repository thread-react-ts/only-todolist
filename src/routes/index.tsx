import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import axios from "axios";

import Homepage from "../pages";
import Detailed from "../pages/detailed";
import NotFound from "../pages/not-found";

import { ThemeContext } from "../utils/context/context";

axios.defaults.baseURL = "https://api.todoist.com/rest/v2/";

const Router: FC = () => {
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        document.body.classList.toggle("dark-theme", theme === "dark");
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage/>,
            errorElement: <NotFound/>,
        },
        {
            path: "/detailed/:detail",
            element: <Detailed/>,
            errorElement: <NotFound/>,
        },
    ]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            <div>
                <RouterProvider router={router} />
            </div>
        </ThemeContext.Provider>
    );
};

export default Router;
