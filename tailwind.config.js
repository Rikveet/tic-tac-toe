/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}',],
    theme: {
        screens: {
            'sm': {'min': '640px', 'max': '767px'},
            'md': {'min': '768px', 'max': '1023px'},
            'lg': {'min': '1024px', 'max': '1279px'},
            'xl': {'min': '1280px', 'max': '1535px'},
            '2xl': {'min': '1536px'},
            'xst': { 'raw': '(min-height: 400px)' },
            'st': { 'raw': '(min-height: 800px)' },
            'mt': { 'raw': '(min-height: 1000px)' },
            'lt': { 'raw': '(min-height: 1200px)' },
            'xt': { 'raw': '(min-height: 1400px)' },
            '2xt': { 'raw': '(min-height: 1600px)' },
        },
        extend: {
            'animation': {
                'gradient-x': 'gradient-x 15s ease infinite',
                'gradient-y': 'gradient-y 15s ease infinite',
                'gradient-xy': 'gradient-xy 15s ease infinite',
                'main-menu-button': 'mmb-animation 15s ease'
            },
            'keyframes': {
                'gradient-y': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'center top'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'center center'
                    }
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                'gradient-xy': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                'mmb-animation':{
                    '0%':{

                    },
                    '50%':{

                    },
                    '100%':{

                    }
                }
            }
        },
    },
    plugins: [],
}
