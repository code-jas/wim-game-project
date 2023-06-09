<template>
  <div class="bg-lt-dash w-screen h-screen min-h-full dark:bg-dk-inp-b">
    <!-- <Toast
      v-if="showToast"
      :showToast="showToast"
      :type="type"
      :message="message"
    /> -->

    <div
      class="py-20 max-w-[1535px] mx-auto flex flex-col items-center bg-lt-dash dark:bg-dk-inp-b sm:max-w-[635px] md:max-w-[767px] lg:max-w-[1023px] xl:max-w-[1279px]"
    >
      <dashboard-navbar
        @add-player="showModal = true"
        @showModal="showInstructionModal = true"
      />

      <div
        class="flex justify-between p-3 gap-x-20 w-full px-40 sm:px-20 md:px-32 md:gap-y-10 lg:flex-col lg:gap-y-10 lg:px-24 lg:gap-x-3 xl:px-28 xl:gap-x-6"
      >
        <highscore-list :players="players" />
        <div
          class="flex justify-between flex-col w-[476px] md:w-full md:flex-col xl:w-[450px] lg:w-full lg:gap-x-10 lg:flex-row lg:items-center lg:justify-center mx-auto"
        >
          <player-details class="mb-28 lg:mb-10" :players="players" />
          <player-dropdown
            class="lg:w-full"
            :players="players"
            :start-game="startGame"
          />
        </div>
      </div>
    </div>
    <add-player-modal
      v-if="showModal"
      @close-modal="showModal = false"
      :add-player="addPlayer"
      :showError="showToast"
      :message="message"
    />
    <instruction-modal
      v-if="showInstructionModal"
      @closeModal="showInstructionModal = false"
    />
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import PlayerDropdown from "./PlayerDropdown.vue";
import HighscoreList from "./HighscoreList.vue";
import AddPlayerModal from "./AddPlayerModal.vue";
import PlayerDetails from "./PlayerDetails.vue";
import InstructionModal from "../InstructionModal.vue";
import Toast from "../gameboard/Toast.vue";
import { nanoid } from "nanoid";

export default {
  components: {
    DashboardNavbar,
    HighscoreList,
    PlayerDropdown,
    AddPlayerModal,
    PlayerDetails,
    InstructionModal,
    Toast,
  },
  data() {
    return {
      isDark: false,
      showModal: false,
      showInstructionModal: false,
      showToast: false,
      type: "warning",
      message: "",
      selectedPlayer: null,
      players: JSON.parse(localStorage.getItem("players") || "[]"),
    };
  },
  created() {
    window.addEventListener("storage", this.updatePlayersFromStorage);
    // Check if dark mode is saved in local storage
    const savedIsDarkMode = localStorage.getItem("isDarkMode");
    if (savedIsDarkMode !== null) {
      this.isDark = JSON.parse(savedIsDarkMode);
      document.body.classList.toggle("dark", this.isDark);
    }
  },
  destroyed() {
    window.removeEventListener("storage", this.updatePlayersFromStorage);
  },
  mounted() {
    //  console.log(this.players)
  },
  methods: {
    addPlayer() {
      const playerNameInput = document.querySelector('input[type="text"]');
      const playerName = playerNameInput.value.trim();

      // Reset validation flag

      if (!playerName) {
        this.showToast = true;
        this.message = "Please enter a name";
        return;
      }

      if (this.players.some((p) => p.playerName === playerName)) {
        this.showToast = true;
        this.message = "Player name already exists";
        playerNameInput.value = "";
        return;
      }

      // Update the 'selected' property for all other players
      this.players.forEach((p) => {
        p.selected = false;
      });

      const player = {
        id: nanoid(),
        playerName,
        highScore: 0,
        totalScore: { easy: 0, medium: 0, hard: 0 },
        totalGameTime: 0,
        totalGamesPlayed: 0,
        accuracy: { easy: 0, medium: 0, hard: 0 },
        selected: true,
        started: false,
        levelDonePerDifficulty: { easy: [], medium: [], hard: [] },
      };
      this.players.push(player);
      this.savePlayersToStorage();
      this.showModal = false;
      this.showToast = false;
    },
    startGame() {
      this.selectedPlayer = this.players.filter(
        (player) => player.selected === true
      );
      this.$router.push({
        name: "gameboard",
        params: {
          playerId: this.selectedPlayer[0].id,
        },
      });
    },
    savePlayersToStorage() {
      localStorage.setItem("players", JSON.stringify(this.players));
    },
    toggleDarkMode() {
      this.isDark = !this.isDark;
      document.body.classList.toggle("dark", this.isDark);
      localStorage.setItem("isDarkMode", JSON.stringify(this.isDark));
    },
  },
};
</script>
<style>
</style>