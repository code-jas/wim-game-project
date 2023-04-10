<template>
  <div class="relative">
    <button
      id="dropdownInformationButton"
      class="w-[476px] h-20 text-lt-t-prim text-2xl bg-white hover:bg-blue-800 font-medium rounded-lg shadow px-12 py-2.5 text-center inline-flex justify-between items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="toggleDropdown"
      type="button"
    >
      John Angelo
      <i class="uil uil-angle-up text-5xl transition-transform duration-500" :class="{'rotate-90': isOpen}" />
    </button>
    <div v-if="isOpen"
      id="dropdownInformation"
      class="w-[476px] max-h-96 bottom-full overflow-y-auto  text-lt-t-prim text-2xl z-10  mb-5 absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    >
      
      <ul class="py-2 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
        <li>
          <a href="#" class="block px-8 py-3 rounded-lg mx-5 my-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" class="block px-8 py-3 rounded-lg mx-5 my-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Settings
          </a>
        </li>
        <li>
          <a href="#" class="block px-8 py-3 rounded-lg mx-5 my-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Earnings
          </a>
        </li>
        <li>
          <a href="#" class="block px-8 py-3 rounded-lg mx-5 my-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Earnings
          </a>
        </li>
      </ul>
      
    </div>
    <button type="button" class="w-[280px] h-[70px]  bg-blue-v font-medium font-franklin text-dk-t-prim-alt text-5xl rounded-[15px]  px-5 py-2.5 mr-2 mb-2   hover:bg-blue-v-alt focus:ring-4 focus:ring-blue-300   hover:scale-105 active:transform active:translate-y-2 transition duration-300">Start</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const isOpen = ref(false);

    function toggleDropdown() {
      isOpen.value = !isOpen.value;
    }

    return {
      isOpen,
      toggleDropdown,
    }
  }
}
</script>