/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}',],
    theme: {
        screens: {
            '2xl': {'min': '1535px'},
            'xl': {'max': '1279px'},
            'lg': {'max': '1023px'},
            'md': {'max': '767px'},
            'sm': {'max': '639px'},
            '2xt': {'raw': '(min-height: 1600px)'},
            'xt': {'raw': '(max-height: 1400px)'},
            'lt': {'raw': '(max-height: 1200px)'},
            'mt': {'raw': '(max-height: 1000px)'},
            'st': {'raw': '(max-height: 800px)'},
            'xst': {'raw': '(max-height: 400px)'},
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
                'mmb-animation': {
                    '0%': {},
                    '50%': {},
                    '100%': {}
                }
            },
            fontFamily: {
                coolParty: ["CoolParty", 'cursive'],
                monoton: ['Monoton', 'normal']
            }
        },
    },
    plugins: [
        require('tailwindcss-touch')(),
    ]
}
