/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {

        sm: '210px',
        msm: '420px',
        lg: '976px',
        xl: '1440px',
        '2xl': {'max': '600px'}
      },
    extend: {
      spacing: {
          '128': '32rem',
          '144': '36rem',
          

        },
        borderRadius: {
          'sc': '12px',
          
        },
        size:{
          'cu1': '10px',
          'cu2': '2px'
        },
        opacity: {
          'cuo1': '.0.3',
        }
    
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
