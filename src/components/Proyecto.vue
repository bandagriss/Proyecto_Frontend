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

    <table class="table is-fullwidth">
      <tbody>
        <tr v-for="(proyecto, key) in proyectos" :key="key">
          <td>

            <span class="title is-5">
              Nombre Proyecto: </span>
            <span class="subtitle is-5">
              {{ proyecto.nombre }}
            </span>
            <br/>
            <router-link
              :to="{name: 'ProyectoEditar', params: { proyecto_id: proyecto.id }}"
              class="button is-warning is-rounded">
              <span class="icon">
                <icon name="edit" scale="1.5" style="color:#fff;"></icon>
              </span>
            </router-link>
            <button
              class="button is-info is-rounded"
              @click="agregarPersonas(proyecto)">
              <span class="icon" title="Adicionar Personas al Proyecto">
                <icon name="user-plus" scale="1.5" style="color:#ffffff;"></icon>
              </span>
            </button>
            <button
              class="button is-link is-rounded"
              @click="agregarFases(proyecto, key)"
            >
              <span class="icon" title="Adicionar Fases">
              <icon name="warehouse" scale="1.5" style="color:#ffffff;"></icon>
              </span>
            </button>
            <br/>
            <br/>
            <div class="steps">
              <div class="step-item"
                   :class="{
                          'is-completed' : fase.estado == 'finalizado',
                          'is-active' : fase.estado == 'en proceso'
                          }"
                   v-for="(fase, indice) in proyecto.Fases"
                   :key="indice">
                <a @click="editarFase(fase, indice, key)">
                <div class="step-marker">
                  <span class="icon">
                    <template v-if="fase.estado == 'finalizado'">
                      <icon name="check"></icon>
                    </template>
                  <template v-else>
                  {{ indice + 1 }}
                    </template>
                  </span>
                </div>
                </a>
                <div class="step-details">
                  <p class="step-title">Fase {{ indice + 1}}</p>
              <p>{{ fase.nombre }}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- modal nuevo -->
    <div class="modal" :class="modal_add_personas? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"> Miembros del Proyecto</p>
          <button class="delete" aria-label="close" @click="cerrarModalAddPersonas()"></button>
        </header>
        <section class="modal-card-body">
          <label class="label" for="">Miembros:</label>
          <ul v-for="(miembro, key) in persona_proyecto" :key="key">
            <li>{{ miembro.Usuario.nombres }}
              <a @click="eliminarMiembro(miembro, key)">
                <span class="icon">
                  <icon name="trash" scale="1.5" style="color:red;"></icon>
                </span>
              </a>
            </li>

          </ul>

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
              <button
                class="button is-primary"
                @click="addPersona(persona_selected)"
              >
                Añadir
              </button>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="cerrarModalAddPersonas()">Cerrar</button>
        </footer>
      </div>
    </div>
    <!-- - -->
    <!-- añadir fases modal -->
    <div class="modal" :class="modal_add_fases? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"> Crear Fase</p>
          <button class="delete" aria-label="close" @click="cerrarModalAddFases()"></button>
        </header>
        <section class="modal-card-body">
          <datepicker
            placeholder="('m-d-Y')"
            :config="{ dateFormat: 'm-d-Y',
                         static: true,
                         onOpen: this.detectarCambiosFase(
                         fase.fecha_inicio,
                         'fecha_inicio')
                         }"
            v-model="fase.fecha_inicio"
          >
          </datepicker>
          <datepicker
            placeholder="('m-d-Y')"
            :config="{ dateFormat: 'm-d-Y',
                         static: true,
                         onOpen: this.detectarCambiosFase(
                         fase.fecha_fin,
                         'fecha_fin')
                         }"
            v-model="fase.fecha_fin"
          >
          </datepicker>
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Nombre de Fase"
                v-model="fase.nombre"
                @change="detectarCambiosFase(fase.nombre, 'nombre')"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">Descripción</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Descripción de la Fase"
                v-model="fase.descripcion"
                @change="detectarCambiosFase(fase.descripcion, 'descripcion')"
              ></textarea>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="guardarFases()">Guardar</button>
      <button class="button" @click="cerrarModalAddFases()">Cerrar</button>
        </footer>
      </div>
    </div>
    <!-- editar fase modal  -->
    <div class="modal" :class="modal_edit_fases? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"> Editar Fase</p>
          <button class="delete" aria-label="close" @click="cerrarModalEditFases()"></button>
        </header>
        <section class="modal-card-body">
          <datepicker
            placeholder="('m-d-Y')"
            :config="{ dateFormat: 'm-d-Y',
                         static: true,
                         onOpen: this.detectarCambiosFaseEdit(
                         fase.fecha_inicio,
                         'fecha_inicio')
                         }"
            v-model="fase.fecha_inicio"
          >
          </datepicker>
          <datepicker
            placeholder="('m-d-Y')"
            :config="{ dateFormat: 'm-d-Y',
                         static: true,
                         onOpen: this.detectarCambiosFaseEdit(
                         fase.fecha_fin,
                         'fecha_fin')
                         }"
            v-model="fase.fecha_fin"
          >
          </datepicker>
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Nombre de Fase"
                v-model="fase.nombre"
                @change="detectarCambiosFaseEdit(fase.nombre, 'nombre')"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">Descripción</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Descripción de la Fase"
                v-model="fase.descripcion"
                @change="detectarCambiosFaseEdit(fase.descripcion, 'descripcion')"
              ></textarea>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field-label is-normal">
                <label class="label">Gasto</label>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    type="number"
                    placeholder="Gastos en Bs."
                    class="input"
                    v-model ="fase.gastos"
                    @change="detectarCambiosFaseEdit(fase.gastos, 'gastos')"
                  >
                </p>
              </div>
            </div>
            <div class="field-body">
              <div class="field-label is-normal">
                <label class="label">Estado</label>
              </div>
              <div class="field">
                <span class="control is-expanded">
                  <div class="select">
                    <select name="country"
                            v-model="fase_estado"
                            @change="detectarCambiosFaseEdit(fase_estado, 'estado')"
                    >
                      <option value="creado">Creado</option>
                      <option value="en proceso">En Proceso</option>
                      <option value="finalizado">Finalizado</option>
                    </select>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="guardarFaseEdit(fase)">Guardar</button>
          <button class="button" @click="cerrarModalEditFases()">Cerrar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>

