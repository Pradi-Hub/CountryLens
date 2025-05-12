import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
//import { useAuth } from '../../hooks/useAuth';
import { Sun, Moon, Home as HomeIcon } from "lucide-react";
import Button from "../ui/Button";
import logo from "../../assets/countryLens2.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  // const { user, logout } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(getAuth());
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#ECEFCA] dark:bg-[#213448] shadow-md transition-colors">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 xl:px-28 py-2 sm:py-3 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-1 sm:space-x-2 group">
          <img
            src={logo}
            alt="CountryLens Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 transition-all duration-300 group-hover:drop-shadow-lg drop-shadow-md"
          />
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#213448] dark:text-[#ECEFCA] drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300">
            Country
            <span className="text-[#547792] dark:text-[#94B4C1]">Lens</span>
          </span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <Link
            to="/home"
            className="p-1 sm:p-2 rounded-full bg-[#94B4C1] dark:bg-[#547792] hover:opacity-90 transition-colors"
            aria-label="Home"
            title="Home"
          >
            <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#ECEFCA] dark:text-[#ECEFCA]" />
          </Link>
          <button
            onClick={toggleTheme}
            className="p-1 sm:p-2 rounded-full bg-[#94B4C1] dark:bg-[#547792] hover:opacity-90 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#ECEFCA]" />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#213448]" />
            )}
          </button>

          {user ? (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link
                to="/favorites"
                className="text-[#547792] hover:text-[#213448] dark:text-[#94B4C1] dark:hover:text-[#ECEFCA] transition-colors"
                title="Favorites"
                aria-label="View favorite countries"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={logout}
                className="text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button
                variant="primary"
                size="sm"
                className="text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
