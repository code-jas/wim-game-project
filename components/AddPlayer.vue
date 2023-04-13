<template>
   <div class="relative p-20 ">
      <div class="flex items-center justify-center gap-x-4 absolute right-20 top-20 ">
         <div
        class="w-[65px] h-[65px] flex items-center justify-center overflow-hidden rounded-full hover:bg-violet-l-alt hover:scale-105 transition duration-200"
        :class="isDarkModeEnabled ? 'bg-violet-l-alt' : 'bg-violet-l-alt '"
        @click="toggleDarkMode"
         >
            <i
               :class="[
                  'uil',
                  'text-5xl',
                  'bg-violet-l-alt',
                  'hover:scale-105',
                  'transition',
                  'duration-200',
                  isDarkModeEnabled
                  ? 'uil-sun text-red'
                  : 'uil-moon text-blue'
               ]"
            ></i>
         </div>
      <div class="w-[65px] h-[65px] flex items-center justify-center  overflow-hidden bg-violet-l-alt rounded-full  hover:bg-violet-l-alt hover:scale-105 transition duration-200">
            <i class="uil uil-question-circle text-blue text-5xl bg-violet-l-alt "></i>
         </div>
      </div>
      
     
      <h1 class=" absolute top-20 left-1/2 transform -translate-x-1/2  text-6xl font-franklin text-blue-v ">Image/Word <br> Match Game</h1>
      <div class="flex items-center  justify-center min-h-screen flex-col">
         <input type="text" class="w-[740px] h-[88px]  bg-lt-inp border-none text-lt-t-prim text-3xl rounded-[15px]  drop-shadow-md placeholder:text-lt-t-sec-alt  focus:outline-none  focus:ring-2 focus:ring-blue-v focus:border-blue-v focus:bg-white block p-7 mb-20" placeholder="Player Name...">
       
         <button type="button" @click="addPlayer()" class="w-[280px] h-[70px]  bg-blue-v font-medium font-franklin text-dk-t-prim-alt text-5xl rounded-[15px]  px-5 py-2.5 mr-2 mb-2   hover:bg-blue-v-alt focus:ring-4 focus:ring-blue-300   hover:scale-105 active:transform active:translate-y-2 transition duration-300">Start</button>
      </div>
   </div>
</template>

<script>
import { nanoid } from 'nanoid';
// import { UilMoon } from '@iconscout/vue-unicons'
import '@iconscout/unicons/css/line.css';
export default {
   // components: { UilMoon },
   props: {
      isDarkModeEnabled: {
         type: Boolean,
         required: true
      }
   },
   data() {
      return {
         players: JSON.parse(localStorage.getItem('players') || '[]')
      };
   },
   watch:{ 
      players() { 
         location.reload();
      }
   },
   methods: { 
      toggleDarkMode() {
         this.isDarkModeEnabledLocal = !this.isDarkModeEnabledLocal;
         this.$emit('toggle-dark-mode', this.isDarkModeEnabledLocal);
      },
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
               selected: true,
               started: false,
            };
            this.players.push(player);
            this.savePlayersToStorage();
            this.$router.push('/main');
         }
      },
      savePlayersToStorage() {
         localStorage.setItem('players', JSON.stringify(this.players));
      }
   }
}
</script>

<style>

</style>
