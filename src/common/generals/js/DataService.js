import axios from 'axios';
import auth from '../../../auth';
import router from '../../../router';
import config from '../../../config';


function head() {
  return {
    headers: auth.getAuthHeader(),
  };
}

function ErrorMensaje(error) {
  if (!error.response) {
    router.push('/500');
    return {
      title: 'Error de Servidor',
      message: 'Ocurrió un problema con la conexión',
    };
  } else if (error.response.status === 401) {
    auth.logout();
    return {
      title: 'Su sessión a expirado',
      message: 'Vuelva a logearse por favor.',
    };
  } else if (error.response.status === 400) {
    return {
      title: 'Ocurrió un error',
      message: error.response.data.error,
    };
  }
  return {
    title: 'Error inesperado',
    message: error,
  };
}


function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(`${config.API_REST_PRIVADA}${url}`, head())
      .then(respuesta => resolve(respuesta.data))
      .catch(error => reject(ErrorMensaje(error)));
  });
}

function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(`${config.API_REST_PRIVADA}${url}`, data, head())
      .then(respuesta => resolve(respuesta.data))
      .catch((error) => {
        reject(ErrorMensaje(error));
      });
  });
}

function put(url, data) {
  return new Promise((resolve, reject) => {
    axios.put(`${config.API_REST_PRIVADA}${url}`, data, head())
      .then(respuesta => resolve(respuesta.data))
      .catch(error => reject(ErrorMensaje(error)));
  });
}

function deleted(url) {
  return new Promise((resolve, reject) => {
    axios.delete(`${config.API_REST_PRIVADA}${url}`, head())
      .then(respuesta => resolve(respuesta.data))
      .catch(error => reject(ErrorMensaje(error)));
  });
}

function image(url, file, name = 'avatar') {
  return new Promise((resolve, reject) => {
    if (typeof url !== 'string') {
      throw new TypeError(`Expected a string, got ${typeof url}`);
    }
    const formData = new FormData();
    formData.append(name, file);
    const headConfig = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
    };

    return axios.post(`${config.API_REST_PRIVADA}${url}`, formData, headConfig)
      .then(respuesta => resolve(respuesta.data))
      .catch((error) => {
        reject(ErrorMensaje(error));
      });
  });
}


export default {
  get, post, put, deleted, image,
};
