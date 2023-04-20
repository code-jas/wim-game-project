
<template>
  <div class="bg-violet-l-alt mx-auto dark:bg-dk-inp-b">
    <div v-if="showCountdown"  class="font-franklin bg-pageloader countdown">
      <span class="countdown-text" v-if="countdown === 3">{{ countdownText }}</span>
      <span class="countdown-text" v-if="countdown === 2">{{ countdownText }}</span>
      <span class="countdown-text" v-if="countdown === 1">{{ countdownText }}</span>
      <span class="countdown-text" v-if="countdown === 0">{{countdownText}}</span>
    </div>
    <div v-else>
      <div class="progress">
        <div class="progress--bar" :style="{ width: progress + '%' }"></div>
      </div>

      <div v-if="showGamePlay" class="py-20">
        <GameboardNavbar @showModal="showInstructionModal = true" :level="curLevel" :score="scoreNavbar" :timeLeft="timeLeft" />
        <GamePlay :gamePlay="gamePlay" :selectedChoice="selectedChoice" :question="question" :checkAnswer="checkAnswer" @selectChoice="selectChoice" />
        <div v-if="showInstructionModal">
          <InstructionModal @closeModal="showInstructionModal = false" />
        </div>
      </div>
      <div v-if="showGameResult" class="py-20">
        <GameResult
          :player="checkAnswer.player"
          :difficulty="currentDifficulty"
          :score="checkAnswer.scorePerDifficulty"
          :correctAnswers="checkAnswer.correctAnswers"
          :aveTime="checkAnswer.timePerQuestion"
        />
        </div>
    </div>
  </div>
</template>

<script>
  import GamePlay from './GamePlay.vue';
  import InstructionModal from '../InstructionModal.vue';
  import GamePlayClass from '~/assets/js/class/Gameplay.js';
  import GameResult from './GameResult.vue';

  export default {
    props: {
      player: Object,
      currentDifficulty: String,
      currentLevel: Number,
    },
    components: { GamePlay, GameResult },
    data() {
      return {
        isDark: false,
        showInstructionModal: false,
        gamePlay: null,
        selectedChoice: null,
        question: {
          picture: 'img link',
          hint: 'Person holding a pencil',
          choices: ['Eraser', 'Banana', 'Shoe'],
        },
        timeLeft: 0,
        scoreNavbar: [],
        checkAnswer: {},
        timerInterval: null,
        curLevel: 0,
        showGamePlay: true,
        showGameResult: false,
        countdown : 0,
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
      window.addEventListener('resize', this.updateProgress);
    },
    beforeDestroy() {
      // Remove event listener to prevent memory leaks
      window.removeEventListener('resize', this.updateProgress);
    },
    computed: {
      countdownText() {
        return this.countdown > 0 ? `${this.countdown}` : 'Go!';
      },
      progress() {
        const level =this.curLevel
        const totalLevel = this.gamePlay.player.questionnaire[this.currentDifficulty].length
        console.log('level: ',level)
        console.log('totalLevel: ',totalLevel)
        console.log('Progress bar: ',Math.floor(((level) / totalLevel) * 100))
        return Math.floor(((level) / totalLevel) * 100);
      },
    },
    methods: {
      updateQuestion() {
        const { picture, hint, choices, answer } = this.gamePlay.showTheCurrentQuestion();
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
        let progress = this.progress
        // progressBar.style.width = `${progress}%`;
      },
      finished() {
        const progressBar = document.querySelector(".progress--bar");
        progressBar.style.width = `100%`;
      },
      selectChoice(index) {
        this.selectedChoice = index;
        this.checkAnswer = this.gamePlay.checkAnswer(index);
        const { player, correctAnswers,scorePerDifficulty, timePerQuestion, currentScore, isCorrect, currentLevel } = this.checkAnswer;
        if(isCorrect) { 
          if (this.gamePlay.hasNextQuestion()) {
            clearInterval(this.timerInterval);
            setTimeout(() => {
            this.scoreNavbar = scorePerDifficulty;
              this.curLevel++;
              this.updateQuestion();
            }, 2000); // 2 seconds delay
          } else {
            //game over || result
            console.log('end')
            this.gamePlay.endGame();
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
    }
  }

</script>

<style>
.bg-pageloader {     
      background-image: url('@/assets/img/countdown/countdown_bg.png');
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
  color: #FFF;
}

.countdown-text{ 
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
  background-color: #8353FC; 
  height: 100%;
  transition: all ease 0.5s;
  width: 0%;
}
</style>