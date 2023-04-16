<template>
   <div class="py-20">
      <GameboardNavbar @showModal="showInstructionModal = true"/>
      <GamePlay  :gamePlay="gamePlay"/>
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
   data(){
      return{
         showInstructionModal: false,
         gamePlay: null,
      }
   },
   components: { GamePlay },
   created() { 
      this.gamePlay = new GamePlayClass(this.player, 0, 0, this.currentDifficulty, this.currentLevel, null, null, 3, [], [], [], [] )
      this.gamePlay.showData()
   }
}
</script>

<style>
 @import url(https://unicons.iconscout.com/release/v4.0.0/css/line.css);
</style>