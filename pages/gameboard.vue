<template>
   <div>
      <difficulty/>
   </div>
</template>

<script>
import Difficulty from '~/components/gameboard/Difficulty.vue'

export default {
   name: 'gameboard',
   components: {
      Difficulty
   },
   data() {
      return { 
         players: JSON.parse(localStorage.getItem('players') || '[]')
      };
   },
   computed: {
    activeComponent() {
       return this.players.length === 0 ?'AddPlayer': 'Dashboard';
    }
  },
}
</script>

<style>

</style>