<template>
  <div class="fondo-contenido">
    <h1 class="title is-2">Financiadores</h1>

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
          <th>Nombre</th>
          <th>Procedencia</th>
          <th>País Origen</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tfoot>
        <th><abbr title="Identificador">ID</abbr></th>
        <th>Nombre</th>
        <th>Procedencia</th>
        <th>País Origen</th>
        <th>Opciones</th>
      </tfoot>
      <tbody>
        <tr v-for="(financiador, key) in financiadores" :key="key">
          <template>
            <td>{{ financiador.id }}</td>
            <td>{{ financiador.nombre }}</td>
            <td>{{ financiador.procedencia }}</td>
            <td>{{ financiador.pais_origen }}</td>
            <td>
              <a @click="modalEditar(financiador, key)">
                <span class="icon">
                  <icon name="edit" scale="1.5" class="color-amarillo"></icon>
                </span>
              </a>
              <a @click="modalEliminar(financiador, key)">
                <span class="icon">
                  <icon name="trash" scale="1.5" class="color-rojo"></icon>
                </span>
              </a>
            </td>
          </template>
        </tr>
      </tbody>
    </table>

    <!-- modal nuevo -->
    <div class="modal" :class="modal_nuevo_activado? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ accion }} Financiador</p>
          <button class="delete" aria-label="close" @click="cerrarModalNuevo()"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns is-mobile">
            <div class="column is-12">
              <template v-if="imagenLogo">
                <center>
                  <img :src="rutaImagen" style="width:200px;height:200px;">
                  <br/>
                  <button @click="cambiarImagen"
                          class="button is-default"
                  >
                    Cambiar Imagen
                  </button>
                </center>
              </template>
              <template v-else>
                <picture-input
                  ref="pictureInput"
                  @change="onChanged"
                  @remove="onRemoved"
                  :width="200"
                  :removable="true"
                  removeButtonClass="ui red button"
                  :height="200"
                  accept="image/jpeg, image/png, image/gif"
                  buttonClass="ui button primary"
                  :customStrings="{
                       upload: '<h1>Upload it!</h1>',
                       drag: 'Arrastra tu imagen aqui'}">

                </picture-input>
                <center>
                  <button @click="attemptUpload"
                          v-bind:class="{ disabled: !image } "
                          class="button is-primary"
                  >
                    Subir Imagen
                  </button>
                </center>
              </template>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-6">
              <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                  <input class="input"
                         type="text"
                         placeholder="Nombre"
                         v-model="objeto.nombre"
                         @change="detectarCambios(objeto.nombre, 'nombre')"
                  />
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="field">
                <label class="label">Procedencia</label>
                <div class="control">
                  <input class="input"
                         type="text"
                         placeholder="Procedencia"
                         v-model="objeto.procedencia"
                         @change="detectarCambios(objeto.procedencia, 'procedencia')"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-12">
              <div class="field">
                <label class="label">Descripción</label>
                <div class="control">
                  <textarea class="textarea is-primary"
                            placeholder="e.j. Se dedica a ayudar a niños y niñas..."
                            v-model="objeto.descripcion"
                            @change="detectarCambios(objeto.descripcion, 'descripcion')"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-6">
              <div class="field">
                <label class="label">Fecha Fundación</label>
                <datepicker
                  placeholder="('m-d-Y')"
                  :config="{ dateFormat: 'm-d-Y',
                               static: true,
                               onOpen: this.detectarCambios(
                               objeto.fecha_fundacion,
                               'fecha_fundacion')
                               }"
                  v-model="objeto.fecha_fundacion"
                >
                </datepicker>
              </div>
            </div>
            <div class="column is-6">
              <div class="field">
                <label class="label">País Origen</label>
                <div class="control">
                  <input class="input"
                         type="text"
                         placeholder="País Origen"
                         v-model="objeto.pais_origen"
                         @change="detectarCambios(objeto.pais_origen, 'pais_origen')"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-mobile">
            <div class="column is-6">
              <div class="field">
                <label class="label">Visión</label>
                <div class="control">
                  <textarea class="textarea is-primary"
                            placeholder="e.j. Se dedica a ayudar a niños y niñas..."
                            v-model="objeto.vision"
                            @change="detectarCambios(objeto.vision, 'vision')"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="field">
                <label class="label">Misión</label>
                <div class="control">
                  <textarea class="textarea is-primary"
                            placeholder="e.j. Se dedica a ayudar a niños y niñas..."
                            v-model="objeto.mision"
                            @change="detectarCambios(objeto.mision, 'mision')"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="guardar()">Guardar</button>
          <button class="button" @click="cerrarModalNuevo()">Cerrar</button>
        </footer>
      </div>
    </div>
    <!-- fin modal nuevo  -->
    <!-- modal eliminar -->
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
    <!-- fin modal eliminar -->
  </div>
