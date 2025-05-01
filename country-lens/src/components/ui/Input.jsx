import React, { forwardRef } from 'react';

const Input = forwardRef(({
                              type = 'text',
                              label,
                              error,
                              className = '',
                              id,
                              fullWidth = false,
                              ...props
                          }, ref) => {

    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const baseInputClasses = 'block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white';
    const errorInputClasses = 'border-red-300 focus:border-red-500 focus:ring-red-500';
    const widthClass = fullWidth ? 'w-full' : '';

    const inputClasses = `${baseInputClasses} ${error ? errorInputClasses : ''} ${widthClass} ${className}`;

    return (
        <div className={fullWidth ? 'w-full' : ''}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label}
                </label>
            )}

            <input
                ref={ref}
                id={inputId}
                type={type}
                className={inputClasses}
                aria-invalid={error ? 'true' : 'false'}
                {...props}
            />

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;