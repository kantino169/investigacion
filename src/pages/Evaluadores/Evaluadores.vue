<template>
  <div>
    <q-list striped highlight>
      <q-list-header>Evaluadores</q-list-header>
      <q-item v-for="evaluador in evaluadores" :key="evaluador.id">
        <q-item-main :label="evaluador.nombre + evaluador.apellido">
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>
