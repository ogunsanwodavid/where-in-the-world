import { Link, useNavigate, useParams } from "react-router-dom";

import leftArrow from "../assets/left-arrow.svg";
import leftArrowWhite from "../assets/left-arrow-white.svg";

function CountryDetails({ isDarkMode, countriesInfo }) {
  //Get country object from cca3 code
  function getCountryFromCode(code) {
    const filtered = countriesInfo.filter((country) => {
      return country.cca3 === code;
    });

    return filtered.at(0);
  }

  //Gets first item of an object
  function getFirstItem(obj) {
    const entries = Object.entries(obj);
    if (entries.length === 0) {
      return null; // or handle the empty object case as needed
    }
    const [firstKey, firstValue] = entries[0];
    return { key: firstKey, value: firstValue };
  }

  const { countrycode } = useParams();
  const country = getCountryFromCode(countrycode);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="w-full px-6 py-5 bg-lightMode-verylightgray dark:bg-darkMode-verydarkblue md:px-[calc((100%-560px)/2)] lg:px-[calc((100%-1200px)/2)]">
      {/*** Back Button */}
      <button
        className="w-max bg-white flex items-center space-x-3 px-6 py-2 rounded-md dark:bg-darkMode-darkblue"
        style={{
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleBack}
      >
        {/** Left arrow */}
        <img
          src={isDarkMode ? leftArrowWhite : leftArrow}
          className="h-5"
          alt="left arrow"
        />

        <p className="text-darkMode-verydarkblue text-lg font-medium dark:text-white">
          Back
        </p>
      </button>

      {/*** Country information */}
      <main className="w-full mt-12 lg:flex lg:items-center lg:justify-between lg:space-x-32 lg:mt-6">
        {/** Country flag */}{" "}
        <img
          src={country?.flags.svg}
          className="w-full lg:w-[450px] lg:h-[300px] object-cover"
          alt={country?.flags.alt}
        />
        {/**Other information */}
        <section className="mt-8 space-y-6 text-lightMode-verydarkblue dark:text-white">
          <h2 className="text-2xl  font-extrabold">{country?.name.common}</h2>

          <div className="space-y-5 text-lg lg:flex lg:space-y-0 lg:space-x-16">
            <div className="space-y-2">
              <p>
                <span className="font-bold">Native Name:</span>{" "}
                {getFirstItem(country?.name.nativeName).value.official}
              </p>
              <p>
                <span className="font-bold">Population:</span>{" "}
                {country?.population.toLocaleString()}
              </p>
              <p>
                <span className="font-bold">Region:</span> {country?.region}
              </p>
              <p>
                <span className="font-bold">Sub Region:</span>{" "}
                {country?.subregion}
              </p>
              <p>
                <span className="font-bold">Capital:</span> {country?.capital}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-bold">Top Level Domain:</span>{" "}
                {country?.tld.at(0)}
              </p>

              {/**** Displays all currencies used by the country with comma formatting*/}
              <p>
                <span className="font-bold">Currencies:</span>{" "}
                {Object.keys(country?.currencies).map((curr, index) => {
                  const currency = country?.currencies[curr];
                  const currenciesLength = Object.keys(
                    country?.currencies
                  ).length;

                  return (
                    <span key={index}>
                      {currency?.name}
                      {!(currenciesLength - 1 === index) ? ", " : ""}
                    </span>
                  );
                })}
              </p>

              {/**** Displays all languages used by the country with comma formatting */}
              <p>
                <span className="font-bold">Languages:</span>{" "}
                {Object.keys(country.languages).map((lang, index) => {
                  const language = country.languages[lang];
                  const languagesLength = Object.keys(country.languages).length;

                  return (
                    <span key={index}>
                      {language}
                      {!(languagesLength - 1 === index) ? ", " : ""}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>

          {/*** Renders border countries to the current country and links to their individual pages */}
          <div className="space-y-4 text-lightMode-verydarkblue dark:text-white">
            {country.borders && (
              <>
                <h3 className="text-xl font-extrabold">Border Countries:</h3>

                <ul className="flex flex-wrap">
                  {country.borders.map((border, index) => {
                    return (
                      <li key={index}>
                        <Link to={`/countries/${border}`}>
                          <button
                            className=" font-medium px-6 py-2 my-2 mr-4 rounded-md dark:bg-darkMode-darkblue"
                            style={{
                              boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            {getCountryFromCode(border).name.common}
                          </button>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CountryDetails;
