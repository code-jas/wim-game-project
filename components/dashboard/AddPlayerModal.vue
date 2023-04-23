<template>
  <!-- Modal -->
  <div class="fixed z-20 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-950 dark:bg-opacity-75"
        @click="$emit('close-modal')"
      ></div>
      <div
        class="relative bg-white rounded-lg w-5/12 dark:bg-dk-inp-b sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12"
        @click.stop
      >
        <div class="absolute top-3 right-3 p-4">
          <button
            @click="$emit('close-modal')"
            class="text-lt-t-prim hover:text-red"
          >
            <i class="uil uil-multiply text-3xl"></i>
          </button>
        </div>
        <div class="p-8">
          <div class="flex items-center justify-center flex-col mt-10">
            <input
              type="text"
              class="w-9/12 bg-lt-inp border-none text-lt-t-prim text-3xl rounded-[15px] drop-shadow-lg placeholder:text-lt-t-sec-alt focus:outline-none focus:ring-2 focus:ring-blue-v focus:border-blue-v focus:bg-white block p-7 mb-5 dark:bg-dk-inp-b dark:placeholder:text-lt-t-prim-alt dark:focus:bg-dk-inp-b-alt dark:text-violet-l sm:text-lg md: lg:text-xl xl: 2xl:text-2xl"
              placeholder="Player Name..."
            />
            <!-- error messasge -->
            <div class="flex items-center justify-center flex-col mb-8">
              <p v-show="showError" class="text-red text-lg font-medium">
                {{ message }}
              </p>
            </div>
            <button
              type="button"
              @click="addPlayer()"
              class="w-3/12 h-[60px] bg-blue-v font-medium font-franklin text-dk-t-prim-alt text-3xl rounded-[15px] px-5 py-2.5 mr-2 mb-2 hover:bg-blue-v-alt focus:ring-4 focus:ring-blue-300 hover:scale-105 active:transform active:translate-y-2 transition duration-300"
            >
              Start
            </button>
          </div>
        </div>
      </div>
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
    addPlayer: {
      type: Function,
      required: true,
    },
    showError: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      if (event.target.classList.contains("fixed")) {
        this.$emit("close-modal");
      }
    },
  },
  toggleDarkMode() {
    this.isDark = !this.isDark;
    document.body.classList.toggle("dark", this.isDark);
  },
};
</script>
   
   <style>
</style>
   