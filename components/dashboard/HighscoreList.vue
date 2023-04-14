<template>
   <div class="w-[695px] h-[684px] bg-purple-950  rounded-[15px] drop-shadow-lg p-8">
      <h1 class="text-2xl text-white font-semibold mb-12 ">Highscores</h1>
      <div class="relative h-5/6 overflow-x-auto  rounded-[15px]">
         <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-lt-t-prim-alt uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                  <th scope="col" class="px-6 py-3">
                     Rank
                  </th>
                  <th scope="col" class="px-6 py-3">
                     Player 
                  </th>
                  <th scope="col" class="px-6 py-3">
                     Score
                  </th>
                  <th scope="col" class="px-6 py-3">
                     Accuracy
                  </th>
                  
               </tr>
            </thead>
            <tbody>
               <tr v-for="(player, index) in players" :key="player.id" class="bg-white border-b font-semibold text-lt-t-prim  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50  dark:hover:bg-gray-600">
                  <td scope="row" class="px-6 py-3 ">
                     {{ index + 1 }}
                  </td>
                  <td class="px-6 py-3">
                     {{ player.playerName }}
                  </td>
                  <td class="px-6 py-3">
                     {{ player.highScore }}
                  </td>
                  <td class="px-6 py-3">
                     {{ player.accuracy }}
                  </td>
               </tr>                
            </tbody>
         </table>
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
  created() { 
   // console.log("Players: ",this.players)
  },
  watch: {
    '$localStorage.highscores': function () {
      this.$forceUpdate()
    }
  }
}
</script>

<style>

</style> 