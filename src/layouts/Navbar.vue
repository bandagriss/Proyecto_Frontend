<template>
  <div id="navbar-resize" :class="activo? 'active' : '' ">
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" @click="menuGlobalEvento()">
          <icon name="outdent" scale="1.5" v-if="!activo"></icon>
          <icon name="indent" scale="1.5" v-else></icon>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>

import EventBus from './event-bus';

export default {
  data() {
    return {
      activo: false,
    };
  },
  methods: {
    menuGlobalEvento() {
      this.activo = !this.activo;
      EventBus.$emit('menuClick', this.activo);
      EventBus.$emit('menuClickContenido', this.activo);
    },
  },
};

</script>

<style>
 #navbar-resize {
   position: relative;
   left: 250px;
   transition: all 200ms linear;
 }

 #navbar-resize.active {
   left: 0px;
 }

</style>
