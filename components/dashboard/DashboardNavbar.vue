<template>
  <div class="flex  items-center justify-between w-10/12 h-[98px] bg-white px-9  mb-16 rounded-[15px] drop-shadow-lg">
      <h1 class="font-franklin text-5xl text-lt-t-prim">Dashboard</h1>
      <div class="flex items-center justify-between gap-x-7">
         <div
        class="w-[65px] h-[65px] flex items-center justify-center overflow-hidden rounded-full  hover:scale-105 transition duration-200"
        :class="isDarkModeEnabled ? 'bg-dk-inp-alt hover:bg-dk-inp-alt' : 'bg-violet-l-alt hover:bg-violet-l-alt'"
        @click="toggleDarkMode"
         >
            <i
               :class="[
                  'uil',
                  'text-5xl',
                  'hover:scale-105',
                  'transition',
                  'duration-200',
                  isDarkModeEnabled
                  ? 'uil-sun text-dk-t-prim bg-dk-inp-alt'
                  : 'uil-moon text-blue bg-violet-l-alt'
               ]"
            ></i>
         </div>
      
         <button  @click="$emit('showModal')" type="button" class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full   hover:scale-110 transition duration-300">
            <i class="uil uil-question-circle text-blue text-4xl bg-violet-l-alt  rounded-full"></i>
         </button>
         <button  @click="$emit('add-player')" type="button" class="flex items-center bg-blue-v font-semibold text-dk-t-prim-alt rounded py-3 px-5 hover:bg-blue-v-alt focus:ring-1 focus:ring-blue-300 hover:scale-105 active:transform active:translate-y-1 transition duration-300">
            <i class="uil uil-plus text-2xl mr-2"></i> Add Player
         </button>
      </div>
  </div>
</template>

<script> 
export default {
   props: {
      isDarkModeEnabled: {
         type: Boolean,
         required: true
      }
    },
    data() { 
      return { 
         isDarkModeEnabled: false
      }
    },
    methods: {
      toggleDarkMode() {
         this.isDarkModeEnabledLocal = !this.isDarkModeEnabledLocal;
         this.$emit("toggle-dark-mode", this.isDarkModeEnabledLocal);
      },
   }
}
</script>

<style>

</style>