<template>
  <div class="bg-violet-l-alt h-screen flex items-center justify-center">
    <div class="flex items-center justify-center flex-col py-20 max-w-screen-2xl mx-auto">
      <div class="text-center font-black text-6xl text-lt-t-prim-alt">
        <h1>CHOOSE YOUR DIFFICULTY</h1>
      </div>
      <div class="flex justify-center my-16">
        <button
          v-for="(difficulty, index) in difficulties"
          :key="index"
          :class="['relative w-[275px] h-[370px] bg-[#e6dcff] font-semibold  text-lt-t-prim text-3xl transition duration-500 ease-in-out rounded-[15px] m-[32px] overflow-hidden flex items-center justify-center shadow-lg', { 'hover:bg-white hover:text-blue-v hover:border hover:border-blue-v hover:shadow-xl hover:scale-105': selectedDifficulty !== index, 'bg-white text-blue-v border border-blue-v shadow-xl scale-105': selectedDifficulty === index }]"
          @click="selectDifficulty(index)"
        >
          <div :class="['absolute w-full h-full bg-blob-diff bg-no-repeat bg-center transition duration-300 ease-in-out',{'scale-225 hover:scale-110': selectedDifficulty!==index, 'scale-110': selectedDifficulty === index  }]"></div>
          <h1>{{ difficulty }}</h1>
        </button>
      </div>
      <div class="flex justify-center">
        <button class="bg-blue-v w-[476px] h-[70px] text-lt-inp font-franklin text-4xl rounded-[15px]">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      difficulties: ['Easy', 'Medium', 'Hard'],
      selectedDifficulty: null,
    };
  },
  methods: {
    selectDifficulty(index) {
      this.selectedDifficulty = index;
      console.log(this.selectedDifficulty)
    },
  },
};
</script>
