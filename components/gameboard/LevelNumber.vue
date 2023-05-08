<template>
  <div
    class="bg-violet-l-alt min-h-screen py-20 flex flex-col items-center dark:bg-dk-inp-b"
  >
    <div
      class="flex justify-between items-center w-full max-w-[1080px] sm:max-w-[635px] md:max-w-[767px] lg:max-w-[1023px] px-10 pb-6"
    >
      <button @click="backToDifficultyLevel">
        <svg
          class="fill-blue stroke-1 stroke-blue dark:fill-dk-t-prim dark:stroke-dk-t-prim"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="back-arrow"
        >
          <g data-name="Layer 2">
            <g data-name="arrow-back">
              <rect
                width="24"
                height="24"
                opacity="0"
                transform="rotate(90 12 12)"
              ></rect>
              <path
                d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"
              ></path>
            </g>
          </g>
        </svg>
        <p class="font-bold text-blue dark:text-dk-t-prim">Back</p>
      </button>
      <div class="flex justify-center gap-x-3">
        <div
          class="w-[45px] h-[45px] flex items-center justify-center overflow-hidden rounded-full hover:scale-105 transition duration-200 bg-violet-l-alt hover:bg-violet-l-alt"
          :class="{ 'dark:bg-dk-inp-alt dark:hover:bg-dk-inp-alt': isDark }"
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
                : 'uil-moon text-blue bg-violet-l-alt',
            ]"
          ></i>
        </div>
        <button
          @click="showInstructionModal = true"
          type="button"
          class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full hover:scale-110 transition duration-300 dark:bg-dk-inp-alt"
        >
          <i
            class="uil uil-question-circle text-blue text-4xl rounded-full dark:text-violet-l"
          ></i>
        </button>
      </div>
    </div>
    <div
      class="flex items-center justify-center flex-col max-w-screen-2xl mx-auto gap-16"
    >
      <div
        class="text-center font-black text-6xl text-lt-t-prim-alt dark:text-violet-l md:text-4xl xl:text-5xl"
      >
        <h1>CHOOSE LEVEL</h1>
      </div>
      <div
        class="flex flex-wrap justify-center w-[750px] md:w-full md:px-5 md:gap-0"
      >
        <button
          v-for="i in 5"
          :key="i"
          class="font-franklin dark:bg-dk-inp-alt dark:text-lt-cont-alt md:scale-75 md:m-0"
          :class="[
            { 'my-super-cool-btn-selected': selectedLevel === i },
            'my-super-cool-btn',
          ]"
          @click="selectLevel(i)"
        >
          <div class="dots-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          <span v-if="isLevelDone(i)">{{ i }}</span>
          <span v-else><i class="uil uil-padlock"></i></span>
        </button>
      </div>
      <div class="flex justify-center">
        <button
          class="bg-blue-v w-[476px] h-[70px] md:w-[300px] xl:w-[400px] 2xl:w-[456px] text-lt-inp font-franklin text-4xl rounded-[15px]"
          @click="nextClicked"
          :disabled="selectedLevel === null"
        >
          Next
        </button>
      </div>
    </div>
    <div v-if="showInstructionModal">
      <InstructionModal @closeModal="showInstructionModal = false" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["onLevelSelected", "onBackToDifficultyLevel", "player", "difficulty"],
  data() {
    return {
      isDark: false,
      showInstructionModal: false,
      doneLevels: [1, 2, 3, 4, 5], // an array of levels that are done
      selectedLevel: null, // keep track of the selected level
    };
  },
  created() {
    // Check if dark mode is saved in local storage
    const savedIsDarkMode = localStorage.getItem("isDarkMode");
    if (savedIsDarkMode !== null) {
      this.isDark = JSON.parse(savedIsDarkMode);
      document.body.classList.toggle("dark", this.isDark);
    }
    this.doneLevels = this.player.levelDonePerDifficulty[this.difficulty].map(
      (isDone, index) => (isDone ? index + 1 : 1)
    );
    // console.log("doneLevels", this.doneLevels);
  },
  methods: {
    isLevelDone(level) {
      return this.doneLevels.includes(level);
    },
    selectLevel(level) {
      if (this.isLevelDone(level)) {
        this.selectedLevel = level;
      }
    },
    nextClicked() {
      this.$emit("onLevelSelected", this.selectedLevel);
    },
    backToDifficultyLevel() {
      this.$emit("onBackToDifficultyLevel");
    },
    toggleDarkMode() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark", this.isDark);
      localStorage.setItem("isDarkMode", JSON.stringify(this.isDark));
    },
  },
};
</script>

<style >
.my-super-cool-btn {
  position: relative;
  text-decoration: none;
  color: #6174fb;
  letter-spacing: 1px;
  font-size: 2rem;
  background-color: #e6dcff;
  border-radius: 100%;
  box-sizing: border-box;
  margin: 20px;
  transition: all 0.85s cubic-bezier(0.25, 1, 0.33, 1);
}

