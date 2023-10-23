import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import App from "./App.jsx";
import CountryProvider from "./context/CountryContext";
import ThemeProvider from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CountryProvider>
          <App />
        </CountryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
