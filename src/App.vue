<template>
  <Navbar />
  <div class="container pt-4">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<style scoped>

</style>
