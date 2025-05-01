import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const FavoritesPage = () => {
    const { user, removeFavorite } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null; // Prevent rendering while redirecting
    }

    const { favorites = [] } = user;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Favorite Countries
                </h1>

                {favorites.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-light-shadow dark:shadow-dark-shadow">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            You haven't added any countries to your favorites yet.
                        </p>
                        <Link to="/">
                            <Button variant="primary">Explore Countries</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map(country => (
                            <div
                                key={country.cca3}
                                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-light-shadow dark:shadow-dark-shadow hover:shadow-lg transition-shadow"
                            >
                                <Link to={`/country/${country.cca3}`}>
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={country.flag}
                                            alt={`Flag of ${country.name}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {country.name}
                                            </h3>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    removeFavorite(country.cca3);
                                                }}
                                                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                                                aria-label="Remove from favorites"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default FavoritesPage;