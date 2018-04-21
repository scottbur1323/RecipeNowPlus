import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NewUser from '@/components/NewUser'
import Home from '@/components/Home'
import SearchMeals from '@/components/SearchMeals'
import GroceryList from '@/components/GroceryList'

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
    },
    {
      path: '/SearchMeals',
      name: 'SearchMeals',
      component: SearchMeals
    },
    {
      path: '/GroceryList',
      name: 'GroceryList',
      component: GroceryList
    }
  ]
})
