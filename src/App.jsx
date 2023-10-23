import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CountryInfo from "./CountryInfo/CountryInfo";
import { ThemeContext } from "./context/ThemeContext";
import { useContext, useEffect } from "react";

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === "light") {
      document.body.style.backgroundColor = `hsl(0, 0%, 98%)`;
    } else {
      document.body.style.backgroundColor = `hsl(207, 26%, 17%)`;
    }
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/country/:name" element={<CountryInfo />}></Route>
    </Routes>
  );
}

export default App;
