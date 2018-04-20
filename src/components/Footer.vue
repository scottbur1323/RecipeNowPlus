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
  left: 0px;
  padding-bottom: 8px;
}
#copyright {
  padding-left: 10px;
  font-size: 12px;
  color: grey;
}
</style>
