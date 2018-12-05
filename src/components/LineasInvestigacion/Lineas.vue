<template>
  <lista-con-botones
    :elements="lineas"
    @set="$emit('set', $event)"
    @edit="editar($event)"
    @remove="remover($event)"
    @add="agregar()">
    No hay lineas actualmente
  </lista-con-botones>
</template>

<script>
import ListaConBotones from './ListaConBotones'
import {mapActions} from 'vuex'
export default {
  components: {ListaConBotones},
  props: {
    subgrupo: Object
  },
  computed: {
    lineas () {
      return this.$store.getters['facultad/lineas'](this.subgrupo.id)
    }
  },
  methods: {
    ...mapActions('facultad', ['crearLinea', 'modificarLinea', 'eliminar']),
    async agregar () {
      try {
        const idSubgrupo = this.subgrupo.id
        const nombre = await this.$q.dialog({
          title: 'Nueva Linea',
          message: 'Nombre:',
          prompt: {model: '', type: 'text'}
        })
        await this.crearLinea({nombre, idSubgrupo})
      } catch (error) {
      }
    },
    async editar ({id, nombre: nombreAnterior}) {
      try {
        const nombre = await this.$q.dialog({
          title: 'Modificar Linea',
          message: 'Nombre:',
          prompt: {model: nombreAnterior, type: 'text'}
        })
        await this.modificarLinea({id, nombre})
      } catch (error) {
      }
    },
    async remover ({id, nombre}) {
      try {
        await this.$q.dialog({
          message: `¿Desea eliminar la linea ${nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.eliminar({id, tipo: 'linea'})
      } catch (error) {
      }
    }
  }
}
</script>
