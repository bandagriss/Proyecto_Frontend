<template>
  <div class="fondo-contenido">
    <h1 class="title is-2">Mis Proyectos</h1>
    <router-link :to="{name: 'NuevoProyecto'}" class="button is-success is-rounded">
      Crear Nuevo &nbsp;
      <span class="icon">
        <icon name="plus" scale="1.5"></icon>
      </span>
    </router-link>
    <br/>
    <br/>
    <div class="field has-addons">
      <div class="control">
        <div class="select">
          <select name="country">
            <option>Recientes</option>
            <option>Completados</option>
            <option>Intervalos Fechas</option>
          </select>
        </div>
      </div>
      <div class="control">
        <button type="button" class="button is-primary">Listar</button>
      </div>
    </div>
    <ul v-for="(proyecto, key) in proyectos" :key="key">
        <li>{{ proyecto.nombre }}</li>
    </ul>
  </div>
</template>

<script>

import Mensajes from '../common/generals/js/Notificacion';
import http from '../common/generals/js/DataService';

export default {
  data() {
    return {
      financiadores: '',
      proyectos: {},
    };
  },
  components: {
  },
  notifications: Mensajes.mensajes,
   created() {
     http.get('proyecto').then((respuesta) => {
       this.proyectos = respuesta.datos;
     }).catch(error => this.Error(error));
  },
  methods: {
  },
};
</script>

<style>
 .color-amarillo {
   color: #209cee;
 }
 .color-rojo {
   color: #ff3860;
 }
 .fondo-contenido {
   /* background-color: white; */
   padding: 2px 10px 2px 10px;
 }
</style>
