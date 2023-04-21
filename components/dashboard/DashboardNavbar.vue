<template>
  <div
    class="flex items-center justify-between w-10/12 h-[98px] bg-white px-9 mb-16 rounded-[15px] drop-shadow-lg dark:bg-dk-inp-b-alt sm:h-[70px] sm:px-5 md:h-[80px] md:px-7 lg:h-[90px] lg:px-8"
  >
    <h1
      class="font-franklin text-5xl text-lt-t-prim dark:text-violet-l sm:text-2xl md:text-3xl lg:text-4xl"
    >
      Dashboard
    </h1>
    <div class="flex items-center justify-between gap-x-2">
      <div
        class="w-[45px] h-[45px] flex items-center justify-center overflow-hidden rounded-full hover:scale-105 transition duration-200 bg-violet-l-alt hover:bg-violet-l-alt sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px]"
        :class="{ 'dark:bg-dk-inp-alt dark:hover:bg-dk-inp-alt': isDark }"
        @click="toggleDarkMode"
      >
        <i
          :class="[
            'uil',
            'text-4xl sm:text-xl md:text-2xl lg:text-3xl',
            'hover:scale-105',
            'transition',
            'duration-200',
            isDark
              ? 'uil-sun dark:text-dk-t-prim dark:bg-dk-inp-alt'
              : 'uil-moon text-blue bg-violet-l-alt',
          ]"
        ></i>
      </div>
      <button
        @click="$emit('showModal')"
        type="button"
        class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full hover:scale-110 transition duration-300 dark:bg-dk-inp-alt sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px]"
      >
        <i
          class="uil uil-question-circle text-blue text-4xl rounded-full dark:text-dk-t-prim sm:text-xl md:text-2xl lg:text-3xl"
        ></i>
      </button>
      <button
        @click="$emit('add-player')"
        type="button"
        class="flex items-center bg-blue-v font-semibold text-dk-t-prim-alt rounded py-3 px-5 hover:bg-blue-v-alt focus:ring-1 focus:ring-blue-300 hover:scale-105 active:transform active:translate-y-1 transition duration-300 sm:py-1 sm:px-2 md:py-2 md:px-3 lg:py-2 lg:px-3"
      >
        <i class="uil uil-plus text-2xl mr-2 sm:text-xl md:text-xl"></i>
        <p class="sm:text-[15px] md:text-[17px] lg:text-[19]">Add Player</p>
      </button>
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
  created() {
    window.addEventListener("storage", this.updatePlayersFromStorage);
    // Check if dark mode is saved in local storage
    const savedIsDarkMode = localStorage.getItem("isDarkMode");
    if (savedIsDarkMode !== null) {
      this.isDark = JSON.parse(savedIsDarkMode);
      document.body.classList.toggle("dark", this.isDark);
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark", this.isDark);
      localStorage.setItem("isDarkMode", JSON.stringify(this.isDark));
    },
  },
};
</script>

<style>
</style>