<template>
  <div class="conceptos-container">
    <div class="mb-4 mt-3">
      <h4>Listado de Montos: {{ props.mes }}/{{ props.anio }}</h4>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Concepto</th>
          <th scope="col">Personal</th>
          <th scope="col">Patronal</th>
          <th scope="col">Total</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="monto in props.montosList" :key="monto.id">
          <td>{{ monto.codigo }} {{ monto.nombre }}</td>
          <td>{{ monto.personal }}</td>
          <td>{{ monto.patronal }}</td>
          <td>{{ monto.total }}</td>
          <td>
            <a @click="editarMontos(monto.id)"><img src="../assets/Icons/EditIcon.svg" title="Editar"></a>
            <a @click="borrarMonto(monto.id)"><img src="../assets/Icons/DeleteIcon.svg" title="Borrar"></a>
          </td>
        </tr>
        <tr class="sumatorias" v-if="props.sumatorias !== undefined">
          <td>Total</td>
          <td>{{ props.sumatorias.suma_personal }}</td>
          <td>{{ props.sumatorias.suma_patronal }}</td>
          <td>{{ props.sumatorias.suma_total }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineEmits, } from 'vue';
import useMonto from '../stores/MontoStore';

const montoStore = useMonto()
const emits = defineEmits()


const props = defineProps({
  montosList: {
    type: Object,
    required: true
  },
  sumatorias: {
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
  }
})

const borrarMonto = async (id) => {
  emits('handleLoading')
  await montoStore.deleteMontos(id)
  emits('handleLoading')
  emits('getMontos')
}

const editarMontos = (id) => {
  emits('editarMontosForm', id);
}
</script>

<style scoped>
.conceptos-container {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
}

img {
  cursor: pointer;
}

.sumatorias td {
  font-weight: 500;
}
</style>