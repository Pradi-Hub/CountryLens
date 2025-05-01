import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/layout/Layout';
import SearchFilters from '../components/countries/SearchFilters';
import CountryList from '../components/countries/CountryList';
import { getAllCountries, searchCountriesByName, getCountriesByRegion } from '../services/countryService';

const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('');

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

    // Handle search by name
    const handleSearch = useCallback(async (term) => {
        setSearchTerm(term);

        try {
            setLoading(true);
            let results;

            // If search term is empty, reset to all countries or filtered by region
            if (!term) {
                if (region) {
                    results = await getCountriesByRegion(region);
                } else {
                    results = countries;
                }
            } else {
                // Search by name
                results = await searchCountriesByName(term);

                // Also filter by region if one is selected
                if (region) {
                    results = results.filter(country => country.region === region);
                }
            }

            setFilteredCountries(results);
            setError(null);
        } catch (err) {
            setError('Failed to search countries. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [countries, region]);

    // Handle region filter change
    const handleRegionChange = useCallback(async (selectedRegion) => {
        setRegion(selectedRegion);

        try {
            setLoading(true);
            let results;

            // If no region selected, show all countries or search results
            if (!selectedRegion) {
                if (searchTerm) {
                    results = await searchCountriesByName(searchTerm);
                } else {
                    results = countries;
                }
            } else {
                // Get countries by region
                results = await getCountriesByRegion(selectedRegion);

                // Also filter by search term if one exists
                if (searchTerm) {
                    const searchResults = await searchCountriesByName(searchTerm);
                    results = results.filter(country =>
                        searchResults.some(c => c.cca3 === country.cca3)
                    );
                }
            }

            setFilteredCountries(results);
            setError(null);
        } catch (err) {
            setError('Failed to filter countries. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [countries, searchTerm]);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Explore Countries
                </h1>

                <SearchFilters
                    onSearch={handleSearch}
                    onRegionChange={handleRegionChange}
                />

                <CountryList
                    countries={filteredCountries}
                    loading={loading}
                    error={error}
                />
            </div>
        </Layout>
    );
};

export default HomePage;