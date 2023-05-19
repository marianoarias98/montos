<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="../assets/Logo.jpg" alt="saed logo" class="logo">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="/">Inicio</a>
          <RouterLink :to="`/egresos/${mes}/${anio}`">
            <a class="nav-item nav-link" href="#">Egresos</a>
          </RouterLink>
          <RouterLink :to="`/ingresos/${mes}/${anio}/2`">
            <a class="nav-item nav-link" href="#">Ingresos</a>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const [anio, mes] = new Date().toISOString().slice(0, 7).split('-').map(Number).map(String);

</script>

<style scoped>
.logo {
  width: 34px;
}
</style>