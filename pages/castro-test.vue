<template>
    <div :class="{'bg-white dark:bg-gray-900': !isDark}" class="min-h-screen flex justify-center items-center">
      <button class="bg-gray-200 dark:bg-gray-800 py-2 px-4 rounded" @click="toggleDarkMode">Toggle Dark Mode</button>
      <div class="w-96 h-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDark: false
      }
    },
    methods: {
      toggleDarkMode() {
        this.isDark = !this.isDark
        document.body.classList.toggle('dark', this.isDark)
      }
    }
  }
  </script>
  