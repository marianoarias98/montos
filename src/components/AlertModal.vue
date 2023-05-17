<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ props.title }}</h5>
        </div>
        <div class="modal-body">
          <p>{{ props.message }}.</p>
        </div>
        <div v-if="props.isAlert" class="modal-footer">
          <button type="button" class="btn btn-primary" @click.prevent="handleConfirm(true)">Aceptar</button>
          <button type="button" class="btn btn-secondary" @click.prevent="handleConfirm(false)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emits = defineEmits()
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  isAlert: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const handleConfirm = (confirmacion) => {
  emits('input', confirmacion)
  emits('hideAlert')
}
</script>