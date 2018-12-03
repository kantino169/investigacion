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

<script>
import { mapActions } from 'vuex'

export default {
  mounted () {
    this.cargarTodos()
  },
  computed: {
    evaluadores () {
      return this.$store.getters['evaluador/evaluadores']
    }
  },
  methods: {
    ...mapActions('evaluador', ['cargarTodos'])
  }
}
</script>
