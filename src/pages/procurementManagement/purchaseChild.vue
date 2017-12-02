<template>
  
</template>

<script>
export default {
  data() {
      return {

      }
  },
  mounted() {
      console.log(this.$route.params.id)
  },
  deactivated() {
    this.$destroy(true);
  }
}
</script>
<style scoped lang='scss'>

</style>


