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
        <q-tab name="tab-2">Administrar</q-tab>
        <q-tab name="tab-3">Proyectos</q-tab>
        <q-tab name="tab-4">Usuarios</q-tab>
        <q-tab name="tab-5">Fechas de entrega</q-tab>
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

export default {
  computed: {
    user () { return this.$store.state.user }
  },
  mounted () {
    const user = localStorage.getItem('inv-user')
    if (user) {
      this.$store.dispatch('iniciar-sesion', JSON.parse(user))
    }
  },
  methods: {
    entrar () {
      Dialog.create(LoginDialog(this))
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
</style>
