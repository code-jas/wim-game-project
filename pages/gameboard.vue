<template>
   <div>
      <div v-if="showDifficultyLevel">
         <Difficulty @onDifficultySelected="onDifficultySelected" />
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
         showDifficultyLevel: false,
         showLevelNumber: false,
         showGameplay: true,
         showGameResult: true,
         players: JSON.parse(localStorage.getItem('players') || '[]')
      };
   },
   computed: {
    activeComponent() {
       return this.players.length === 0 ?'AddPlayer': 'Dashboard';
    }
  },
  methods: { 
      onDifficultySelected() {
         this.showDifficultyLevel = false
         this.showLevelNumber = true
      },
      onLevelSelected() {
         this.showLevelNumber = false
         this.showGameplay = true
      },
      onGameplayFinished() {
         this.showGameplay = false
         this.showGameResult = true
      }

  }
}
</script>

<style>

</style>