<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->

    <sidebar></sidebar>
    <navbar></navbar>
    <div id="contenido" :class="activo? 'active' : ''">
      <router-view/>
    </div>
  </div>
</template>

<script>

import Navbar from '@/layouts/Navbar';
import Sidebar from '@/layouts/Sidebar';
import EventBus from './layouts/event-bus';

export default {
  name: 'App',
  data() {
    return {
      activo: false,
    };
  },
  components: {
    Navbar,
    Sidebar,
  },
  created() {
    EventBus.$on('menuClickContenido', (activo) => {
      /* console.log(`llega al container`); */
      this.activo = activo;
    });
  },
};
</script>

<style>
 #contenido {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   margin-top: 60px;
   position: relative;
   left: 290px;
   transition: all 200ms linear;
   background-color: red;
 }

 #contenido.active {
   left: 40px;
 }
</style>
