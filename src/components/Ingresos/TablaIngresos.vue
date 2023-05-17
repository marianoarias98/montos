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
          <th scope="row">Monto del Aporte y/o recibidos con cargos a la cuota Nº 3/2023</th>
          <td>$600000</td>
        </tr>
        <tr>
          <th scope="row">Monto recibido de SPEP</th>
          <td>$600000</td>
        </tr>
        <tr></tr>
        <tr>
          <th scope="row">Porcentage de aporte estatal:</th>
          <td>100%</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="empty">
      <p>Aun no se han registrado ingresos</p>
    </div>
  </div>
</template>

<script setup>
const lenght = 1;
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

.empty{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>