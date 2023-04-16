<template>
    <div class="bg-lt-dash mx-auto">
      <div class="text-center font-bold text-4xl text-[#605F81] mb-16">
        <h1>Select the word that matches the image</h1>
        <h2>Timer: {{ timeLeft }}</h2>
      </div>
      <div class="flex justify-center mb-9">
        <div class="flex justify-center items-center h-[310px] w-[530px] border-4 border-blue-v-alt rounded-[15px]">
          <img :src="require(`~/assets/img/quiz-picture/${question.picture}`)" alt="Question image" />
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
              'border-none bg-blue-v-alt text-violet-l-alt': selectedChoice === index,
            },
          ]"
          @click="selectChoice(index)"
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
    },
    data() {
      return {
        selectedChoice: null,
        question: {
          picture: 'img link',
          hint: 'Person holding a pencil',
          choices: ['Eraser', 'Banana', 'Shoe'],
        },
        timeLeft: 0,
      };
    },
    created() {
      this.updateQuestion();
    },
    methods: {
      updateQuestion() {
        const { picture, hint, choices, answer } =
        this.gamePlay.showTheCurrentQuestion();
        this.question.picture = picture;
        this.question.hint = hint;
        this.question.choices = choices;
        this.selectedChoice = null;
        this.gamePlay.startTheCurrentQuestion();
        setInterval(() => {
            this.timeLeft = this.gamePlay.timeLeft;
        }, 1000);
    },
      setTimeLeft(timeLeft) {
          this.timeLeft = timeLeft;
      },
      selectChoice(index) {
        this.selectedChoice = index;
        this.gamePlay.checkAnswer(index);
      },
    },
  };
  </script>
  <style></style>