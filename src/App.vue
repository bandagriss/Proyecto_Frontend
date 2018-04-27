<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->

    <sidebar></sidebar>
    <navbar></navbar>
    <div id="contenido" :class="activo? 'active' : ''">
      <div class="columns2">
        <div class="column2 marco-contenido">
          <router-view/>
        </div>
      </div>
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
   background-color: #e8e5e547;
   padding: 4px 4px 4px 4px;
 }

 @media screen and (max-width: 1920px) {
   #contenido {
     width: 82%;
   }
   #contenido.active {
     left: 30px;
     width: 96%
   }
 }

 @media screen and (max-width: 1600px) {
   #contenido {
     width: 80%;
   }
   #contenido.active {
     left: 30px;
     width: 96%
   }
 }

 @media screen and (max-width: 1368px) {
   #contenido {
     width: 76%;
   }
   #contenido.active {
     left: 30px;
     width: 96%
   }
 }


 @media screen and (max-width: 1216px) {
   #contenido {
     width: 68%;
   }
   #contenido.active {
     left: 20px;
     width: 96%
   }
 }

 @media screen and (max-width: 1023px) {
   #contenido {
     width: 38%;
   }
   #contenido.active {
     left: 20px;
     width: 95%;
   }
 }


 @media screen and (max-width: 768px) {
   #contenido {
     width: 50%;
   }

   #contenido.active {
     left: 20px;
     width: 91%;
   }

 }


</style>
