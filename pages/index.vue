<template>
  <div>
    <PageLoader v-if="showPageLoader" />
  </div>
</template>

<script>

export default {
  name: 'IndexPage',

  data() {
    return {
      showPageLoader: true
      
    }
  },
  mounted() {
    setTimeout(() => {
      this.showPageLoader = false
      this.$router.push('/main')
    }, 3000)
  }
}
</script>