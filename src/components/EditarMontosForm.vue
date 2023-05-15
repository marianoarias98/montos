<template>
  <div class="form-container">
    <form class="form">
      <h4 class="mb-3">Editar Montos</h4>
      <div class="mb-3">
        <label class="form-label">Concepto *</label>
        <select class="form-select" v-model="concepto">
          <option value="" disabled selected>Selecciona un concepto</option>
          <option v-for="concepto in props.conceptosList" :key="concepto.id" :value="concepto.id"> {{ concepto.codigo
          }} {{ concepto.nombre }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Monto de Personal *</label>
        <input type="number" class="form-control" v-model="personal" min="0" max="1000000" required id="personal">
      </div>
      <div class="mb-3">
        <label class="form-label">Monto de Patronal *</label>
        <input type="number" class="form-control" v-model="patronal" min="0" max="1000000" required id="patronal">
      </div>
      <div class="mb-3">
        <label class="form-label">Monto Total: <span v-if="total != 0">${{ total }}</span></label>
      </div>

      <div class="mb-3">
        <label class="form-label">Mes *</label>
        <input type="month" class="form-control" v-model="fecha">
      </div>
      <div class="mb-3">
        <label class="form-label">Colegio *</label>
        <select class="form-select" v-model="colegio">
          <option value="" disabled selected>Selecciona un colegio</option>
          <option v-for="colegio in props.colegios" :key="colegio.id" :value="colegio.id"> {{ colegio.nombre }}
          </option>
        </select>
      </div>
      <div class="form-bottom mt-2">
        <div class="buttons">
          <button type="submit" class="btn btn-primary mr-2" @click.prevent="updateMonto">Editar</button>
          <button class="btn btn-secondary" @click.prevent="closeModal">Cancelar</button>
        </div>
        <p>* Campos obligatorios</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import useMonto from '../stores/MontoStore';

const props = defineProps({
  conceptosList: {
    type: Array,
    required: true
  },
  ID: {
    type: Number,
    required: true
  },
  colegios: {
    type: Array,
    required: true
  }
})
const emits = defineEmits()
const montoStore = useMonto()
const concepto = ref(''), id = ref(''), personal = ref(''), patronal = ref(''), total = ref(''), fecha = ref(), mes = ref(), año = ref(), colegio = ref()

onMounted(async () => {
  emits('handleLoading')
  const monto = await montoStore.getMontoByID(props.ID)
  id.value = monto.id
  personal.value = monto.personal
  patronal.value = monto.patronal
  concepto.value = monto.concepto_id
  colegio.value = monto.colegio_id
  fecha.value = `${monto.año}-${monto.mes.toString().padStart(2, '0')}`
  emits('handleLoading')
})

const updateMonto = async () => {
  const confirmacion = window.confirm('¿Estás seguro/a de que desea actualizar los montos?');

  if(confirmacion) {
  const fechaValues = fecha.value.split('-').map(value => parseInt(value))
  mes.value = fechaValues[1], año.value = fechaValues[0];
  emits('handleLoading')
  const response = await montoStore.updateMonto(id.value, concepto.value, colegio.value, personal.value, patronal.value, total.value, mes.value, año.value)
  emits('handleLoading')
  closeModal()
  }
}

watch([personal, patronal], () => {
  total.value = parseFloat(personal.value) + parseFloat(patronal.value)
})

const closeModal = () => {
  emits('ShowEditModal')
  emits('getMontos')
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