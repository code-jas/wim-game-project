<template>
  <div class="flex justify-center">
    <div
      class="flex items-center justify-between w-9/12 bg-white py-4 px-9 mb-20 md:mb-10 rounded-[15px] drop-shadow-lg dark:bg-dk-inp sm:px-5 md:px-7 lg:px-8 lg:items-start"
    >
      <div class="w-1/3 flex justify-start"></div>
      <div class="w-1/2 lg:w-full">
        <div class="flex justify-between gap-12 flex-wrap xl:justify-center">
          <div class="text-center">
            <div class="font-bold text-4xl text-lt-t-prim dark:text-violet-l">
              {{ Math.floor(formattedScore) }}
            </div>
            <div class="text-base text-lt-t-prim dark:text-violet-l">Score</div>
          </div>
          <div class="text-center">
            <div class="font-bold text-4xl text-lt-t-prim dark:text-violet-l">
              {{ level }}
            </div>
            <div class="text-base text-lt-t-prim dark:text-violet-l">Level</div>
          </div>
          <div class="text-center">
            <div
              class="font-bold text-4xl dark:text-violet-l"
              :class="{
                'text-red': timeLeft <= 5,
                'text-lt-t-prim': timeLeft > 5,
              }"
            >
              {{ formattedTime || "00:15" }}
            </div>
            <div class="text-base text-lt-t-prim dark:text-violet-l">Timer</div>
          </div>
        </div>
      </div>
      <div class="w-1/3 flex items-center justify-end gap-x-4 lg:items-start">
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
      </div>
    </div>
  </div>
</template>
  
<script>
import QuestionInformation from "./QuestionInformation.vue";
import NavbarIcons from "./NavbarIcons.vue";
export default {
  components: { QuestionInformation, NavbarIcons },
  props: {
    timeLeft: Number,
    level: Number,
    score: Array,
  },
  data() {
    return {
      isDark: false,
    };
  },
  created() {
    // Check if dark mode is saved in local storage
    const savedIsDarkMode = localStorage.getItem("isDarkMode");
    if (savedIsDarkMode !== null) {
      this.isDark = JSON.parse(savedIsDarkMode);
      document.body.classList.toggle("dark", this.isDark);
    }
  },
  computed: {
    formattedTime() {
      const minutes = 0; // Always 0 for 15 seconds
      const seconds = this.timeLeft;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
    formattedScore() {
      return this.score.reduce((acc, result) => acc + result, 0);
    },
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark", this.isDark);
      localStorage.setItem("isDarkMode", JSON.stringify(this.isDark));
      const gameBoard = document.querySelector(".game-board");
      if (gameBoard) {
        gameBoard.classList.toggle("bg-gameboard-dk", this.isDark);
        gameBoard.classList.toggle("bg-gameboard", !this.isDark);
      }
    },
  },
};
</script>
<style>
</style>    