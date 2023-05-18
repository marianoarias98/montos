<template>
  <div class="form-container">
    <form class="form">
      <h4 class="mb-3">Editar Ingresos</h4>
      <div class="mb-3">
        <label class="form-label">Ingreso de Aportes *</label>
        <input type="number" class="form-control" min="0" max="1000000" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Recibido de SPEP *</label>
        <input type="number" class="form-control" min="0" max="1000000" required>
      </div>
      <div class="form-bottom mt-2">
        <div class="buttons">
          <button type="submit" class="btn btn-primary mr-2">Editar</button>
          <button class="btn btn-secondary">Cancelar</button>
        </div>
        <p>* Campos obligatorios</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

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