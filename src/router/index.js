import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Error404 from '../views/404View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/montos/mes=:mes-:anio',
      name: 'montos',
      component: HomeView,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: Error404
    },
  ]
})

export default router
