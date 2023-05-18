<template>
  <div class="grid">
    <TablaIngresos :ingresosList="ingresos" :isEmpty="isEmpty" :mes="mes" :año="año" @showForm="handleEditForm"/>
    <div v-if="isEmpty">
      <IngresosForm :mes="mes" :año="año" :colegio="colegio" @reload="getIngresos" />
    </div>

    <div v-if="showEditForm" class="modal">
      <EditarIngresosForm />
    </div>

    <div v-if="showLoading" class="modal">
      <Loading />
    </div>
  </div>
</template>

<script setup>
import TablaIngresos from '../components/Ingresos/TablaIngresos.vue'
import IngresosForm from '../components/Ingresos/CrearIngresosForm.vue'
import EditarIngresosForm from '../components/Ingresos/EditarIngresosForm.vue'
import Loading from '../components/Loading.vue';
import useIngresos from '../stores/IngresoStore';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute()
const IngresoStore = useIngresos()

const mes = route.params.mes
const año = route.params.anio
const colegio = route.params.colegio

const isEmpty = ref(true)
const ingresos = ref({})

const showLoading = ref(false)
const showEditForm = ref(false)

onMounted(async () => {
  getIngresos()
})

const getIngresos = async () => {
  handleLoading()
  ingresos.value = await IngresoStore.getIngresos(mes, año, colegio)
  isEmpty.value = Object.keys(ingresos.value).length == 0

  if (!isEmpty.value) {
    const grid = document.getElementsByClassName('grid')[0];
    grid.classList.add('inline');
  }

  handleLoading()
}

const handleLoading = () =>{
  showLoading.value = !showLoading.value
}

const handleEditForm = () =>{
  showEditForm.value = !showEditForm.value
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.inline {
  grid-template-columns: 1fr;
}
</style>