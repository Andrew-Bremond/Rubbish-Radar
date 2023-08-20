import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserInput from '../views/UserInput.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
    {
      path:'/UserInput',
      name: 'UserInput',
      component: UserInput,
    },
  ]
})

export default router
