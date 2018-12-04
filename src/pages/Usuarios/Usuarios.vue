<template>
  <div class="row-full-width">
    <q-btn class="q-ma-sm" label="Agregar" icon="create" @click="agregar()"></q-btn>
    <q-list>
      <q-list-header>Usuarios</q-list-header>
      <q-item highlight v-for="usuario in usuarios" :key="usuario.id" class="row">
        <q-item-main class="row">
          <div class="col-3">
            {{usuario.nombre}}
          </div>
          <div class="col-3">
            {{usuario.email}}
          </div>
          <div class="col-3">
            {{usuario.tipoUsuario | tipoDeUsuario}}
          </div>
          <div class="col-3">
            <q-btn-group class="q-ml-md">
              <q-btn color="orange" title="Editar" icon="edit" @click="editar(evaluador)"/>
              <q-btn color="red" title="Eliminar" icon="delete" @click="borrar(evaluador)"/>
            </q-btn-group>
          </div>
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted () {
    this.cargarTodos()
  },
  computed: {
    usuarios () {
      return this.$store.getters['listaUsuario/usuarios']
    }
  },
  methods: {
    ...mapActions('listaUsuario', ['cargarTodos'])
  },
  filters: {
    tipoDeUsuario (tipoUsuario) {
      switch (tipoUsuario) {
        case 0: return 'Alumno'
        case 1: return 'Profesor'
        case 2: return 'Administrador'
      }
    }
  }
}
</script>
