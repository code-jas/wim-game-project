<template>
<div class="flex justify-center">
    <div class="flex items-center justify-between gap-x-52 w-8/12 h-[98px] bg-white px-9  mb-16 rounded-[15px] drop-shadow-lg dark:bg-dk-inp-b-alt sm:h-[70px] sm:px-5 md:h-[80px] md:px-7 lg:h-[90px] lg:px-8">
        <div class="w-[390px] flex justify-start">
            <button>
                <svg class="fill-blue stroke-1 stroke-blue dark:fill-dk-t-prim dark:stroke-dk-t-prim" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="back-arrow"><g data-name="Layer 2"><g data-name="arrow-back"><rect width="24" height="24" opacity="0" transform="rotate(90 12 12)"></rect><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"></path></g></g></svg> <p class="font-bold text-blue dark:text-dk-t-prim">Back</p>
            </button>
        </div>
        <div class="">
            <div class="w-[390px] h-[72px] flex justify-between items-center">
<<<<<<< Updated upstream
                <div class="text-center">
                    <div class="font-bold text-4xl text-lt-t-prim">
                        {{ score }}
                    </div>
                    <div class="text-base text-lt-t-prim">
                        Score
                    </div>
                </div>
                <div class="text-center">
                    <div class="font-bold text-4xl text-lt-t-prim">
                        {{ level }}
                    </div>
                    <div class="text-base text-lt-t-prim">
                        Level
                    </div>
                </div>
                <div class="text-center">
                    <div class="font-bold text-4xl text-lt-t-prim">
                        {{ formattedTime || '00:15' }}
                </div>
                    <div class="text-base text-lt-t-prim">
                        Timer
                    </div>
                </div>
            </div>
=======
    <div class="text-center">
        <div class="font-bold text-4xl text-lt-t-prim">
            {{ Math.floor(score)  }}
>>>>>>> Stashed changes
        </div>
        <div class="w-[390px] flex items-center justify-end gap-x-2">
            <button  @click="$emit('showModal')" type="button" class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full   hover:scale-110 transition duration-300 dark:bg-dk-inp-alt sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px]">
                <i class="uil uil-lightbulb-alt text-blue text-4xl rounded-full dark:text-dk-t-prim sm:text-xl md:text-2xl lg:text-3xl"></i>
            </button>
            <div
                class="w-[45px] h-[45px] flex items-center justify-center overflow-hidden rounded-full  hover:scale-105 transition duration-200 bg-violet-l-alt hover:bg-violet-l-alt sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px]"
                :class="{'dark:bg-dk-inp-alt dark:hover:bg-dk-inp-alt': isDark }"
                @click="toggleDarkMode"
                ><i
                    :class="[
                        'uil',
                        'text-4xl sm:text-xl md:text-2xl lg:text-3xl',
                        'hover:scale-105',
                        'transition',
                        'duration-200',
                        isDark
                        ? 'uil-sun dark:text-dk-t-prim dark:bg-dk-inp-alt'
                        : 'uil-moon text-blue bg-violet-l-alt'
                    ]"
                ></i>
            </div>
            
            <button  @click="$emit('showModal')" type="button" class="w-[45px] h-[45px] flex items-center justify-center bg-violet-l-alt rounded-full   hover:scale-110 transition duration-300 dark:bg-dk-inp-alt sm:w-[30px] sm:h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px]">
                <i class="uil uil-question-circle text-blue text-4xl rounded-full dark:text-dk-t-prim sm:text-xl md:text-2xl lg:text-3xl"></i>
            </button>
        </div>
    </div>
</div>
</template>
  
<script>
import QuestionInformation from './QuestionInformation.vue'
import NavbarIcons from './NavbarIcons.vue'
export default {
    data(){
        return{
            isDark: false,
        }
    },
    methods:{
        toggleDarkMode() {
            this.isDark = !this.isDark
            document.body.classList.toggle('dark', this.isDark)
        },
    },
    components: { QuestionInformation, NavbarIcons },
    props: {
      timeLeft: Number,
      level: Number,
      score: Number,
    },
    computed: {
    formattedTime() {
      const minutes = 0; // Always 0 for 15 seconds
      const seconds = this.timeLeft;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
}
</script>
<style>
</style>    