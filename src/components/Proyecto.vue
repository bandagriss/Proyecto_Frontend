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

    <table class="table is-hoverable is-fullwidth is-narrow">
      <thead>
        <tr>
          <th><abbr title="Identificador">ID</abbr></th>
          <th><abbr title="Nombre">Nombre</abbr></th>
          <th><abbr title="Opciones">Opciones</abbr></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="Identificador">ID</abbr></th>
          <th><abbr title="Nombre">Nombre</abbr></th>
          <th><abbr title="Opciones">Opciones</abbr></th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(proyecto, key) in proyectos" :key="key">
            <td>{{ key + 1 }}</td>
            <td>{{ proyecto.nombre }}</td>
            <td>
              <router-link
                :to="{name: 'ProyectoEditar', params: { proyecto_id: proyecto.id }}"
                class="button is-primary">
                Editar
              </router-link>
              <button
                class="button is-warning"
                @click="agregarPersonas(proyecto)">
                Agregar Personas al Proyecto
              </button>
            </td>
        </tr>
      </tbody>
    </table>
    <!-- modal nuevo -->
    <div class="modal" :class="modal_add_personas? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"> Financiador</p>
          <button class="delete" aria-label="close" @click="cerrarModalAddPersonas()"></button>
        </header>
        <section class="modal-card-body">
          <label class="label" for="">Miembros:</label>

          <label class="label" for="">Añadir:</label>
          <div class="columns">
            <div class="column is-4">
              <div class="field">
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <div class="select is-fullwidth">
                      <select name="role"
                              v-model="persona_selected">
                        <option
                          v-for="(persona, key) in personas"
                          :value="persona.id"
                          :key="key"
                        >
                          {{ persona.nombres }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4">
              <button class="button is-primary" @click="addPersona(persona_selected)">Añadir</button>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="guardar()">Guardar</button>
          <button class="button" @click="cerrarModalAddPersonas()">Cerrar</button>
        </footer>
      </div>
    </div>
    <!-- - -->
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
      modal_add_personas: false,
      personas: {},
      persona_selected: '',
      objeto: {},
    };
  },
  components: {
  },
  notifications: Mensajes.mensajes,
  created() {
    http.get('proyecto').then((respuesta) => {
      this.proyectos = respuesta.datos;
    }).catch(error => this.Error(error));

    http.get('usuarios').then((respuesta) => {
      this.personas = respuesta.datos;
    });
  },
  methods: {
    agregarPersonas(proyecto) {
      this.modal_add_personas = true;
      this.persona_selected = '';
      this.objeto = JSON.parse(JSON.stringify(proyecto));
    },
    cerrarModalAddPersonas() {
      this.modal_add_personas = false;
    },
    addPersona(id_persona) {
      if (id_persona != null) {
        const adicionar_persona = {};
        adicionar_persona.fid_proyecto = this.objeto.id;
        adicionar_persona.fid_persona = id_persona;
        console.log("===================>", adicionar_persona);
        http.post('proyecto_persona', adicionar_persona).then((respuesta) => {
          this.Success({ title: 'Añadido con éxito', message: respuesta.mensaje });
        }).catch(error => this.Error(error));
      } else {
        this.Error({ message: 'Selecciona una persona primero' });
      }
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
