<template>
  <div class="header">
    <div class="background">
      <img src="../../static/RecipeNow.png" alt="">
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  position: absolute;
  color: white;
  text-align: center;
  top: 5px;
}
.background {
  min-height: 50px;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(255,255,255,0.75);
}
img {
  width: 150px;
  height: 70px;
}

</style>
