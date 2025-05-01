import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <header
            className="sticky top-0 z-50 dark:bg-white dark:shadow-light-shadow shadow-dark-shadow bg-gray-800 transition-colors">
            <div className="container mx-auto px-28 py-3 flex justify-between items-center">
                {/* Logo and Brand Name */}
                <Link to="/" className="flex items-center space-x-2 group">
                    <img
                        src="/src/assets/countryLens2.png"
                        alt="CountryLens Logo"
                        className="h-24 w-24 transition-all duration-300 group-hover:drop-shadow-lg drop-shadow-md"
                    />
                    <span
                        className="text-3xl font-bold dark:text-gray-900 text-white drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300">
                        Country<span className="dark:text-blue-600 text-blue-400">Lens</span>
                    </span>
                </Link>


                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                      clipRule="evenodd"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                            </svg>
                        )}
                    </button>

                    {user ? (
                        <div className="flex items-center space-x-3">
                            <Link
                                to="/favorites"
                                className="text-yellow-500 hover:text-yellow-400 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
                                title="Favorites"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </Link>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button variant="primary" size="sm">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;