<template>
  <div class="bg-violet-l-alt h-screen py-20 flex flex-col items-center dark:bg-dk-inp-b">
    <!-- <Toast v-if="showToast" :type='warning' :message="message" /> -->
    <div class="flex justify-between items-center w-full max-w-[1535px] sm:max-w-[635px] md:max-w-[767px] lg:max-w-[1023px] xl:max-w-[1279px] px-10">
        <router-link to="/main">
          <svg class="fill-blue stroke-1 stroke-blue dark:fill-dk-t-prim dark:stroke-dk-t-prim" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="back-arrow"><g data-name="Layer 2"><g data-name="arrow-back"><rect width="24" height="24" opacity="0" transform="rotate(90 12 12)"></rect><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"></path></g></g></svg> <p class="font-bold text-blue dark:text-dk-t-prim">Back</p>
        </router-link>
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
          <button  @click="showInstructionModal = true" type="button" class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full hover:scale-110 transition duration-300 dark:bg-dk-inp-b-alt">
            <i class="uil uil-question-circle text-blue text-4xl rounded-full dark:text-dk-t-prim"></i>
         </button>
        </div>
    </div>
    <div class="flex items-center justify-center flex-col py max-w-screen-2xl mx-auto">
      <div class="text-center font-black text-6xl text-lt-t-prim-alt dark:text-violet-l lg:text-4xl xl:text-5xl">
        <h1>CHOOSE YOUR DIFFICULTY</h1>
      </div>
      <div class="flex flex-wrap justify-center my-16">
        <button
          v-for="(difficulty, index) in difficulties"
          :key="index"
          :class="['relative w-[275px] h-[370px] xl:w-[255px] xl:h-[360px] bg-[#e6dcff] font-semibold  text-lt-t-prim text-3xl  uppercase transition duration-500 ease-in-out rounded-[15px] m-8 md:m-2 overflow-hidden flex items-center justify-center shadow-lg dark:bg-dk-inp-b-alt dark:text-[#7282FB] active:transform active:translate-y-1 ', { 'hover:bg-white hover:text-blue-v hover:border hover:border-blue-v hover:shadow-xl hover:scale-105 dark:hover:bg-blue-v dark:hover:text-violet-l dark:hover:border-violet-l': selectedDifficulty !== index, 'bg-white text-blue-v border border-blue-v shadow-xl scale-105 dark:bg-blue-v dark:text-violet-l dark:border dark:border-violet-l dark:shadow-xl dark:scale-105': selectedDifficulty === index }]"
          @click="selectDifficulty(index)"
        >
          <div :class="['absolute w-full h-full bg-blob-diff bg-no-repeat bg-center transition duration-300 ease-in-out',{'scale-225 hover:scale-110': selectedDifficulty!==index, 'scale-110': selectedDifficulty === index  }]"></div>
          <h1>{{ difficulty }}</h1>
        </button>
      </div>
      <div class="flex justify-center">
        <button class="bg-blue-v w-[476px] h-[70px] sm:w-[200px] md:w-[300px] xl:w-[400px] 2xl:w-[456px] text-lt-inp font-franklin text-4xl rounded-[15px] active:transform active:translate-y-1 transition duration-300" @click="nextClicked" >Next</button>
      </div>
    </div>
    <div v-if="showInstructionModal">
      <InstructionModal @closeModal="showInstructionModal = false"/>
    </div>
  </div>
</template>

<script>
import InstructionModal from '../InstructionModal.vue';
import Toast from './Toast.vue'

export default {
    components: {
      Toast,
      InstructionModal
    },
    props: {
        wimQuest: Object
    },
    data() {
        return {
            isDark: false,
            showInstructionModal: false,
            difficulties: ["easy", "medium", "hard"],
            selectedDifficulty: null,
            showToast: false,
            message: `Please select a difficulty level to proceed.`,
        };
    },
    created() {
      // Check if dark mode is saved in local storage
      const savedIsDarkMode = localStorage.getItem("isDarkMode");
      if (savedIsDarkMode !== null) {
        this.isDark = JSON.parse(savedIsDarkMode);
        document.body.classList.toggle('dark', this.isDark)
      }
    },
    methods: {
        selectDifficulty(index) {
            this.selectedDifficulty = index;
            console.log("index", this.selectedDifficulty);
        },
        nextClicked() {
          if(this.selectedDifficulty === null) { 
           // toast
          //  this.showToast = true
          //  console.log("toast", this.showToast)
          }else { 
            this.$emit("onDifficultySelected", this.difficulties[this.selectedDifficulty]);
          }
        },
        toggleDarkMode() {
            this.isDark = !this.isDark
            document.body.classList.toggle('dark', this.isDark)
            localStorage.setItem("isDarkMode", JSON.stringify(this.isDark));
        },
    },
};
</script>
