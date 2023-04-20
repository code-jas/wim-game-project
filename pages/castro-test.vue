<template>
  <div
    class="bg-summary min-h-screen flex flex-col items-center gap-y-16 py-20"
  >
    <h1 class="font-black text-lt-t-prim text-5xl">SUMMARY</h1>
    <div
      class="w-[450px] h-[640px] flex flex-col items-center bg-lt-cont rounded-[15px] border-8 border-blue relative"
    >
      <div
        class="font-bold h-16 w-full bg-blue flex items-center justify-center text-4xl text-white capitalize"
      >
        <h1>Easy</h1>
      </div>
      <div
        class="flex flex-col items-center justify-between py-12 px-6 text-lt-t-prim w-full h-full text-center"
      >
        <div>
          <div class="text-lg">Player Name</div>

          <div class="font-black text-3xl capitalize px-6">John Angelo</div>
        </div>
        <div class="">
          <div class="font-black text-8xl capitalize text-blue">2029</div>
          <div class="text-lg">Total Score</div>
        </div>
        <div class="flex flex-col align-center">
          <h1 class="text-sm mb-4">Performance Stats</h1>
          <div class="flex items-center justify-center gap-6">
            <div
              class="w-44 h-20 bg-white rounded-[10px] flex flex-col items-center justify-center relative overflow-hidden"
            >
              <div class="bg-accuracy"></div>
              <h1 class="font-black text-4xl capitalize z-10">99%</h1>
              <h4 class="text-sm z-10">Accuracy</h4>
            </div>
            <div
              class="w-44 h-20 bg-white rounded-[10px] flex flex-col items-center justify-center bg-time"
            >
              <h1 class="font-black text-4xl capitalize">1.5s</h1>
              <h4 class="text-sm">Time/Question</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="bg-blue w-64 h-14 sm:w-[200px] md:w-[300px] xl:w-[400px] 2xl:w-64 text-lt-inp font-franklin text-4xl rounded-[15px] active:transform active:translate-y-1 transition duration-300"
    >
      Continue
    </button>
  </div>
</template>
</template>


<script>
</script>

<style>
.bg-summary {
  background-image: url("@/assets/img/summary-bg.svg");
  background-size: cover;
}
.bg-accuracy {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/target.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  position: absolute;
  bottom: 0;
  right: 0;
  scale: 1.3;
  opacity: 0.3;
  z-index: 1;
}
.bg-time {
  background-image: url("@/assets/img/timer.svg");
  background-size: cover;
}
</style>

