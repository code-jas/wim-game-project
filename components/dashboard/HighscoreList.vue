<template>
   <div class="w-[695px] h-[684px] bg-white  rounded-[15px] drop-shadow-lg p-8 dark:bg-dk-inp-b-alt md:w-[476px] lg:w-[600px] xl:w-[540px]">
      <h1 class="text-2xl text-lt-t-prim font-semibold mb-12 dark:text-violet-l">Highscores</h1>
      <div class="relative h-5/6 overflow-x-auto  rounded-[15px]">
         <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-lt-t-prim-alt uppercase text-opacity-75 dark:text-violet-l dark:text-opacity-50">
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
               <tr v-for="(player, index) in players" :key="player.id" class="font-semibold text-lt-t-prim dark:text-violet-l">
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
  created() { 
   // console.log("Players: ",this.players)
  },
  watch: {
    '$localStorage.highscores': function () {
      this.$forceUpdate()
    }
  },
  methods: {
   toggleDarkMode() {
      this.isDark = !this.isDark
      document.body.classList.toggle('dark', this.isDark)
   },
  }
}
</script>
<style>
</style>    