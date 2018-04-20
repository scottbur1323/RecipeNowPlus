<template>
  <div id="app">
    <img id="backgroundImage" src="../static/Background.jpg" alt="">
    <app-header></app-header>
    <router-view id="router"/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>

<style>
#app {
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 100%;
  max-height: 100vh;
  background-color: #cccccc;
}
#router {
  margin-top: 15vh;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  left:0px;
}
#backgroundImage {
  top: 0px;
  position: absolute;
  width: 100vw;
  min-width: 100vh;
  max-width: 100%;
  max-height: 100%;
  min-height: 100vh;
  left:0px;
}
</style>
