<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout>
      <div slot="header" class="toolbar">
        <q-toolbar-title :padding="0">
          <img src="~assets/logo-uap-martin.png" alt="">
        </q-toolbar-title>
      </div>
      <q-tabs slot="navigation" v-if="user">
        <q-tab name="tab-2" v-link="'/'">Inicio</q-tab>
        <q-tab name="tab-3" v-link="'/proyectos'">Proyectos</q-tab>
        <q-tab name="tab-4" v-link="'/administradores'">Administrar</q-tab>    
        <q-tab name="tab-5" @click.native="salir">Cerrar sesión</q-tab>    
      </q-tabs>
      <q-tabs v-else>
        <q-tab @click.native="entrar">Login</q-tab>
      </q-tabs>
      <div class="row">
        <router-view class="layout-view"></router-view>
      </div>  
    </q-layout>
  </div>
</template>

<script>
import LoginDialog from 'components/LoginDialog'
import { Dialog } from 'quasar'
// import { mapState } from 'vuex'

export default {
  computed: {
    user () { return this.$store.state.user }
  },
  methods: {
    entrar () {
      Dialog.create(LoginDialog(this))
    },
    salir () {
      this.$store.dispatch('cerrar-sesion')
    }
  }
}
</script>

<style>
  .layout-content {
    flex-direction: column;
  }
  .q-tab-label {
    color: white;
  }
  .q-tabs-scroller {
    width: 100%;
    justify-content: space-around;
  }
  .href{
    color: white;
  }
  a:hover{
    background-color: white;
  }
  
</style>
