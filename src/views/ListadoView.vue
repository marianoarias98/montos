<template>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import useMonto from '../stores/MontoStore';

const showLoading = ref(false)
const montosList = ref('')
const montoStore = useMonto()

onMounted(async() =>{
  showLoading.value = true
  montosList.value = await montoStore.getMontos()
  showLoading.value = false
})
</script>

<style scoped>

</style>