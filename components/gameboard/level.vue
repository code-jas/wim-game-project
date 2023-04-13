<template>
   <div class="bg-lt-dash w-screen h-screen">
     <div class="py-20 max-w-screen-2xl mx-auto">
       <div class="text-center font-black text-6xl text-[#605F81] mb-16">
         <h1>CHOOSE LEVEL</h1>
       </div>
       <div class="flex flex-wrap justify-center px-[400px]">
         <button
           v-for="i in 5"
           :key="i"
           :class="['w-[200px] h-[200px] border border-blue-v rounded-[15px] font-franklin bg-[#e6dcff] text-blue-v-alt text-8xl m-[18px] hover:bg-blue-v-alt hover:text-white hover:border-lt-t-prim-alt hover:border-[3px]', { 'cursor-not-allowed opacity-50': i > selectedLevel }]"
           @click="selectLevel(i)"
         >
           <p v-if="i < 3">{{ i }}</p>
           <p v-else><i class="uil uil-padlock"></i> </p>
         </button>
       </div>
       <div class="flex justify-center">
         <button
           class="bg-blue-v w-[476px] h-[70px] text-lt-inp font-franklin text-4xl rounded-[15px]"
           @click="nextClicked"
           :disabled="selectedLevel === null"
         >
           Next
         </button>
       </div>
     </div>
   </div>
 </template>
 
 <script>
 export default {
   data() {
     return {
       selectedLevel: null,
     };
   },
   methods: {
     selectLevel(level) {
       this.selectedLevel = level;
     },
     nextClicked() {
       this.$emit('onLevelSelected', this.selectedLevel);
     },
   },
 };
 </script>
 
 <style>
 
 </style>
 