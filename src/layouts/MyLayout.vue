<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary">
        <q-btn flat dense round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu" >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Secretaría de Ciencia y Técnica
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <router-view name="drawer" :leftDrawerOpen="leftDrawerOpen"/>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>
