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
        <q-tab name="tab-5" @click.native="changePasswordDialog()">Cambiar contraseña</q-tab>    
        <q-tab name="tab-6" @click.native="salir">Cerrar sesión</q-tab>    
      </q-tabs>
      <q-tabs v-else>
        <q-tab @click.native="entrar">Login</q-tab>
        <q-tab @click.native="signup">Crear cuenta</q-tab>
        <!-- <q-tab name="tab-test" v-link="'test'" >Test</q-tab>   -->
      </q-tabs>
      <div class="row">
        <router-view class="layout-view"></router-view>
      </div>  
    </q-layout>
  </div>
</template>

<script>
import { Dialog } from 'quasar'
import { mapActions } from 'vuex'
import LoginDialog from './components/LoginDialog'
import SignupDialog from './components/Usuarios/SignupDialog'
import ChangePasswordDialog from './components/Usuarios/ChangePasswordDialog'

export default {
  computed: {
    user () { return this.$store.state.user }
  },
  methods: {
    ...mapActions({
      changePassword: 'cambiar-password'
    }),
    entrar () {
      Dialog.create(LoginDialog(this))
    },
    signup () {
      Dialog.create(SignupDialog(this))
    },
    salir () {
      this.$store.dispatch('cerrar-sesion')
    },
    changePasswordDialog (errors) {
      Dialog.create(ChangePasswordDialog(this, errors))
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
  .buttons {
    margin: 10px 0;
  }
  h4 {
    text-align: center;
    text-transform: uppercase;
  }
  .margenes-formularios {
  margin: 10px 10px;
  }
  .q-table{
    margin: 10px 10px;
  }
</style>
