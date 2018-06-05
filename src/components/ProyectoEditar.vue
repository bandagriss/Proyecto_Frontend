<template>
  <div class="fondo-contenido">
    <h1 class="title is-2">Editar Proyecto</h1>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Financiador</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <div class="select">
              <select
                v-model="financiador_selected"
                @change="detectarCambios(financiador_selected, 'fid_financiador')">
                <option
                  v-for="(financiador, key) in financiadores"
                  :key="key"
                  :value="financiador.id">
                  {{ financiador.nombre}}
                </option>
              </select>
            </div>
            <!-- </p> -->
        </div>
        <div class="field-body">
          <div class="field-label is-normal">
            <label class="label">Nombre</label>
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left has-icons-right">
              <input class="input is-success"
                     type="text"
                     placeholder="Nombre de Proyecto"
                     v-model="objeto.nombre"
                     @change="detectarCambios(objeto.nombre, 'nombre')"
              >
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Descripción</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Proyecto dirigido a jóvenes de la zona..."
              v-model="objeto.descripcion"
              @change="detectarCambios(objeto.descripcion, 'descripcion')"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Fecha Inicio</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <datepicker
              placeholder="('m-d-Y')"
              :config="{ dateFormat: 'm-d-Y',
                           static: true,
                           onOpen: this.detectarCambios(
                           objeto.fecha_inicio,
                           'fecha_inicio')
                           }"
              v-model="objeto.fecha_inicio"
            >
            </datepicker>
          </p>
        </div>
        <div class="field-body">
          <div class="field-label is-normal">
            <label class="label">Fecha Fin</label>
          </div>
          <div class="field">
            <p class="control is-expanded has-icons-left has-icons-right">
              <datepicker
                placeholder="('m-d-Y')"
                :config="{ dateFormat: 'm-d-Y',
                             static: true,
                             onOpen: this.detectarCambios(
                             objeto.fecha_fin,
                             'fecha_fin'
                             )}"
                v-model="objeto.fecha_fin"
              >
              </datepicker>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Población Hombres</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="number"
              v-model="objeto.poblacion_hombres"
              @change="detectarCambios(objeto.poblacion_hombres, 'poblacion_hombres')"
              @keyup="sumaCantidad(objeto.poblacion_hombres, objeto.poblacion_mujeres)"
            />
          </p>
        </div>
        <div class="field-label is-normal">
          <label class="label">Población Mujeres</label>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="number"
              v-model="objeto.poblacion_mujeres"
              @change="detectarCambios(objeto.poblacion_mujeres, 'poblacion_mujeres')"
              @keyup="sumaCantidad(objeto.poblacion_hombres, objeto.poblacion_mujeres)"
            />
          </p>
        </div>
        <div class="field-label is-normal">
          <label class="label">Población Total</label>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="number"
              v-model="cantidad"
              @change="detectarCambios(cantidad, 'cantidad')"
              disabled/>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Objetivo</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Proyecto dirigido a jóvenes de la zona..."
              v-model="objeto.objetivo"
              @change="detectarCambios(objeto.objetivo, 'objetivo')"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a class="button is-info" @click="actualizarProyecto()">
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

import Datepicker from 'vue-bulma-datepicker';
import router from '../router';
import Mensajes from '../common/generals/js/Notificacion';
import http from '../common/generals/js/DataService';

export default {
  data() {
    return {
      financiadores: '',
      objeto: {},
      financiador_selected: '',
      datos_ingresados: {},
      cantidad: '',
    };
  },
  props: ['proyecto_id'],
  components: {
    Datepicker,
  },
  notifications: Mensajes.mensajes,
  created() {
    http.get('financiador').then((respuesta) => {
      this.financiadores = respuesta.datos;
      this.Success({ message: respuesta.mensaje });
    }).catch(error => this.Error(error));
    http.get(`proyecto/${this.$route.params.proyecto_id}`).then((respuesta) => {
      this.objeto = respuesta.datos;
      this.financiador_selected = respuesta.datos.fid_financiador;
      this.cantidad = respuesta.datos.cantidad;
    }).catch(error => this.Error(error));
  },
  methods: {
    detectarCambios(dato, objeto) {
      this.datos_ingresados[objeto] = dato;
    },
    sumaCantidad(hombres, mujeres) {
      const totalHombres = parseInt(hombres != null ? hombres : 0, 10);
      const totalMujeres = parseInt(mujeres != null ? mujeres : 0, 10);
      this.cantidad = totalHombres + totalMujeres;
    },
    actualizarProyecto() {
      this.datos_ingresados.cantidad = this.cantidad;
      this.datos_ingresados.fid_financiador = this.financiador_selected;
      this.datos_ingresados.fid_institucion = localStorage.getItem('institucion');
      this.datos_ingresados.codigo_proyecto = 'aabbcc';
      http.put(`proyecto/${this.$route.params.proyecto_id}`, this.datos_ingresados).then((respuesta) => {
        this.Success({ title: 'Guardado con éxito', message: respuesta.mensaje });
        router.push('/proyectos');
      }).catch(error => this.Error(error));
    },
    cancelar() {
      router.push('/proyectos');
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
