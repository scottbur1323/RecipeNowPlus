import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NewUser from '@/components/NewUser'
import Callback from '@/components/Callback'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
       path: '/Callback',
       name: 'Callback',
       component: Callback
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.name == 'callback') { // check if "to"-route is "callback" and allow access
//     next()
//   } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
//     next()
//   } else { // trigger auth0 login
//     router.app.$auth.login()
//   }
// })
//
// export default {router}
