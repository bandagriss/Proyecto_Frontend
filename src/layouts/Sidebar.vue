<template>
  <div id="sidebar" :class="activo? 'active' : ''">
    <div class="organizacion">
      <figure class="image is-256x256">
        <img src="../assets/imagenes/ceadl/logo-ceadl3.png">
      </figure>
    </div>
    <div class="marco-imagen">
      <div class="imagen-usuario">
        <figure class="image is-256x256 imagen-usuario">
          <template v-if="imagen_usuario">
            <img :src="imagen_usuario">
          </template>
          <template v-else>
            <img src="../assets/imagenes/ceadl/usuario_imagen.jpg">
          </template>

        </figure>
        <div class="datos-usuario">
          Rol: {{ r_user }}
          <br/>
          {{ nombre_usuario }}
        </div>
      </div>
    </div>
    <div id="menu-dinamico">
      <ul>
        <li
          v-if="r_user == 'Administrador' || r_user == 'Director' || r_user == 'Técnico'"
        >
          <router-link :to="{name:'Inicio'}">
          <span class="icon">
            <icon name="home" scale="1.5"></icon>
          </span>
          <span class="espacio">Inicio</span>
          </router-link>
        </li>
        <li><router-link :to="{name:'Financiadores'}">
          <span class="icon">
            <icon name="users" scale="1.5"></icon>
          </span>
          <span class="espacio">Financiadores</span>
        </router-link></li>
        <li><router-link :to="{name:'Proyectos'}">
          <span class="icon">
            <icon name="warehouse" scale="1.5"></icon>
          </span>
          <span class="espacio">Proyectos</span>
        </router-link></li>
        <li v-if="r_user == 'Administrador'">
          <a @click="activarSubMenu()">
          <span class="icon">
            <icon name="cogs" scale="1.5"></icon>
          </span>
          <span class="espacio">Configuración</span>
        </a>
        </li>
        <ul v-if="submenu" class="submenu">
          <li>
            <router-link :to="{name: 'Usuario'}">
              <span class="espacio-submenu"></span>
              <span class="icon">
                <icon name="users" scale="1.5"></icon>
              </span>
              <span class="espacio">Usuarios</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'Roles'}">
              <span class="espacio-submenu"></span>
              <span class="icon">
                <icon name="id-card" scale="1.5"></icon>
              </span>
              <span class="espacio">Roles</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'Departamento'}">
              <span class="espacio-submenu"></span>
              <span class="icon">
                <icon name="sitemap" scale="1.5"></icon>
              </span>
              <span class="espacio">Departamentos</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'Institucion'}">
              <span class="espacio-submenu"></span>
              <span class="icon">
                <icon name="italic" scale="1.5"></icon>
              </span>
              <span class="espacio">Instituciones</span>
            </router-link>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>

import EventBus from './event-bus';
import auth from '../auth';
import config from '../config';

export default {
  data() {
    return {
      activo: false,
      nombre_usuario: `${auth.user.nombres} ${auth.user.apellido_paterno ? auth.user.apellido_paterno : ''} ${auth.user.apellido_materno ? auth.user.apellido_materno : ''}`,
      r_user: auth.user.rol_nombre,
      submenu: false,
      imagen_usuario: auth.user.imagen_usuario ? `${config.API_REST}${auth.user.imagen_usuario}` : false,
    };
  },
  created() {
    EventBus.$on('menuClick', (activo) => {
      this.activo = activo;
    });
    EventBus.$on('cambiarImagen', () => {
      this.imagen_usuario = `${config.API_REST}${auth.user.imagen_usuario}`;
    });
  },
  methods: {
    activarSubMenu() {
      this.submenu = !this.submenu;
    },
    imagenUsuario() {
      return auth.user.imagen_usuario ? `${config.API_REST}${auth.user.imagen_usuario}` : false;
    },
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
   /* border-bottom:solid 1px white; */
   width:250px;
   cursor:pointer;
 }

 #menu-dinamico ul li:hover {
   background-color:#41b883;
   position:relative;
   color: white !important;
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

 .espacio-submenu {
   padding: 0px 0px 0px 25px;
 }

 /* segundo nivel */

 .menu-dinamico ul li ul li {
   background-color: #272c33;
   border-bottom: solid 1px gray;
   width: 250px;
   cursor: pointer;
   color: #41b883;
 }

 #menu-dinamico ul li ul li:hover {
   background-color: #41b883;
   position: relative;
   color: white;
 }

 #menu-dinamico ul li ul li a:hover {
   color: white !important;
 }

 /* .submenu {
    padding-left: 10px;
    } */

 /* fin submenu */

</style>
