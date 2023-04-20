<template>
   <div v-if="show" class="popup-message">{{ message }}</div>
 </template>
 
 <script>
 export default {
   props: {
     message: String,
     show: Boolean
   }
 };
 </script>
 
 <style scoped>
 .popup-message {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background-color: #fff;
   padding: 20px;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
   z-index: 9999;
 }
 </style>
 