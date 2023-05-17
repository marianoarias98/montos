import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IngresosView from '../views/IngresosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/montos/5/2023/2',
    },
    {
      path: '/montos/:mes/:anio/:colegio',
      name: 'montos',
      component: HomeView
    },
    {
      path: '/ingresos',
      name: 'ingresos',
      component: IngresosView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'montos') {
  const mes = parseInt(to.params.mes)
  const anio = parseInt(to.params.anio)
  if (mes >= 1 && mes <= 12 && anio >= 2022 && anio <= 2024){
    next()
  }else{
    alert('ERROR: el parametro mes o año no es correcto')
    next(from)
  }
}else{
  next()
}
})

export default router
