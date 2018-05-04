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
        </tr>
      </tbody>
    </table>

  </div>

</template>

<script>

import axios from 'axios';
import auth from '../../auth';
import Mensajes from '../../common/generals/js/Notificacion';
import router from '../../router';

export default {
  data() {
    return {
      departamentos: '',
    };
  },
  notifications: Mensajes.mensajes,
  created() {
    axios.get('http://localhost:3000/api/v1/departamentos', {
      headers: auth.getAuthHeader(),
    })
      .then((respuesta) => {
        this.departamentos = respuesta.data.datos;
      })
      .catch((error) => {
        if (!error.response) {
          this.Error({ title: 'Error al recuperar los departamentos', message: 'Ocurrió un problema con la conexíon' });
          router.push('/500');
        } else if (error.response.status === 401) {
          auth.logout();
          this.Error({ title: 'Su sessión a expirado', message: 'Vuelva a logearse porfavor.' });
        } else {
          this.Error({ title: 'Error al recuperar los departamentos', message: error });
        }
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
