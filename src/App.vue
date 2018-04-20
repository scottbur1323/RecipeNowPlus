<template>
  <div id="app">
    <img src="../static/Background.jpg" alt="">
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
  /* margin-top: 10px; */
}
#router {
  margin-top: 80px;
}
img {
  top: 0px;
  position: absolute;
  max-width: 100vw;
  max-height: 100vh;
}
</style>
