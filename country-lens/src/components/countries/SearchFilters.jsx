import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";

const SearchFilters = ({ onSearch, onRegionChange, onLanguageChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const languages = [
    { value: "", label: "All Languages" },
    { value: "english", label: "English" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "arabic", label: "Arabic" },
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

  return (
    <div className="mb-8 flex flex-col items-center gap-4">
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

        <div className="w-full sm:w-1/3">
          <Select
            options={languages}
            onChange={(e) => onLanguageChange(e.target.value)}
            placeholder="Filter by Language"
            fullWidth
            className="w-full py-2 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#547792] dark:bg-[#213448] dark:text-[#ECEFCA] dark:border-[#94B4C1] dark:focus:ring-[#94B4C1] transition font-semibold"
            aria-label="Filter by language"
          />
        </div>
      </div>

      {/* Region Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-3xl">
        <button
          onClick={() => handleRegionClick("")}
          className={`px-4 py-1.5 rounded-full transition font-medium
            ${
              selectedRegion === ""
                ? "bg-[#213448] text-[#ECEFCA]"
                : "bg-[#ECEFCA] text-[#213448] hover:bg-[#d9debb] dark:hover:bg-[#1b2b3a]"
            }
          `}
        >
          All Regions
        </button>

        {regions.map((region) => (
          <button
            key={region}
            onClick={() => handleRegionClick(region)}
            className={`px-4 py-1.5 rounded-full transition font-medium
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
