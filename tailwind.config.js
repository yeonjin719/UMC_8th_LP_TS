module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                skeleton: 'skeleton 3s 1s infinite linear alternate',
            },
            keyframes: {
                skeleton: {
                    '0%': { opacity: '1' },
                    '30%': { opacity: '0.7' },
                    '50%': { opacity: '0.4' },
                    '80%': { opacity: '0.8' },
                    '100%': { opacity: '1' },
                },
            },
            gridTemplateColumns: {
                'my-columns': 'auto 1fr',
            },
        },
    },
    plugins: [],
};
