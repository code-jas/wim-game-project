<template>
  <div
    :class="{ 'bg-summary-dk': isDark, 'bg-summary': !isDark }"
    class="w-full min-h-screen flex flex-col items-center gap-y-16 py-20"
  >
    <h1 class="font-black text-lt-t-prim text-5xl dark:text-violet-l">
      SUMMARY
    </h1>
    <div
      class="w-[450px] h-[640px] flex flex-col items-center bg-blue rounded-[15px] border-8 border-blue relative dark:bg-blue-v dark:border-blue-v"
    >
      <div
        class="font-bold h-16 w-full bg-blue flex items-center justify-center text-4xl text-white capitalize dark:bg-blue-v"
      >
        <h1>{{ difficulty }}</h1>
      </div>
      <div
        class="flex flex-col items-center justify-between py-12 px-6 text-lt-t-prim w-full h-full text-center rounded-[15px] bg-lt-cont dark:bg-dk-inp dark:text-violet-l"
      >
        <div>
          <div class="text-lg">Player Name</div>

          <div class="font-black text-3xl capitalize px-6">
            {{ player.playerName }}
          </div>
        </div>
        <div class="">
          <div
            class="font-black text-7xl capitalize text-blue dark:text-blue-v"
          >
            {{ Math.floor(formattedScore) }}
          </div>
          <div class="text-lg">Total Score</div>
        </div>
        <div class="flex flex-col align-center">
          <h1 class="text-sm mb-4">Performance Stats</h1>
          <div class="flex items-center justify-center gap-6">
            <div
              class="w-44 h-20 bg-white rounded-[10px] flex flex-col items-center justify-center relative overflow-hidden dark:bg-blue-v"
            >
              <div class="bg-accuracy"></div>
              <h1 class="font-black text-4xl capitalize z-10 mb-1">
                {{ formattedAccuracy }}
              </h1>
              <h4 class="text-sm z-10">Accuracy</h4>
            </div>
            <div
              class="w-44 h-20 bg-white rounded-[10px] flex flex-col items-center justify-center relative overflow-hidden dark:bg-blue-v"
            >
              <div class="bg-time"></div>
              <h1 class="font-black text-4xl z-10 mb-1">
                {{ formattedTimePerQuestion }}
              </h1>
              <h4 class="text-sm z-10">Time/Question</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="bg-blue w-64 h-14 sm:w-[200px] md:w-[300px] xl:w-[400px] 2xl:w-64 text-lt-inp font-franklin text-4xl rounded-[15px] active:transform active:translate-y-1 transition duration-300 dark:bg-blue-v"
      @click="restartGame()"
    >
      Continue
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDark: false,
    };
  },
  props: {
    player: Object,
    difficulty: String,
    score: Array,
    correctAnswers: Array,
    aveTime: Array,
  },
  created() {
    // Check if dark mode is saved in local storage
    const savedIsDarkMode = localStorage.getItem("isDarkMode");
    if (savedIsDarkMode !== null) {
      this.isDark = JSON.parse(savedIsDarkMode);
      document.body.classList.toggle("dark", this.isDark);
    }
  },
  computed: {
    formattedAccuracy() {
      const total = this.correctAnswers.length;
      const correct = this.correctAnswers.filter((result) => result).length;
      const accuracy = (correct / total) * 100;
      return `${Math.floor(accuracy)}%`;
    },
    formattedTimePerQuestion() {
      const total = this.aveTime.length;
      const totalTime = this.aveTime.reduce((acc, result) => acc + result, 0);
      const timePerQuestion = totalTime / total;
      return `${timePerQuestion.toFixed(1)}s`;
    },
    formattedScore() {
      return this.score.reduce((acc, result) => acc + result, 0);
    },
  },
  methods: {
    restartGame() {
      this.$router.push("/main");
    },
  },
};
</script>

<style scoped>
.bg-summary {
  background-image: url("@/assets/img/summary-bg.svg");
  background-size: cover;
}
.bg-summary-dk {
  background-image: url("@/assets/img/summary-dk-bg.svg");
  background-size: cover;
}
.bg-accuracy {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/target.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  position: absolute;
  bottom: 0;
  right: 0;
  scale: 1.5;
  opacity: 0.3;
  z-index: 1;
}
.bg-time {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/timer.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  position: absolute;
  bottom: 0;
  right: -10%;
  scale: 1;
  opacity: 0.3;
  z-index: 1;
}
</style>
