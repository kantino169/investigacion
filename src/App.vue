<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout>
      <div slot="header" class="toolbar">
        <q-toolbar-title :padding="0">
          Quasar Framework v{{$q.version}}
        </q-toolbar-title>
      </div>
      <h1 class="text-center">Kevin y Adrián se la comen</h1>
      <router-view class="layout-view"></router-view>
    </q-layout>
  </div>
</template>

<script>
/*
 * Root component
 */
export default {}
</script>

<style></style>
