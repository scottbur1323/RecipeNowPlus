import Vue from 'vue'
import App from './App'
import router from './router'

// import auth from './auth'
// Vue.use(auth)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
