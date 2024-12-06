/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
                generalsans: ['General Sans', 'sans-serif'],
                eloquia: ['Eloquia', 'sans-serif'],
              },
        },
    },
    plugins: [],
};
