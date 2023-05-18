<template>
  <div class="Ingresos-Table">
    <div class="d-flex justify-content-between">
      <h4>Ingreso mensual de *Nombre de Colegio*: </h4>
      <div v-if="lenght">
        <a><img src="../../assets/Icons/EditIcon.svg" title="Editar"></a>
      </div>
    </div>
  
    <table v-if="lenght" class="table mt-4">
      <thead>
        <tr>
          <th scope="col">Concepto</th>
          <th scope="col">Importe</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Monto del Aporte y/o recibidos con cargos a la cuota Nº {{mes}}/{{ año }}</th>
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
import { ref } from 'vue';
import useIngreso from '../../stores/IngresoStore';

const ingresoStore = useIngreso()

import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import useIngresos from '../../stores/IngresoStore/'

const route = useRoute()
const IngresoStore = useIngresos()

const mes = route.params.mes
const año = route.params.anio
const colegio = route.params.colegio

const ingresos = ref(null)
const lenght = ref(0)
onMounted(async () =>{
  ingresos.value = await IngresoStore.getIngresos(mes, año, colegio)
  lenght.value = Object.keys(ingresos.value).length;
})

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