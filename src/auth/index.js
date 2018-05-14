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
          localStorage.setItem('id_token', response.data.token);
          // localStorage.setItem('usuario', response.data.usuario);

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
