import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === "dark" ? true : false
  );

  //This controls the light and dark mode themes
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }

    if (isDarkMode) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.getElementById("root").classList.add("dark");
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  }, [setIsDarkMode, isDarkMode]);

  const [countriesInfo, setCountriesInfo] = useState([]);

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen dark:bg-darkMode-verydarkblue ">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <Routes>
          <Route
            index
            element={
              <Homepage
                isDarkMode={isDarkMode}
                countriesInfo={countriesInfo}
                setCountriesInfo={setCountriesInfo}
              />
            }
          />

          <Route
            path="countries/:countrycode"
            element={
              <CountryDetails
                isDarkMode={isDarkMode}
                countriesInfo={countriesInfo}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
