// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueNotifications from 'vue-notifications';
import App from './App';
import router from './router';
import auth from './auth';

auth.checkAuth();

const NotificacionOpciones = require('./common/generals/js/Toastr.js');

Vue.use(VueNotifications, NotificacionOpciones.default.options);

const Icon = require('vue-awesome');

Vue.component('icon', Icon);

Vue.config.productionTip = false;

require('@/assets/sass/main.scss');

/* session validate */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // esta ruta requiere autenticación, verificamos que haya iniciado sesión
    // sino, redirigimos a la página de inicio de sesión.
    if (!auth.user.authenticated) {
      next({
        path: '/',
        // query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // ¡Asegúrate de ejecutar next siempre!
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
