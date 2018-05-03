import Vue from 'vue';
import Router from 'vue-router';
import Inicio from '@/components/Inicio';
import Otro from '@/components/Otro';
import Contactos from '@/components/Contactos';
import Login from '@/auth/Login';
import Registrarse from '@/auth/Register';
import PaginaNoEncontrada from '@/auth/404';
import ErrorServidor from '@/auth/500';
import ErrorAutenticacion from '@/auth/403';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/inicio',
      name: 'Inicio',
      component: Inicio,
      meta: { requiresAuth: true },
    },
    {
      path: '/otro',
      name: 'Otro',
      component: Otro,
    },
    {
      path: '/contactos',
      name: 'Contactos',
      component: Contactos,
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/registrarse',
      name: 'registrarse',
      component: Registrarse,
    },
    {
      path: '/500',
      name: 'ErrorServidor',
      component: ErrorServidor,
    },
    {
      path: '/403',
      name: 'ErrorAutenticacion',
      component: ErrorAutenticacion,
    },
    {
      path: '*',
      name: '404',
      component: PaginaNoEncontrada,
    },

  ],
});
