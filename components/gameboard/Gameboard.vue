<!-- 

 <template>
   <div>
     <h2>Player List</h2>
     <ul>
       <li v-for="player in players" :key="player.id">
         {{ player.playerName }} -
         High Score: {{ player.highScore }} -
         Total Score: {{ player.totalScore }} -
         Total Game Time: {{ player.totalGameTime }} -
         Total Games Played: {{ player.totalGamesPlayed }} -
         Accuracy: {{ player.accuracy }} -
         <button @click="deletePlayer(player.id)">Delete</button>
         <button @click="editPlayerName(player.id)">Edit Name</button>
       </li>
     </ul>
     <h2>Add Player</h2>
     <form @submit.prevent="addPlayer">
       <label>
         Player Name:
         <input type="text" v-model="newPlayerName">
       </label>

       <button type="submit">Add Player</button>
     </form>
   </div>
 </template>

<script>
// import axios from 'axios';
import { nanoid } from 'nanoid'

export default {
  data() {
    return {
      players: JSON.parse(localStorage.getItem('players') || '[]')
    };
  },
  created() {
    window.addEventListener('storage', this.updatePlayersFromStorage);
  },
  destroyed() {
    window.removeEventListener('storage', this.updatePlayersFromStorage);
  },
  methods: {
    addPlayer() {
      const playerName = prompt('Enter player name');
      if (playerName !== null) {
        const player = {
          id: nanoid(),
          playerName,
          highScore: 0,
          totalScore: 0,
          totalGameTime: 0,
          totalGamesPlayed: 0,
          accuracy: 0
        };
        this.players.push(player);
        this.savePlayersToStorage();
      }
    },
    deletePlayer(id) {
      const index = this.players.findIndex(player => player.id === id);
      if (index !== -1) {
        this.players.splice(index, 1);
        this.savePlayersToStorage();
      }
    },
    editPlayerName(id) {
      const index = this.players.findIndex(player => player.id === id);
      if (index !== -1) {
        const newName = prompt('Enter new name', this.players[index].playerName);
        if (newName !== null) {
          this.players[index].playerName = newName;
          this.savePlayersToStorage();
        }
      }
    },
    savePlayersToStorage() {
      localStorage.setItem('players', JSON.stringify(this.players));
    },
    updatePlayersFromStorage(event) {
      if (event.key === 'players') {
        this.players = JSON.parse(event.newValue || '[]');
      }
    }
  }
};
</script> -->


<template>
  <div>
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
      };
    },
    created() {
      this.curLevel = this.currentLevel;
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
          this.scoreNavbar = scorePerDifficulty;
          if (this.gamePlay.hasNextQuestion()) {
            clearInterval(this.timerInterval);
            setTimeout(() => {
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
      }
    }
  }

</script>

<style>
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