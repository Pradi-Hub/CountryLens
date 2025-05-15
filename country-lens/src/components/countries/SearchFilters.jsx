import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";

const SearchFilters = ({ onSearch, onRegionChange, onLanguageChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const languages = [
    { value: "", label: "All Languages" },
    { value: "english", label: "English" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "arabic", label: "Arabic" },
    { value: "russian", label: "Russian" },
    { value: "portuguese", label: "Portuguese" },
    { value: "hindi", label: "Hindi" },
    { value: "bengali", label: "Bengali" },
    { value: "japanese", label: "Japanese" },
    { value: "korean", label: "Korean" },
    { value: "italian", label: "Italian" },
    { value: "urdu", label: "Urdu" },
    { value: "turkish", label: "Turkish" },
    { value: "persian", label: "Persian" },
    { value: "swahili", label: "Swahili" },
    { value: "dutch", label: "Dutch" },
    { value: "tamil", label: "Tamil" },
    { value: "malay", label: "Malay" },
  ];

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);

    if (searchTerm === "") {
      onSearch("");
      return;
    }

    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    setSearchTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [searchTerm, onSearch]);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    onRegionChange(region);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".language-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLanguageChange = (value) => {
    onLanguageChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mb-8 flex flex-col items-center gap-4 w-full">
      {/* Search + Language */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl">
        <div className="w-full sm:w-2/3">
          <Input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            className="w-full py-2 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#547792] dark:bg-[#213448] dark:text-white dark:border-[#94B4C1] dark:focus:ring-[#94B4C1] transition font-semibold"
            aria-label="Search for a country"
          />
        </div>

        <div className="w-full sm:w-1/3 relative language-dropdown">
          {/* Custom dropdown button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full py-2 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#547792] dark:bg-[#213448] dark:text-[#ECEFCA] dark:border-[#94B4C1] dark:focus:ring-[#94B4C1] transition font-semibold flex justify-between items-center"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <span>
              {languages.find(
                (lang) => lang.value === (onLanguageChange.value || "")
              )?.label || "Filter by Language"}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Custom dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 rounded-md shadow-lg bg-white dark:bg-[#213448] border border-gray-300 dark:border-[#94B4C1] max-h-60 overflow-auto">
              <ul className="py-1" role="listbox">
                {languages.map((language) => (
                  <li
                    key={language.value}
                    onClick={() => handleLanguageChange(language.value)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1b2b3a] transition"
                    role="option"
                    aria-selected={onLanguageChange.value === language.value}
                  >
                    {language.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Region Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-3xl px-2">
        <button
          onClick={() => handleRegionClick("")}
          className={`px-3 py-1.5 rounded-full transition font-medium text-sm sm:text-base sm:px-4
            ${
              selectedRegion === ""
                ? "bg-[#213448] text-[#ECEFCA]"
                : "bg-[#ECEFCA] text-[#213448] hover:bg-[#d9debb] dark:hover:bg-[#1b2b3a]"
            }
          `}
        >
          All
        </button>

        {regions.map((region) => (
          <button
            key={region}
            onClick={() => handleRegionClick(region)}
            className={`px-3 py-1.5 rounded-full transition font-medium text-sm sm:text-base sm:px-4
              ${
                selectedRegion === region
                  ? "bg-[#547792] text-white dark:bg-[#94B4C1]"
                  : "bg-[#ECEFCA] text-[#213448] hover:bg-[#d9debb] dark:bg-[#213448] dark:text-[#ECEFCA] dark:hover:bg-[#1b2b3a]"
              }
            `}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;
