

 <template>
   <div>
     <h2>Player List</h2>
     <ul>
       <li v-for="player in players" :key="player.id">
         {{ player.playerName }} -
         High Score: {{ player.highScore }} -
         Total Score: {{ player.totalScore }} -
         Total Game Time: {{ player.totalGameTime }} -
         Total Games Played: {{ player.totalGamesPlayed }} -
         Accuracy: {{ player.accuracy }} -
         <button @click="deletePlayer(player.id)">Delete</button>
         <button @click="editPlayerName(player.id)">Edit Name</button>
       </li>
     </ul>
     <h2>Add Player</h2>
     <form @submit.prevent="addPlayer">
       <label>
         Player Name:
         <input type="text" v-model="newPlayerName">
       </label>

       <button type="submit">Add Player</button>
     </form>
   </div>
 </template>

<script>
// import axios from 'axios';
import { nanoid } from 'nanoid'

export default {
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
  methods: {
    addPlayer() {
      const playerName = prompt('Enter player name');
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
