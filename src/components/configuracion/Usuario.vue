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
          <div class="columns is-mobile">
            <div class="column is-4">
              <div class="field">
                <label class="label" for="">Nombres</label>
                <div class="control">
                  <input
                    class="input"
                    :class="{ 'is-primary' : objeto.nombres, 'is-danger' : error.nombres }"
                    type="text"
                    placeholder="Nombres"
                    v-model="objeto.nombres"
                    @change="detectarCambios(objeto.nombres, 'nombres')"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label class="label" for="">Apellido Paterno</label>
                <div class="control">
                  <input
                    class="input"
                    :class="{
                           'is-danger' : error.apellido_paterno,
                           'is-primary' : objeto.apellido_paterno
                           }"
                    type="text"
                    placeholder=""
                    v-model="objeto.apellido_paterno"
                    @change="detectarCambios(objeto.apellido_paterno, 'apellido_paterno')"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label class="label" for="">Apellido Materno</label>
                <div class="control">
                  <input
                    class="input"
                    :class="{
                           'is-danger' : error.apellido_materno,
                           'is-primary' : objeto.apellido_materno
                           }"
                    type="text"
                    placeholder=""
                    v-model="objeto.apellido_materno"
                    @change="detectarCambios(objeto.apellido_materno, 'apellido_materno')"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-4">
              <div class="field">
                <label class="label" for="">Telefóno</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder=""
                    v-model="objeto.telefono"
                    @change="detectarCambios(objeto.telefono, 'telefono')"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label class="label" for="">Correo Electrónico</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder=""
                    v-model="objeto.correo"
                    @change="detectarCambios(objeto.correo, 'correo')"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label class="label" for="">Rol</label>
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <div class="select is-fullwidth">
                      <select name="role"
                              v-model="rol_selected"
                              @change="detectarCambios(rol_selected, 'fid_rol')">
                        <option
                          v-for="(rol, key) in roles"
                          :value="rol.id"
                          :key="key"
                        >
                          {{ rol.nombre }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-4">
              <div class="field">
                <label class="label" for="">Username</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder=""
                    v-model="objeto.username"
                    @change="detectarCambios(objeto.username, 'username')"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label class="label" for="">Carnet</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder=""
                    v-model="objeto.nro_carnet"
                    @change="detectarCambios(objeto.nro_carnet, 'nro_carnet')"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label class="label" for="">Institución</label>
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <div class="select is-fullwidth">
                      <select name="country"
                              v-model="institucion_selected"
                              @change="detectarCambios(institucion_selected, 'fid_institucion')"
                      >
                        <option
                          v-for="(institucion, key) in instituciones"
                          :value="institucion.id"
                          :key="key"
                        >
                          {{ institucion.nombre }}
                        </option>
                      </select>
                    </div>
                  </div>
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
                <strong>Eliminar</strong> <small>{{ objeto.nombres }}</small>
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

import Validacion from 'local_modules/validaciones';
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
      instituciones: '',
      institucion_selected: '',
      roles: '',
      rol_selected: '',
      datos_ingresados: {},
      error: {},
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
    // recuperamos instituciones
    http.get('institucion')
      .then((respuesta) => {
        this.instituciones = respuesta.datos;
      })
      .catch((error) => {
        this.Error(error);
      });

    // recuperamos los roles
    http.get('rol')
      .then((respuesta) => {
        this.roles = respuesta.datos;
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
      this.error = {};
      this.datos_ingresados = {};
    },
    cerrarModalNuevo() {
      this.modal_nuevo_activado = false;
      this.objeto = {};
      this.key = '';
    },
    guardarItem(item) {
      const data = this.datos_ingresados;
      if (item.id) {
        this.actualizar(item, data);
      } else {
        this.crear(data);
      }
    },
    crear(data) {
      const datoValidado = this.validar(data);
      if (datoValidado.valido === true) {
        this.error = {};
        http.post('usuarios', data)
          .then((respuesta) => {
            const nuevoUsuario = respuesta.datos;
            this.usuarios.push(nuevoUsuario);
            this.Success({ title: 'Guardado con éxito', message: respuesta.mensaje });
            this.limpiar();
          })
          .catch((error) => {
            this.Error(error);
          });
      } else {
        this.error = {};
        this.error[datoValidado.objeto] = true;
        this.Error({ title: 'Error al llenar el formulario', message: datoValidado.mensaje });
      }
    },
    actualizar(item, data) {
      http.put(`usuarios/${item.id}`, data)
        .then((respuesta) => {
          const nuevoUsuario = respuesta.datos;
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
      this.rol_selected = item.Rol.id;
      this.institucion_selected = item.Institucion.id;
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
      this.rol_selected = '';
      this.institucion_selected = '';
      this.datos_ingresados = {};
    },
    detectarCambios(dato, objeto) {
      this.error = {};
      this.datos_ingresados[objeto] = dato;
    },
    validar(data) {
      const datos = [
        { objeto: 'nombres', valor: data.nombres, nombre: 'Nombres', funcion: ['requerido'] },
        { objeto: 'apellido_paterno', valor: data.apellido_paterno, nombre: 'Apellido Paterno', funcion: ['requerido'] },
        { objeto: 'apellido_materno', valor: data.apellido_materno, nombre: 'Apellido Materno', funcion: ['requerido', 'numero'] },
      ];
      return Validacion.validar(Validacion, datos);
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
