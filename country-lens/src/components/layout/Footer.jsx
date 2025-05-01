import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-gray-800 shadow-inner transition-colors">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        © {currentYear} World Explorer. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Created with React, Tailwind CSS, and REST Countries API
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;