<template>
  <q-list no-border link inset-delimiter>
    <q-list-header>Essential Links</q-list-header>
    <q-item exact to="/">
      <q-item-side icon="home" />
      <q-item-main label="INICIO" />
    </q-item>
    <q-item exact to="/proyectos">
      <q-item-side icon="school" />
      <q-item-main label="Proyectos" />
    </q-item>
    <q-item exact to="/usuarios">
      <q-item-side icon="perm_identity" />
      <q-item-main label="Usuarios" />
    </q-item>
    <q-item exact to="/administradores">
      <q-item-side icon="assignment" />
      <q-item-main label="Administrar"/>
    </q-item>
    <q-item exact to="/">
      <q-item-side icon="" />
      <q-item-main label="Reservado"/>
    </q-item>
    <q-item > <!-- cerrar sesion -->
      <q-item-side icon="" />
      <q-item-main label="Cerrar Sesion" />
    </q-item>
  </q-list>
</template>
