// src/services/countryService.js

const BASE_URL = 'https://restcountries.com/v3.1';

// Get all countries
export const getAllCountries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching all countries:', error);
        throw error;
    }
};

// Get countries by name
export const getCountriesByName = async (name) => {
    try {
        const response = await fetch(`${BASE_URL}/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        // Filter to only countries where name *starts with* the search term (case-insensitive)
        return data.filter(country =>
            country.name.common.toLowerCase().startsWith(name.toLowerCase())
        );
    } catch (error) {
        console.error('Error fetching countries by name:', error);
        throw error;
    }
};

// Get countries by region
export const getCountriesByRegion = async (region) => {
    try {
        const response = await fetch(`${BASE_URL}/region/${region}`);
        if (!response.ok) {
            throw new Error('Failed to fetch countries by region');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching countries by region:', error);
        throw error;
    }
};

// Get country by code
export const getCountryByCode = async (code) => {
    try {
        const response = await fetch(`${BASE_URL}/alpha/${code}`);
        if (!response.ok) {
            throw new Error('Failed to fetch country details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching country by code:', error);
        throw error;
    }
};

// Get countries by language
export const getCountriesByLanguage = async (language) => {
    try {
        const response = await fetch(`${BASE_URL}/lang/${language}`);
        if (!response.ok) {
            if (response.status === 404) return [];
            throw new Error('Failed to fetch countries by language');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching countries by language:', error);
        throw error;
    }
};