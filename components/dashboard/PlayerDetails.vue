<template>
<div class="w-full h-[274px] bg-white rounded-[15px] drop-shadow-lg py-8 px-7 poppins text-lt-t-prim dark:bg-dk-inp-b-alt dark:text-violet-l md:h-[274px] lg:h-[500px]">
      <h3>Player Name</h3>
      <h1 class="text-3xl font-extrabold mt-1">{{ selectedPlayer.playerName }}</h1>
      <div class="flex items-center justify-evenly mt-10 gap-10 text-center md:flex-row lg:flex-col">
         <div class="flex flex-col">
            <h1 class="text-4xl font-extrabold mb-3">{{ Math.floor(selectedPlayer.highScore) }}</h1>
            <h3 >Score</h3>
         </div>
         <div class="flex flex-col">
            <h1 class="text-4xl font-extrabold mb-3">{{ selectedPlayer.totalGamesPlayed  }}</h1>
            <h3 >Level</h3>
         </div>
         <div class="flex flex-col">
            <h1 class="text-4xl font-extrabold mb-3">{{ getAccuracy }}%</h1>
            <h3 >Accuracy</h3>
         </div>
       
      </div>
   </div>
</template>

<script>
export default {
  data(){
    return{
      isDark: false
    }
  },
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  computed: {
    selectedPlayer() {
      // console.log("Console log",this.players.find(p => p.selected));
      return this.players.find(p => p.selected);
    },
    getAccuracy() {
      const total = this.selectedPlayer.totalGamesPlayed * 20
      const correct = this.getTotalAccuracy()
      console.log('correct', correct)
      const accuracy = (correct / total) * 100;
      return Math.floor(accuracy);
   },
  },
 
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark
      document.body.classList.toggle('dark', this.isDark)
    },
      // get the accuracy
    getTotalAccuracy() {
      let total = 0;

      for (const difficulty in this.selectedPlayer.accuracy) {
         if (Object.hasOwnProperty.call(this.selectedPlayer.accuracy, difficulty)) {
            total += this.selectedPlayer.accuracy[difficulty];
         }
      }
      return total;
    }
  },

   
  
}
</script>

<style>

</style>
