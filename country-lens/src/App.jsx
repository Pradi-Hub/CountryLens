import React from "react";
import "./fixLeafletIcons";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import CountryDetailsPage from "./pages/CountryDetailsPage";
import LoginPage from "./pages/LoginPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import WelcomePage from "./pages/WelcomePage.jsx";
import { useAuth } from "./hooks/useAuth.js";

const App = () => {
  const { user } = useAuth();
  console.log("App user:", user);
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/country/:code" element={<CountryDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
