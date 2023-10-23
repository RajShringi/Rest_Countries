import { useContext } from "react";
import "./CountryCard.scss";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  const { population, region, capital, name, flags } = country;
  const { theme } = useContext(ThemeContext);
  return (
    <Link to={`/country/${name.common}`}>
      <div className={theme === "light" ? "card" : "dark-card"}>
        <img src={flags.svg} alt={name.official} />

        <div className="info-container">
          <h5 className="name">{name.common}</h5>
          <p>
            <span className="info">Population: </span>
            <span className="data">{population.toLocaleString("en-US")}</span>
          </p>
          <p>
            <span className="info">Region: </span>
            <span className="data">{region}</span>
          </p>
          <p>
            <span className="info">Capital: </span>
            <span className="data">{capital && capital[0]}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
export default CountryCard;
