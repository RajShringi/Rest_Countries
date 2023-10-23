import { useContext } from "react";
import "./Loader.scss";
import { ThemeContext } from "../context/ThemeContext";
const Loader = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="loader-container">
      <div className={`${theme === "light" ? "loader" : "dark-loader"}`}></div>
    </div>
  );
};

export default Loader;
