<template>
  <div>
     <div v-for="(institucion, key) in instituciones" :key="key">
      <div class="tile is-ancestor">
        <div class="tile is-parent"
             v-for="(i,indice) in institucion"
             :key="indice"
        >
          <article class="tile is-child box">
            <p class="title has-text-centered is-size-1">CEADL</p>
            <p class="subtitle has-text-centered">{{ i.nombre }}</p>
            <div class="content has-text-centered">
              <p><strong>Descripción:</strong> {{ i.descripcion }} </p>
              <router-link
                :to="{name: 'ProyectosPorInstitucion',
                     params: { institucion_id: i.id }}"
                class="button is-primary is-large">
                Entrar
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Mensajes from '../common/generals/js/Notificacion';
import http from '../common/generals/js/DataService';

export default {
  data() {
    return {
      institucion: {},
      instituciones: [],
    };
  },
  notifications: Mensajes.mensajes,
  created() {
    this.instituciones = [];
    http.get('institucion').then((respuesta) => {
      this.institucion = respuesta.datos;
      let grupo = [];
      for (let i = 0; i < this.institucion.length; i += 1) {
        if (i % 3 === 0) {
          if (i !== 0) {
            this.instituciones.push(grupo);
            grupo = [];
          }
        }
        grupo.push(this.institucion[i]);
      }
      if (grupo.length > 0) {
        this.instituciones.push(grupo);
      }
    }).catch(error => this.Error(error));
  },
  methods: {
  },
};
</script>
