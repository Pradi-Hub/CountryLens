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

// Search countries by name
export const searchCountriesByName = async (name) => {
    try {
        const response = await fetch(`${BASE_URL}/name/${name}`);
        if (!response.ok) {
            // Return empty array if country not found (404 error)
            if (response.status === 404) {
                return [];
            }
            throw new Error('Failed to search countries');
        }
        const data = await response.json();

        // Filter to only countries where name *starts with* the search term (case-insensitive)
        return data.filter(country =>
            country.name.common.toLowerCase().startsWith(name.toLowerCase())
        );
    } catch (error) {
        console.error('Error searching countries by name:', error);
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