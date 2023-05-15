<template>
  <div class="form-container">
    <form class="form">
      <div class="mb-3">
        <label class="form-label">Concepto *</label>
        <select class="form-select" v-model="concepto" required>
          <option value="" disabled selected>Selecciona un concepto</option>
          <option v-for="concepto in props.conceptosList" :key="concepto.id" :value="concepto"> {{ concepto.codigo }} {{
            concepto.nombre }}
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
      <div class="form-bottom">
        <button type="submit" class="btn btn-primary mb-2" @click.prevent="handleSubmit">Agregar</button>
        <p>* Campos obligarorios</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import useConcepto from '../stores/ConceptoStore'
import useMonto from '../stores/MontoStore'

const emits = defineEmits()
const conceptoStore = useConcepto(), montoStore = useMonto()
const concepto = ref(''), personal = ref(''), patronal = ref(''), total = ref(0)


watch([personal, patronal], () => {
  total.value = personal.value + patronal.value
})

const props = defineProps({
  conceptosList: {
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

const validateForm = () => {
  if (!concepto.value) {
    alert('El campo "concepto" es obligatorio')
    return false
  }

  if(!personal.value && !patronal.value){
    alert('Debe completar al menos un monto')
    return false
  }
  if (personal.value === '') personal.value = 0
  if (patronal.value === '') patronal.value = 0
  return true
}

const handleSubmit = async () => {

  if (!validateForm()) {
    return
  }
  emits('handleLoading')
  await montoStore.crearMonto(concepto.value.id, props.colegio, personal.value, patronal.value, total.value, props.mes, props.anio, personal)
  emits('handleLoading')
  emits('getMontos')
  concepto.value = '', personal.value = '', patronal.value = '', total.value = 0
}

</script>

<style>
.form {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
}

.form-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

span {
  font-weight: bold;
}
</style>