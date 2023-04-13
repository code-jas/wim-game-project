<template>
<div class="flex justify-around items-center mx-auto mb-14">
    <div class="text-lt-t-prim text-5xl w-[390px]"> <!-- 390px - default width size of QuestionInformation-->
        <button>
            <i class="uil uil-backward"></i>
        </button>
    </div>
    <div class="">
        <QuestionInformation />
    </div>
    <div class="flex justify-end w-[390px]"> <!-- 390px - default width size of QuestionInformation-->
        <NavbarIcons @showModal="$emit('showModal')"/>
    </div>
</div>
</template>

<script>
import QuestionInformation from './QuestionInformation.vue'
import NavbarIcons from './NavbarIcons.vue'
export default {
    components: { QuestionInformation, NavbarIcons }
}
</script>

<style>

</style>