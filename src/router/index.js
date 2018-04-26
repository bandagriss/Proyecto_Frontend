import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Inicio from '@/components/Inicio';
import Otro from '@/components/Otro';
import Contactos from '@/components/Contactos';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/inicio',
      name: 'Inicio',
      component: Inicio,
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
  ],
});
