<template>
   <div>

      <div v-if="showDifficultyLevel">
         <Difficulty @onDifficultySelected="onDifficultySelected" :wimQuest="wim_quest" />
      </div>
      <div v-if="showLevelNumber">
         <LevelNumber @onLevelSelected="onLevelSelected" @onBackToDifficultyLevel="onBackToDifficultyLevel"/>
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

         // Store Data
         selectedDifficulty: null,
         selectedLevel: null,
         

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
         this.player.setQuestions(this.questions)
         // Mark the player as started
         this.player.started = true;
         this.savePlayerToLocalStorage()
      }else {
         // If player has started, use the saved questions
         this.questions = this.player.questionnaire;
      }
      console.log('Questions for player:', this.questions);

   },
   mounted() {
   },
   computed: {
    activeComponent() {
       return this.players.length === 0 ? 'AddPlayer' : 'Dashboard';
    }
   },
   methods: { 
   // COMPONENTS PROGRESS
      // Difficulty Level
      onDifficultySelected(difficulty) {
         this.selectedDifficulty = difficulty
         this.showDifficultyLevel = false
         this.showLevelNumber = true
      },
      // Level Number
      onLevelSelected(level) {
         this.selectedLevel = level;
         this.showLevelNumber = false
         this.showGameplay = true
         console.log('selected difficulty : ',this.selectedDifficulty)
         console.log('selected level : ',this.selectedLevel)
      },
      // Back to Difficulty Level
      onBackToDifficultyLevel() {
         this.showDifficultyLevel = true
         this.showLevelNumber = false
      },
      // Game Result
      onGameplayFinished() {
         this.showGameplay = false
         this.showGameResult = true
      },
      
      
      // Shuffle questions
      shuffleQuestions() {
         const shuffledQuestions = {};
         for (let difficulty in this.wim_quest.questionnaire) {
            const questions = this.wim_quest.questionnaire[difficulty];
            const shuffled = questions.sort(() => Math.random() - 0.5);
            shuffledQuestions[difficulty] = shuffled.slice(0, 5);
         }
         this.questions = shuffledQuestions;
         console.log("question:" , shuffledQuestions)
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