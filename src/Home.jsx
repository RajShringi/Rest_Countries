import { useContext } from "react";
import CountryCard from "./CountryCard/CountryCard";
import Header from "./Header/Header";
import SearchAndFilter from "./SearchAndFilter/SearchAndFilter";
import { CountryContext } from "./context/CountryContext";
import Loader from "./Loader/Loader";
import Errorpage from "./Errorpage/Errorpage";

const Home = () => {
  const { filterCountries, loading } = useContext(CountryContext);
  return (
    <>
      <Header />
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <SearchAndFilter />
          {Array.isArray(filterCountries) ? (
            <div className="container mx-auto countries-container">
              {filterCountries.map((country, index) => (
                <CountryCard key={index} country={country} />
              ))}
            </div>
          ) : (
            <Errorpage />
          )}
        </div>
      )}
    </>
  );
};

export default Home;
