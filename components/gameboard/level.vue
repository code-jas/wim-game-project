<template>
  <div class="bg-violet-l-alt h-screen flex items-center justify-center">
    <div class="flex items-center justify-center flex-col py-20 max-w-screen-2xl mx-auto">
      <div class="flex justify-between w-[1500px]">
        <router-link to="/main">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="back-arrow"><g data-name="Layer 2"><g data-name="arrow-back"><rect width="24" height="24" opacity="0" transform="rotate(90 12 12)"></rect><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"></path></g></g></svg> Back
        </router-link>
        <div>
          <button  type="button" class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full   hover:scale-110 transition duration-300">
            <i class="uil uil-question-circle text-blue text-4xl bg-violet-l-alt  rounded-full"></i>
         </button>
        </div>
      </div>
      <div class="text-center font-black text-6xl text-lt-t-prim-alt">
        <h1>CHOOSE YOUR DIFFICULTY</h1>
      </div>
      <div class="flex justify-center my-16">
        <button
          v-for="(difficulty, index) in difficulties"
          :key="index"
          :class="['relative w-[275px] h-[370px] bg-[#e6dcff] font-semibold  text-lt-t-prim text-3xl  uppercase transition duration-500 ease-in-out rounded-[15px] m-[32px] overflow-hidden flex items-center justify-center shadow-lg', { 'hover:bg-white hover:text-blue-v hover:border hover:border-blue-v hover:shadow-xl hover:scale-105': selectedDifficulty !== index, 'bg-white text-blue-v border border-blue-v shadow-xl scale-105': selectedDifficulty === index }]"
          @click="selectDifficulty(index)"
        >
          <div :class="['absolute w-full h-full bg-blob-diff bg-no-repeat bg-center transition duration-300 ease-in-out',{'scale-225 hover:scale-110': selectedDifficulty!==index, 'scale-110': selectedDifficulty === index  }]"></div>
          <h1>{{ difficulty }}</h1>
        </button>
      </div>
      <div class="flex justify-center">
        <button class="bg-blue-v w-[476px] h-[70px] text-lt-inp font-franklin text-4xl rounded-[15px]" @click="nextClicked">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wimQuest: Object
  },
  data() {
    return {
      difficulties: ['easy', 'medium', 'hard'],
      selectedDifficulty: null,
    };
  },
  created() {
  },
  methods: {
    selectDifficulty(index) {
      this.selectedDifficulty = index;
      console.log("index", this.selectedDifficulty)
    },
    nextClicked() {
      this.$emit('onDifficultySelected',this.difficulties[this.selectedDifficulty]);
    },
    
  },
};
</script>