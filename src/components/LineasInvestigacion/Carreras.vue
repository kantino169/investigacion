<template>
  <lista-con-botones
    :elements="carreras"
    @set="$emit('set', $event)"
    @edit="$emit('edit', $event)"
    @remove="$emit('remove', $event)"
    @add="$emit('add')">
    No hay carreras actualmente
  </lista-con-botones>
</template>

<script>
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
  }
}
</script>
