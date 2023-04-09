

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
            'red ': '#FF7974', // red
            'red-alt': '#FF8782', // red alt
            'blue': '#6274FB', // blue
            'blue-alt': '#7282FC', // blue alt
            'green': '#72D896', // green
            'green-alt': '#81DCA1', // green alt
            'blue-v': '#4B23FF', // blue violet
            'blue-v-alt': '#5D39FF', // blue violet alt 
            'violet': '#8353FC', // violet
            'violet-alt': '#9065FD', // violet alt 
            // Light Color
            'lt-t-prim': '#4D4C73', // text light primary
            'lt-t-prim-alt': '#605F81', // text light alt
            'lt-t-sec': '#A3AED0', // text light secondary
            'lt-t-sec-alt': '#ADB7D5', // text light secondary alt
            'lt-inp': '#F4F7FE', // input placeholder
            'lt-inp-alt': '#F5F8FE', // input placeholder alt
            'lt-inp-b': '#E8EEF9', // input placeholder backgrouund
            'lt-inp- b-alt': '#E9EFFA', // input placeholder background alt
            // Dark Color
         }
      }

   }
}