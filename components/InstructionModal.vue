<template>
    <div class="py-20 max-w-screen-2xl mx-auto flex flex-col  items-center">
        <!-- Toggle for testing -->
        <!-- <button class="bg-blue-v rounded-xl p-2 text-violet-l font-bold text-2xl hover:bg-blue-v-alt" @click="modalToggle">Help Icon</button>  -->
        <!-- Modal -->
        <div class="h-screen w-full fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center dark:bg-gray-950 dark:bg-opacity-50" @click="closeModal">
            <div class="max-w-xl px-6 py-4 rounded-lg shadow-xl bg-lt-inp dark:bg-dk-inp-b-alt md:w-[450px] xl:w-[560px]" @click.stop>
                <!-- Modal Header -->
                <div class="flex mb-6"> 
                    <div class="basis-3/4">
                        <h1 class="italic font-bold text-5xl basis-3/4 text-blue-v dark:text-violet-l md:text-3xl xl:text-4xl">About the game</h1>
                    </div>
                    <div class="basis-1/4 grid justify-items-end">
                        <button @click="closeModal" class="p-2 rounded-[15px] focus:bg-[#dfdede] dark:focus:bg-dk-inp-alt">
                            <i class="uil uil-times text-3xl text-lt-t-prim-alt hover:text-lt-t-prim"></i>
                        </button>
                    </div>
                </div>
                <!-- Content -->
                <div>
                    <div class="max-w-2xl px-14 py-3 rounded-lg my-3.5 bg-[#e6dcff] border border-blue-v text-lt-t-prim dark:bg-dk-inp-alt dark:text-violet-l dark:border-none sm: md: lg: xl:px-10">
                        <h1 class="text-center text-3xl font-bold mb-1 md:text-xl xl:text-2xl">Image/Word Match</h1>
                        <p class="text-justify text-base md:text-sm">It is a type of visual puzzle that presents an image and provides a set of options for a corresponding word that best matches or describes the image.</p>
                    </div>
                    <div class="max-w-2xl px-14 py-3 rounded-lg my-3.5 bg-[#e6dcff] border border-blue-v text-lt-t-prim dark:bg-dk-inp-alt dark:text-violet-l dark:border-none sm: md: lg: xl:px-10">
                        <h1 class="text-center text-3xl font-bold mb-1 md:text-xl xl:text-2xl">How to Play?</h1>
                        <p class="text-justify text-base md:text-sm">
                            <ol>
                                <li>1. Analyze the image presented by the game.</li>
                                <li>2. Carefully read the different word options provided.</li>
                                <li>3. Use the visual hint to narrow down the options.</li>
                                <li>4. Select the word option that best describes the image.</li>
                            </ol>
                        </p>
                    </div>
                    <div class="max-w-2xl px-14 py-3 rounded-lg my-3.5 bg-[#e6dcff] border border-blue-v text-lt-t-prim dark:bg-dk-inp-alt dark:text-violet-l dark:border-none sm: md: lg: xl:px-10">
                        <h1 class="text-center text-3xl font-bold mb-1 md:text-xl xl:text-2xl">Difficulty</h1>
                        <p class="text-justify text-base md:text-sm">
                            <ul>
                                <li><b>Easy</b> - provides an image and three (3) different options</li>
                                <li><b>Medium</b> - provides an image and four (4) different options</li>
                                <li><b>Hard</b> - provides an image and five (5) different options</li>
                            </ul>
                        </p>
                    </div>
                    <div class="max-w-2xl px-14 py-3 rounded-lg my-3.5 bg-[#e6dcff] border border-blue-v text-lt-t-prim dark:bg-dk-inp-alt dark:text-violet-l dark:border-none sm: md: lg: xl:px-10">
                        <h1 class="text-center text-3xl font-bold mb-1 md:text-xl xl:text-2xl">Mechanics</h1>
                        <p class="text-justify text-base md:text-sm">*calculations of score</p>
                        <p class="text-justify text-base md:text-sm">*calculations of score</p>
                        <p class="text-justify text-base md:text-sm">*calculations of score</p>
                        <p class="text-justify text-base md:text-sm">*calculations of score</p>
                    </div>
                </div>
                <!-- Modal Footer --> 
                <div class="flex justify-center">
                    <button class="bg-blue-v rounded-xl p-2 text-violet-l font-bold text-2xl hover:bg-blue-v-alt md:text-lg xl:text-xl" @click="closeModal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            isDark: false
        }
    },
    methods:{
        closeModal(){
            this.$emit('closeModal')
        },
        toggleDarkMode() {
            this.isDark = !this.isDark
            document.body.classList.toggle('dark', this.isDark)
        },
    },
}

</script>

<style>

</style>