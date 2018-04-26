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
  width: 100vw;
  position: fixed;
  color: white;
  text-align: center;
  /* border-color: rgba(0,0,0,1);
  border-style: solid;
  border-width: medium; */
  /* padding-top: -10px; */
}
.background {
  min-height: 50px;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(255,255,255,.95);
  border-color: rgba(150,150,150,0.6);
  border-style: solid;
  border-width: medium;

}
img {
  width: 150px;
  height: 70px;
}

</style>
