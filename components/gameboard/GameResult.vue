<template>
   <div class="py-20">
      <div class="flex flex-col justify-center items-center gap-y-16">
         <h1 class="font-black text-lt-t-prim-alt text-6xl">Summary</h1>
         <h2 class="font-black text-lt-t-prim-alt text-5xl">Easy</h2>
      </div>
      <div class="flex justify-center mt-4">
         <div class="flex justify-between items-center border border-blue-v rounded-[15px] bg-[#E6DCFF] text-[#1B254B] w-[900px] h-[150px] px-10">
            <div class="font-black text-5xl">
               <h1>Player 1</h1>
            </div>
            <div class="flex justify-between gap-10">
               <div v-for="i in total" class="flex flex-col justify-center items-center">
                  <div class="font-black text-4xl">
                     {{ i[1] }}
                  </div>
                  <div class="text-xl">
                     {{ i[0] }}
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="text-center mt-10">
         <h1 class="font-black text-2xl">Performance Stats</h1>
         <div class="flex justify-center">
            <div class="flex justify-evenly items-center border border-blue-v rounded-[15px] w-[540px] h-[90px] p-">
               <div v-for="i in stats" class="flex flex-col justify-center items-center w-[170px] h-[75px] bg-[#E6DCFF] rounded-[15px] text-[#1B254B]">
                  <div class="font-bold text-4xl">
                     {{ i[1] }}
                  </div>
                  <div class="text-xl">
                     {{ i[0] }}
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="flex justify-center gap-3 mt-10">
         <div class="flex justify-center">
            <button class="bg-blue-v w-[476px] h-[70px] text-lt-inp font-franklin text-4xl rounded-[15px]" @click="nextClicked">Retry</button>
         </div>
         <div class="flex justify-center">
            <button class="bg-blue-v w-[476px] h-[70px] text-lt-inp font-franklin text-4xl rounded-[15px]" @click="nextClicked">Next</button>
         </div>
         <div class="flex justify-center">
            <button class="bg-blue-v w-[476px] h-[70px] text-lt-inp font-franklin text-4xl rounded-[15px]" @click="nextClicked">Review</button>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   data(){
      return{
         total: {
            score: ['Total Score', 3450],
            time: ['Total Time', 50 + 's'],
            accuracy: ['Accuracy', 60 + '%'],
         },
         stats: {
            correct: [ 'Correct', 3 ],
            incorrect: [ 'Incorrect', 2 ],
            time: [ 'Time/Question', 10 + 's' ],
         }
      }
   }
}
</script>

<style>

</style>