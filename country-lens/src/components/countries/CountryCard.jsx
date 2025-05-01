import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const CountryCard = ({ country }) => {
    const { user, addFavorite, removeFavorite } = useAuth();

    // Check if country is in favorites
    const isFavorite = user?.favorites?.some(fav => fav.cca3 === country.cca3);

    // Format population with commas
    const formattedPopulation = country.population.toLocaleString();

    // Handle favorite toggle
    const handleFavoriteToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            removeFavorite(country.cca3);
        } else {
            addFavorite(country);
        }
    };

    return (
        <Link
            to={`/country/${country.cca3}`}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-light-shadow dark:shadow-dark-shadow hover:shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer"
        >
            <div className="h-40 overflow-hidden">
                <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {country.name.common}
                    </h3>

                    {user && (
                        <button
                            onClick={handleFavoriteToggle}
                            className="text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400 transition-colors duration-300"
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            {isFavorite ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>

                <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <p><span className="font-medium">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
                    <p><span className="font-medium">Region:</span> {country.region}</p>
                    <p><span className="font-medium">Population:</span> {formattedPopulation}</p>
                </div>
            </div>
        </Link>
    );
};

export default CountryCard;