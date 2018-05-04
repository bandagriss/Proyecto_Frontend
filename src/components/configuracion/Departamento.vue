<template>
  <div>
    <!-- breadcrumb -->
    <div class="tile" style="background-color:white;">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">Configuración</a></li>
          <li class="is-active"><a href="#" aria-current="page">Departamentos</a></li>
        </ul>
      </nav>
    </div>
    <!-- breadcrumb -->
    <h1 class="title is-2"> Departamentos </h1>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="Identificador">ID</abbr></th>
          <th>Nombre</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="Identificador">ID</abbr></th>
          <th>Nombre</th>
          <th>Opciones</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(departamento, key) in departamentos" :key="key">
          <template>
          <td>{{ departamento.id }}</td>
          <td>{{ departamento.nombre }}</td>
          <td>
            <a class="color-edit">
              <span class="icon">
                <icon name="edit" scale="1.5" class="color-amarillo"></icon>
              </span>
            </a>
            <a>
              <span class="icon">
                <icon name="trash" scale="1.5" class="color-rojo"></icon>
              </span>
            </a>
          </td>
          </template>
        </tr>
      </tbody>
    </table>

  </div>

</template>

<script>

import Mensajes from '../../common/generals/js/Notificacion';
import http from '../../common/generals/js/DataService';


export default {
  data() {
    return {
      departamentos: '',
    };
  },
  notifications: Mensajes.mensajes,
  created() {
    http.get('departamentos')
      .then((respuesta) => {
        this.departamentos = respuesta.datos;
      })
      .catch((error) => {
        this.Error(error);
      });
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
</style>
