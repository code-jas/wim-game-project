<template>
  <div class="mx-auto" ref="container" :class="containerClasses">
    <!-- <CorrectPopup :message="popupMessage" :show="showPopup" /> -->
    <div
      class="text-center font-bold text-4xl text-[#605F81] mb-16 md:text-2xl lg:text-3xl dark:text-violet-l"
    >
      <h1>Select the word that matches the image</h1>
    </div>
    <div class="flex justify-center mb-9">
      <div
        class="flex justify-center items-center h-[310px] w-[530px] sm:w-[440px] md:h-[250px] md:w-[470px] lg:h-[280px] lg:w-[500px] border-4 border-blue-v-alt rounded-[15px] transition duration-500 dark:border-[#e6dcff]"
      >
        <img
          :src="require(`~/assets/img/quiz-picture/${question.picture}`)"
          alt="Question image"
          class="object-cover w-full h-full rounded-[12px] overflow-hidden transition duration-500"
        />
      </div>
    </div>
    <div
      class="text-center font-bold text-4xl text-[#605F81] mb-16 md:text-2xl lg:text-3xl dark:text-violet-l"
    >
      <!-- <h1>{{ question.hint }}</h1> -->
    </div>
    <div
      class="flex justify-center items-center font-bold text-4xl md:flex-col lg:text-3xl"
    >
      <button
        v-for="(choice, index) in question.choices"
        :key="index"
        :class="[
          'w-[280px] h-[80px] lg:w-[250px] lg:h-[70px] rounded-[15px] m-[12px] hover:border-none hover:bg-blue-v-alt hover:text-violet-l-alt active:transform active:translate-y-1 transition duration-300',
          {
            'border border-blue-v text-blue-v-alt dark:border-violet-l dark:text-violet-l':
              selectedChoice !== index,
            'border-none bg-blue-v-alt text-violet-l-alt':
              selectedChoice === index && checkAnswer.isCorrect === null,
            'bg-green text-white hover:bg-green-alt button ':
              checkAnswer.isCorrect === true && selectedChoice === index,
            'bg-red text-white hover:bg-red-alt shaky ':
              checkAnswer.isCorrect === false && selectedChoice === index,
          },
        ]"
        @click="$emit('selectChoice', index)"
      >
        <h1>{{ choice }}</h1>
      </button>
    </div>
  </div>
</template>

<script>
import CorrectPopup from "./CorrectPopup.vue";

export default {
  components: {
    CorrectPopup,
  },
  props: {
    gamePlay: Object,
    selectedChoice: Number,
    question: Object,
    checkAnswer: Object,
  },
  data() {
    return {
      isDark: false,
      showPopup: false,
      popupMessage: "",
      isEntering: false,
      isLeaving: false,
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
    isCorrect() {
      return this.checkAnswer.isCorrect === true;
    },
    containerClasses() {
      const classes = ["container"];
      // console.log("isEntering: ", this.isEntering);
      if (this.isEntering) {
        classes.push("entering");
        // console.log("entering");
      } else if (this.isLeaving) {
        classes.push("leaving");
        // console.log("leaving");
      }
      // console.log("classes: ", classes);
      return classes;
    },
  },
  watch: {
    checkAnswer: {
      handler(newValue) {
        if (newValue.isCorrect) {
          this.showPopup = true;
          this.popupMessage = "Correct!";
          this.$refs.container.classList.add("slide-in");

          setTimeout(() => {
            this.leave();
          }, 1000);
          // setTimeout(() => {
          // }, 2000);
          setTimeout(() => {
            // this.$emit("nextQuestion");
            this.enter();
          }, 1400);
        } else if (newValue.isCorrect === false) {
          this.showPopup = true;
          this.popupMessage = "Incorrect! Try again.";
        }
      },
      deep: true,
    },
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark", this.isDark);
      localStorage.setItem("isDarkMode", JSON.stringify(this.isDark));
    },

    enter() {
      this.isEntering = true;
      this.isLeaving = false;
      setTimeout(() => {
        this.isEntering = false;
      }, 1000);
    },
    leave() {
      this.isEntering = false;
      this.isLeaving = true;
      setTimeout(() => {
        this.isLeaving = false;
      }, 1000);
    },
  },
  //! show popup message if the answer is correct
  // watch: {
  //   checkAnswer(newValue) {
  //     if (newValue.isCorrect === true) {
  //       this.showPopup = true;
  //       this.popupMessage = newValue.isCorrect && 'Correct!'
  //       setTimeout(() => {
  //         this.showPopup = false;
  //         this.popupMessage = '';
  //       }, 2000);
  //     }
  //   }
  // }
};
</script>
  
<style scoped>
.container {
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

.entering {
  animation-name: slideInFromRight;
}

.leaving {
  animation-name: slideOutToLeft;
}
@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutToLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
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

.button::before {
  content: "";
  border-radius: 15px;
  min-width: calc(280px + 20px);
  min-height: calc(80px + 20px);
  border: 4px solid #72d896;
  box-shadow: 0 0 60px #72d896ab;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease-in-out 0s;
}

.button {
  transition: all 0.2s ease-in-out 0s;
  transform: scale(0.95) translateY(0px);
}
/* .button:active{ 

} */

.button::before {
  opacity: 1;
}

.button::after {
  content: "";
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 6px solid #00ffcb;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring 1.5s infinite;
}

.button::after {
  animation: none;
  display: none;
}

@keyframes ring {
  0% {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

.shaky {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97);
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
  