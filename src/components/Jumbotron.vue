<template>
  <div class="Jumbotron">
    <div>
      <h2 class="mb-3">Sistema de Rendiciones SAED</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque qui dicta est?</p>
      <div class="buttons">
        <button class="btn btn-outline-primary">Ver Ingresos</button>
        <button class="btn btn-outline-primary">Ver Egresos</button>
      </div>
    </div>
    <div>
      <img src="../assets/Logo.png" class="logo">
    </div>
  </div>
</template>

<style>
.Jumbotron {
  width: 100%;
  padding: 30px 60px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: center;
  margin-top: -30px;
  gap: 40px;
}

h2 {
  font-size: 4rem;
}

.logo{
  width: 100%;
}

.buttons{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 800px) {
  .Jumbotron{
    padding: 30px 0;
    grid-template-columns: 1fr;
  }

  .logo{
    margin: auto;
  }
}
</style>