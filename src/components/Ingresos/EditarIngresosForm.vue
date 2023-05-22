<template>
  <div class="form-container">
    <form class="form">
      <h4 class="mb-3">Editar Ingresos</h4>
      <div class="mb-3">
        <label class="form-label">Ingreso de Aportes *</label>
        <input v-model="aporte" type="number" class="form-control" min="0" max="1000000" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Recibido de SPEP *</label>
        <input v-model="spep" type="number" class="form-control" min="0" max="1000000" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Mes *</label>
        <input v-model="fecha" type="month" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Colegio *</label>
        <select class="form-select" v-model="colegio">
          <option disabled selected>Selecciona un colegio</option>
          <option v-for="colegio in colegios" :key="colegio.id" :value="colegio.id">{{ colegio.nombre }}</option>
        </select>
      </div>
      <div class="form-bottom mt-2">
        <div class="buttons">
          <button type="submit" class="btn btn-primary mr-2" @click.prevent="updateIngresos">Editar</button>
          <button class="btn btn-secondary" @click.prevent="hideForm">Cancelar</button>
        </div>
        <p>* Campos obligatorios</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import useColegio from '../../stores/ColegioStore';
import useIngreso from '../../stores/IngresoStore';

const colegioStore = useColegio()
const ingresoStore = useIngreso()
const emits = defineEmits()

const props = defineProps({
  ingresosList: {
    type: Object,
    required: true,
  },
})

const aporte = ref()
const spep = ref()
const fecha = ref()
const colegio = ref()
const colegios = ref()
const mes = ref()
const año = ref()

onMounted(async () => {
  emits('showLoading')
  aporte.value = props.ingresosList.monto_aporte
  spep.value = props.ingresosList.monto_spep  
  fecha.value = `${props.ingresosList.año}-${props.ingresosList.mes.toString().padStart(2, '0')}`
  colegio.value = props.ingresosList.colegio_id
  colegios.value = await colegioStore.getColegios()
  emits('showLoading')
})

const hideForm = () =>{
  emits('hideForm')
}

const updateIngresos = async () => {
  const fechaValues = fecha.value.split('-').map(value => parseInt(value))
  mes.value = fechaValues[1], año.value = fechaValues[0];
  const response = await ingresoStore.updateIngreso(props.ingresosList.id, aporte.value, spep.value, mes.value, año.value, colegio.value)
  emits('reload')
  hideForm()
}
</script>

<style scoped>
.form {
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100vw;
  max-width: 500px;
  border-radius: 10px;
}

.buttons {
  display: flex;
  gap: 3px;
}
</style>