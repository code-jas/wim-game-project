<template>
  <div class="bg-lt-dash mx-auto lg:w-5">
    <!-- <CorrectPopup :message="popupMessage" :show="showPopup" /> -->
    <div class="text-center font-bold text-4xl text-[#605F81] mb-16">
      <h1>Select the word that matches the image</h1>
    </div>
    <div class="flex justify-center mb-9">
      <div class="flex justify-center items-center h-[310px] w-[530px] border-4 border-blue-v-alt rounded-[15px] ">
        <img :src="require(`~/assets/img/quiz-picture/${question.picture}`)" alt="Question image" class="object-cover w-full h-full rounded-[12px] overflow-hidden" />
      </div>
    </div>
    <div class="text-center font-bold text-4xl text-[#605F81] mb-16">
      <h1>{{ question.hint }}</h1>
    </div>
    <div class="flex justify-center font-bold text-4xl">
      <button
        v-for="(choice, index) in question.choices"
        :key="index"
        :class="[
          'w-[280px] h-[80px] rounded-[15px] m-[12px] hover:border-none hover:bg-blue-v-alt hover:text-violet-l-alt active:transform active:translate-y-1 transition duration-300 ',
          {
            'border border-blue-v text-blue-v-alt': selectedChoice !== index,
            'border-none bg-blue-v-alt text-violet-l-alt': selectedChoice === index && checkAnswer.isCorrect === null,
            'bg-green text-white hover:bg-green-alt button ' : checkAnswer.isCorrect === true && selectedChoice === index,
            'bg-red text-white hover:bg-red-alt shaky ' : checkAnswer.isCorrect === false && selectedChoice === index,
          },
        ]"
        @click="$emit('selectChoice', index)" 
      >
        <h1>{{ choice }}</h1>
      </button>
    </div>
  </div>
</template>

<script>
import CorrectPopup from './CorrectPopup.vue';

export default {
  components: {
    CorrectPopup
  },
  props: {
    gamePlay: Object,
    selectedChoice: Number,
    question: Object,
    checkAnswer: Object
  },
  data() { 
    return { 
      showPopup: false,
      popupMessage: ''
    }
  },
  created() { 
    console.log('checkAnswer: ', this.checkAnswer)
  },
  //! show popup message if the answer is correct
  // watch: {
  //   checkAnswer(newValue) {
  //     if (newValue.isCorrect === true) {
  //       this.showPopup = true;
  //       this.popupMessage = newValue.isCorrect && 'Correct!' 
  //       setTimeout(() => {
  //         this.showPopup = false;
  //         this.popupMessage = '';
  //       }, 2000);
  //     }
  //   }
  // }

};
</script>
  
<style scoped>
.popup-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 9999;
}

.button::before {
  content: '';
  border-radius: 15px;
  min-width: calc(280px + 20px);
  min-height: calc(80px + 20px);
  border: 4px solid #72D896;
  box-shadow: 0 0 60px #72d896ab;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all .3s ease-in-out 0s;
}

.button {
  transition: all .2s ease-in-out 0s;
  transform: scale(.95) translateY( 0px);
}
/* .button:active{ 

} */

.button::before {
  opacity: 1;
}

.button::after {
  content: '';
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 6px solid #00FFCB;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring 1.5s infinite;
}

.button::after {
  animation: none;
  display: none;
}

@keyframes ring {
  0% {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}


.shaky {
  animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) ;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>
  