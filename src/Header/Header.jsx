import { useContext } from "react";
import "./Header.scss";
import { CountryContext } from "../context/CountryContext";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
const Header = () => {
  const { handleFilterCountries } = useContext(CountryContext);
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`${theme === "light" ? "header" : "dark-header"}`}>
      <div className="container mx-auto flex flex-jc-sb flex-ai-c">
        <h2 onClick={handleFilterCountries}>Where in the world?</h2>
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="icon flex flex-jc-sb flex-ai-c"
        >
          {theme === "light" ? (
            <ion-icon name="moon-outline"></ion-icon>
          ) : (
            <ion-icon name="moon"></ion-icon>
          )}
          <span>Dark Mode</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
