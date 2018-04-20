import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NewUser from '@/components/NewUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/NewUser',
      name: 'NewUser',
      component: NewUser
    }
  ]
})
