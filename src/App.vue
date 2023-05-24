<template>
  <Navbar />
  <div class="container pt-4">
    <RouterView />
  </div>

  <Footer />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped></style>
