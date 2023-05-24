<template>
  <footer>
    <p class="text-center pt-4">© {{ añoActual }} - SAED Rendiciones</p>
  </footer>
</template>

<script setup>
const añoActual = new Date().getFullYear()
</script>
