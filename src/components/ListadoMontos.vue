<template>
  <div class="conceptos-container">
    <div class="mb-4 mt-3">
      <h4>Listado de Montos: {{ props.mes }}/{{ props.anio }}</h4>
      <h5>Colegio: {{ props.colegio }}</h5>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Concepto</th>
          <th scope="col">Personal</th>
          <th scope="col">Patronal</th>
          <th scope="col">Total</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="monto in paginatedMontos" :key="monto.id">
          <td>{{ monto.codigo }} {{ monto.nombre }}</td>
          <td>{{ monto.personal }}</td>
          <td>{{ monto.patronal }}</td>
          <td>{{ monto.total }}</td>
          <td>
            <a @click="editarMontos(monto.id)"><img src="../assets/Icons/EditIcon.svg" title="Editar"></a>
            <a @click="borrarMonto(monto.id)"><img src="../assets/Icons/DeleteIcon.svg" title="Borrar"></a>
          </td>
        </tr>
        <tr class="sumatorias" v-if="props.sumatorias !== undefined">
          <td>Total</td>
          <td>{{ props.sumatorias.suma_personal }}</td>
          <td>{{ props.sumatorias.suma_patronal }}</td>
          <td>{{ props.sumatorias.suma_total }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="pagination mt-4" v-if="totalPages >= 2">
      <p>Pagina {{ currentPage }} de {{ totalPages }}</p>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" @click="currentPage != 1 && currentPage--"><a class="page-link" href="#">Anterior</a></li>
          <li class="page-item" @click="currentPage != totalPages && currentPage++"><a class="page-link" href="#">Siguiente</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import useMonto from '../stores/MontoStore';
import { watch, ref, computed } from 'vue';

const montoStore = useMonto()
const emits = defineEmits()


const props = defineProps({
  montosList: {
    type: Array,
    required: true,
    default: () => []
  },
  sumatorias: {
    type: Object,
    required: true
  },
  mes: {
    type: String,
    required: true
  },
  anio: {
    type: String,
    required: true
  },
  colegio: {
    type: String,
    required: true
  }
})

const montos = ref(props.montosList)

const borrarMonto = async (id) => {
  emits('handleLoading')
  await montoStore.deleteMontos(id)
  emits('handleLoading')
  emits('getMontos')
}

const editarMontos = (id) => {
  emits('editarMontosForm', id);
}

watch(() => props.montosList, (newValue) => {
  montos.value = newValue;
});

//pagination
const itemsPerPage = 10;
const currentPage = ref(1);

const paginatedMontos = computed(() => {
  const startIndex = (currentPage.value - 1 ) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return montos.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(montos.value.length / itemsPerPage));

</script>

<style scoped>
.conceptos-container {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
}

img {
  cursor: pointer;
}

.sumatorias td {
  font-weight: 500;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>