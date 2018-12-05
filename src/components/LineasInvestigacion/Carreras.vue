<template>
  <lista-con-botones
    :elements="carreras"
    @set="$emit('set', $event)"
    @edit="$emit('edit', $event)"
    @remove="$emit('remove', $event)"
    @add="agregar()">
    No hay carreras actualmente
  </lista-con-botones>
</template>

<script>
import {mapActions} from 'vuex'
import ListaConBotones from './ListaConBotones'
export default {
  components: {ListaConBotones},
  props: {
    facultad: Object
  },
  computed: {
    carreras () {
      return this.$store.getters['facultad/carreras'](this.facultad.id)
    }
  },
  methods: {
    ...mapActions('facultad', ['crearCarrera', 'modificarCarrera', 'eliminar']),
    async agregar () {
      try {
        const idFacultad = this.facultad.id
        const nombre = await this.$q.dialog({
          title: 'Nueva carrera',
          message: 'Nombre:',
          prompt: {model: '', type: 'text'}
        })
        await this.crearCarrera({nombre, idFacultad})
      } catch (error) {
      }
    },
    async editar ({id, nombre: nombreAnterior}) {
      try {
        const nombre = await this.$q.dialog({
          title: 'Modificar facultad',
          message: 'Nombre:',
          prompt: {model: nombreAnterior, type: 'text'}
        })
        await this.modificarCarrera({id, nombre})
      } catch (error) {
      }
    },
    async remover ({id, nombre}) {
      try {
        await this.$q.dialog({
          message: `¿Desea eliminar la carrera ${nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.eliminar({id, tipo: 'carrera'})
      } catch (error) {
      }
    }
  }
}
</script>
