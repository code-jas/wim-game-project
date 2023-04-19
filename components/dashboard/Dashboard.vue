<template>
  <div class="bg-lt-dash w-screen h-screen min-h-full  dark:bg-dk-inp-b">
     <div class="py-20 max-w-[1535px] mx-auto flex flex-col  items-center bg-lt-dash dark:bg-dk-inp-b sm:max-w-[635px] md:max-w-[767px] lg:max-w-[1023px] xl:max-w-[1279px]" >
        <dashboard-navbar @add-player="showModal = true" @showModal="showInstructionModal = true"/>
        
        <div class="flex justify-between p-3 gap-x-20 w-full px-40 sm:px-20 md:px-32 md:flex-col md:gap-y-3 lg:px-24 lg:gap-x-3 xl:gap-x-12 2xl:gap-x-16">
           <highscore-list :players="players" />
           <div class="w-[476px] lg:w-[200px] md:w-full xl:w-[400px]">
              <player-details class="mb-32" :players="players" />
              <player-dropdown  :players="players" :start-game="startGame"/>
           </div>
        </div>
     </div>
     <add-player-modal v-if="showModal" @close-modal=" showModal = false" :add-player="addPlayer" />
     <instruction-modal v-if="showInstructionModal" @closeModal="showInstructionModal = false"/>
  </div>
</template>
<script> 
import DashboardNavbar from './DashboardNavbar.vue'
import PlayerDropdown from './PlayerDropdown.vue'
import HighscoreList from './HighscoreList.vue'
import AddPlayerModal from './AddPlayerModal.vue'
import PlayerDetails from './PlayerDetails.vue'
import { nanoid } from 'nanoid' 
import InstructionModal from '../InstructionModal.vue'
export default {
 
 components: { DashboardNavbar, HighscoreList, PlayerDropdown, AddPlayerModal, PlayerDetails, InstructionModal },
 data() {
   return {
     isDark: false,
     showModal: false,
     showInstructionModal: false,
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
           totalScore: {easy: 0,medium: 0, hard: 0},
           totalGameTime: 0,
           totalGamesPlayed: 0,
           accuracy: {easy: 0,medium: 0, hard: 0},
           selected: false,
           started: false,
           levelDonePerDifficulty: {easy: [],medium: [], hard: []},
       };
       this.players.push(player);
       this.savePlayersToStorage();
       this.showModal = false
     }
   },    
   startGame() {
     const selectedPlayer = this.players.filter(player => player.selected === true);
     // console.log("Dashboard: SelectedPlayerId: ", selectedPlayer[0].id);
     this.$router.push({
       name: 'gameboard',
       params: {
         playerId: selectedPlayer[0].id
       }
     });
   },
   savePlayersToStorage() {
       localStorage.setItem('players', JSON.stringify(this.players));
   },
   toggleDarkMode() {
            this.isDark = !this.isDark
            document.body.classList.toggle('dark', this.isDark)
    },
 }
}
</script>
<style>
</style>