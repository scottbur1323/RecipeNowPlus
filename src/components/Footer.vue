<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      msg: 'Copyright 2018 Chance Scott-Burke'
    }
  }
}
</script>

<style scoped>
p {
  width: 100%;
  height: 25px;
  position: fixed;
  background-color: black;
  opacity: 0.5;
  left: 0px;
  bottom: 0px;
  color: white;
}
</style>
