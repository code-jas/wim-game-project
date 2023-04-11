<template>
   <div>
      <!-- <dashboard/> -->
      <component :is="activeComponent"/>
   </div>
 </template>
 
 <script>
 import AddPlayer from '~/components/AddPlayer.vue'
 import Dashboard from '~/components/Dashboard.vue'
 import { nanoid } from 'nanoid'
 
 export default {
   name: 'Main',
   components: {
     AddPlayer,
     Dashboard
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
   created() {
     window.addEventListener('storage', this.updatePlayersFromStorage);
   },
   destroyed() {
     window.removeEventListener('storage', this.updatePlayersFromStorage);
   },

   methods: {
     addPlayer() {
      //  const playerName = prompt('Enter player name');
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
 </script>
 
 <style>
 @import url(https://unicons.iconscout.com/release/v4.0.0/css/line.css);
 </style>
 