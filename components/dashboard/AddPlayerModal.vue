<template>
  
   <!-- Modal -->
   <div class="fixed z-20 inset-0 overflow-y-auto">
     <div class="flex items-center justify-center min-h-screen">
       <div class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="$emit('close-modal')"></div>
       <div class="relative bg-white rounded-lg w-1/2" @click.stop>
         <div class="absolute top-0 right-0 p-4">
           <button  @click="$emit('close-modal')" class="text-gray-500 hover:text-gray-600">
             <i class="uil uil-multiply text-2xl"></i>
           </button>
         </div>
         <div class="p-8">
           <div class="flex items-center  justify-center flex-col">
            <input type="text" class="w-[740px] h-[88px]  bg-lt-inp border-none text-lt-t-prim text-3xl rounded-[15px]  drop-shadow-md placeholder:text-lt-t-sec-alt  focus:outline-none  focus:ring-2 focus:ring-blue-v focus:border-blue-v focus:bg-white block p-7 mb-20" placeholder="Player Name...">
          
            <button type="button" @click="addPlayer()" class="w-[280px] h-[70px]  bg-blue-v font-medium font-franklin text-dk-t-prim-alt text-5xl rounded-[15px]  px-5 py-2.5 mr-2 mb-2   hover:bg-blue-v-alt focus:ring-4 focus:ring-blue-300   hover:scale-105 active:transform active:translate-y-2 transition duration-300">Start</button>
         </div>
         </div>
       </div>
     </div>
   </div>
   </template>
   
   <script>
   export default {
      props: {
         addPlayer: {
            type: Function,
            required: true
         }
      },
     mounted() {
       document.addEventListener('click', this.handleClickOutside);
     },
     beforeUnmount() {
       document.removeEventListener('click', this.handleClickOutside);
     },
     methods: {
       handleClickOutside(event) {
         if (event.target.classList.contains('fixed')) {
           this.$emit('close-modal');
         }
       },
     }
   }
   </script>
   
   <style>
   
   </style>
   