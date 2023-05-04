import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/montos/5/2023',
    },
    {
      path: '/montos/:mes/:anio',
      name: 'montos',
      component: HomeView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'montos') {
  const mes = parseInt(to.params.mes)
  const anio = parseInt(to.params.anio)
  if (mes >= 1 && mes <= 12 && anio >= 2022 && anio <= 2023){
    next()
  }else{
    alert('ERROR: el parametro mes o año no es correcto')
    next(from)
  }
}
})

export default router
