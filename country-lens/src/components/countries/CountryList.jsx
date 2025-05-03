import React from 'react';
import CountryCard from './CountryCard';

const CountryList = ({ countries, loading, error }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#547792] dark:border-[#94B4C1]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">Error: {error}</p>
                <button
                    className="mt-2 text-[#547792] dark:text-[#94B4C1] hover:underline"
                    onClick={() => window.location.reload()}
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!countries || countries.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-[#213448] dark:text-[#ECEFCA]">No countries found. Try adjusting your search.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map(country => (
                <CountryCard key={country.cca3} country={country} />
            ))}
        </div>
    );
};

export default CountryList;