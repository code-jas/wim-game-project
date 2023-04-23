<template>
  <div
    :class="{ dark: isDarkModeEnabled }"
 
  >
    <!-- <dashboard/> -->
    <component
      :is="activeComponent"
      :is-dark-mode-enabled="isDarkModeEnabled"
      @toggle-dark-mode="toggleDarkMode"
    />
  </div>
</template>
 
 <script>
import AddPlayer from "~/components/AddPlayer.vue";
import Dashboard from "~/components/dashboard/Dashboard.vue";

export default {
  name: "Main",
  components: {
    AddPlayer,
    Dashboard,
  },
  data() {
    return {
      players: JSON.parse(localStorage.getItem("players") || "[]"),
      isDarkModeEnabled: false,
    };
  },
  computed: {
    activeComponent() {
      return this.players.length === 0 ? "AddPlayer" : "Dashboard";
    },
  },
  methods: {
    toggleDarkMode(isEnabled) {
      this.isDarkModeEnabled = isEnabled;
    },
  },
};
</script>
 
 <style>
/* @import url(https://unicons.iconscout.com/release/v4.0.0/css/line.css); */
</style>
 