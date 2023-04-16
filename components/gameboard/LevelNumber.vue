<template>
    <div class="bg-violet-l-alt h-screen flex items-center justify-center dark:bg-dk-inp-b">
      <div class="flex items-center justify-center flex-col py-20 max-w-screen-2xl mx-auto">
        <div class="flex justify-between w-[1500px]">
          <button @click="backToDifficultyLevel">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="back-arrow"><g data-name="Layer 2"><g data-name="arrow-back"><rect width="24" height="24" opacity="0" transform="rotate(90 12 12)"></rect><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"></path></g></g></svg> Back
          </button>
          <div class="flex justify-center gap-x-3">
            <div
              class="w-[45px] h-[45px] flex items-center justify-center overflow-hidden rounded-full  hover:scale-105 transition duration-200 bg-violet-l-alt hover:bg-violet-l-alt"
              :class="{'dark:bg-dk-inp-alt dark:hover:bg-dk-inp-alt': isDark }"
              @click="toggleDarkMode"
              >
                <i
                  :class="[
                    'uil',
                    'text-4xl',
                    'hover:scale-105',
                    'transition',
                    'duration-200',
                    isDark
                    ? 'uil-sun dark:text-dk-t-prim dark:bg-dk-inp-alt'
                    : 'uil-moon text-blue bg-violet-l-alt'
                  ]"
                ></i>
            </div>
            <button @click="showInstructionModal = true" type="button" class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full   hover:scale-110 transition duration-300 dark:bg-dk-inp-b-alt">
              <i class="uil uil-question-circle text-blue text-4xl rounded-full dark:text-violet-l"></i>
            </button>
          </div>
        </div>
        <div class="text-center font-black text-6xl text-lt-t-prim-alt mb-16 dark:text-violet-l">
          <h1>CHOOSE LEVEL</h1>
        </div>
        <div class="flex flex-wrap justify-center px-[400px]">
          <button
            v-for="i in 5"
            :key="i"
            :disabled="!isLevelDone(i)"
            :class="[
              'w-[200px] h-[200px] border-[2px] border-blue-v rounded-[15px] text-[#6174FB] font-franklin text-8xl m-[18px] dark:border-dk-inp-b-alt dark:text-[#7282FB]',
              isLevelDone(i) ? 'hover:bg-[#6174FB] hover:text-white hover:border-[3px] hover:border-lt-t-prim-alt dark:hover:bg-blue-v dark:hover:text-white dark:hover:border-[3px] dark:hover:border-lt-t-prim-alt' : 'cursor-not-allowed hover:border-[3px] hover:border-lt-t-prim-alt dark:hover:border-lt-t-prim-alt',
              i === selectedLevel ? 'bg-[#6174FB] text-white border-[3px] border-lt-t-prim-alt dark:bg-blue-v dark:text-white dark:border-[3px] dark:border-lt-t-prim-alt' : 'bg-[#E6DCFF] dark:bg-dk-inp-b-alt',
            ]"
            @click="selectLevel(i)"
          >
            <p v-if="isLevelDone(i)">{{ i }}</p>
            <i v-else class="uil uil-padlock"></i>
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
      <div v-if="showInstructionModal">
          <InstructionModal @closeModal="showInstructionModal = false"/>
      </div>
    </div>
  </template>
  <script>
  export default {
    props: ['onLevelSelected', 'onBackToDifficultyLevel'],
    data() {
      return {
        isDark: false,
        showInstructionModal: false,
        doneLevels: [1, 3], // an array of levels that are done
        selectedLevel: null, // keep track of the selected level
      }
    },
    methods: {
      isLevelDone(level) {
        return this.doneLevels.includes(level)
      },
      selectLevel(level) {
        if (this.isLevelDone(level)) {
          this.selectedLevel = level
        }
      },
      nextClicked() {
       this.$emit('onLevelSelected', this.selectedLevel);
     },
     backToDifficultyLevel() {
       this.$emit('onBackToDifficultyLevel');
     },
      toggleDarkMode() {
        this.isDark = !this.isDark
        document.body.classList.toggle('dark', this.isDark)
      },
    },
  }
  </script>