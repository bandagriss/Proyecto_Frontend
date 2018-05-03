<template>
  <div class="encima">
    <br/>
    <br/>
    <br/>
    <div class="container">
      <section class="hero fondo-paisaje is-large">
        <div class="hero-body fondo-color">
          <div class="container">
            <h1 class="title numero-grande has-text-centered">
              404
            </h1>
            <h2 class="title is-1 has-text-centered">
              Página no encontrada
            </h2>
            <div class="has-text-centered">
              <button
                class="button is-primary"
                @click="$router.go(-1)">
                <span class="icon">
                  <icon name="arrow-circle-left" class="icon-is-medium"></icon>
                </span>
                &nbsp;&nbsp; Volver atrás
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>
 .encima{
   position: fixed;
   top: 0px;
   left: 0px;
   background: #363636;
   width: 100%;
   height: 100%;
 }
 .letra-grande {
   font-size: 70px;
 }
 .numero-grande {
   font-size: 150px;
 }

 .fondo-paisaje {
   background-image: url('../assets/imagenes/paisaje.jpg');
   background-repeat: no-repeat;
   background-size: 100%;
 }
 .fondo-color {
   background-color: #ffffff;
   opacity: 0.9;
 }

 .fondo-color .container h1 {
   color: #209cee;
 }

 .fondo-color .container h2 {
   color: #209cee;
 }

</style>
