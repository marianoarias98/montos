<template>
  <div class="container">
    <div class="container-table bg-white">
      <div class="head d-flex mb-3 justify-content-end">
        <p class="mb-0">Filtrar listado por mes:</p>
        <input type="month" class="form-control" style="max-width: 220px; height: 36px;" v-model="fecha">
        <input type="text" class="form-control" placeholder="Buscar Colegio" style="max-width: 220px; height: 36px;" v-model="filtro">

      </div>
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
          <tr v-for="monto in montosFiltrados" :key="monto.id">
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
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import useMontos from '../stores/MontoStore'

const montosStore = useMontos()
const router = useRoute()

const mes = router.params.mes
const año = router.params.anio
const fecha = ref(`${año}-${mes.toString().padStart(2, '0')}`)
const filtro = ref('')

const montos = ref()

onMounted(async () => {
  montos.value = await montosStore.getAllMontos(mes, año);
  console.log(fecha)
})

const montosFiltrados = computed(() => {
  if (filtro.value === '') {
    return montos.value;
  } else {
    return montos.value.filter(monto => monto.nombre.toLowerCase().includes(filtro.value.toLowerCase()));
  }
});
</script>


<style scoped>
.container-table {
  padding: 30px;
  border-radius: 10px;
}

.icon {
  cursor: pointer;
}

.head {
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
</style>