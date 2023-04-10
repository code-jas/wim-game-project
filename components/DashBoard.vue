<template>
   <div class="bg-lt-dash w-screen h-screen">
     
      <div class="py-20 max-w-screen-2xl mx-auto flex flex-col  items-center bg-lt-dash" >
         <dashboard-navbar/>
         
         <div class="flex justify-between p-3 gap-x w-full px-32">
            <highscore-list />
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
export default {
  components: { DashboardNavbar, HighscoreList, Dropdown },

}
</script>

<style>

</style>