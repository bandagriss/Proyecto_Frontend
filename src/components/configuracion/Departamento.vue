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
    <button class="button is-success" @click="modalNuevo()">Crear</button>
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
            <a class="color-edit" @click="editarItem(departamento, key)">
              <span class="icon">
                <icon name="edit" scale="1.5" class="color-amarillo"></icon>
              </span>
            </a>
            <a @click="modalEliminar(departamento, key)">
              <span class="icon">
                <icon name="trash" scale="1.5" class="color-rojo"></icon>
              </span>
            </a>
          </td>
          </template>
        </tr>
      </tbody>
    </table>
    <!-- new  -->
    <div class="modal" :class="modal_nuevo_activado? 'is-active': ''">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ accion }} Departamento</p>
          <button class="delete" aria-label="close" @click="cerrarModalNuevo()"></button>
        </header>
        <section class="modal-card-body">
          <input
            class="input"
            type="text"
            placeholder="Nombre Departamento"
            v-model="objeto.nombre"
          />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="guardarItem(objeto)">Guardar</button>
          <button class="button"  @click="cerrarModalNuevo()">Cancel</button>
        </footer>
      </div>
    </div>
    <!-- fin new -->
    <!-- eliminar -->
    <div class="modal" :class="modal_eliminar? 'is-active': ''">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Eliminar</strong> <small>{{ objeto.nombre }}</small>
                  <br>
                  ¿Está seguro de Eliminar?
                </p>
                <center>
                  <button class="button is-danger" @click="eliminar()">Eliminar</button>
                  <button class="button" @click="cerrarModalEliminar()">Cancelar</button>
                </center>
              </div>
            </div>
          </article>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="cerrarModalEliminar()"
      ></button>
    </div>
    <!-- eliminar -->
  </div>

</template>

<script>

import Mensajes from '../../common/generals/js/Notificacion';
import http from '../../common/generals/js/DataService';


export default {
  data() {
    return {
      departamentos: '',
      modal_nuevo_activado: false,
      objeto: {},
      key: '',
      modal_eliminar: false,
      accion: '',
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
  methods: {
    modalNuevo() {
      this.modal_nuevo_activado = true;
      this.key = '';
      this.accion = 'Crear';
    },
    cerrarModalNuevo() {
      this.modal_nuevo_activado = false;
      this.objeto = {};
      this.key = '';
    },
    guardarItem(item) {
      const data = { nombre: this.objeto.nombre };

      if (item.id) {
        this.actualizar(item, data);
      } else {
        this.crear(data);
      }
    },
    crear(data) {
      http.post('departamentos', data)
        .then((respuesta) => {
          const nuevoDepartamento = {
            id: respuesta.datos.id,
            nombre: respuesta.datos.nombre,
          };
          this.departamentos.push(nuevoDepartamento);
          this.Success({ title: 'Guardado con éxito', message: respuesta.mensaje });
          this.modal_nuevo_activado = false;
          this.objeto = {};
          this.key = '';
        })
        .catch(error => this.Error(error));
    },
    actualizar(item, data) {
      http.put(`departamentos/${item.id}`, data)
        .then((respuesta) => {
          const nuevoDepartamento = {
            id: respuesta.datos.id,
            nombre: respuesta.datos.nombre,
          };
          this.departamentos.splice(this.key, 1, nuevoDepartamento);
          this.Success({ title: 'Actualizado con éxito', message: respuesta.mensaje });
          this.modal_nuevo_activado = false;
          this.objeto = {};
          this.key = '';
        })
        .catch(error => this.Error(error));
    },
    editarItem(item, key) {
      this.objeto = JSON.parse(JSON.stringify(item));
      this.modal_nuevo_activado = true;
      this.key = key;
      this.accion = 'Actualizar';
    },
    modalEliminar(item, key) {
      this.objeto = JSON.parse(JSON.stringify(item));
      this.modal_eliminar = true;
      this.key = key;
    },
    cerrarModalEliminar() {
      this.modal_eliminar = false;
      this.objeto = {};
      this.key = '';
    },
    eliminar() {
      http.deleted(`departamentos/${this.objeto.id}`)
        .then((respuesta) => {
          this.departamentos.splice(this.key, 1);
          this.Success({ title: 'Eliminado con éxito', message: respuesta.mensaje });
          this.modal_eliminar = false;
          this.objeto = {};
          this.key = '';
        }).catch(error => this.Error(error));
    },
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
