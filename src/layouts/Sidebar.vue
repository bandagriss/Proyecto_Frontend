<template>
  <div id="sidebar" :class="activo? 'active' : ''">
    <div class="organizacion">
      <h1 class="is-size-1 has-text-white has-text-centered has-text-weight-normal">CEADL</h1>
    </div>
    <div class="marco-imagen">
      <div class="imagen-usuario">
        <figure class="image is-256x256 imagen-usuario">
          <img src="https://images5.alphacoders.com/413/413842.jpg">
        </figure>
        <div class="datos-usuario">
          Nivel: {{ rol_usuario }}
          <br/>
          {{ nombre_usuario }}
        </div>
      </div>
    </div>
    <div id="menu-dinamico">
      <ul>
        <li><router-link :to="{name:'Inicio'}">
          <span class="icon">
            <icon name="home" scale="1.5"></icon>
          </span>
        <span class="espacio">Inicio</span>
        </router-link></li>
        <li><router-link :to="{name:'Otro'}">
          <span class="icon">
            <icon name="users" scale="1.5"></icon>
          </span>
          <span class="espacio">Financiadores</span>
          </router-link></li>
        <li><router-link :to="{name:'Contactos'}">
          <span class="icon">
            <icon name="credit-card" scale="1.5"></icon>
          </span>
          <span class="espacio">Proyectos</span>
        </router-link></li>
        <li><router-link :to="{name:'Contactos'}">
          <span class="icon">
            <icon name="cogs" scale="1.5"></icon>
          </span>
          <span class="espacio">Configuración</span>
        </router-link>
          <ul>
              <li>Usuarios</li>
              <li>Roles</li>
              <li>Departamentos</li>
              <li>Instituciones</li>
          </ul>
        </li>
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
      nombre_usuario: 'Naruto Uzumaki',
      rol_usuario: 'Administrador',
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
   background: #272c33;
   left: 0px;
   transition: all 200ms linear;
 }

 #sidebar.active {
   left: -250px;
 }

 .router-link-active {
   display: block;
   background-color: #41b883;
   color: white !important;
   width: 250px;
   border-bottom: 1px solid rgba(100,100,100,0.3);
 }

 .marco-imagen {
   background: gray;
   display: flex;
   justify-content: center;
   align-items: center;
 }

 .imagen-usuario {
   background: black;
 }

 #menu-dinamico ul, #menu-dinamico ul li{
   margin: 0;
   padding: 0;
   list-style: none;
   padding: 0px 0px 0px 0px;
 }

 #menu-dinamico ul li{
   background-color:#272c33;
   border-bottom:solid 1px white;
   width:250px;
   cursor:pointer;
 }

 #menu-dinamico ul li:hover{
   background-color:#41b883;
   position:relative;
 }

 #menu-dinamico ul li a:hover{
   color: white;
 }

 #menu-dinamico ul li a{
   color:#41b883;
   display:block;
   text-decoration:none;
   padding: 20px 20px;
 }

 /**** SECOND LEVEL MENU ****/

 #menu-dinamico ul li ul{
   position:absolute;
   display:none;
 }


 #menu-dinamico ul li:hover ul{
   left:150px;
   top:0px;
   display:block;
 }

 /* we apply different background color to 2nd level menu items*/
 #menu-dinamico ul li ul li{
   background-color:#272c33;
 }

 /* We change the background color for the level 2 submenu when hovering the menu */
 #menu-dinamico ul li:hover ul li:hover{
   background-color:#41b883;
 }

 /* We style the color of level 2 links */
 #menu-dinamico ul li ul li a{
   color:#454444;
   display:inline-block;
   width:120px;
 }

 /**** THIRD LEVEL MENU ****/
 /* We need to hide the 3rd menu, when hovering the first level menu */
 #menu-dinamico ul li:hover ul li ul{
   position:absolute;
   display:none;
 }

 /* We show the third level menu only when they hover the second level menu parent */
 #menu-dinamico ul li:hover ul li:hover ul{
   display:block;
   left:150px;
   top:0;
 }

 /* We change the background color for the level 3 submenu*/
 #menu-dinamico ul li:hover ul li:hover ul li{
   background:#86d3fa;
 }

 /* We change the background color for the level 3 submenu when hovering the menu */

 #menu-dinamico ul li:hover ul li:hover ul li:hover{
   background:#358ebc;
 }

 /* We change the level 3 link color */
 #menu-dinamico ul li:hover ul li:hover ul li a{
   color:#ffffff;
 }


 /* Clear float */
 .clear{
   clear:both;
 }

 .datos-usuario {
   color: white;
   text-align: center;
 }

 .espacio {
   padding: 0px 0px 0px 10px;
 }


</style>
