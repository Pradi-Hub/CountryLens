import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';

const SearchFilters = ({ onSearch, onRegionChange, onLanguageChange  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);

    const regions = [
        { value: '', label: 'All Regions' },
        { value: 'Africa', label: 'Africa' },
        { value: 'Americas', label: 'Americas' },
        { value: 'Asia', label: 'Asia' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Oceania', label: 'Oceania' },
    ];

    const languages = [
        { value: '', label: 'All Languages' },
        { value: 'english', label: 'English' },
        { value: 'french', label: 'French' },
        { value: 'spanish', label: 'Spanish' },
        { value: 'german', label: 'German' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'arabic', label: 'Arabic' },
    ];

    // Handle search with debounce
    useEffect(() => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (searchTerm === '') {
            onSearch('');
            return;
        }

        const timeout = setTimeout(() => {
            onSearch(searchTerm);
        }, 500);

        setSearchTimeout(timeout);

        return () => {
            clearTimeout(timeout);
        };
    }, [searchTerm, onSearch]);

    return (
        <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-2/3">
                <Input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    className="py-2 px-4"
                    aria-label="Search for a country"
                />
            </div>

            <div className="w-full md:w-1/3">
                <Select
                    options={regions}
                    onChange={(e) => onRegionChange(e.target.value)}
                    placeholder="Filter by Region"
                    fullWidth
                    aria-label="Filter by region"
                />
            </div>

            <div className="w-full md:w-1/3">
                <Select
                    options={languages}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    placeholder="Filter by Language"
                    fullWidth
                />
            </div>
        </div>
    );
};

export default SearchFilters;