<template>
  <form class="form">
    <div class="mb-3">
      <label class="mb-2">Ingreso de Aportes</label>
      <input type="number" class="form-control" v-model="aporte">
    </div>
    <div class="mb-3">
      <label class="mb-2">Recibido de SPEP</label>
      <input type="number" class="form-control" v-model="spep">
    </div>
    <div class="d-flex justify-content-between">
      <button type="submit" class="btn btn-primary mb-2" @click.prevent="crearIngreso">Agregar</button>
      <p>* Campos obligarorios</p>
    </div>
  </form>
</template>

<script setup>
import useIngreso from '../../stores/IngresoStore';
import { ref } from 'vue';

const emits = defineEmits()

const IngresoStore = useIngreso()
const aporte = ref()
const spep = ref()

const props = defineProps({
  mes:{
    type: String,
    required: true
  },
  año: {
    type: String,
    required: true
  },
  colegio:{
    type: String,
    required: true
  },
})

const crearIngreso = async () =>{
  const response = await IngresoStore.crearIngreso(aporte.value, spep.value, props.mes, props.año, props.colegio)
  emits('reload')
}
</script>