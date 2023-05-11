<template>
  <div class="grid">
    <CrearMontosForm :conceptosList="conceptos" @getMontos="getMontos" @handleLoading="handleLoading" :mes="mes" :anio="año" :colegio="colegio" />
    <ListadoMontos :montosList="montos.montos" @handleLoading="handleLoading" @getMontos="getMontos"
      @editarMontosForm="editarMontosForm" :mes="mes" :anio="año" :colegio="colegio" :sumatorias="sumatorias" />
  </div>

  <div v-if="showLoading" class="modal">
    <Loading />
  </div>

  <div v-if="showEditarMontosForm" class="modal modalEdit">
    <EditarMontosForm @handleLoading="handleLoading" :conceptos-list="conceptos" :ID="montoID" :colegios="colegios" @ShowEditModal="ShowEditModal" @getMontos="getMontos"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '../components/Loading.vue'
import CrearMontosForm from '../components/CrearMontosForm.vue';
import ListadoMontos from '../components/ListadoMontos.vue';
import useConcepto from '../stores/ConceptoStore';
import useMonto from '../stores/MontoStore';
import useColegio from '../stores/ColegioStore';
import EditarMontosForm from '../components/EditarMontosForm.vue';

const conceptoStore = useConcepto(), montoStore = useMonto(), colegioStore = useColegio()
const route = useRoute()
const showLoading = ref(false)
const showEditarMontosForm = ref(false)
const sumatorias = ref()

const conceptos = ref()
const colegios = ref()
const montos = ref([])
const montoID = ref('')

const mes = route.params.mes
const año = route.params.anio
const colegio = route.params.colegio

onMounted(async () => {
  conceptos.value = await conceptoStore.getConceptos()
  colegios.value = await colegioStore.getColegios()
  getMontos()
})

const handleLoading = () => {
  showLoading.value = !showLoading.value
}

const getMontos = async () => {
  handleLoading()
  montos.value = await montoStore.getMontos(mes, año, colegio)
  sumatorias.value = montos.value.sumatorias[0]
  handleLoading()
}

const editarMontosForm = (id) => {
  ShowEditModal()
  montoID.value = id
}

const ShowEditModal = () =>{
  showEditarMontosForm.value = !showEditarMontosForm.value
}

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  grid-auto-rows: auto;
}

.modalEdit {
  z-index: 100;
}

@media (max-width:820px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>