<template>
  <div class="grid">
    <CrearMontosForm :conceptosList="conceptos" @getMontos="getMontos" @handleLoading="handleLoading" :mes="props.mes" :anio="props.anio"/>
    <ListadoMontos :montosList="montos" @handleLoading="handleLoading" @getMontos="getMontos" @editarMontosForm="editarMontosForm" :mes="props.mes" :anio="props.anio"/>
  </div>

  <div v-if="showLoading" class="modal">
    <Loading />
  </div>

  <div v-if="showEditarMontosForm" class="modal modalEdit">
    <EditarMontosForm @handleLoading="handleLoading" :conceptos-list="conceptos" :ID="montoID" />
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
import EditarMontosForm from '../components/EditarMontosForm.vue';

const conceptoStore =  useConcepto(), montoStore = useMonto()
const route = useRoute()
const showLoading = ref(false)
const showEditarMontosForm = ref(false)

const conceptos = ref()
let montos = ref([])
const montoID = ref('')

const props = defineProps({
  mes: String,
  anio: String
})

onMounted( async ()=>{
  conceptos.value = await conceptoStore.getConceptos()
  getMontos()
  props.mes = route.params.mes
  props.anio = route.params.anio
})

const handleLoading = () =>{
  showLoading.value = !showLoading.value
}

const getMontos = async () =>{
  handleLoading()
  montos.value = await montoStore.getMontos(props.mes, props.anio)
  handleLoading()
}

const editarMontosForm = (id) =>{
  showEditarMontosForm.value =!showEditarMontosForm.value
  montoID.value = id
}

</script>

<style scoped>
.grid{
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  grid-auto-rows: auto;
}

.modalEdit{
  z-index: 100;
}

@media (max-width:820px){
  .grid{
    grid-template-columns: 1fr;
  }
}
</style>