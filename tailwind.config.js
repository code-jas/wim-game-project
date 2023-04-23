

module.exports = {
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
   ],
   darkMode: 'class',
   theme: {
      screens: {
         '2xl': { 'max': '1535px' },
         // => @media (max-width: 1535px) { ... }

         'xl': { 'max': '1279px' },
         // => @media (max-width: 1279px) { ... }

         'lg': { 'max': '1023px' },
         // => @media (max-width: 1023px) { ... }

         'md': { 'max': '767px' },
         // => @media (max-width: 767px) { ... }

         'sm': { 'max': '639px' },
         // => @media (max-width: 639px) { ... }
      },
      extend: {
         colors: {
            // constants Color
            'red': '#FF7974', // red
            'red-alt': '#FF8782', // red alt
            'blue': '#6274FB', // blue
            'blue-alt': '#7282FC', // blue alt
            'green': '#72D896', // green
            'green-alt': '#81DCA1', // green alt
            'blue-v': '#4B23FF', // blue violet
            'blue-v-alt': '#5D39FF', // blue violet alt 
            'violet': '#8353FC', // violet
            'violet-alt': '#9065FD', // violet alt 
            'violet-l': '#EDE9FF', // violet light
            'violet-l-alt': '#F2F0FC', // violet light alt
            'light-gray': '#E4E7EF', // light gray
            'light-gray-alt': '#F0F2F7', // light gray alt
            // Light Color 
            'lt-t-prim': '#4D4C73', // text light primary
            'lt-t-prim-alt': '#605F81', // text light alt
            'lt-t-sec': '#A3AED0', // text light secondary
            'lt-t-sec-alt': '#ADB7D5', // text light secondary alt
            'lt-inp': '#F4F7FE', // input placeholder
            'lt-inp-alt': '#F5F8FE', // input placeholder alt
            'lt-inp-b': '#E8EEF9', // input placeholder backgrouund
            'lt-inp-b-alt': '#E9EFFA', // input placeholder background alt
            'lt-dash': '#F4F6FA', // dashboard border
            'lt-cont': '#E6DCFF',
            'lt-cont-alt': '#E9E0FF',
            // Dark Color
            'dk-t-prim': '#EEE9F8', // text light primary
            'dk-t-prim-alt': '#F4EEFF', // text light alt
            'dk-t-sec': '#A3AED0', // text light secondary
            'dk-t-sec-alt': '#ADB7D5', // text light secondary alt
            'dk-inp': '#332E59', // input placeholder
            'dk-inp-alt': '#3B3464', // input placeholder alt
            'dk-inp-b': '#282043', // input placeholder backgrouund
            'dk-inp-b-alt': '#2B264F', // input placeholder background alt
            'dk-dash': '#F4F6FA', // dashboard border
         },
         backgroundImage: {
            'blob-diff': "url('@/assets/img/blob-portrait.svg')",
         },
         backgroundSize: {
            'auto': 'auto',
            'cover': 'cover',
            'contain': 'contain',
            '200%': '200%',
            '150%': '150%',
            '120%': '120%',
            '100%': '100%',
         },
         scale: {
            '175': '1.75',
            '200': '2',
            '210': '2.10',
            '225': '2.25',
            '250': '2.5',
         }
      }

   },
   plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      // ...
   ],
}