</template>

<script>

import PictureInput from 'vue-picture-input';
import Datepicker from 'vue-bulma-datepicker';
import Mensajes from '../common/generals/js/Notificacion';
import http from '../common/generals/js/DataService';
import config from '../config';


export default {
  data() {
    return {
      financiadores: '',
      modal_nuevo_activado: false,
      datos_ingresados: {},
      objeto: {},
      accion: '',
      key: '',
      modal_eliminar: false,
      image: '',
      imagenLogo: false,
      rutaImagen: '',
    };
  },
  components: {
    PictureInput,
    Datepicker,
  },
  notifications: Mensajes.mensajes,
  created() {
    http.get('financiador').then((respuesta) => {
      this.financiadores = respuesta.datos;
      this.Success({ message: respuesta.mensaje });
    }).catch((error) => {
      this.Error(error);
    });
  },
  methods: {
    modalNuevo() {
      this.modal_nuevo_activado = true;
      this.objeto = {};
      this.datos_ingresados = {};
      this.key = '';
      this.accion = 'Crear';
      this.image = '';
      this.imagenLogo = false;
      this.$refs.pictureInput.previewHeight = 200;
      this.$refs.pictureInput.previewWidth = 200;
    },
    modalEditar(item, key) {
      this.modal_nuevo_activado = true;
      this.objeto = JSON.parse(JSON.stringify(item));
      this.datos_ingresados = {};
      this.key = key;
      this.accion = 'Actualizar';
      this.imagenLogo = !!item.logo;
      if (this.imagenLogo) {
        this.rutaImagen = `${config.API_REST}${item.logo}`;
      } else {
        this.$refs.pictureInput.previewHeight = 200;
        this.$refs.pictureInput.previewWidth = 200;
      }
    },
    cerrarModalEliminar() {
      this.modal_eliminar = false;
    },
    cerrarModalNuevo() {
      this.modal_nuevo_activado = false;
      this.imagenLogo = false;
    },
    modalEliminar(item, key) {
      this.objeto = JSON.parse(JSON.stringify(item));
      this.modal_eliminar = true;
      this.key = key;
    },
    detectarCambios(dato, objeto) {
      this.datos_ingresados[objeto] = dato;
    },
    guardar() {
      if (this.objeto.id) {
        this.actualizar();
      } else {
        this.crear();
      }
    },
    crear() {
      http.post('financiador', this.datos_ingresados).then((respuesta) => {
        this.financiadores.push(respuesta.datos);
        this.Success({ title: 'Guardado con éxito', message: respuesta.mensaje });
        this.modal_nuevo_activado = false;
      }).catch(error => this.Error(error));
    },
    actualizar() {
      http.put(`financiador/${this.objeto.id}`, this.datos_ingresados).then((respuesta) => {
        this.financiadores.splice(this.key, 1, respuesta.datos);
        this.Success({ title: 'Actualizado con éxito', message: respuesta.mensaje });
        this.modal_nuevo_activado = false;
      });
    },
    eliminar() {
      http.deleted(`financiador/${this.objeto.id}`).then((respuesta) => {
        this.financiadores.splice(this.key, 1);
        this.Success({ title: 'Eliminado con éxito', message: respuesta.mensaje });
        this.modal_eliminar = false;
      }).catch(error => this.Error(error));
    },
    onChanged() {
      this.image = this.$refs.pictureInput.file;
    },
    onRemoved() {
      this.image = '';
    },
    attemptUpload() {
      if (this.image) {
        http.image('financiador/imagen', this.image)
          .then((respuesta) => {
            this.image = '';
            this.Success({ title: 'Imagen guardada', message: respuesta.mensaje });
            this.datos_ingresados.logo = respuesta.datos.replace('public/', '');
            this.imagenLogo = true;
            this.rutaImagen = `${config.API_REST}${this.datos_ingresados.logo}`;
            document.querySelector('.ui.red.button').click();
          })
          .catch(error => this.Error(error));
      }
    },
    cambiarImagen() {
      this.imagenLogo = false;
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
   /* background-color: white; */
   padding: 2px 10px 2px 10px;
 }
</style>
