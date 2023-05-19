import { createRouter, createWebHistory } from 'vue-router'
import EgresosView from '../views/EgresosView.vue'
import IngresosView from '../views/IngresosView.vue'
import EgresosGeneral from '../views/EgresosGeneralView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: HomeView,
      component: HomeView
    },
    {
      path: '/egresos/colegio/:mes/:anio/:colegio',
      name: 'montosXColegio',
      component: EgresosView
    },
    {
      path: '/ingresos/:mes/:anio/:colegio',
      name: 'ingresos',
      component: IngresosView
    },
    {
      path: '/egresos/:mes/:anio',
      name: 'egresos',
      component: EgresosGeneral
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.name === 'montosXColegio') {
//   const mes = parseInt(to.params.mes)
//   const anio = parseInt(to.params.anio)
//   if (mes >= 1 && mes <= 12 && anio >= 2022 && anio <= 2024){
//     next()
//   }else{
//     alert('ERROR: el parametro mes o año no es correcto')
//     next(from)
//   }
// }else{
//   next()
// }
// })

export default router
