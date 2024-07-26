import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import iconSearch from "../assets/icon-search.svg";
import iconSearchWhite from "../assets/icon-search-white.svg";

import Select from "./Select";

function Homepage({ isDarkMode, countriesInfo, setCountriesInfo }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountriesInfo, setFilteredCountriesInfo] =
    useState(countriesInfo);
  const [regionFilter, setRegionFilter] = useState("");

  //Fetches countries info from the server
  useEffect(() => {
    async function fetchCountries() {
      setIsLoading(true);
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        //Set countries info the sorted version of the array alphabetically
        setCountriesInfo(
          data.sort((a, b) => {
            if (a.name.common.toLowerCase() < b.name.common.toLowerCase()) {
              return -1;
            }
            if (a.name.common.toLowerCase() > b.name.common.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        );
      } catch (err) {
        console.error(err);
        setError("Failed to fetch countries");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCountries();
  }, [setCountriesInfo]);

  //Deals with the search query string
  useEffect(() => {
    function filterCountries() {
      if (searchQuery === "") setCountriesInfo(countriesInfo);

      const query = searchQuery.toLowerCase();

      const filteredCountriesInfo = countriesInfo.filter((country) => {
        return regionFilter
          ? country.region === regionFilter &&
              country.name.common.toLowerCase().includes(query)
          : country.name.common.toLowerCase().includes(query);
      });

      setFilteredCountriesInfo(filteredCountriesInfo);
    }

    filterCountries();
  }, [
    searchQuery,
    regionFilter,
    countriesInfo,
    setCountriesInfo,
    setFilteredCountriesInfo,
  ]);

  //For error handling
  useEffect(() => {
    if (filteredCountriesInfo.length === 0)
      setError("Failed to fetch countries");
    if (searchQuery && filteredCountriesInfo.length === 0)
      setError("No Results Found");
  }, [searchQuery, filteredCountriesInfo]);

  return (
    <div className="w-full px-6 py-5 bg-lightMode-verylightgray dark:bg-darkMode-verydarkblue lg:px-[calc((100%-1200px)/2)]">
      {/**** Form */}
      <form className="w-full space-y-7 text-base md:text-lg lg:flex lg:space-y-0 lg:justify-between">
        {/*** Search Input */}
        <div
          className="w-full max-w-[500px] bg-white px-8 py-1 flex items-center space-x-4 rounded-lg dark:bg-darkMode-darkblue"
          style={{
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/*** Search icon */}
          <img
            src={isDarkMode ? iconSearchWhite : iconSearch}
            className="h-6"
          />

          <input
            type="text"
            className="w-full p-3 bg-transparent placeholder:text-lightMode-darkgray  dark:text-white dark:placeholder:text-white"
            placeholder="Search for a country..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/*** Filter section */}
        <Select isDarkMode={isDarkMode} setRegionFilter={setRegionFilter} />
      </form>

      {/*** Information about all the countries */}
      <ul className="w-full space-y-7 my-10 md:flex md:flex-wrap md:space-y-0 md:gap-6 md:justify-between lg:gap-8">
        {/** Renders in country data is loading */}
        {isLoading && (
          <h2 className="w-max mx-auto text-lightMode-verydarkblue text-xl font-extrabold dark:text-white">
            Loading...
          </h2>
        )}

        {/** Renders information about each country and makes sure the items are shuffled an filtered on every render */}
        {countriesInfo.length > 0 &&
          filteredCountriesInfo.map((country, index) => {
            return (
              <li
                className="w-full max-w-[250px] h-[420px] mx-auto rounded-lg overflow-hidden text-lightMode-verydarkblue dark:text-white dark:bg-darkMode-darkblue md:mx-0"
                key={index}
                style={{
                  boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Link to={`/countries/${country.cca3}`}>
                  {/** Country flag (svg) */}
                  <img
                    src={country.flags.svg}
                    className="w-full h-[180px] object-cover"
                    alt={country.flags.alt}
                  />

                  {/*** Country info */}
                  <div className="w-full bg-white px-6 pt-6 pb-10 space-y-5 dark:bg-darkMode-darkblue">
                    <h1 className="text-xl  font-extrabold">
                      {country.name.common}
                    </h1>

                    <div className="space-y-2 text-lg">
                      <p>
                        <span className="font-bold">Population :</span>{" "}
                        {country.population.toLocaleString()}
                      </p>
                      <p>
                        <span className="font-bold">Region :</span>{" "}
                        {country.region}
                      </p>
                      <p>
                        {country.capital && (
                          <span className="font-bold">Capital : </span>
                        )}
                        {country.capital && country.capital[0]}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}

        {/**Renders if an error exists */}
        {error && (
          <h2 className="w-max mx-auto text-lightMode-verydarkblue text-xl font-extrabold dark:text-white">
            {error}
          </h2>
        )}
      </ul>
    </div>
  );
}

export default Homepage;
