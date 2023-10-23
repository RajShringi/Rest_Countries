import { useContext, useState } from "react";
import "./SearchAndFilter.scss";
import { CountryContext } from "../context/CountryContext";
import { ThemeContext } from "../context/ThemeContext";

const SearchAndFilter = () => {
  const { region, searchedCountry, handleSearch, changeRegion, handleSubmit } =
    useContext(CountryContext);
  const { theme } = useContext(ThemeContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const reg = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const selectRegion = (region) => {
    changeRegion(region);
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="container mx-auto search-and-filter-container">
      <form
        className={theme === "light" ? "search" : "dark-search"}
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            name="country"
            placeholder="Search for a country..."
            value={searchedCountry}
            onChange={handleSearch}
          />
          <ion-icon name="search-sharp"></ion-icon>
        </div>
      </form>

      <div className={theme === "light" ? "region-menu" : "dark-region-menu"}>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="region-btn"
        >
          <span className="region">{region}</span>
          {isDropdownOpen ? (
            <ion-icon name="chevron-down-sharp"></ion-icon>
          ) : (
            <ion-icon name="chevron-up-sharp"></ion-icon>
          )}
        </div>

        <ul className={`options ${isDropdownOpen ? "active" : ""}`}>
          {reg.map((reg, index) => (
            <li
              onClick={() => selectRegion(reg)}
              key={index}
              className="option"
            >
              {reg}
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="region-options">
        <select name="cars" id="cars">
          <option value="" disabled selected hidden>
            Filter by Region
          </option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
        <ion-icon name="chevron-down-sharp"></ion-icon>
      </div> */}
    </div>
  );
};

export default SearchAndFilter;
