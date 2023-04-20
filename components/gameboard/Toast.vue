<template>
   <div v-if="showToast" :class="['toast', 'toast-' + type]">
     <div class="toast-icon" :class="['toast-icon-' + type]">
       <i :class="['icon-' + type]"></i>
     </div>
     <div class="toast-message">{{ message }}</div>
   </div>
 </template>
 
 <script>
 export default {
   props: {
     showToast: {
       type: Boolean,
       required: true,
     },
     type: {
       type: String,
       required: true,
       default: "info",
       validator: (value) =>
         ["info", "success", "warning", "error"].includes(value),
     },
     message: {
       type: String,
       required: true,
     },
   },
   created(){
       console.log("toast", this.showToast)
    },
 };
 </script>
 
 <style scoped>
 .toast {
   position: fixed;
   top: 10px;
   right: 10px;
   padding: 10px 20px;
   border-radius: 4px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
   z-index: 1000;
   display: flex;
   align-items: center;
   font-size: 14px;
 }
 
 .toast-message {
   margin-left: 10px;
 }
 
 .toast-icon {
   width: 30px;
   height: 30px;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 20px;
 }
 
 .toast-icon-info {
   color: #0d6efd;
   background-color: #d1e7ff;
 }
 
 .toast-icon-success {
   color: #198754;
   background-color: #d4edda;
 }
 
 .toast-icon-warning {
   color: #ffc107;
   background-color: #fff3cd;
 }
 
 .toast-icon-error {
   color: #dc3545;
   background-color: #f8d7da;
 }
 
 .icon-info::before {
   content: "\f05a";
 }
 
 .icon-success::before {
   content: "\f058";
 }
 
 .icon-warning::before {
   content: "\f071";
 }
 
 .icon-error::before {
   content: "\f06a";
 }
 </style>
 