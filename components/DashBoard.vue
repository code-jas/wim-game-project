<template>
   <div class="bg-lt-dash w-screen h-screen">

      <div class="py-20 max-w-screen-2xl mx-auto flex flex-col  items-center bg-lt-dash" >
         <dashboard-navbar @add-player="showModal = true" />
         
         <div class="flex justify-between p-3 gap-x w-full px-32">
            <highscore-list :players="players" />
            <div class="w-[476px]">
               <player-details class="mb-32" :players="players" />
               <dropdown :players="players" :start-game="startGame"/>
            </div>
         </div>
      </div>
      <add-player-modal v-if="showModal" @close-modal=" showModal = false" :add-player="addPlayer" />
   </div>
</template>

<script> 
import DashboardNavbar from './DashboardNavbar.vue'
import Dropdown from './Dropdown.vue'
import HighscoreList from './HighscoreList.vue'
import AddPlayerModal from './AddPlayerModal.vue'
import { nanoid } from 'nanoid' 

export default {
  
  components: { DashboardNavbar, HighscoreList, Dropdown, AddPlayerModal },
  data() {
    return {
      showModal: false,
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
  //  console.log(this.players)
  },
  methods: {
    
    addPlayer() {
      const playerName = document.querySelector('input[type="text"]').value;
      if (playerName.trim() !== '') {
        const player = {
            id: nanoid(),
            playerName: playerName,
            highScore: 0,
            totalScore: 0,
            totalGameTime: 0,
            totalGamesPlayed: 0,
            accuracy: 0,
            selected: false,
        };
        this.players.push(player);
        this.savePlayersToStorage();
        this.showModal = false
      }
    },    
    startGame() {
      this.$router.push('/gameboard')

    },
    savePlayersToStorage() {
        localStorage.setItem('players', JSON.stringify(this.players));
    }
  }

}
</script>

<style>

</style>