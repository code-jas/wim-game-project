<template>
   <div class="fixed z-20 inset-0 overflow-y-auto">
     <div class="flex items-center justify-center min-h-screen">
       <div class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-950 dark:bg-opacity-75" @click="$emit('close-modal')"></div>
       <div class="relative bg-white rounded-lg w-5/12 dark:bg-dk-inp-b" @click.stop>
         <div class="absolute top-3 right-3 p-4">
           <button @click="$emit('close-modal')" class="text-lt-t-prim hover:text-red">
             <i class="uil uil-multiply text-3xl"></i>
           </button>
         </div>
         <div class="p-8">
           <div class="flex items-center justify-center flex-col mt-10">
            
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 <script>
 export default {
   data() {
     return {
       isDark: false,
     };
   },
   props: {
     
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
     toggleDarkMode() {
       this.isDark = !this.isDark;
       document.body.classList.toggle('dark', this.isDark);
     },
   },
 };
 </script>
 