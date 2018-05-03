<template>
  <section class="hero is-ligth is-fullheight">
    <div class="fondo-login"></div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Sistema
          </h1>
          <h2 class="subtitle">
            Ingeniería Contable
          </h2>
        </div>
      </div>
    </section>
    <div class="hero-body alinear-arriba">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <figure class="avatar">
              <!-- <img src="https://placehold.it/128x128"> -->
              <img src="https://i.pinimg.com/originals/30/1b/3b/301b3b874454b97ffb7cc550a25af0ce.jpg" width="128" height="128">
            </figure>
            <!-- <h1 class="title is-1">{{ error }}</h1> -->
            <form v-on:submit.prevent>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         placeholder="Usuario"
                         autofocus=""
                         v-model="credenciales.usuario"
                         @keyup.enter="checkEnter"
                  >
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="email"
                         placeholder="Email"
                         autofocus=""
                         v-model="credenciales.email"
                         @keyup.enter="checkEnter"
                  >
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="password"
                         placeholder="Contraseña"
                         v-model="credenciales.password"
                         @keyup.enter="checkEnter"
                  >
                </div>
              </div>
              <br />
              <a
                type="submit"
                class="button is-success is-block is-large"
                @click="submit"
                @enter="submit"
                @keyup.enter="checkEnter"
              > Registrarse</a>
            </form>
          </div>
          <p class="has-text-grey">
            <a class="has-text-info">Olvido su contraseña</a> &nbsp;&nbsp;
            <router-link to="/">Iniciar Sessión</router-link>
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
    submit() {
      const credenciales = {
        username: this.credenciales.usuario,
        password: this.credenciales.password,
      };

      auth.login_or_signup('signup', this, credenciales, 'inicio')
        .then(() => {
          this.Success({ title: 'Bienvenido', message: 'Roy' });
        }).catch((error) => {
          this.Error({ title: 'Error de Autenticación', message: error });
        });
    },
    checkEnter() {
      this.submit();
    },
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
   padding-bottom: 20px;
 }
 .avatar img {
   padding: 5px;
   background: #fff;
   border-radius: 50%;
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
   background-image: url('http://d11xat3a80dbp1.cloudfront.net/wp-content/uploads/2016/09/hierba_de_San_Juan.jpg');
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
