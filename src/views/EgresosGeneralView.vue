<template>
  <div class="container">
    <div class="container-table bg-white">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Colegio</th>
            <th scope="col">Personal</th>
            <th scope="col">Patronal</th>
            <th scope="col">Total</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="monto in montos" :key="monto.id">
            <td>{{ monto.colegio_id }}</td>
            <td scope="row">{{ monto.nombre }}</td>
            <td>{{ monto.sum_personal }}</td>
            <td>{{ monto.sum_patronal }}</td>
            <td>{{ monto.sum_total }}</td>
            <td>
              <RouterLink :to="`/egresos/colegio/${mes}/${año}/${monto.colegio_id}`">
                <img src="../assets/Icons/ShowIcon.svg" class="icon" title="Ver">
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useMontos from '../stores/MontoStore'

const montosStore = useMontos()
const router = useRoute()

const mes = router.params.mes
const año = router.params.anio

const montos = ref()

onMounted(async ()=>{
  montos.value = (await montosStore.getAllMontos(mes, año))
})
</script>

<style scoped>
.container-table {
  padding: 30px;
  border-radius: 10px;
}

.icon{
  cursor: pointer;
}
</style>