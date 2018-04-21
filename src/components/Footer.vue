<template>
  <div id="footer">
    <p id="copyright">{{ msg }}</p>
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
#footer {
  width: 100%;
  height: 25px;
  position: fixed;
  background-color: white;
  opacity: 0.8;
  bottom: 10px;
  padding-bottom: 4px;
  /* left: 0px; */
  /* padding-top: 25vh; */
}
#copyright {
  padding-left: 10px;
  font-size: 12px;
  color: grey;
}
.header {
  width: 100%;
  position: fixed;
  padding-top: 2px;
  color: white;
  text-align: center;
}
.background {
  min-height: 80px;
  position: absolute;
  width: 100%;
  opacity: 0.85;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
}
</style>
