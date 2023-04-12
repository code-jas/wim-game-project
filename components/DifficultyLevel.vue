<template>
    <div class="background">
        <h1 class="header">CHOOSE DIFFICULTY</h1>
        <div class="main-container">
            <div class="diff-container">EASY</div>
            <div class="diff-container">MEDIUM</div>
            <div class="diff-container">HARD</div>
        </div>
        <button type="button" class="flex items-center bg-blue-v font-semibold text-dk-t-prim-alt rounded  py-3 px-20 mb-6 mt-7   hover:bg-blue-v-alt focus:ring-1 focus:ring-blue-300   hover:scale-105 active:transform active:translate-y-1 transition duration-300">
            <i class="uil uil-plus text-2xl mr-2"></i> NEXT
         </button>
    </div>
</template>


<script>

</script>

<style>
.background{
    background-color: #F2F0FC;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    margin: 0;
 
}
.header{ 
    color: #605F81;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    font-size: 60px;
    width: auto;
    margin-top: 30px;
    margin-bottom: 40px;
    font-weight: 900;
    
}
.main-container{
    width: 965px;
    height: 412px;
    background-color: #FFFFFF;
    border: 1px solid #FFFFFF;
    margin: 0 auto;
    padding: 90px;
    align-items: center;
}
.main-container .diff-container{
    width: 800px;
    height: 80px;
    margin: 0;
    background-color: #E6DCFF;
    border: 1px solid #E6DCFF;
    border-radius: 15px;
    margin-bottom: 10px;
    overflow: hidden;
    box-sizing: border-box;
    display: grid;
    align-content: center;
    font-size: 30px;
    justify-content: center;
    font-weight: 900;

}
.main-container .diff-container:hover{
    background: #6174FB;
    transform: translateY(-10px);
    transition:  background 0.5s;
}
</style>