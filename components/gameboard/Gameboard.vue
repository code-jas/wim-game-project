<template>
  <div>
    <div v-if="showGamePlay" class="py-20">
       <GameboardNavbar @showModal="showInstructionModal = true" :level="curLevel" :score="scoreNavbar" :timeLeft="timeLeft" />
       <GamePlay  :gamePlay="gamePlay" :selectedChoice="selectedChoice" :question="question" :checkAnswer="checkAnswer"  @selectChoice="selectChoice"/>
       <div v-if="showInstructionModal">
          <InstructionModal @closeModal="showInstructionModal = false"/>
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
</template>

<script>
import GamePlay from './GamePlay.vue';
import InstructionModal from '../InstructionModal.vue';
import GamePlayClass from '~/assets/js/class/Gameplay.js'
import GameResult from './GameResult.vue';

export default {
  props: {
    player: Object,
    currentDifficulty: String,
    currentLevel: Number,
  },
  data() {
    return {
      showInstructionModal: false,
      gamePlay: null,
      selectedChoice: null,
      question: {
        picture: 'img link',
        hint: 'Person holding a pencil',
        choices: ['Eraser', 'Banana', 'Shoe'],
      },
      timeLeft: 0,
      scoreNavbar: 0,
      checkAnswer: {},
      timerInterval: null,
      curLevel: 0, // add reactive data property for currentLevel
      showGamePlay: true,
      showGameResult: false,
    };
  },
  components: { GamePlay,GameResult },
  created() { 
   this.curLevel = this.currentLevel;
  //  console.log('this.currentleve fl: ', this.curLevel)
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
   //  this.gamePlay.showData();
    this.updateQuestion();
      console.log('checkAnswer', this.checkAnswer)
  },
  watcher: { 
      currentLevel() {
        //  console.log('s')
         // this.gamePlay.currentLevel = this.currentLevel;
         // this.updateQuestion();
      }
  },
  methods: {
    updateQuestion() {
      const { picture, hint, choices, answer } = this.gamePlay.showTheCurrentQuestion();
      this.question.picture = picture;
      this.question.hint = hint;
      this.question.choices = choices;
      this.selectedChoice = null;
      this.gamePlay.startTheCurrentQuestion();
      this.timerInterval = setInterval(() => {
        this.setTimeLeft(this.gamePlay.timeLeft);
      }, 1000);
    },
    setTimeLeft(timeLeft) {
      this.timeLeft = timeLeft;
    },

    selectChoice(index) {
      this.selectedChoice = index;
      this.checkAnswer = this.gamePlay.checkAnswer(index);
      const { player, correctAnswers,scorePerDifficulty, timePerQuestion, currentScore, isCorrect, currentLevel } = this.checkAnswer;
      console.log('this.currentlevel: ', this.curLevel)
      if(isCorrect) { 
         this.scoreNavbar = currentScore;
         if (this.gamePlay.hasNextQuestion()) {

            clearInterval(this.timerInterval);
            setTimeout(() => {
            this.curLevel++;

             this.updateQuestion();
            }, 2000); // 2 seconds delay
         } else {
            //game over || result
            console.log('end')
            this.showGamePlay = false;
            this.showGameResult = true;
         }
      }
    },
  },
};
</script>

<style>
 @import url(https://unicons.iconscout.com/release/v4.0.0/css/line.css);
</style>
