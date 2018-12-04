<template>
  <q-list no-border link inset-delimiter>
    <q-list-header>Essential Links</q-list-header>
    <q-item exact to="/">
      <q-item-side icon="home" />
      <q-item-main label="INICIO" />
    </q-item>
    <q-item exact to="/usuarios">
      <q-item-side icon="perm_identity" />
      <q-item-main label="Usuarios" />
    </q-item>
    <q-collapsible icon="assignment" label="Administrar">
      <div>
        <q-item exact to="/lineas">
          <q-item-side icon="reorder" />
          <q-item-main label="Proyectos" />
        </q-item>
        <q-item exact to="/disciplinas" >
          <q-item-side icon='list'/>
          <q-item-main label="Disciplinas" />
        </q-item>
        <q-item exact to="/fechasEntrega">
          <q-item-side icon="date_range" />
          <q-item-main label="Fechas de entrega" />
        </q-item>
        <q-item exact to="/evaluadores">
          <q-item-side icon="assignment_ind" />
          <q-item-main label="Evaluadores" />
        </q-item>
      </div>
    </q-collapsible>
    <q-item exact to="/">
      <q-item-side icon="" />
      <q-item-main label="Reservado"/>
    </q-item>
    <q-item v-if="isLogged" @click.native="$emit('logout')"> <!-- cerrar sesion -->
      <q-item-side icon="power_settings_new" />
      <q-item-main label="Cerrar Sesión" />
    </q-item>
    <q-item v-else @click.native="$emit('login')">
      <q-item-side icon="person" />
      <q-item-main label="Iniciar Sesión" />
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('usuario', ['isLogged'])
}
</script>
