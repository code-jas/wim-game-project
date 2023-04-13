<template>
   <div class="py-20">
      <GameboardNavbar @showModal="showInstructionModal = true"/>
      <GamePlay />
      <div v-if="showInstructionModal">
         <InstructionModal @closeModal="showInstructionModal = false"/>
      </div>
   </div>
</template>

<script>
import GamePlay from './GamePlay.vue';
import InstructionModal from '../InstructionModal.vue';
export default {
   data(){
      return{
         showInstructionModal: false,
      }
   },
    components: { GamePlay }
}
</script>

<style>
 @import url(https://unicons.iconscout.com/release/v4.0.0/css/line.css);
</style>