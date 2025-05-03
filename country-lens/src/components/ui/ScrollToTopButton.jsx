import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 p-3 rounded-full bg-[#213448] dark:bg-[#547792] text-[#ECEFCA] shadow-xl hover:bg-[#547792] dark:hover:bg-[#94B4C1] transition duration-300 z-50"
                aria-label="Scroll to top"
            >
                <ChevronUpIcon className="h-6 w-6"/>
            </button>
        )
    );
};

export default ScrollToTopButton;