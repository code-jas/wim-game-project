<template>
    <div class="flex justify-around items-center mx-auto mb-14">
        <div class="text-lt-t-prim text-5xl w-[390px]"> <!-- 390px - default width size of QuestionInformation-->
            <button>
                <i class="uil uil-backward"></i>
            </button>
        </div>
        <div class="">
            <div class="w-[390px] h-[72px] flex justify-between items-center">
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
        </div>
        <div class="flex justify-end w-[390px]"> <!-- 390px - default width size of QuestionInformation-->
            <div class="w-[190px] h-[70px] flex justify-around items-center">
                <button class="text-4xl text-[#6174FB]">
                    <i class="uil uil-lightbulb-alt"></i>
                </button>
                <button class="text-4xl text-[#6174FB]">
                    <i class="uil uil-moon"></i>
                </button>
                <button @click="$emit('showModal')" class="text-4xl text-[#6174FB]">
                    <i class="uil uil-question-circle"></i>
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import QuestionInformation from './QuestionInformation.vue'
import NavbarIcons from './NavbarIcons.vue'
export default {
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