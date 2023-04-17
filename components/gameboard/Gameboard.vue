<template>
   <div class="py-20">
      <GameboardNavbar @showModal="showInstructionModal = true"/>
      <GamePlay  :gamePlay="gamePlay" :selectedChoice="selectedChoice" :question="question" :timeLeft="timeLeft" @selectChoice="selectChoice" />
      <div v-if="showInstructionModal">
         <InstructionModal @closeModal="showInstructionModal = false"/>
      </div>
   </div>
</template>

<script>
import GamePlay from './GamePlay.vue';
import InstructionModal from '../InstructionModal.vue';
import GamePlayClass from '~/assets/js/class/Gameplay.js'

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
    };
  },
  components: { GamePlay },
  created() { 
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
    this.gamePlay.showData();
    this.updateQuestion();
  },
  methods: {
    updateQuestion() {
      const { picture, hint, choices, answer } = this.gamePlay.showTheCurrentQuestion();
      this.question.picture = picture;
      this.question.hint = hint;
      this.question.choices = choices;
      this.selectedChoice = null;
      this.gamePlay.startTheCurrentQuestion();
      setInterval(() => {
        this.setTimeLeft(this.gamePlay.timeLeft);
      }, 1000);
    },
    setTimeLeft(timeLeft) {
      this.timeLeft = timeLeft;
    },
    selectChoice(index) {
      this.selectedChoice = index;
      this.gamePlay.checkAnswer(index);
    },
  },
};
</script>

<style>
 @import url(https://unicons.iconscout.com/release/v4.0.0/css/line.css);
</style>
