<template> 
  <div class="flex  items-center justify-between w-10/12 h-[98px] bg-dk-inp-b-alt px-9  mb-16 rounded-[15px] drop-shadow-lg">
      <h1 class="font-franklin text-5xl text-white">Dashboard</h1>  
      
      <div class="flex items-center justify-between gap-x-7">
         <button type="button" class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full   hover:scale-110 transition duration-300">
            <i class="uil uil-question-circle text-blue text-4xl bg-violet-l-alt  rounded-full"></i>
         </button>
         <button  @click="$emit('showModal')" type="button" class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full   hover:scale-110 transition duration-300">
            <i class="uil uil-question-circle text-blue text-4xl bg-violet-l-alt  rounded-full"></i>
         </button>
         <button  @click="$emit('add-player')" type="button" class="flex items-center bg-blue-v font-semibold text-white rounded py-3 px-5 hover:bg-blue-v-alt focus:ring-1 focus:ring-blue-300 hover:scale-105 active:transform active:translate-y-1 transition duration-300">
            <i class="uil uil-plus text-2xl mr-2"></i> Add Player
         </button>
      </div>
   </div>
  
</template>

<script> 
export default {
  
}
</script>

<style>

</style>