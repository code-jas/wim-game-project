

module.exports = {
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
   ],
   theme: {
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
            // Light Color 
            'lt-t-prim': '#4D4C73', // text light primary
            'lt-t-prim-alt': '#605F81', // text light alt
            'lt-t-sec': '#A3AED0', // text light secondary
            'lt-t-sec-alt': '#ADB7D5', // text light secondary alt
            'lt-inp': '#F4F7FE', // input placeholder
            'lt-inp-alt': '#F5F8FE', // input placeholder alt
            'lt-inp-b': '#E8EEF9', // input placeholder backgrouund
            'lt-inp- b-alt': '#E9EFFA', // input placeholder background alt
            'lt-dash': '#F4F6FA', // dashboard border
            // Dark Color
            'dk-t-prim': '# ', // text dark primary
            'dk-t-prim-alt': '#F4EEFF', // text dark primary alt   
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

   }
}