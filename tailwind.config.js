/** @type {import('tailwindcss').Config} */
export default {
	content: ['./public/index.html', './src/**/*.{js,ts}'],
	theme: {
		extend: {
			fontFamily: {
				comic: ["Comic Neue", "sans-serif"],
			},
		},
	},
	plugins: [],
};
