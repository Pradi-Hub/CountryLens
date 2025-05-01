import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { getCountryByCode } from '../services/countryService';
import { useAuth } from '../hooks/useAuth';

const CountryDetailsPage = () => {
    const { code } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, addFavorite, removeFavorite } = useAuth();

    // Check if country is in favorites
    const isFavorite = user?.favorites?.some(fav => fav.cca3 === code);

    // Fetch country details
    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                setLoading(true);
                const [data] = await getCountryByCode(code);
                setCountry(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch country details. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCountryDetails();
    }, [code]);

    // Handle favorite toggle
    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFavorite(code);
        } else {
            addFavorite(country);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-500"></div>
                </div>
            </Layout>
        );
    }

    if (error || !country) {
        return (
            <Layout>
                <div className="text-center py-12">
                    <p className="text-red-600 dark:text-red-400">
                        {error || 'Country not found'}
                    </p>
                    <Link to="/" className="mt-4 inline-block">
                        <Button variant="primary">Return to Home</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    // Format population with commas
    const formattedPopulation = country.population.toLocaleString();

    // Get languages as array
    const languages = country.languages
        ? Object.values(country.languages)
        : [];

    // Get currencies as array
    const currencies = country.currencies
        ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol || ''})`)
        : [];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Countries
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        <div className="w-full h-auto aspect-video">
                            <img
                                src={country.flags.svg}
                                alt={`Flag of ${country.name.common}`}
                                className="w-full h-full object-cover rounded-lg shadow"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {country.name.common}
                                </h1>

                                {user && (
                                    <button
                                        onClick={handleFavoriteToggle}
                                        className={`p-2 rounded-full ${isFavorite
                                            ? 'text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-500'
                                            : 'text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400'}`}
                                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {country.name.nativeName && Object.values(country.name.nativeName)[0] && (
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Native name: {Object.values(country.name.nativeName)[0].common}
                                </p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-6">
                                <div>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
                                    </p>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        <span className="font-semibold">Region:</span> {country.region}
                                    </p>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        <span className="font-semibold">Subregion:</span> {country.subregion || 'N/A'}
                                    </p>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        <span className="font-semibold">Population:</span> {formattedPopulation}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        <span className="font-semibold">Top Level Domain:</span> {country.tld?.join(', ') || 'N/A'}
                                    </p>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        <span className="font-semibold">Currencies:</span> {currencies.length ? currencies.join(', ') : 'N/A'}
                                    </p>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        <span className="font-semibold">Languages:</span> {languages.length ? languages.join(', ') : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {country.borders && country.borders.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Border Countries:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {country.borders.map(border => (
                                            <Link
                                                key={border}
                                                to={`/country/${border}`}
                                                className="px-4 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                {border}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CountryDetailsPage;