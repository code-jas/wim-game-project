
<template>
  <div
    class="relative bg-violet-l-alt flex flex-col justify-center items-center min-h-screen overflow-hidden"
  >
    <!-- Curtain to change the  question  -->
    <!-- <div
      class="bg-pageloader flex items-center justify-center w-full min-h-screen bg-blue-v font-franklin text-violet-l-alt text-9xl scroll-container z-30"
      ref="container"
    >
      <p class="text-9xl">Image/Word <br />Match Game</p>
    </div> -->

    <div v-if="showCountdown" class="font-franklin bg-countdown countdown z-20">
      <span class="countdown-text" v-if="countdown === 3">{{
        countdownText
      }}</span>
      <span class="countdown-text" v-if="countdown === 2">{{
        countdownText
      }}</span>
      <span class="countdown-text" v-if="countdown === 1">{{
        countdownText
      }}</span>
      <span class="countdown-text" v-if="countdown === 0">{{
        countdownText
      }}</span>
    </div>
    <div v-else class="w-full">
      <div class="progress">
        <div class="progress--bar" :style="{ width: progress + '%' }"></div>
      </div>

      <div v-if="showGamePlay">
        <GameboardNavbar
          @showModal="showInstructionModal = true"
          :level="curLevel"
          :score="scoreNavbar"
          :timeLeft="timeLeft"
        />
        <GamePlay
          :gamePlay="gamePlay"
          :selectedChoice="selectedChoice"
          :question="question"
          :checkAnswer="checkAnswer"
          ref="gamePlay"
          @selectChoice="selectChoice"
        />
        <div v-if="showInstructionModal">
          <InstructionModal @closeModal="showInstructionModal = false" />
        </div>
      </div>
      <div v-if="showGameResult" class="w-full">
        <GameResult
          :player="checkAnswer.player"
          :difficulty="currentDifficulty"
          :score="checkAnswer.scorePerDifficulty"
          :correctAnswers="checkAnswer.correctAnswers"
          :aveTime="checkAnswer.timePerQuestion"
          ref="gameResult"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GamePlay from "./GamePlay.vue";
import InstructionModal from "../InstructionModal.vue";
import GamePlayClass from "~/assets/js/class/GamePlay.js";
import GameResult from "./GameResult.vue";

