<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout>
      <div slot="header" class="toolbar">
        <q-toolbar-title :padding="0">
          Quasar Framework v{{$q.version}}
        </q-toolbar-title>
      </div>
      <h1>Hola</h1>
      <div class="row">
        <router-view class="layout-view"></router-view>
      </div>
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
</style>
