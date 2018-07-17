<template>
  <section class="hero is-ligth is-fullheight">
    <div class="fondo-login"></div>
    <section class="hero is-info">
      <!-- <div class="hero-body">
           <div class="container">
           <h1 class="title">
           Sistema
           </h1>
           <h2 class="subtitle">
           de Control de Proyectos
           </h2>
           </div>
           </div> -->
    </section>
    <div class="hero-body alinear-arriba">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h1 class="title is-2">
            Proyectos CEADL
          </h1>

          <div class="box">
            <figure class="avatar">
              <img src="../assets/imagenes/ceadl/logo-ceadl2.png" width="256" height="256">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         placeholder="Usuario"
                         autofocus=""
                         v-model="credenciales.email"
                  >
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="password"
                         placeholder="Contraseña"
                         v-model="credenciales.password"
                  >
                </div>
              </div>
              <div class="field has-text-right">
                <label class="checkbox">
                  <input type="checkbox">
                  Recuerdame
                </label>
              </div>
              <button
                type="submit"
                class="button is-block is-info is-large"
                @click="autenticar()"
                @enter="autenticar()"
              > Autenticarse</button>
            </form>
          </div>
          <p class="has-text-grey">
            <!-- <a class="has-text-info">Registrarse</a> &nbsp;·&nbsp; -->
            <router-link to="/registrarse">Registrarse</router-link>
            <a class="has-text-info">Olvido su contraseña</a> &nbsp;&nbsp;
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import auth from '../auth';
import Mensajes from '../common/generals/js/Notificacion';


export default {
  data() {
    return {
      credenciales: {
        email: '',
        password: '',
      },
      error: '',
    };
  },
  notifications: Mensajes.mensajes,
  methods: {
    autenticar() {
      const credenciales = {
        username: this.credenciales.email,
        password: this.credenciales.password,
      };

      auth.login_or_signup('login', this, credenciales, 'inicio')
        .then(() => {
          this.Success({ title: 'Bienvenido', message: auth.user.nombres });
        }).catch(() => {
          this.Error({ title: 'Error de Autenticación', message: 'Usuario ó Contraseña Invalidos' });
        });
    },
  },
  /* route: {
    *   beforeEnter(to, from, next) {
    *     console.log("===================>", "entra");
    *   },
    * }, */
  beforeRouteEnter(to, from, next) {
    if (auth.user.authenticated) {
      next({
        path: '/inicio',
      });
    } else {
      next();
    }
  },
};
</script>

<style>
 html,body {
   /* font-family: 'Open Sans', serif; */
   /* font-size: 14px; */
   /* font-weight: 300; */
 }
 .hero.is-success {
   background: #F2F6FA;
 }
 .hero .nav, .hero.is-success .nav {
   -webkit-box-shadow: none;
   box-shadow: none;

 }
 .box {
   margin-top: 5rem;
 }
 .avatar {
   margin-top: -70px;
   padding-bottom: 30px;
 }
 .avatar img {
   padding: 5px;
   background: #fff;
   border-radius: 5%;
   -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
   box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
 }
 input {
   font-weight: 300;
 }
 p {
   font-weight: 700;
 }
 p.subtitle {
   padding-top: 1rem;
 }
 .fondo-login {
   position: fixed;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   background-image: url('../assets/imagenes/ceadl/fondo_login.jpg');
   background-repeat: no-repeat;
   background-size: 100%;
   background-size: cover;
   -webkit-filter: blur(5px);
   opacity: 0.08;
 }
 .alinear-arriba {
   margin-top: -100px;
 }
</style>