export default {
  props: {
    player: Object,
    currentDifficulty: String,
    currentLevel: Number,
  },
  components: { GamePlay, GameResult },
  data() {
    return {
      showInstructionModal: false,
      gamePlay: null,
      selectedChoice: null,
      question: {
        picture: "img link",
        hint: "Person holding a pencil",
        choices: ["Eraser", "Banana", "Shoe"],
      },
      timeLeft: 0,
      scoreNavbar: [],
      checkAnswer: {},
      timerInterval: null,
      curLevel: 0,
      showGamePlay: true,
      showGameResult: false,
      countdown: 0,
      showCountdown: true,
    };
  },
  created() {
    this.curLevel = this.currentLevel;
    this.showGamePlay = false; // Hide the game board initially
    this.showGameResult = false;
    this.showCountdown = true; // Show the countdown initially
    this.countdown = 3; // Set the initial countdown value

    // Start the countdown timer
    let timer = setInterval(() => {
      if (this.countdown === 0) {
        clearInterval(timer);
        this.showCountdown = false; // Hide the countdown
        this.showGamePlay = true; // Show the game board
        this.gamePlay = new GamePlayClass(
          this.player,
          0,
          0,
          this.currentDifficulty,
          this.currentLevel,
          null,
          null,
          3,
          [],
          [],
          [],
          []
        );
        this.updateQuestion();
      } else {
        this.countdown--;
      }
    }, 1000);
  },
  mounted() {
    // Add event listener to adjust progress bar width when window is resized
    window.addEventListener("resize", this.updateProgress);
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // Remove event listener to prevent memory leaks
    window.removeEventListener("resize", this.updateProgress);
  },
  computed: {
    countdownText() {
      return this.countdown > 0 ? `${this.countdown}` : "Go!";
    },
    progress() {
      const level = this.curLevel;
      const totalLevel =
        this.gamePlay.player.questionnaire[this.currentDifficulty].length;
      // console.log("level: ", level);
      // console.log("totalLevel: ", totalLevel);
      // console.log("Progress bar: ", Math.floor((level / totalLevel) * 100));
      return Math.floor((level / totalLevel) * 100);
    },
  },
  watch: {
    isCorrect(newValue) {
      // console.log("watch: isCorrect: ", newValue);
      if (newValue) {
        this.scrollPage();
      }
    },
  },
  methods: {
    updateQuestion() {
      const { picture, hint, choices, answer } =
        this.gamePlay.showTheCurrentQuestion();
      this.question.picture = picture;
      this.question.hint = hint;
      this.question.choices = choices;
      this.selectedChoice = null;
      this.gamePlay.startTheCurrentQuestion();
      this.showProgress(); // update the progress bar

      this.timerInterval = setInterval(() => {
        this.setTimeLeft(this.gamePlay.timeLeft);
      }, 1000);
    },
    setTimeLeft(timeLeft) {
      this.timeLeft = timeLeft;
    },
    showProgress() {
      const progressBar = document.querySelector(".progress--bar");
      let progress = this.progress;
      // progressBar.style.width = `${progress}%`;
    },
    finished() {
      const progressBar = document.querySelector(".progress--bar");
      progressBar.style.width = `100%`;
    },
    selectChoice(index) {
      this.selectedChoice = index;
      this.checkAnswer = this.gamePlay.checkAnswer(index);
      const {
        player,
        correctAnswers,
        scorePerDifficulty,
        timePerQuestion,
        currentScore,
        isCorrect,
        currentLevel,
      } = this.checkAnswer;
      if (isCorrect) {
        if (this.gamePlay.hasNextQuestion()) {
          clearInterval(this.timerInterval);
          setTimeout(() => {
            this.scoreNavbar = scorePerDifficulty;
            this.curLevel++;
            this.updateQuestion();

            isCorrect = false;
          }, 1400); // 2 seconds delay
        } else {
          //game over || result
          console.log("end");
          `
          this.gamePlay.endGame();`;
          this.showGamePlay = false;
          this.showGameResult = true;
          this.finished(); // update the progress bar to 100% when the game is over
        }
      }
    },
    toggleDarkMode() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark", this.isDark);
      localStorage.setItem("isDarkMode", JSON.stringify(this.isDark));
    },
    handleScroll() {
      const gamePlayEl = this.$refs.gamePlay;
      const gameResultEl = this.$refs.gameResult;

      // check if the game play element is in the viewport
      if (this.isElementInViewport(gamePlayEl)) {
        gamePlayEl.classList.add("animate__slideInLeft");
      } else {
        gamePlayEl.classList.remove("animate__slideInLeft");
      }

      // check if the game result element is in the viewport
      if (this.isElementInViewport(gameResultEl)) {
        gameResultEl.classList.add("animate__slideInRight");
      } else {
        gameResultEl.classList.remove("animate__slideInRight");
      }
    },

    // helper method to check if an element is in the viewport
    isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    },
  },
};
</script>

<style>
.animate__slideInLeft {
  animation-name: slideInLeft;
  animation-duration: 1s;
}

.animate__slideInRight {
  animation-name: slideInRight;
  animation-duration: 1s;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
.scroll-container {
  height: 100vh; /* set the height of the container to the viewport height */
  overflow: hidden; /* hide any overflow content */
  position: absolute; /* position the container relative to the page */
  top: -100vh; /* offset the container by the viewport height */
}

.scroll-container.animate {
  animation: scroll 2s forwards; /* use a CSS animation to scroll the container */
}

@keyframes scroll {
  0% {
    transform: translateY(0); /* start with no vertical offset */
  }
  50% {
    transform: translateY(100vh); /* scroll down by half the container height */
  }
  100% {
    transform: translateY(0); /* scroll down by the container height */
  }
}

.bg-pageloader {
  background-image: url("@/assets/img/pageloader/pl-desktop.png");
  background-size: cover;
}
.bg-countdown {
  background-image: url("@/assets/img/countdown/countdown_bg.png");
  background-size: cover;
}
.countdown {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.countdown-text {
  font-size: 200px;
  opacity: 0;
  animation-name: countdown;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

@keyframes countdown {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  20% {
    opacity: 1;
    transform: scale(1.5);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}
.progress {
  height: 8px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
}

.progress--bar {
  background-color: #8353fc;
  height: 100%;
  transition: all ease 0.5s;
  width: 0%;
}
</style>