<template>
<div class="w-[190px] h-[70px] flex justify-around items-center">
    <button class="text-4xl text-[#6174FB]">
        <i class="uil uil-lightbulb-alt"></i>
    </button>
    <button class="text-4xl text-[#6174FB]">
        <i class="uil uil-moon"></i>
    </button>
    <button @click="$emit('showModal')" class="text-4xl text-[#6174FB]">
        <i class="uil uil-question-circle"></i>
    </button>
</div>
</template>

<script>

</script>

<style>

</style>