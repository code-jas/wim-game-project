<template>
  <div
    class="w-[695px] h-[684px] bg-white rounded-[15px] drop-shadow-lg p-8 dark:bg-dk-inp md:p-5 md:w-full lg:w-full xl:w-[540px]"
  >
    <h1 class="text-2xl text-lt-t-prim font-semibold mb-12 dark:text-violet-l">
      Scoreboard
    </h1>
    <div class="relative h-5/6 overflow-x-auto rounded-[15px]">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-lt-t-prim-alt uppercase text-opacity-75 dark:text-violet-l dark:text-opacity-50"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Rank</th>
            <th scope="col" class="px-6 py-3">Player</th>
            <th scope="col" class="px-6 py-3">Score</th>
            <th scope="col" class="px-6 py-3">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(player, index) in sortedPlayersHighScore"
            :key="player.id"
            :class="{
              'bg-gray-100 dark:bg-dk-inp-alt': player.selected,
              'bg-white dark:bg-dk-inp': !player.selected,
            }"
            class="font-semibold text-lt-t-prim dark:text-violet-l hover:bg-gray-100 dark:hover:bg-dk-inp-alt rounded-[15px]"
          >
            <td scope="row" class="px-6 py-3">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-3">
              {{ player.playerName }}
            </td>
            <td class="px-6 py-3">
              {{
                Math.floor(player.highScore) === 0
                  ? "-"
                  : Math.floor(player.highScore)
              }}
            </td>
            <td class="px-6 py-3">
              {{
                getTotalAccuracy(player) == 0
                  ? "-"
                  : `${getTotalAccuracy(player)}%`
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    players: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.selectedPlayer;
  },
  methods: {},
  watch: {
    "$localStorage.highscores": function () {
      this.$forceUpdate();
    },
  },
  computed: {
    selectedPlayer() {
      console.log(
        "Console log",
        this.players.find((p) => p.selected)
      );
      return this.players.find((p) => p.selected);
    },
    sortedPlayersHighScore() {
      return this.players.sort((a, b) => {
        return b.highScore - a.highScore;
      });
    },
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark", this.isDark);
    },
    // get the accuracy
    getTotalAccuracy(player) {
      let total = 0;

      for (const difficulty in player.accuracy) {
        if (Object.hasOwnProperty.call(player.accuracy, difficulty)) {
          total += player.accuracy[difficulty];
        }
      }
      console.log("total", total);
      return total;
    },
    getAccuracy(player) {
      const total = player.totalGamesPlayed * 20;
      const correct = this.getTotalAccuracy(player);
      // console.log('correct', correct)
      const accuracy = (correct / total) * 100;
      return Math.floor(accuracy);
    },
  },
};
</script>
<style>
</style>    