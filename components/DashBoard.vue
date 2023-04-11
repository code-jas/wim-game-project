<template>
   <div class="bg-lt-dash w-screen h-screen">

      <div class="py-20 max-w-screen-2xl mx-auto flex flex-col  items-center bg-lt-dash" >
         <dashboard-navbar />
         
         <div class="flex justify-between p-3 gap-x w-full px-32">
            <highscore-list :players="players" />
            <div class="w-[476px]">
               <player-details class="mb-32"/>
               <dropdown/>
            </div>
         </div>
      </div>
   </div>
</template>

<script> 
import DashboardNavbar from './DashboardNavbar.vue'
import Dropdown from './Dropdown.vue'
import HighscoreList from './HighscoreList.vue'
import { nanoid } from 'nanoid'
export default {
  components: { DashboardNavbar, HighscoreList, Dropdown },
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
  mounted() {
   console.log(this.players)
  },

}
</script>

<style>

</style>