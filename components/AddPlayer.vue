<template>
   <div class="relative p-20 " :class="isDarkModeEnabled ? 'bg-dk-inp-b' : 'bg-white'">
      <div class="flex items-center justify-center gap-x-4 absolute right-20 top-20 "
      :class="isDarkModeEnabled ? 'bg-dk-inp-b' : 'bg-white'"
      >
      <div
        class="w-[65px] h-[65px] flex items-center justify-center overflow-hidden rounded-full  hover:scale-105 transition duration-200"
        :class="isDarkModeEnabled ? 'bg-dk-inp-alt hover:bg-dk-inp-alt' : 'bg-violet-l-alt hover:bg-violet-l-alt'"
        @click="toggleDarkMode"
         >
            <i
               :class="[
                  'uil',
                  'text-5xl',
                  'hover:scale-105',
                  'transition',
                  'duration-200',
                  isDarkModeEnabled
                  ? 'uil-sun text-dk-t-prim bg-dk-inp-alt'
                  : 'uil-moon text-blue bg-violet-l-alt'
               ]"
            ></i>
         </div>
        <div 
            class="w-[65px] h-[65px] flex items-center justify-center  overflow-hidden  rounded-full  hover:scale-105 transition duration-200"  :class="isDarkModeEnabled ? 'bg-dk-inp-alt hover:bg-dk-inp-alt' : 'bg-violet-l-alt hover:bg-violet-l-alt'"
            @click="toggleInstruction"
            >
            <i class="uil uil-question-circle text-5xl hover:scale-105 transition duration-200 "
            :class="isDarkModeEnabled ? ' text-dk-t-prim bg-dk-inp-alt'
                  : ' text-blue bg-violet-l-alt'"></i>
         </div>
      </div>
      
     
      <h1 class=" absolute top-20 left-1/2 transform -translate-x-1/2  text-6xl font-franklin text-blue-v "  :class="isDarkModeEnabled ? 'text-dk-t-prim' : 'text-blue-v '">Image/Word <br> Match Game</h1>
      <div class="flex items-center  justify-center min-h-screen flex-col">
         <input type="text" 
         class="w-[740px] h-[88px] border-none text-3xl rounded-[15px]  drop-shadow-md focus:outline-none focus:ring-2 block p-7 mb-20" 
         :class="inputPlayerNameClass"
         placeholder="Player Name...">
       
         <button type="button" @click="addPlayer()" class="w-[280px] h-[70px]  bg-blue-v font-medium font-franklin text-dk-t-prim-alt text-5xl rounded-[15px]  px-5 py-2.5 mr-2 mb-2   hover:bg-blue-v-alt focus:ring-4 focus:ring-blue-300   hover:scale-105 active:transform active:translate-y-2 transition duration-300">Start</button>
      </div>
      <!-- INSTRUCTION MODAL -->
      <div v-if="showInstructionModal">
         <InstructionModal @closeModal="toggleInstruction" :isDarkModeEnabled="true"/> <!-- :isDarkModeEnabled="true"- for testing purpose-->
      </div>
   </div>
</template>

<script>
import { nanoid } from 'nanoid';
// import { UilMoon } from '@iconscout/vue-unicons'
import '@iconscout/unicons/css/line.css';
import InstructionModal from './InstructionModal.vue';
export default {
    // components: { UilMoon },
    components: { InstructionModal },
    props: {
        isDarkModeEnabled: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            players: JSON.parse(localStorage.getItem("players") || "[]"),
            showInstructionModal: false,
        };
    },
    computed: { 
        inputPlayerNameClass() {
            return this.isDarkModeEnabled ?
                'bg-dk-inp hover:bg-dk-inp-alt  text-dk-t-prim placeholder:text-lt-t-prim-alt focus:ring-dk-t-sec' :
                'bg-lt-inp text-lt-t-prim placeholder:text-lt-t-sec-alt  focus:ring-blue-v focus:border-blue-v focus:bg-white'
        },
    },
    watch: {
        players() {
            location.reload();
        }
    },
    methods: {
        toggleInstruction(){
            this.showInstructionModal = !this.showInstructionModal
        },
        toggleDarkMode() {
            this.isDarkModeEnabledLocal = !this.isDarkModeEnabledLocal;
            this.$emit("toggle-dark-mode", this.isDarkModeEnabledLocal);
        },
        addPlayer() {
            const playerName = document.querySelector("input[type=\"text\"]").value;
            if (playerName.trim() !== "") {
                const player = {
                    id: nanoid(),
                    playerName: playerName,
                    highScore: 0,
                    totalScore: 0,
                    totalGameTime: 0,
                    totalGamesPlayed: 0,
                    accuracy: 0,
                    selected: true,
                    started: false,
                };
                this.players.push(player);
                this.savePlayersToStorage();
                this.$router.push("/main");
            }
        },
        savePlayersToStorage() {
            localStorage.setItem("players", JSON.stringify(this.players));
        },
       
    },
}
</script>

<style>

</style>
