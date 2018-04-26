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
  background-color: rgba(255,255,255,1);
  bottom: 5px;
  padding-bottom: 4px;
  border-color: rgba(150,150,150,0.6);
  border-style: solid;
  border-width: thin;
  border-left: none;
  border-right: none;

}
#copyright {
  padding-left: 10px;
  font-size: 12px;
  color: rgba(100,100,100,1);
  margin-top: 8px;
  text-align: left;
}
* {
  font-family: Helvetica, sans-serif;
  font-weight: light;
  -webkit-font-smoothing: antialiased;
}
</style>
