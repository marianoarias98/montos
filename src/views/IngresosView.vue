<template>
  <div class="grid">
    <TablaIngresos />
    <IngresosForm />
  </div>
</template>

<script setup>
import TablaIngresos from '../components/Ingresos/TablaIngresos.vue'
import IngresosForm from '../components/Ingresos/CrearIngresosForm.vue'
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }

  .inline {
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: auto;
  }
</style>