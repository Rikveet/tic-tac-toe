/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}',],
    theme: {
        colors:{
            transparent: 'transparent',
            violet: "#42047e",
            skyGreen: "#07f49e",
            white: "#FFF",
            blue: "#0000FF",
            dodgeBlue: "#1E90FF"
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
