import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout/Layout';
import SearchFilters from '../components/countries/SearchFilters';
import CountryList from '../components/countries/CountryList';
import { getAllCountries, getCountriesByRegion, getCountriesByLanguage } from '../services/countryService';
import ScrollToTopButton from "../components/ui/ScrollToTopButton.jsx";

const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('');
    const [language, setLanguage] = useState('');

    // Fetch all countries on initial load
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const data = await getAllCountries();
                setCountries(data);
                setFilteredCountries(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch countries. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    // 🔁 Define this FIRST so it can be used in other callbacks
    const applyAllFilters = useCallback(async (region, language, searchTerm) => {
        try {
            setLoading(true);
            let results = [];

            if (region && language) {
                const langResults = await getCountriesByLanguage(language);
                results = langResults.filter(c => c.region === region);
            } else if (region) {
                results = await getCountriesByRegion(region);
            } else if (language) {
                results = await getCountriesByLanguage(language);
            } else {
                results = countries;
            }

            if (searchTerm) {
                results = results.filter(c =>
                    c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setFilteredCountries(results);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to apply filters.');
        } finally {
            setLoading(false);
        }
    }, [countries]);

    // ✅ Callbacks AFTER applyAllFilters
    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
        applyAllFilters(region, language, term);
    }, [region, language, applyAllFilters]);

    const handleRegionChange = useCallback((selectedRegion) => {
        setRegion(selectedRegion);
        applyAllFilters(selectedRegion, language, searchTerm);
    }, [language, searchTerm, applyAllFilters]);

    const handleLanguageChange = useCallback((selectedLanguage) => {
        setLanguage(selectedLanguage);
        applyAllFilters(region, selectedLanguage, searchTerm);
    }, [region, searchTerm, applyAllFilters]);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Explore Countries
                </h1>

                <SearchFilters
                    onSearch={handleSearch}
                    onRegionChange={handleRegionChange}
                    onLanguageChange={handleLanguageChange}
                />

                <CountryList
                    countries={filteredCountries}
                    loading={loading}
                    error={error}
                />
            </div>
            <ScrollToTopButton />
        </Layout>
    );
};

export default HomePage;
