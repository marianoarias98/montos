<template>
  <div class="grid">
    <CrearMontosForm :conceptosList="conceptos" @getMontos="getMontos" @handleLoading="handleLoading"/>
    <ListadoMontos :montosList="montos" @handleLoading="handleLoading" @getMontos="getMontos"/>
  </div>

  <div v-if="showLoading" class="modal">
    <Loading />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue'
import CrearMontosForm from '../components/CrearMontosForm.vue';
import ListadoMontos from '../components/ListadoMontos.vue';
import useConcepto from '../stores/ConceptoStore';
import useMonto from '../stores/MontoStore';

const conceptoStore =  useConcepto(), montoStore = useMonto();
const showLoading = ref(false)

const conceptos = ref()
let montos = ref([])

onMounted( async ()=>{
  conceptos.value = await conceptoStore.getConceptos()
  getMontos()
})

const handleLoading = () =>{
  showLoading.value = !showLoading.value
}

const agregarMontos = (nuevosMontos) =>{
 montos.value.push(nuevosMontos)
}

const getMontos = async () =>{
  handleLoading()
  montos.value = await montoStore.getMontos()
  handleLoading()
}

</script>

<style scoped>
.grid{
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  grid-auto-rows: auto;
}

@media (max-width:820px){
  .grid{
    grid-template-columns: 1fr;
  }
}
</style>