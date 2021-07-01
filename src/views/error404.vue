<template>
<div class="error404">
    <img src="/img/404/404.png" alt="404" @click="gohome">
</div>
</template>

<script>
export default {
  name: "error404",
  methods:{
    gohome(){
      this.$router.push('/layout')
    }
  }
}
</script>

<style scoped lang="scss">
.error404{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img{
    width: 100%;
  }
  }
</style>