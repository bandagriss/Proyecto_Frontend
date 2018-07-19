<template>
  <div class="fondo-contenido">
    <h1 class="title is-2">Editar Usuario</h1>
    <!-- añadir imagen de usuario -->
    <div class="columns">
      <div class="column is-12">
        <template v-if="imagenUsuario">
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
    <!-- fin imagen usuario -->
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Nombres</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              v-model="objeto.nombres"
              @change="detectarCambios(objeto.nombres, 'nombres')"
            />
          </p>
        </div>
        <div class="field-label is-normal">
          <label class="label">Apellido Paterno</label>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              v-model="objeto.apellido_paterno"
              @change="detectarCambios(objeto.apellido_paterno, 'apellido_paterno')"
            />
          </p>
        </div>
        <div class="field-label is-normal">
          <label class="label">Apellido Materno</label>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              v-model="objeto.apellido_materno"
              @change="detectarCambios(objeto.apellido_materno, 'apellido_materno')"
            />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Genero</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select
                v-model="objeto.genero"
                @change="detectarCambios(objeto.genero, 'genero')"
              >
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field-label is-normal">
          <label class="label">Fecha de Nacimiento</label>
        </div>
        <div class="field">
          <datepicker
            placeholder="('m-d-Y')"
            :config="{ dateFormat: 'm-d-Y',
                         static: true,
                         onOpen: this.detectarCambios(
                         objeto.fecha_nacimiento,
                         'fecha_nacimiento')
                         }"
            v-model="objeto.fecha_nacimiento"
          >
          </datepicker>
        </div>
        <div class="field-label is-normal">
          <label class="label">Nro Carnet</label>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              v-model="objeto.nro_carnet"
              @change="detectarCambios(objeto.nro_carnet, 'nro_carnet')"
            />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Dirección</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              v-model="objeto.direccion"
              @change="detectarCambios(objeto.direccion, 'direccion')"
            />
          </p>
        </div>
        <div class="field-label is-normal">
          <label class="label">Teléfono ó Celular</label>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              v-model="objeto.telefono"
              @change="detectarCambios(objeto.telefono, 'telefono')"
            />
          </p>
        </div>
        <div class="field-label is-normal">
          <label class="label">Correo Electrónico</label>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              v-model="objeto.correo"
              @change="detectarCambios(objeto.correo, 'correo')"
            />
          </p>
        </div>
      </div>
    </div>
    <!--  cambiar contraseña -->
    <section class="accordions">
      <article class="accordion" :class="mostrarCambiarPassword? 'is-active' : ''">
        <div class="accordion-header">
          <div align="center">
            <p>Cambiar Contraseña</p>
          </div>
          <button class="toggle" aria-label="toggle" @click="accordionContraseña()"></button>
        </div>
        <div class="accordion-body">
          <div class="accordion-content">
            <div class="notification is-warning">
              <strong>Nota:</strong>
              Solo se cambiará la contraseña si llena los tres campos.
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Contraseña Actual</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input
                      class="input"
                      type="password"
                      v-model="antiguaContrasena"
                      @change="detectarCambios(antiguaContrasena, 'antiguaContrasena')"
                    />
                  </p>
                </div>
                <div class="field-label is-normal">
                  <label class="label">Nueva Contraseña</label>
                </div>
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input
                      class="input"
                      type="password"
                      v-model="nuevaContrasena"
                      @change="detectarCambios(nuevaContrasena, 'nuevaContrasena')"
                    />
                  </p>
                </div>
                <div class="field-label is-normal">
                  <label class="label">Confirmar Contraseña</label>
                </div>
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input
                      class="input"
                      type="password"
                      v-model="confirmarContrasena"
                      @change="detectarCambios(confirmarContrasena, 'confirmarContrasena')"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
    <!-- fin cambiar contraseña -->
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a class="button is-info" @click="actualizarUsuario()">
          Guardar
        </a>
      </p>
      <p class="control">
        <a class="button is-light" @click="cancelar()">
          Cancelar
        </a>
      </p>
    </div>

  </div>
</template>

<script>

import PictureInput from 'vue-picture-input';
import Datepicker from 'vue-bulma-datepicker';
import router from '../../router';
import Mensajes from '../../common/generals/js/Notificacion';
import http from '../../common/generals/js/DataService';
import config from '../../config';
import auth from '../../auth';
import EventBus from '../../layouts/event-bus';

export default {
  data() {
    return {
      objeto: {},
      datos_ingresados: {},
      imagenUsuario: false,
      image: '',
      mostrarCambiarPassword: false,
      antiguaContrasena: '',
      nuevaContrasena: '',
      confirmarContrasena: '',
    };
  },
  components: {
    Datepicker,
    PictureInput,
  },
  notifications: Mensajes.mensajes,
  created() {
    http.get(`usuarios/${localStorage.getItem('id')}`).then((respuesta) => {
      this.objeto = respuesta.datos;
      if (respuesta.datos.imagen !== null) {
        this.imagenUsuario = true;
        this.rutaImagen = `${config.API_REST}${respuesta.datos.imagen}`;
      }
    }).catch(error => this.Error(error));
  },
  methods: {
    detectarCambios(dato, objeto) {
      this.datos_ingresados[objeto] = dato;
    },
    cancelar() {
      router.push('/proyectos');
    },
    onChanged() {
      this.image = this.$refs.pictureInput.file;
    },
    onRemoved() {
      this.image = '';
    },
    cambiarImagen() {
      this.imagenUsuario = false;
    },
    attemptUpload() {
      if (this.image) {
        http.image('usuario/imagen', this.image)
          .then((respuesta) => {
            this.image = '';
            this.Success({ title: 'Imagen guardada', message: respuesta.mensaje });
            this.datos_ingresados.imagen = respuesta.datos.replace('public/', '');
            this.imagenUsuario = true;
            this.rutaImagen = `${config.API_REST}${this.datos_ingresados.imagen}`;
            document.querySelector('.ui.red.button').click();
          })
          .catch(error => this.Error(error));
      }
    },
    actualizarUsuario() {
      http.put(`usuarios/${localStorage.getItem('id')}`, this.datos_ingresados)
        .then((respuesta) => {
          this.Success({ title: 'Actualizado con éxito', message: respuesta.mensaje });
          if (respuesta.datos.imagen !== null) {
            auth.user.imagen_usuario = respuesta.datos.imagen;
            localStorage.removeItem('imagen_usuario');
            localStorage.setItem('imagen_usuario', auth.user.imagen_usuario);
            EventBus.$emit('cambiarImagen', this.activo);
            router.push('/proyectos');
          }
        }).catch(error => this.Error(error));
    },
    accordionContraseña() {
      this.mostrarCambiarPassword = !this.mostrarCambiarPassword;
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
