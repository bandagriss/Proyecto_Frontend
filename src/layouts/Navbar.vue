<template>
  <div id="navbar-resize" :class="activo? 'active' : '' ">
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-burger burger"
             :class="burgerActive? '' : 'is-active'"
             data-target="navbarExampleTransparentExample"
             @click="menuToogle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navbarExampleTransparentExample"
           class="navbar-menu"
           :class="burgerActive? '' : 'is-active'">
        <div class="navbar-start">
          <a class="navbar-item" @click="menuGlobalEvento()">
            <icon name="outdent" scale="1.5" v-if="!activo"></icon>
            <icon name="indent" scale="1.5" v-else></icon>
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" :class="{ 'active' : activo, 'aumentando' : !burgerActive } ">
              <span class="icon">
                <icon name="user" scale="1.5"></icon>
              </span>
              <p v-html="usuarioCentrado"></p>
              <!-- <p>{{ usuario }}</p> -->
            </a>
            <div class="navbar-dropdown is-right" :class="activo? 'active' : '' ">
              <router-link :to="{name: 'DatosUsuario'}" class="navbar-item">
                Datos Personales
              </router-link>
              <a class="navbar-item"
               @click="logout">
                Cerrar Sessión
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import EventBus from './event-bus';
import auth from '../auth';

export default {
  data() {
    return {
      titulo: auth.user.institucion,
      burgerActive: false,
      usuario: auth.user.nombres,
      activo: false,
    };
  },
  computed: {
    usuarioCentrado() {
      if (this.usuario.length < 5) {
        return `&nbsp;&nbsp;&nbsp;${this.usuario}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
      }
      return `&nbsp;&nbsp;${this.usuario}`;
    },
  },
  methods: {
    menuToogle() {
      this.burgerActive = !this.burgerActive;
    },
    menuGlobalEvento() {
      this.activo = !this.activo;
      EventBus.$emit('menuClick', this.activo);
      EventBus.$emit('menuClickContenido', this.activo);
    },
    logout() {
      auth.logout();
    },
  },
};

</script>

<style>
 #navbar-resize {
   position: relative;
   left: 250px;
   transition: all 200ms linear;
 }

 #navbar-resize.active {
   left: 0px;
 }

 .navbar-link {
   left: -250px !important;
   transition: all 200ms linear;
 }

 .navbar-link.active {
   left: 0px !important;
 }


 @media only screen and (max-width: 1023px) {
   .navbar-link.aumentando {
     left: 0px !important;
   }
 }

 .navbar-dropdown {
   left: -250px !important;
   transition: all 200ms linear;
 }

 .navbar-dropdown.active {
   left: 0px !important;
 }


</style>
