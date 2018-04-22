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
  width: 100vw;
  max-width: 100%;
  max-height: 100vh;
  background-color: #cccccc;
  display: flex;
  justify-content: center;
}
#router {
  opacity: 0.9;
  /* padding-top: 68px; */
  margin-top: 69px;
  padding-bottom: 150px;
  max-width: 100%;
  max-height: 100%;
  min-width: 100vw;
  position: fixed;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
#backgroundImage {
  top: 0px;
  position: fixed;
  width: 100vw;
  min-width: 100vw;
  max-width: 100%;
  max-height: 100vh;
  min-height: 100vh;
  left:0px;
}
</style>
