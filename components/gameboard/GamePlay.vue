<template>
  <div class="bg-lt-dash mx-auto lg:w-5">
    <div class="text-center font-bold text-4xl text-[#605F81] mb-16">
      <h1>Select the word that matches the image</h1>
    </div>
    <div class="flex justify-center mb-9">
      <div class="flex justify-center items-center h-[310px] w-[530px] border-4 border-blue-v-alt rounded-[15px]">
        <img :src="require(`~/assets/img/quiz-picture/${question.picture}`)" alt="Question image" class="object-cover w-full h-full overflow-hidden" />
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
          'w-[280px] h-[80px] rounded-[15px] m-[12px] hover:border-none hover:bg-blue-v-alt hover:text-violet-l-alt',
          {
            'border border-blue-v text-blue-v-alt': selectedChoice !== index,
            'border-none bg-blue-v-alt text-violet-l-alt': selectedChoice === index && checkAnswer.isCorrect === null,
            'bg-green text-white': checkAnswer.isCorrect === true && selectedChoice === index,
            'bg-red text-white' : checkAnswer.isCorrect === false && selectedChoice === index,
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
  export default {
    props: {
      gamePlay: Object,
      selectedChoice: Number,
      question: Object,
      checkAnswer: Object
    },
    data() { 
      return { 
      }
    }, created() { 
      console.log('checkAnswer: ', this.checkAnswer)
    }

  };
  </script>
  
  <style></style>
  