<template>
  <div class="Ingresos-Table">
    <div class="d-flex justify-content-between">
      <h4>Ingreso mensual de *Nombre de Colegio*: </h4>
      <div v-if="!props.isEmpty">
        <a @click="showEditForm"><img src="../../assets/Icons/EditIcon.svg" title="Editar"></a>
      </div>
    </div>
  
    <table v-if="!props.isEmpty" class="table mt-4">
      <thead>
        <tr>
          <th scope="col">Concepto</th>
          <th scope="col">Importe</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Monto del Aporte y/o recibidos con cargos a la cuota Nº {{props.mes}}/{{ props.año }}</th>
          <td>{{ ingresos.monto_aporte }}</td>
        </tr>
        <tr>
          <th scope="row">Monto recibido de SPEP</th>
          <td>{{ ingresos.monto_spep }}</td>
        </tr>
        <tr></tr>
        <!-- <tr>
          <th scope="row">Porcentage de aporte estatal:</th>
          <td>100%</td>
        </tr> -->
      </tbody>
    </table>

    <div v-else class="empty">
      <p>Aun no se han registrado ingresos</p>
    </div>
    
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';

const emits = defineEmits()

const props = defineProps({
  ingresosList: {
    type: Object,
    required: true
  },
  isEmpty: {
    type: Boolean,
    required: true
  },
  mes:{
    type: String,
    required: true
  },
  año: {
    type: String,
    required: true
  }
})

const ingresos = ref(props.ingresosList)

watch(() => props.ingresosList, (newValue) => {
  ingresos.value = newValue
}) 

const showEditForm = () => {
  emits('showForm')
}
</script>

<style scoped>
.Ingresos-Table {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
}

img {
  cursor: pointer;
}

.empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>