.my-super-cool-btn:hover {
  transform: scale(0.8);
}
.my-super-cool-btn span {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  font-size: 5rem;
}
.my-super-cool-btn span:before {
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  border-radius: 100%;
  border: 7px solid #6174fb;
  box-sizing: border-box;
  transition: all 0.85s cubic-bezier(0.25, 1, 0.33, 1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.14),
    0 8px 10px -6 rgba(0, 0, 0, 0.14);
}
.my-super-cool-btn:hover span:before {
  /* transform:scale(0.8); */
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.14), 0 5px 15px rgba(0, 0, 0, 0.14);
}
.my-super-cool-btn .dots-container {
  opacity: 0;
  animation: intro 1.6s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn .dot {
  width: 8px;
  height: 8px;
  display: block;
  background-color: #6174fb;
  border-radius: 100%;
  position: absolute;
  transition: all 0.85s cubic-bezier(0.25, 1, 0.33, 1);
}
.my-super-cool-btn .dot:nth-child(1) {
  top: 50px;
  left: 50px;
  transform: rotate(-140deg);
  animation: swag1-out 0.3s;
  animation-fill-mode: forwards;
  opacity: 0;
}
.my-super-cool-btn .dot:nth-child(2) {
  top: 50px;
  right: 50px;
  transform: rotate(140deg);
  animation: swag2-out 0.3s;
  animation-fill-mode: forwards;
  opacity: 0;
}
.my-super-cool-btn .dot:nth-child(3) {
  bottom: 50px;
  left: 50px;
  transform: rotate(140deg);
  animation: swag3-out 0.3s;
  animation-fill-mode: forwards;
  opacity: 0;
}
.my-super-cool-btn .dot:nth-child(4) {
  bottom: 50px;
  right: 50px;
  transform: rotate(-140deg);
  animation: swag4-out 0.3s;
  animation-fill-mode: forwards;
  opacity: 0;
}
.my-super-cool-btn:hover .dot:nth-child(1) {
  animation: swag1 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn:hover .dot:nth-child(2) {
  animation: swag2 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn:hover .dot:nth-child(3) {
  animation: swag3 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn:hover .dot:nth-child(4) {
  animation: swag4 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn-selected {
  transform: scale(0.8);
}
.my-super-cool-btn-selected span:before {
  /* transform: scale(0.8); */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.14),
    0 8px 10px -6 rgba(0, 0, 0, 0.14);
}
.my-super-cool-btn-selected .dot:nth-child(1) {
  animation: swag1 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn-selected .dot:nth-child(2) {
  animation: swag2 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn-selected .dot:nth-child(3) {
  animation: swag3 0.3s;
  animation-fill-mode: forwards;
}
.my-super-cool-btn-selected .dot:nth-child(4) {
  animation: swag4 0.3s;
  animation-fill-mode: forwards;
}
@keyframes intro {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes swag1 {
  0% {
    top: 50px;
    left: 50px;
    width: 8px;
  }
  50% {
    width: 30px;
    opacity: 1;
  }
  100% {
    top: 20px;
    left: 20px;
    width: 8px;
    opacity: 1;
  }
}
@keyframes swag1-out {
  0% {
    top: 20px;
    left: 20px;
    width: 8px;
  }
  50% {
    width: 30px;
    opacity: 1;
  }
  100% {
    top: 50px;
    left: 50px;
    width: 8px;
    opacity: 0;
  }
}
@keyframes swag2 {
  0% {
    top: 50px;
    right: 50px;
    width: 8px;
  }
  50% {
    width: 30px;
    opacity: 1;
  }
  100% {
    top: 20px;
    right: 20px;
    width: 8px;
    opacity: 1;
  }
}
@keyframes swag2-out {
  0% {
    top: 20px;
    right: 20px;
    width: 8px;
  }
  50% {
    width: 30px;
    opacity: 1;
  }
  100% {
    top: 50px;
    right: 50px;
    width: 8px;
    opacity: 0;
  }
}
@keyframes swag3 {
  0% {
    bottom: 50px;
    left: 50px;
    width: 8px;
  }
  50% {
    width: 30px;
    opacity: 1;
  }
  100% {
    bottom: 20px;
    left: 20px;
    width: 8px;
    opacity: 1;
  }
}
@keyframes swag3-out {
  0% {
    bottom: 20px;
    left: 20px;
    width: 8px;
  }
  50% {
    width: 30px;
    opacity: 1;
  }
  100% {
    bottom: 50px;
    left: 50px;
    width: 8px;
    opacity: 0;
  }
}
@keyframes swag4 {
  0% {
    bottom: 50px;
    right: 50px;
    width: 8px;
  }
  50% {
    width: 30px;
    opacity: 1;
  }
  100% {
    bottom: 20px;
    right: 20px;
    width: 8px;
    opacity: 1;
  }
}
@keyframes swag4-out {
  0% {
    bottom: 20px;
    right: 20px;
    width: 8px;
  }
  50% {
    width: 30px;
    opacity: 1;
  }
  100% {
    bottom: 50px;
    right: 50px;
    width: 8px;
    opacity: 0;
  }
}
</style>

