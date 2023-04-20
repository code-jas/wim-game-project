<template>
  <div class="py-20">
    <div class="flex flex-col justify-center items-center gap-y-16">
      <h1 class="font-black text-lt-t-prim text-6xl">SUMMARY</h1>
      <h2 class="font-black text-lt-t-prim text-5xl capitalize">{{ difficulty }}</h2>
    </div>
    <div class="flex justify-center mt-4">
      <div class="flex justify-between items-center border border-blue-v rounded-[15px] bg-[#E6DCFF] text-[#1B254B] w-[600px] h-[150px] px-10">
        <div class="font-black text-5xl">
          <h1>{{ player.playerName }}</h1>
        </div>
        <div class="flex justify-between gap-10">
          <div class="flex flex-col justify-center items-center">
            <div class="font-black text-4xl">{{ Math.floor(formattedScore) }}</div>
            <div class="text-xl">Total Score</div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-10">
      <h1 class="font-black text-2xl">Performance Stats</h1>
      <div class="flex justify-center">
        <div class="flex justify-evenly items-center border border-blue-v rounded-[15px] w-[540px] h-[90px] p-">
          <div class="flex flex-col justify-center items-center w-[170px] h-[75px]">
            <div class="font-black text-4xl">{{formattedAccuracy }}</div>
            <div class="text-xl">Accuracy</div>
          </div>
          <!-- <div class="flex flex-col justify-center items-center w-[170px] h-[75px]">
            <div class="font-black text-4xl">{{ incorrectAnswers }}</div>
            <div class="text-xl">Incorrect Answers</div>
          </div> -->
          <div class="flex flex-col justify-center items-center w-[170px] h-[75px]">
            <div class="font-black text-4xl">{{formattedTimePerQuestion}} </div>
            <div class="text-xl">Time/Question</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 text-center">
      <button class="bg-blue-v text-white font-black py-2 px-6 rounded-[15px] hover:bg-blue-700 transition duration-300" @click="restartGame()">Go to Dashboard</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
    difficulty: String,
    score: Array,
    correctAnswers: Array,
    aveTime: Array,
  },
  computed: {
    formattedAccuracy() {
      const total = this.correctAnswers.length;
      const correct = this.correctAnswers.filter(result => result).length;
      const accuracy = (correct / total) * 100;
      return `${ Math.floor(accuracy)}%`
    },
    formattedTimePerQuestion() {
      const total = this.aveTime.length;
      const totalTime = this.aveTime.reduce((acc, result) => acc + result, 0);
      const timePerQuestion = totalTime / total;
      return `${timePerQuestion.toFixed(2)} sec`
    },
    formattedScore() {
      return this.score.reduce((acc, result) => acc + result, 0);
    },
  },
  methods: {
    restartGame() {
      this.$router.push('/main');
    },
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
