<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout>
      <div slot="header" class="toolbar">
        <q-toolbar-title :padding="0">
          <img src="~assets/logo-uap-martin.png" alt="">
        </q-toolbar-title>
      </div>
      <div class="row">
        <router-view class="layout-view"></router-view>
      </div>  
      <q-tabs slot="navigation">
        <q-tab name="tab-1" route="/admins">Login</q-tab>
        <q-tab name="tab-2">Administrar</q-tab>
        <q-tab name="tab-3">Proyectos</q-tab>
        <q-tab name="tab-4">Usuarios</q-tab>
        <q-tab name="tab-5">Fechas de entrega</q-tab>
      </q-tabs>
    </q-layout>
  </div>
</template>

<script>
/*
 * Root component
 */
export default {}
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
