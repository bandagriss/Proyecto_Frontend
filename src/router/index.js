import Vue from 'vue';
import Router from 'vue-router';
import Inicio from '@/components/Inicio';
import Financiadores from '@/components/Financiador';
// rutas de configuracion
import Departamento from '@/components/configuracion/Departamento';
import Roles from '@/components/configuracion/Rol';
import Institucion from '@/components/configuracion/Institucion';
import Usuario from '@/components/configuracion/Usuario';

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
      path: '/financiadores',
      name: 'Financiadores',
      component: Financiadores,
      meta: { requiresAuth: true },
    },
    {
      path: '/contactos',
      name: 'Contactos',
      component: Contactos,
      meta: { requiresAuth: true },
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/departamentos',
      name: 'Departamento',
      component: Departamento,
      meta: { requiresAuth: true },
    },
    {
      path: '/roles',
      name: 'Roles',
      component: Roles,
      meta: { requiresAuth: true },
    },
    {
      path: '/institucion',
      name: 'Institucion',
      component: Institucion,
      meta: { requiresAuth: true },
    },
    {
      path: '/usuarios',
      name: 'Usuario',
      component: Usuario,
      meta: { requiresAuth: true },
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
