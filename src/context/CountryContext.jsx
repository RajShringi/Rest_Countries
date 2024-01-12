import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CountryContext = React.createContext();

const CountryProvider = ({ children }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [region, setRegion] = useState("Filter by Region");
  const [searchedCountry, setSearchedCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCountries = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchCountries(
          "https://restcountries.com/v3.1/all"
        );
        setCountries(response);
        setFilterCountries(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchedCountry(e.target.value);
  };

  const changeRegion = async (value) => {
    setSearchedCountry("");
    setRegion(value);
    if (value === "Filter by Region") {
      const res = await fetchCountries("https://restcountries.com/v3.1/all");
      setFilterCountries(res);
    } else {
      const res = await fetchCountries(
        `https://restcountries.com/v3.1/region/${value}`
      );
      setFilterCountries(res);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res =
      await fetchCountries(`https://restcountries.com/v3.1/name/${searchedCountry.trim()}?fullText=true
    `);

    setFilterCountries(res);
    setSearchedCountry("");
    setRegion("Filter by Region");
  };

  const fetchAllCountries = () => {
    fetchCountries("https://restcountries.com/v3.1/all");
  };

  const handleFilterCountries = () => {
    setFilterCountries(countries);
    setRegion("Filter by Region");
    navigate("/");
  };

  const value = {
    countries,
    filterCountries,
    handleFilterCountries,
    region,
    setRegion,
    handleSearch,
    changeRegion,
    searchedCountry,
    handleSubmit,
    loading,
    fetchAllCountries,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};

export default CountryProvider;
