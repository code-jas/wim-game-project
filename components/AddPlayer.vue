<template>
<!-- :class="{'': isDark } -->
    
   <div class="relative p-20 bg-white " :class="{'dark:bg-dk-inp-b': isDark }">
      <div class="flex items-center justify-center gap-x-4 absolute right-20 top-20 bg-white "
       :class="{'dark:bg-dk-inp-b': isDark }"
      >
      <div
        class="w-[65px] h-[65px] flex items-center justify-center overflow-hidden rounded-full  hover:scale-105 transition duration-200 bg-violet-l-alt hover:bg-violet-l-alt"
        :class="{'dark:bg-dk-inp-alt dark:hover:bg-dk-inp-alt': isDark }"
        @click="toggleDarkMode"
         >
            <i
               :class="[
                  'uil',
                  'text-5xl',
                  'hover:scale-105',
                  'transition',
                  'duration-200',
                  isDark
                  ? 'uil-sun dark:text-dk-t-prim dark:bg-dk-inp-alt'
                  : 'uil-moon text-blue bg-violet-l-alt'
               ]"
            ></i>
         </div>
        <div 
            class="w-[65px] h-[65px] flex items-center justify-center  overflow-hidden  rounded-full  hover:scale-105 transition duration-200 bg-violet-l-alt hover:bg-violet-l-alt"  
            :class="{'dark:bg-dk-inp-alt dark:hover:bg-dk-inp-alt': isDark }"
            @click="toggleInstruction"
            >
            <i class="uil uil-question-circle text-5xl hover:scale-105 transition duration-200 text-blue bg-violet-l-alt"
            :class="{'dark:text-dk-t-prim dark:bg-dk-inp-alt': isDark }"></i>
         </div>
      </div>
      
     
      <h1 class="absolute top-20 left-1/2 transform -translate-x-1/2  text-6xl font-franklin text-blue-v " 
      :class="{'dark:text-dk-t-prim': isDark }">Image/Word <br> Match Game</h1>
      <div class="flex items-center  justify-center min-h-screen flex-col">
         <input type="text" 
         class="w-[740px] h-[88px] border-none text-3xl rounded-[15px]  drop-shadow-md focus:outline-none focus:ring-2 
         block p-7 mb-20" 
         :class="inputPlayerNameClass"
         placeholder="Player Name...">
       
         <button type="button" @click="addPlayer()" class="w-[280px] h-[70px]  bg-blue-v font-medium font-franklin text-dk-t-prim-alt text-5xl rounded-[15px]  px-5 py-2.5 mr-2 mb-2   hover:bg-blue-v-alt focus:ring-4 focus:ring-blue-300   hover:scale-105 active:transform active:translate-y-2 transition duration-300">Start</button>
      </div>
      <!-- INSTRUCTION MODAL -->
      <div v-if="showInstructionModal">
         <InstructionModal @closeModal="toggleInstruction"/>
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
        isDark: false
        // isDarkModeEnabled: {
        //     type: Boolean,
        //     required: true
        // }
    },
    data() {
        return {    
            players: JSON.parse(localStorage.getItem("players") || "[]"),
            showInstructionModal: false,
        };
    },
    computed: { 
        inputPlayerNameClass() {
            return this.isDark ?
                'dark:bg-dk-inp dark:hover:bg-dk-inp-alt  dark:text-dk-t-prim dark:placeholder:text-lt-t-prim-alt dark:focus:ring-dk-t-sec' :
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
            this.isDark = !this.isDark
            document.body.classList.toggle('dark', this.isDark)
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
