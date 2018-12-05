<template>
  <lista-con-botones
    :elements="subgrupos"
    @set="$emit('set', $event)"
    @edit="editar($event)"
    @remove="remover($event)"
    @add="agregar">
    No hay subgrupos actualmente
  </lista-con-botones>
</template>

<script>
import ListaConBotones from './ListaConBotones'
import {mapActions} from 'vuex'
export default {
  components: {ListaConBotones},
  props: {
    grupo: Object
  },
  computed: {
    subgrupos () {
      return this.$store.getters['facultad/subgrupos'](this.grupo.id)
    }
  },
  methods: {
    ...mapActions('facultad', ['crearSubgrupo', 'modificarSubgrupo', 'eliminar']),
    async agregar () {
      try {
        const idGrupo = this.grupo.id
        const nombre = await this.$q.dialog({
          title: 'Nuevo Subgrupo',
          message: 'Nombre:',
          prompt: {model: '', type: 'text'}
        })
        await this.crearSubgrupo({nombre, idGrupo})
      } catch (error) {
      }
    },
    async editar ({id, nombre: nombreAnterior}) {
      try {
        const nombre = await this.$q.dialog({
          title: 'Modificar Subgrupo',
          message: 'Nombre:',
          prompt: {model: nombreAnterior, type: 'text'}
        })
        await this.modificarSubgrupo({id, nombre})
      } catch (error) {
      }
    },
    async remover ({id, nombre}) {
      try {
        await this.$q.dialog({
          message: `¿Desea eliminar el subgrupo ${nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.eliminar({id, tipo: 'subgrupo'})
      } catch (error) {
      }
    }
  }
}
</script>
