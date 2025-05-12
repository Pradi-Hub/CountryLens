import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../hooks/useAuth';
import europe from "../assets/europe.jpg";
import asia from "../assets/asia.jpeg";
import africa from "../assets/africa.jpeg";
import america from "../assets/america.jpg";
import oceania from "../assets/Oceania.jpg";
import { Sun, Moon } from "lucide-react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const WelcomePage = () => {
  // const { user } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Featured regions to showcase
  const regions = [
    { name: "Europe", image: europe },
    { name: "Asia", image: asia },
    { name: "Africa", image: africa },
    { name: "Americas", image: america },
    { name: "Oceania", image: oceania },
  ];

  // Simulating loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#ECEFCA] dark:bg-[#213448]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#547792] mx-auto"></div>
          <p className="mt-4 text-[#213448] dark:text-[#94B4C1]">
            Loading CountryLens...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ECEFCA] dark:bg-[#213448] min-h-screen text-[#213448] dark:text-[#ECEFCA]">
      {/* Theme Toggle Button - Fixed position */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 bg-[#94B4C1] dark:bg-[#547792] p-2 rounded-full shadow-lg"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="h-6 w-6 text-[#ECEFCA]" />
        ) : (
          <Moon className="h-6 w-6 text-[#213448]" />
        )}
      </button>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1744")',
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#213448] opacity-60"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#ECEFCA] p-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Explore Our World
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8">
            Discover detailed information about countries, cultures, and regions
            around the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/home"
              className="bg-[#547792] hover:bg-[#94B4C1] hover:text-[#213448] text-[#ECEFCA] px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              Explore Countries
            </Link>
            {!user && (
              <Link
                to="/login"
                onClick={() => console.log("Login link clicked")}
                className="bg-transparent hover:bg-[#ECEFCA] hover:text-[#213448] text-[#ECEFCA] border-2 border-[#ECEFCA] px-8 py-3 rounded-lg font-medium text-lg transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[#ECEFCA]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#ECEFCA] dark:bg-[#213448]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#213448] dark:text-[#ECEFCA] mb-4">
              Explore the World with CountryLens
            </h2>
            <p className="text-lg text-[#547792] dark:text-[#94B4C1] max-w-3xl mx-auto">
              Your comprehensive guide to countries, demographics, and cultural
              insights from across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#547792] p-6 rounded-lg shadow-md">
              <div className="text-[#94B4C1] dark:text-[#ECEFCA] mb-4">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#213448] dark:text-[#ECEFCA] mb-2">
                Detailed Information
              </h3>
              <p className="text-[#547792] dark:text-[#94B4C1]">
                Access comprehensive data about countries including population,
                languages, currencies, and more.
              </p>
            </div>

            <div className="bg-white dark:bg-[#547792] p-6 rounded-lg shadow-md">
              <div className="text-[#94B4C1] dark:text-[#ECEFCA] mb-4">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#213448] dark:text-[#ECEFCA] mb-2">
                Save Favorites
              </h3>
              <p className="text-[#547792] dark:text-[#94B4C1]">
                Create your personalized collection by saving your favorite
                countries for quick access.
              </p>
            </div>

            <div className="bg-white dark:bg-[#547792] p-6 rounded-lg shadow-md">
              <div className="text-[#94B4C1] dark:text-[#ECEFCA] mb-4">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#213448] dark:text-[#ECEFCA] mb-2">
                Interactive Maps
              </h3>
              <p className="text-[#547792] dark:text-[#94B4C1]">
                Explore geographic information and borders with our interactive
                map features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Region */}
      <section className="py-16 bg-white dark:bg-[#547792]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#213448] dark:text-[#ECEFCA] mb-4">
              Explore by Region
            </h2>
            <p className="text-lg text-[#547792] dark:text-[#94B4C1] max-w-3xl mx-auto">
              Discover countries grouped by geographic regions and learn about
              their unique characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {regions.map((region, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg group h-64"
              >
                <img
                  src={`${region.image}?auto=format&fit=crop&w=500&q=80`}
                  alt={`${region.name} region`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#213448] to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-[#ECEFCA]">
                    {region.name}
                  </h3>
                  <Link
                    to={`/home?region=${encodeURIComponent(region.name)}`}
                    className="mt-2 inline-block text-[#94B4C1] hover:text-[#ECEFCA] text-sm"
                  >
                    Explore countries →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#547792]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#ECEFCA] mb-4">
            Ready to Explore the World?
          </h2>
          <p className="text-lg text-[#94B4C1] max-w-2xl mx-auto mb-8">
            Start your journey of discovery with CountryLens and learn
            fascinating facts about countries around the globe.
          </p>
          <Link
            to="/home"
            className="inline-block bg-[#ECEFCA] hover:bg-white text-[#213448] font-medium px-8 py-3 rounded-lg text-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#213448] text-[#94B4C1] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-[#ECEFCA]">CountryLens</h2>
              <p className="mt-2">Explore the world, one country at a time.</p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-[#94B4C1] hover:text-[#ECEFCA]">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a href="#" className="text-[#94B4C1] hover:text-[#ECEFCA]">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>

              <a href="#" className="text-[#94B4C1] hover:text-[#ECEFCA]">
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-[#547792] pt-8 flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row md:space-x-6">
              <a
                href="#"
                className="text-[#94B4C1] hover:text-[#ECEFCA] mb-2 md:mb-0"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[#94B4C1] hover:text-[#ECEFCA] mb-2 md:mb-0"
              >
                Terms of Service
              </a>
              <a href="#" className="text-[#94B4C1] hover:text-[#ECEFCA]">
                Contact
              </a>
            </div>

            <p className="mt-4 md:mt-0 text-[#94B4C1]">
              © {new Date().getFullYear()} CountryLens. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
