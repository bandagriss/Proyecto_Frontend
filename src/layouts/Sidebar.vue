<template>

  <div id="sidebar" :class="activo? 'active' : ''">
    <div class="toggle-btn">
    </div>
    <div class="marco-imagen">
      <div class="imagen-usuario">
        <figure class="image is-256x256 imagen-usuario">
          <!-- <img src="https://images5.alphacoders.com/413/413842.jpg"> -->
          <img src="https://images5.alphacoders.com/413/413842.jpg">
        </figure>
      </div>
    </div>
    <div id="menu-dinammico">
      <ul>
        <li><router-link :to="{name:'Inicio'}">Inicio</router-link></li>
        <li><router-link :to="{name:'Otro'}">Acerca de</router-link></li>
        <li><router-link :to="{name:'Contactos'}">Contactos</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>

 import EventBus from './event-bus';

 /* EventBus.$on('menuClick', (activo) => {
  *   console.log(`actual this activo ${ this.activo}`);
  *   this.activo = activo;
  * }); */

 export default {
   data() {
     return {
       activo: false,
     };
   },
   created() {
     EventBus.$on('menuClick', (activo) => {
       this.activo = activo;
     });
   },
 };

</script>

<style>
 * {
   margin: 0px;
   padding: 0px;
   font-family: sans-serif;
 }

 #sidebar {
   position: fixed;
   width: 250px;
   height: 100%;
   background: #151719;
   left: 0px;
   transition: all 200ms linear;
 }

 #sidebar.active {
   left: -250px;
 }
 

 #sidebar ul li {
   color: rgba(230, 230, 230, 0.9);
   list-style: none;
   padding: 15px 10px;
   border-bottom: 1px solid rgba(100,100,100,0.3);
 }

 #sidebar ul li > a {
   color: rgba(230, 230, 230, 0.9);
 }

 #sidebar .toggle-btn {
   position: absolute;
   left: 280px;
   top: 20px;
 }

 #sidebar .toggle-btn span {
   display: block;
   width: 30px;
   height: 5px;
   background: #151719;
   margin: 3px 0px;
 }
 
 .router-link-active {
   display: block;
   background-color: #41b883;
   border-bottom: 1px solid rgba(100,100,100,0.3);
 }

 .marco-imagen {
   background: gray;
   display: flex;
   justify-content: center;
   align-items: center;
 }

 .imagen-usuario {
   background: red;
 }

</style>
