import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Users from '../pages/Users.vue'
import Positions from '../pages/Positions.vue'
import Token from '../pages/Token.vue'
import CreateUser from '../pages/CreateUser.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/users', component: Users },
  { path: '/positions', component: Positions },
  { path: '/token', component: Token },
  { path: '/create-user', component: CreateUser }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router