import Datepicker from 'vue-bulma-datepicker';
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
      persona_proyecto: {},
      modal_add_fases: false,
      modal_edit_fases: false,
      fase: {},
      key_proyecto: '',
      fase_estado: '',
      fase_edit: {},
      indice_fase_edit: '',
    };
  },
  props: ['value'],
  components: {
    Datepicker,
  },
  notifications: Mensajes.mensajes,
  created() {
    http.get('proyecto').then((respuesta) => {
      this.proyectos = respuesta.datos;
    }).catch(error => this.Error(error));
  },
  methods: {
    agregarPersonas(proyecto) {
      // personas
      http.get('usuarios').then((respuesta) => {
        this.personas = respuesta.datos;
      });

      // miembros de proyecto
      http.get(`proyecto_personas/${proyecto.id}`).then((respuesta) => {
        this.persona_proyecto = respuesta.datos;
        this.eliminarMiembrosExistentes(this.persona_proyecto, this.personas);
      }).catch(error => this.Error(error));

      this.modal_add_personas = true;
      this.persona_selected = '';
      this.objeto = JSON.parse(JSON.stringify(proyecto));
    },
    cerrarModalAddPersonas() {
      this.modal_add_personas = false;
    },
    addPersona(idPersona) {
      if (idPersona !== '') {
        const adicionarPersona = {};
        adicionarPersona.fid_proyecto = this.objeto.id;
        adicionarPersona.fid_persona = idPersona;
        http.post('proyecto_persona', adicionarPersona).then((respuesta) => {
          this.Success({ title: 'Añadido con éxito', message: respuesta.mensaje });
          this.persona_proyecto.push(respuesta.datos);
          this.eliminarMiembrosExistentes(this.persona_proyecto, this.personas);
          this.persona_selected = '';
        }).catch(error => this.Error(error));
      } else {
        this.Error({ message: 'Selecciona una persona primero' });
      }
    },
    eliminarMiembrosExistentes(miembros, personas) {
      const idMiembros = [];
      for (let m = 0; m < miembros.length; m += 1) {
        idMiembros.push(miembros[m].Usuario.id);
      }
      const vectorPersona = [];
      for (let i = 0; i < personas.length; i += 1) {
        if (idMiembros.indexOf(personas[i].id) === -1) {
          vectorPersona.push(personas[i]);
        }
      }
      this.personas = vectorPersona;
    },
    eliminarMiembro(miembro, key) {
      http.deleted(`proyecto_persona/${miembro.id}`).then((respuesta) => {
        this.Success({ title: 'Eliminado con éxito', message: respuesta.mensaje });
        this.persona_proyecto.splice(key, 1);
        this.personas.push(miembro.Usuario);
      }).catch(error => this.Error(error));
    },
    agregarFases(proyecto, key) {
      this.fase = {};
      this.fase.fid_proyecto = proyecto.id;
      this.fase.fecha_inicio = new Date();
      this.fase.fecha_fin = new Date();
      this.key_proyecto = key;
      this.modal_add_fases = true;
    },
    cerrarModalAddFases() {
      this.modal_add_fases = false;
    },
    guardarFases() {
      this.fase.estado = 'creado';
      http.post('fase', this.fase).then((respuesta) => {
        this.Success({ title: 'Fase Creada', message: respuesta.mensaje });
        this.proyectos[this.key_proyecto].Fases.push(respuesta.datos);
        this.modal_add_fases = false;
      }).catch(error => this.Error(error));
    },
    detectarCambiosFase(dato, objeto) {
      this.fase[objeto] = dato;
    },
    detectarCambiosFaseEdit(dato, objeto) {
      this.fase_edit[objeto] = dato;
    },
    editarFase(fase, indice, key) {
      this.key_proyecto = key;
      this.fase = {};
      this.fase_edit = {};
      this.modal_edit_fases = true;
      this.indice_fase_edit = indice;
      http.get(`fase/${fase.id}`).then((respuesta) => {
        this.fase = respuesta.datos;
        this.fase_estado = respuesta.datos.estado;
      }).catch(error => this.Error(error));
    },
    guardarFaseEdit(fase) {
      http.put(`fase/${fase.id}`, this.fase_edit).then((respuesta) => {
        this.Success({ title: 'Fase Actualizada Correctamente', message: respuesta.mensaje });
        this.proyectos[this.key_proyecto].Fases.splice(this.indice_fase_edit, 1, respuesta.datos);
        this.modal_edit_fases = false;
      }).catch(error => this.Error(error));
    },
    cerrarModalEditFases() {
      this.modal_edit_fases = false;
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
