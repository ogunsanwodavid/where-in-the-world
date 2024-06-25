import { Link } from "react-router-dom";

import iconMoonLight from "../assets/icon-moon-light.svg";
import iconMoonDark from "../assets/icon-moon-dark.svg";

function Navbar({ isDarkMode, setIsDarkMode }) {
  function handleDarkModeToggle() {
    setIsDarkMode((mode) => !mode);
  }

  return (
    <nav
      className="w-full px-6 py-9 flex items-center justify-between cursor-pointer dark:bg-darkMode-darkblue md:px-12 lg:px-[calc((100%-1200px)/2)]"
      style={{
        boxShadow: "0 3px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/*** Logo */}
      <Link
        to="/"
        className="text-lightMode-verydarkblue text-xl font-extrabold dark:text-white md:text-2xl"
      >
        <h1>Where in the world?</h1>
      </Link>

      {/*** Dark mode Toggler */}
      <section
        className="flex items-center space-x-2"
        onClick={handleDarkModeToggle}
      >
        {/*** Moon image */}
        <img
          src={isDarkMode ? iconMoonLight : iconMoonDark}
          className="h-5 md:h-7"
        />

        <p className="text-lightMode-verydarkblue text-lg font-medium dark:text-white md:text-xl">
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </p>
      </section>
    </nav>
  );
}

export default Navbar;
