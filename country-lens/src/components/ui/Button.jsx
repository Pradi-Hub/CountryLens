import React from 'react';

const Button = ({
                    children,
                    onClick,
                    variant = 'primary',
                    size = 'md',
                    disabled = false,
                    className = '',
                    type = 'button',
                    fullWidth = false,
                    ...props
                }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[#547792] text-[#ECEFCA] hover:bg-[#213448] dark:bg-[#547792] dark:hover:bg-[#213448]',
        secondary: 'bg-[#94B4C1] text-[#213448] hover:bg-[#547792] dark:bg-[#213448] dark:text-[#ECEFCA] dark:hover:bg-[#547792]',
        outline: 'border border-[#94B4C1] bg-transparent text-[#213448] hover:bg-[#ECEFCA] dark:border-[#547792] dark:text-[#ECEFCA] dark:hover:bg-[#213448]',
        ghost: 'bg-transparent text-[#213448] hover:bg-[#ECEFCA] dark:text-[#ECEFCA] dark:hover:bg-[#213448]'
    };

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 py-2 px-4',
        lg: 'h-12 px-6 text-lg'
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;