import flowbite from 'flowbite/plugin';
// import scrollbar from '...'; // Optional: only if you have a scrollbar plugin

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
        './node_modules/flowbite-react/**/*.js',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                xs: '320px',
                sm: '375px',
                sms: '412px',
                sml: '500px',
                md: '667px',
                mdl: '768px',
                lg: '960px',
                lgl: '1024px',
                xl: '1280px',
            },
            fontFamily: {
                bodyFont: ['Poppins', 'sans-serif'],
                titleFont: ['Montserrat', 'sans-serif'],
            },
            boxShadow: {
                shadowOne: '10px 10px 19px #1c1e22, -10px -10px 19px #262a2e',
            },
        },
    },
    plugins: [
        flowbite,
        // scrollbar, // ✅ Uncomment only if scrollbar plugin is installed and imported
    ],
}
