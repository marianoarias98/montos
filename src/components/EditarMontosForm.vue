<template>
  <div class="form-container">
    <form class="form">
      <h4 class="mb-3">Editar Montos</h4>
      <div class="mb-3">
        <label class="form-label">Detalle *</label>
        <select class="form-select" v-model="concepto">
          <option value="" disabled selected>Selecciona un detalle</option>
          <option v-for="concepto in props.conceptosList" :key="concepto.id" :value="concepto"> {{ concepto.codigo
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
        <select class="form-select">
          <option value="" disabled selected>Selecciona un mes</option>
          <option v-for="mes in meses" :key="mes" value="">{{ mes }}</option>
        </select>
      </div>
      <div class="form-bottom mt-2">
        <div class="buttons">
          <button type="submit" class="btn btn-primary mr-2" @click.prevent="">Editar</button>
          <button class="btn btn-secondary" @click="closeModal">Cancelar</button>
        </div>
        <p>* Campos obligarorios</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits} from 'vue'

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
]
const props = defineProps({
  conceptosList: {
    type: Array,
    required: true
  },
})
const emits = defineEmits()

const closeModal = () =>{
  emits("editarMontosForm")
}
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