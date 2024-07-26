import { useEffect, useRef, useState } from "react";

function Select({
  isDarkMode,
  options = ["Africa", "Americas", "Asia", "Europe", "Oceania", "None"],
  setRegionFilter,
}) {
  const [value, setValue] = useState("");
  const selectShowcase = value || "Filter by Region";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  useEffect(() => {
    setRegionFilter(value);
  });

  function handleClickControl() {
    setIsMenuOpen((open) => !open);
  }

  return (
    <div className="relative max-w-[230px] cursor-pointer" ref={selectRef}>
      {/*** Controls section */}
      <section
        className="w-full space-x-3 bg-white px-8 py-4 flex items-center justify-between rounded-lg dark:bg-darkMode-darkblue dark:text-white"
        style={{
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleClickControl}
      >
        <p>{selectShowcase}</p>

        <svg
          fill={`${isDarkMode ? "#fff" : "hsl(200, 15%, 8%)"}`}
          className={`h-5 ${isMenuOpen ? "rotate-180" : ""}`}
          viewBox="0 0 36 36"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>caret-line</title>
          <path
            className="clr-i-outline clr-i-outline-path-1"
            d="M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z"
          ></path>
          <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
        </svg>
      </section>

      {/*** Menu section */}
      <ul
        className={`w-full absolute top-[calc(100%_+_0.5rem)] left-0 px-8 py-4 bg-white space-y-3  rounded-lg dark:bg-darkMode-darkblue dark:text-white ${
          !isMenuOpen ? "hidden" : ""
        }`}
        style={{
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {options.map((option, index) => {
          //This sets the value of the select back to "" if "None" is selected
          function handleClickOption(option) {
            if (option.toLowerCase() === "none") {
              setValue("");
            } else {
              setValue(option);
            }
            setIsMenuOpen(false);
          }
          return (
            <li
              key={index}
              onClick={() => {
                handleClickOption(option);
              }}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Select;
