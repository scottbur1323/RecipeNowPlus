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
  background-color: rgba(255,255,255,0.75);
  bottom: 5px;
  padding-bottom: 4px;
}
#copyright {
  padding-left: 10px;
  font-size: 12px;
  color: grey;
}
</style>
