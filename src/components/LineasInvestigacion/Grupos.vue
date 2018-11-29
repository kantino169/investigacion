<template>
  <lista-con-botones
    :elements="grupos"
    @set="$emit('set', $event)"
    @edit="$emit('edit', $event)"
    @remove="$emit('remove', $event)"
    @add="$emit('add')">
    No hay grupos actualmente
  </lista-con-botones>
</template>

<script>
import ListaConBotones from './ListaConBotones'
export default {
  components: {ListaConBotones},
  props: {
    carrera: Object
  },
  computed: {
    grupos () {
      return this.$store.getters['facultad/grupos'](this.carrera.id)
    }
  }
}
</script>
