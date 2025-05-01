import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 dark:bg-gray-50 text-gray-200">
            <div className="container mx-auto px-28 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span
                            className="text-3xl font-bold text-white dark:text-gray-800 drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300">
                        Country<span className="dark:text-blue-600 text-blue-400">Lens</span>
                    </span>
                        <p className="text-sm text-gray-400 dark:text-gray-800">
                            © {currentYear} All Rights Reserved.
                        </p>
                    </div>

                    <div className="flex gap-8 mb-4 md:mb-0">
                    <a href="/" className="text-sm text-gray-400 dark:text-gray-800 hover:text-gray-100 transition-colors">Home</a>
                        <a href="/about" className="text-sm text-gray-400 dark:text-gray-800 hover:text-gray-100 transition-colors">About</a>
                        <a href="/contact" className="text-sm text-gray-400 dark:text-gray-800 hover:text-gray-100 transition-colors">Contact</a>
                        <a href="/privacy" className="text-sm text-gray-400 dark:text-gray-800 hover:text-gray-100 transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
