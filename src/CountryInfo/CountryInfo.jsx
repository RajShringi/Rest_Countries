import { Link, useNavigate, useParams } from "react-router-dom";
import "./CountryInfo.scss";
import { useContext, useEffect, useState } from "react";
import { CountryContext } from "../context/CountryContext";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import { ThemeContext } from "../context/ThemeContext";
const CountryInfo = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { countries } = useContext(CountryContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setCountry(countries.find((country) => country.name.common === name));
    setLoading(false);
  }, [name, countries]);

  if (loading || countries.length === 0) {
    return <Loader />;
  }

  const nativeNames = country?.name.nativeName;
  const currencies = country?.currencies;
  const languages = country?.languages;

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="btn-container">
          <div
            onClick={() => navigate(-1)}
            className={`${theme === "light" ? "btn" : "dark-btn"}`}
          >
            <span>
              <ion-icon name="arrow-back"></ion-icon>
            </span>
            <span>Back</span>
          </div>
        </div>
        <div
          className={`${
            theme === "light"
              ? "country-info-container"
              : "dark-country-info-container"
          }`}
        >
          <img src={`${country?.flags.svg}`} alt={`${country?.flags.alt}`} />
          <div className="details">
            <h2>{country?.name.common}</h2>
            <div className="country-details">
              <div className="info-container">
                <div className="flex flex-ai-c">
                  <div className="info">Native Name: </div>
                  <div className="data">
                    {nativeNames &&
                      Object.keys(nativeNames)
                        .map((name) => nativeNames[name].common)
                        .join(", ")}
                  </div>
                </div>
                <div className="flex flex-ai-c">
                  <div className="info">Population: </div>
                  <div className="data">
                    {country?.population.toLocaleString("en-US")}
                  </div>
                </div>
                <div className="flex flex-ai-c">
                  <div className="info">Region: </div>
                  <div className="data">{country?.region}</div>
                </div>
                <div className="flex flex-ai-c">
                  <div className="info">Sub Region: </div>
                  <div className="data">{country?.subregion}</div>
                </div>
                <div className="flex flex-ai-c">
                  <div className="info">Capital: </div>
                  <div className="data">{country?.capital}</div>
                </div>
              </div>

              <div className="info-container">
                <div className="flex flex-ai-c">
                  <div className="info">Top Level Domain: </div>
                  <div className="data">{country?.tld[0]}</div>
                </div>

                <div className="flex flex-ai-c">
                  <div className="info">Currencies: </div>
                  <div className="data">
                    {nativeNames &&
                      Object.keys(currencies)
                        .map((name) => currencies[name].name)
                        .join(", ")}
                  </div>
                </div>

                <div className="flex flex-ai-c">
                  <div className="info">Languages: </div>
                  <div className="data">
                    {nativeNames &&
                      Object.keys(languages)
                        .map((name) => languages[name])
                        .join(", ")}
                  </div>
                </div>
              </div>
            </div>

            <BorderCountries
              country={country}
              theme={theme}
              countries={countries}
            />
          </div>
        </div>

        {/* <div
          className={`${
            theme === "light" ? "border-countries" : "dark-border-countries"
          }`}
        >
          <h3>Border Countries:</h3>
          <div className="flex flex-ai-c flex-jc-sb flex-wrap gap-1">
            {country?.borders?.map((country, index) => (
              <span key={index} className="country">
                {country}
              </span>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};
export default CountryInfo;

function BorderCountries({ country, theme, countries }) {
  const navigate = useNavigate();
  const handleClickOnBorderCountries = (name) => {
    navigate(`/country/${name}`);
  };

  if (country && "borders" in country) {
    return (
      <div
        className={`${
          theme === "light" ? "border-countries" : "dark-border-countries"
        }`}
      >
        <h3>Border Countries:</h3>
        <div className="flex flex-ai-c flex-wrap gap-1">
          {country.borders.map((country, index) => {
            const filterCountry = countries.find((c) => c.cca3 === country);
            return (
              <span
                onClick={() =>
                  handleClickOnBorderCountries(filterCountry.name.common)
                }
                key={index}
                className="country"
              >
                {filterCountry.name.common}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
  return;
}
