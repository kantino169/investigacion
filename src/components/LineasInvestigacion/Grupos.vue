<template>
  <lista-con-botones
    :elements="grupos"
    @set="$emit('set', $event)"
    @edit="editar($event)"
    @remove="remover($event)"
    @add="agregar">
    No hay grupos actualmente
  </lista-con-botones>
</template>

<script>
import ListaConBotones from './ListaConBotones'
import {mapActions} from 'vuex'
export default {
  components: {ListaConBotones},
  props: {
    carrera: Object
  },
  computed: {
    grupos () {
      return this.$store.getters['facultad/grupos'](this.carrera.id)
    }
  },
  methods: {
    ...mapActions('facultad', ['crearGrupo', 'modificarGrupo', 'eliminar']),
    async agregar () {
      try {
        const idCarrera = this.carrera.id
        const nombre = await this.$q.dialog({
          title: 'Nuevo grupo',
          message: 'Nombre:',
          prompt: {model: '', type: 'text'}
        })
        await this.crearGrupo({nombre, idCarrera})
      } catch (error) {
      }
    },
    async editar ({id, nombre: nombreAnterior}) {
      try {
        const nombre = await this.$q.dialog({
          title: 'Modificar Grupo',
          message: 'Nombre:',
          prompt: {model: nombreAnterior, type: 'text'}
        })
        await this.modificarGrupo({id, nombre})
      } catch (error) {
      }
    },
    async remover ({id, nombre}) {
      try {
        await this.$q.dialog({
          message: `¿Desea eliminar el grupo ${nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.eliminar({id, tipo: 'grupo'})
      } catch (error) {
      }
    }
  }
}
</script>
