<template>
   <div class="relative p-20">
      <div class="w-[65px] h-[65px] flex items-center justify-center absolute right-20 top-20 bg-violet-l-alt rounded-full">
         <i class="uil uil-question-circle text-blue text-5xl bg-violet-l-alt "></i>
      </div>
      <h1 class=" absolute top-20 left-1/2 transform -translate-x-1/2  text-6xl font-franklin text-blue-v ">Image/Word <br> Match Game</h1>
      <div class="flex items-center  justify-center min-h-screen flex-col">
         <input type="text" class="w-[740px] h-[88px]  bg-lt-inp border-none text-lt-t-prim text-3xl rounded-[15px]  drop-shadow-md placeholder:text-lt-t-sec-alt  focus:outline-none  focus:ring-2 focus:ring-blue-v focus:border-blue-v focus:bg-white block p-7 mb-20" placeholder="Player Name...">
       
         <button type="button" class="w-[280px] h-[70px]  bg-blue-v font-medium font-franklin text-dk-t-prim-alt text-5xl rounded-[15px]  px-5 py-2.5 mr-2 mb-2   hover:bg-blue-v-alt focus:ring-4 focus:ring-blue-300   hover:scale-105 active:transform active:translate-y-2 transition duration-300">Start</button>
      </div>
   </div>
</template>

<script>
export default {

}
</script>

<style>

</style>