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
  position: fixed;
  top: 5px;
  color: white;
  text-align: center;
}
.background {
  min-height: 75px;
  
  position: absolute;
  width: 100%;
  opacity: 0.9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
}
img {
  width: 200px;
}

</style>
