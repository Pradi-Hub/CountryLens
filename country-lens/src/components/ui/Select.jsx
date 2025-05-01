import React, { forwardRef } from 'react';

const Select = forwardRef(({
                               label,
                               options = [],
                               onChange,
                               value,
                               placeholder = 'Select an option',
                               error,
                               className = '',
                               id,
                               fullWidth = false,
                               ...props
                           }, ref) => {

    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const baseClasses = 'block rounded-md border-gray-300 shadow-light-shadow dark:shadow-dark-shadow focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white';
    const errorClasses = 'border-red-300 focus:border-red-500 focus:ring-red-500';
    const widthClass = fullWidth ? 'w-full' : '';

    const selectClasses = `${baseClasses} ${error ? errorClasses : ''} ${widthClass} ${className}`;

    return (
        <div className={fullWidth ? 'w-full' : ''}>
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label}
                </label>
            )}

            <select
                ref={ref}
                id={selectId}
                className={selectClasses}
                value={value}
                onChange={onChange}
                aria-invalid={error ? 'true' : 'false'}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>{placeholder}</option>
                )}
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;