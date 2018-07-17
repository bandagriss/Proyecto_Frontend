import axios from 'axios';
import router from '../router';
import config from '../config';


const API_URL = config.API_REST;
const LOGIN_URL = `${API_URL}auth`;
const SIGNUP_URL = `${API_URL}users/`;

export default {
  user: {
    authenticated: false,
  },

  login_or_signup(action, context, creds, redirect) {
    return new Promise((resolve, reject) => {
      let url = '';
      switch (action) {
        case 'login':
          url = LOGIN_URL;
          break;
        case 'signup':
          url = SIGNUP_URL;
          break;
        default:
          url = LOGIN_URL;
      }
      axios.post(url, creds)
        .then((response) => {
          localStorage.setItem('id', response.data.data.id);
          localStorage.setItem('id_token', response.data.token);
          localStorage.setItem('nombres', response.data.data.nombres);
          localStorage.setItem('apellido_paterno', response.data.data.apellido_paterno != null ? response.data.data.apellido_paterno : '');
          localStorage.setItem('apellido_materno', response.data.data.apellido_materno != null ? response.data.data.apellido_materno : '');
          localStorage.setItem('imagen_usuario', response.data.data.imagen_usuario);
          localStorage.setItem('rol_nombre', response.data.data.rol_nombre);
          localStorage.setItem('institucion_nombre', response.data.data.institucion_nombre);
          localStorage.setItem('institucion', response.data.data.institucion);
          // localStorage.setItem('usuario', response.data.usuario);
          this.user.id = response.data.data.id;
          this.user.nombres = response.data.data.nombres;
          this.user.apellido_paterno = response.data.data.apellido_paterno != null ? response.data.data.apellido_paterno : '';
          this.user.apellido_materno = response.data.data.apellido_materno != null ? response.data.data.apellido_materno : '';
          this.user.imagen_usuario = response.data.data.imagen_usuario;
          this.user.rol_nombre = response.data.data.rol_nombre;
          this.user.institucion = response.data.data.institucion;
          this.user.authenticated = true;

          if (redirect) {
            resolve(router.push(redirect));
          }
        }).catch((err) => {
          // context.error = err.response.data;
          reject(err.response.data);
        });
    });
  },

  logout() {
    localStorage.removeItem('id_token');
    this.user.authenticated = false;
    router.push('/');
  },

  checkAuth() {
    const jwt = localStorage.getItem('id_token');

    if (jwt) {
      this.user.authenticated = true;
      this.user.nombres = localStorage.getItem('nombres');
      this.user.apellido_paterno = localStorage.getItem('apellido_paterno');
      this.user.apellido_materno = localStorage.getItem('apellido_materno');
      this.user.imagen_usuario = localStorage.getItem('imagen_usuario');
      this.user.rol_nombre = localStorage.getItem('rol_nombre');
      this.user.institucion_nombre = localStorage.getItem('institucion_nombre');
      this.user.institucion = localStorage.getItem('institucion');
      this.user.authenticated = true;

      // router.push('/inicio');
    } else {
      this.user.authenticated = false;
      router.push('/');
    }
  },

  getAuthHeader() {
    return {
      Authorization: `Bearer ${localStorage.getItem('id_token')}`,
    };
  },
};
