<template>
  <lista-con-botones
    :elements="facultades"
    @set="$emit('set', $event)"
    @edit="editar($event)"
    @remove="remover($event)"
    @add="agregar">
    No hay facultades actualmente
  </lista-con-botones>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListaConBotones from './ListaConBotones'
export default {
  components: {ListaConBotones},
  computed: {
    ...mapGetters('facultad', ['facultades'])
  },
  methods: {
    ...mapActions('facultad', ['crearFacultad', 'modificarFacultad', 'eliminar']),
    async agregar () {
      try {
        const nombre = await this.$q.dialog({
          title: 'Nueva facultad',
          message: 'Nombre:',
          prompt: {model: '', type: 'text'}
        })
        await this.crearFacultad({nombre})
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
        await this.modificarFacultad({id, nombre})
      } catch (error) {
      }
    },
    async remover ({id, nombre}) {
      try {
        await this.$q.dialog({
          message: `¿Desea eliminar la facultad ${nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.eliminar({id, tipo: 'facultad'})
      } catch (error) {
      }
    }
  }
}
</script>
