<template>
   <div>

      <div v-if="showDifficultyLevel">
         <Difficulty @onDifficultySelected="onDifficultySelected" :wimQuest="wim_quest" />
      </div>
      <div v-if="showLevelNumber">
         <LevelNumber @onLevelSelected="onLevelSelected"/>
      </div>
      <div v-if="showGameplay">
         <Gameboard/>
      </div>
      <div v-if="showGameResult">
         <GameResult/>
      </div>
   </div>
</template>

<script>
import Difficulty from '~/components/gameboard/Difficulty.vue'
import LevelNumber from '~/components/gameboard/LevelNumber.vue'
import Gameboard from '~/components/gameboard/Gameboard.vue'
import GameResult from '~/components/gameboard/GameResult.vue'

import wim_quest from '~/assets/data/picture_word_questions.json'

import Player from '~/assets/js/class/Player.js';

export default {
   name: 'gameboard',
   components: {
      Difficulty,
      LevelNumber,
      Gameboard,
      GameResult,
   },
   data() {
      return { 
         // Local Storage Data
         players: JSON.parse(localStorage.getItem('players') || '[]'),

         // Questionnaire Data
         wim_quest: wim_quest,
         questions: null,

         // Components
         showDifficultyLevel: true,
         showLevelNumber: false,
         showGameplay: false,
         showGameResult: false,

         // Class
         player: null,
         

      };
   },
   created() {
        //! Test Console
        console.log('gameboard page - original questionnaire : ',this.wim_quest.questionnaire)
      // Get player from local storage
      const playerId = this.$route.params.playerId;
      if (!playerId) {
         this.$router.push('/main');
         return;
      }
      const players = JSON.parse(localStorage.getItem('players') || '[]');
      const selectedPlayer = players.find(p => p.id === playerId);
      // console.log("gameboard page - selectedPlayer : ",selectedPlayer);

      // Destructure selectedPlayer
      const {id, playerName, highScore, totalScore, totalGameTime, totalGamesPlayed, accuracy, selected, started, questionnaire} = selectedPlayer;
       // Pass selectedPlayer to Player constructor
      this.player = new Player(id, playerName, highScore, totalScore, totalGameTime, totalGamesPlayed, accuracy, selected, started, questionnaire);
     

     
      // Shuffle questions if player has not started
      if (!this.player.started) {
         
         this.shuffleQuestions(); 
         // //! Test Console
         // console.log('gameboard page - shuffled questionnaire : ',this.wim_quest.questionnaire)
         
         // Mark the player as started
         this.player.started = true;
         this.savePlayerToLocalStorage()
      }else {
         // If player has started, use the saved questions
         this.questions = this.player.questionnaire;
      }
   },
   computed: {
    activeComponent() {
       return this.players.length === 0 ?'AddPlayer': 'Dashboard';
    }
   },
   methods: { 
   // COMPONENTS PROGRESS
      // Difficulty Level
      onDifficultySelected(selectDifficulty) {
         console.log('gameboard page - selectDifficulty : ',selectDifficulty)
         this.showDifficultyLevel = false
         this.showLevelNumber = true
      },
      // Level Number
      onLevelSelected() {
         this.showLevelNumber = false
         this.showGameplay = true
      },
      // Game Result
      onGameplayFinished() {
         this.showGameplay = false
         this.showGameResult = true
      },
      // Shuffle questions
      shuffleQuestions() {
         // new object with shuffled questions
         const shuffledQuestions = {};
         for (let difficulty in this.wim_quest.questionnaire) {
            //console.log("difficulty",difficulty)
            //console.log("this.wim_quest.questionnaire[difficulty]",this.wim_quest.questionnaire[difficulty])
            shuffledQuestions[difficulty] = this.wim_quest.questionnaire[difficulty].sort(() => Math.random() - 0.5);
         }
         // Assign the shuffled questions to the data property 'questions'
         this.questions = shuffledQuestions;
      },
      // Save player to local storage
      savePlayerToLocalStorage() {
         const index = this.players.findIndex(p => p.id === this.player.id);
         if (index >= 0) {
            this.players.splice(index, 1, this.player);
         } else {
            this.players.push(this.player);
         }
         localStorage.setItem('players', JSON.stringify(this.players));
      },

   }
}
</script>

<style>

</style>