<template>
  <div class="form-container">
    <form class="form">
      <h4 class="mb-3">Editar Montos</h4>
      <div class="mb-3">
        <label class="form-label">Detalle *</label>
        <select class="form-select" v-model="concepto">
          <option value="" disabled selected>Selecciona un detalle</option>
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

      <!-- <div class="mb-3">
        <label class="form-label">Mes *</label>
       <input type="month" class="form-control">
      </div> -->
      <div class="form-bottom mt-2">
        <div class="buttons">
          <button type="submit" class="btn btn-primary mr-2" @click.prevent="updateMonto">Editar</button>
          <button class="btn btn-secondary" @click="closeModal">Cancelar</button>
        </div>
        <p>* Campos obligarorios</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch} from 'vue'
import useMonto from '../stores/MontoStore';

const props = defineProps({
  conceptosList: {
    type: Array,
    required: true
  },
  ID: {
    type: Number,
    required: true
  }
})
const emits = defineEmits()
const montoStore = useMonto()
const concepto = ref(''), id = ref(''),personal = ref(''), patronal = ref(''), total = ref('')

onMounted(async () => {
  emits('handleLoading')
  const monto = await montoStore.getMontoByID(props.ID)
  id.value = monto.id
  personal.value = monto.personal
  patronal.value = monto.patronal
  concepto.value = monto.concepto_id
  emits('handleLoading')
})

const updateMonto = async () =>{
  emits('handleLoading')
  const response = await montoStore.updateMonto(id.value, concepto.value ,personal.value, patronal.value, total.value)
  emits('handleLoading')
}

watch([personal, patronal], () =>{
  total.value = parseFloat(personal.value) + parseFloat(patronal.value)
})


</script>

<style scoped>
.form{
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100vw;
  max-width: 500px;
  border-radius: 10px;
}

.buttons{
  display: flex;
  gap: 3px;
}
</style>