<template>
   <div class="w-full h-[274px] bg-white  rounded-[15px] drop-shadow-lg py-8 px-7 poppins text-lt-t-prim ">
      <h3>Player Name</h3>
      <h1 class="text-3xl font-extrabold mt-1">{{ selectedPlayer.playerName }}</h1>
      <div class="flex items-center justify-evenly mt-10 gap-10 text-center">
         <div class="flex flex-col">
            <h1 class="text-4xl font-extrabold mb-3">{{ selectedPlayer.totalScore }}</h1>
            <h3 >Score</h3>
         </div>
         <div class="flex flex-col">
            <h1 class="text-4xl font-extrabold mb-3">{{ selectedPlayer.highScore }}</h1>
            <h3 >Highscore</h3>
         </div>
         <div class="flex flex-col">
            <h1 class="text-4xl font-extrabold mb-3">{{ selectedPlayer.accuracy }}%</h1>
            <h3 >Accuracy</h3>
         </div>
      </div>
   </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  computed: {
    selectedPlayer() {
      console.log("Console log",this.players.find(p => p.selected));
      return this.players.find(p => p.selected);
    }
  }
}
</script>

<style>

</style>
