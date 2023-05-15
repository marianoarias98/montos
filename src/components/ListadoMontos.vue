<template>
  <div class="conceptos-container">
    <div class="mb-4 mt-3 d-flex justify-content-between align-items-center">
      <div>
        <h4>Listado : {{ formattedMonth }} {{ props.anio }}</h4>
        <h5>{{ colegio_id }}- {{ coelgio_nombre }}</h5>
      </div>
      <div>
        <input type="text" class="form-control" placeholder="Buscar Concepto" v-model="search">
      </div>
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
          <td>{{ formatNumber(monto.personal) }}</td>
          <td>{{ formatNumber(monto.patronal) }}</td>
          <td>{{ formatNumber(monto.total) }}</td>
          <td>
            <a @click="editarMontos(monto.id)"><img src="../assets/Icons/EditIcon.svg" title="Editar"></a>
            <a @click="borrarMonto(monto.id)"><img src="../assets/Icons/DeleteIcon.svg" title="Borrar"></a>
          </td>
        </tr>
        <tr class="sumatorias" v-if="props.sumatorias !== undefined">
          <td>Total</td>
          <td>{{ formatNumber(props.sumatorias.suma_personal) }}</td>
          <td>{{ formatNumber(props.sumatorias.suma_patronal) }}</td>
          <td>{{ formatNumber(props.sumatorias.suma_total) }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="pagination mt-4" v-if="totalPages >= 2">
      <p>Pagina {{ currentPage }} de {{ totalPages }}</p>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }" @click="currentPage != 1 && currentPage--"><a
              class="page-link" href="#">Anterior</a></li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }"
            @click="currentPage != totalPages && currentPage++"><a class="page-link" href="#">Siguiente</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import useMonto from '../stores/MontoStore';
import useColegio from '../stores/ColegioStore';
import { watch, ref, computed, onMounted } from 'vue';

const montoStore = useMonto();
const colegioStore = useColegio();
const emits = defineEmits();
const colegio = ref();
const colegio_id = ref();
const coelgio_nombre = ref();
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
});

const montos = ref(props.montosList);
const search = ref('');
const currentPage = ref(1);
const itemsPerPage = 8;

const borrarMonto = async (id) => {
  const confirmacion = window.confirm('¿Estás seguro/a de que desea borrar los montos?');
  
  if (confirmacion) {
    emits('handleLoading');
    await montoStore.deleteMontos(id);
    emits('getMontos');
  }
  emits('handleLoading');
  }


const editarMontos = (id) => {
  emits('editarMontosForm', id);
};

watch(() => props.montosList, (newValue) => {
  montos.value = newValue;
  currentPage.value = 1; // Reset current page when montosList changes
})

onMounted(async () => {
  colegio.value = await colegioStore.getColegioById(props.colegio);
  colegio_id.value = colegio.value.id;
  coelgio_nombre.value = colegio.value.nombre;
})

// Filtrado de Montos por búsqueda
const filteredMontos = computed(() => {
  if (!search.value) {
    return montos.value;
  }
  const searchTerm = search.value.toLowerCase();
  return montos.value.filter(monto => monto.nombre.toLowerCase().includes(searchTerm));
})

// Paginación
const paginatedMontos = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredMontos.value.slice(startIndex, endIndex);
})

const totalPages = computed(() => Math.ceil(filteredMontos.value.length / itemsPerPage));

//format number
const formatNumber = (number) => {
  const formattedNumber = new Intl.NumberFormat('es-ES').format(number);
  return `$${formattedNumber}`;
}

const formatMonth = (month) =>{
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
  return `${months[month-1]}`
}

const formattedMonth = formatMonth(props.mes)
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