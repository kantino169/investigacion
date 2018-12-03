<template>
  <lista-con-botones
    :elements="lineas"
    @set="$emit('set', $event)"
    @edit="$emit('edit', $event)"
    @remove="$emit('remove', $event)"
    @add="$emit('add')">
    No hay lineas actualmente
  </lista-con-botones>
</template>

<script>
import ListaConBotones from './ListaConBotones'
export default {
  components: {ListaConBotones},
  props: {
    subgrupo: Object
  },
  computed: {
    lineas () {
      return this.$store.getters['facultad/lineas'](this.subgrupo.id)
    }
  }
}
</script>
