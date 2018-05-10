<template>
  <div class="fondo-contenido">
    <!-- breadcrumb -->
    <div class="tile" style="background-color:white;">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">Configuración</a></li>
          <li class="is-active"><a href="#" aria-current="page">Usuarios</a></li>
        </ul>
      </nav>
    </div>
    <!-- breadcrumb -->
    <h1 class="title is-2"> Usuarios </h1>
    <a class="button is-rounded is-success" @click="modalNuevo()">
      <span>Crear Nuevo</span>
      <span class="icon">
        <icon name="plus" scale="1.5"></icon>
      </span>
    </a>
    <br/>
    <br/>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="Identificador">ID</abbr></th>
          <th>Nombres</th>
          <th>Apellido Paterno</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Institución</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="Identificador">ID</abbr></th>
          <th>Nombres</th>
          <th>Apellido Paterno</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Institución</th>
          <th>Opciones</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(usuario, key) in usuarios" :key="key">
          <template>
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nombres }}</td>
            <td>{{ usuario.apellido_paterno }}</td>
            <td>{{ usuario.telefono }}</td>
            <td>{{ usuario.correo }}</td>
            <td>{{ usuario.Rol.nombre }}</td>
            <td>{{ usuario.Institucion.nombre }}</td>
            <td>
              <a class="color-edit" @click="editarItem(usuario, key)">
                <span class="icon">
                  <icon name="edit" scale="1.5" class="color-amarillo"></icon>
                </span>
              </a>
              <a @click="modalEliminar(usuario, key)">
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
          <p class="modal-card-title">{{ accion }} Usuario</p>
          <button class="delete" aria-label="close" @click="cerrarModalNuevo()"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label" for="">Nombre</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder=""
                v-model="objeto.nombre"
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="">Descripción</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder=""
                v-model="objeto.descripcion"
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="">Departamento</label>
            <div class="field has-addons">
              <div class="control is-expanded">
                <div class="select is-fullwidth">
                  <select name="country" v-model="selected">
                    <option
                      v-for="(departamento, key) in departamentos"
                      :value="departamento.id"
                      :key="key"
                    >
                      {{ departamento.nombre }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
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
      usuarios: '',
      modal_nuevo_activado: false,
      objeto: {},
      key: '',
      modal_eliminar: false,
      accion: '',
      departamentos: '',
      selected: '',
    };
  },
  notifications: Mensajes.mensajes,
  created() {
    http.get('usuarios')
      .then((respuesta) => {
        this.usuarios = respuesta.datos;
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
      this.selected = '';
    },
    cerrarModalNuevo() {
      this.modal_nuevo_activado = false;
      this.objeto = {};
      this.key = '';
    },
    guardarItem(item) {
      const data = {
        nombre: this.objeto.nombre,
        descripcion: this.objeto.descripcion,
        fid_departamento: this.selected,
      };

      if (item.id) {
        this.actualizar(item, data);
      } else {
        this.crear(data);
      }
    },
    crear(data) {
      http.post('usuarios', data)
        .then((respuesta) => {
          const nuevoUsuario = {
            id: respuesta.datos.id,
            nombre: respuesta.datos.nombre,
            descripcion: respuesta.datos.descripcion,
            Departamento: {
              id: respuesta.datos.Departamento.id,
              nombre: respuesta.datos.Departamento.nombre,
            },
          };

          this.usuarios.push(nuevoUsuario);
          this.Success({ title: 'Guardado con éxito', message: respuesta.mensaje });
          this.limpiar();
        })
        .catch(error => this.Error(error));
    },
    actualizar(item, data) {
      http.put(`usuarios/${item.id}`, data)
        .then((respuesta) => {
          const nuevoUsuario = {
            id: respuesta.datos.id,
            nombre: respuesta.datos.nombre,
            descripcion: respuesta.datos.descripcion,
            Departamento: {
              id: respuesta.datos.Departamento.id,
              nombre: respuesta.datos.Departamento.nombre,
            },
          };
          this.usuarios.splice(this.key, 1, nuevoUsuario);
          this.Success({ title: 'Actualizado con éxito', message: respuesta.mensaje });
          this.limpiar();
        })
        .catch(error => this.Error(error));
    },
    editarItem(item, key) {
      this.objeto = JSON.parse(JSON.stringify(item));
      this.modal_nuevo_activado = true;
      this.key = key;
      this.accion = 'Actualizar';
      this.selected = item.Departamento.id;
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
      http.deleted(`usuarios/${this.objeto.id}`)
        .then((respuesta) => {
          this.usuarios.splice(this.key, 1);
          this.Success({ title: 'Eliminado con éxito', message: respuesta.mensaje });
          this.limpiar();
        }).catch(error => this.Error(error));
    },
    limpiar() {
      this.modal_nuevo_activado = false;
      this.modal_eliminar = false;
      this.objeto = {};
      this.key = '';
      this.selected = '';
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
 .fondo-contenido {
   background-color: white;
   padding: 2px 10px 2px 10px;
 }
</style>
