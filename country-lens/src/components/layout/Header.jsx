import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon, Home as HomeIcon, Menu, X } from "lucide-react";
import Button from "../ui/Button";
import logo from "../../assets/countryLens2.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(getAuth());
      setUser(null);
      setMobileMenuOpen(false);
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

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const menuItems = (
    <>
      <Link
        to="/home"
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#d9debb] dark:hover:bg-[#1b2b3a] transition-colors md:p-1 md:rounded-full md:bg-[#94B4C1] md:dark:bg-[#547792] md:hover:opacity-90"
        aria-label="Home"
        title="Home"
        onClick={() => setMobileMenuOpen(false)}
      >
        <HomeIcon className="h-5 w-5 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-[#213448] dark:text-[#ECEFCA] md:text-[#ECEFCA] md:dark:text-[#ECEFCA]" />
        <span className="md:hidden text-[#213448] dark:text-[#ECEFCA]">
          Home
        </span>
      </Link>

      <button
        onClick={() => {
          toggleTheme();
          setMobileMenuOpen(false);
        }}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#d9debb] dark:hover:bg-[#1b2b3a] transition-colors md:p-1 md:rounded-full md:bg-[#94B4C1] md:dark:bg-[#547792] md:hover:opacity-90 md:justify-center"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <>
            <Sun className="h-5 w-5 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-[#ECEFCA]" />
            <span className="md:hidden text-[#ECEFCA]">Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-5 w-5 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-[#213448] md:text-[#213448]" />
            <span className="md:hidden text-[#213448]">Dark Mode</span>
          </>
        )}
      </button>

      {user ? (
        <>
          <Link
            to="/favorites"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#d9debb] dark:hover:bg-[#1b2b3a] transition-colors md:bg-transparent"
            title="Favorites"
            aria-label="View favorite countries"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 text-[#547792] dark:text-[#94B4C1]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="md:hidden text-[#547792] dark:text-[#94B4C1]">
              Favorites
            </span>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={logout}
            className="text-sm md:text-xs lg:text-sm xl:text-base px-4 py-2 md:px-2 md:py-1 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 w-full md:w-auto"
          >
            Logout
          </Button>
        </>
      ) : (
        <Link
          to="/login"
          className="w-full md:w-auto"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Button
            variant="primary"
            size="sm"
            className="text-sm md:text-xs lg:text-sm xl:text-base px-4 py-2 md:px-2 md:py-1 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 w-full"
          >
            Login
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#ECEFCA] dark:bg-[#213448] shadow-md transition-colors">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 xl:px-28 py-2 sm:py-3 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center space-x-1 sm:space-x-2 group">
          <img
            src={logo}
            alt="CountryLens Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 transition-all duration-300 group-hover:drop-shadow-lg drop-shadow-md"
          />
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#213448] dark:text-[#ECEFCA] drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300">
            Country
            <span className="text-[#547792] dark:text-[#94B4C1]">Lens</span>
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-[#d9debb] dark:hover:bg-[#1b2b3a] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#213448] dark:text-[#ECEFCA]" />
            ) : (
              <Menu className="h-6 w-6 text-[#213448] dark:text-[#ECEFCA]" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
          {menuItems}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          aria-hidden="true"
        >
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#ECEFCA] dark:bg-[#213448] shadow-xl flex flex-col overflow-y-auto z-50 p-4 space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[#d9debb] dark:hover:bg-[#1b2b3a] transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-[#213448] dark:text-[#ECEFCA]" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">{menuItems}</div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
