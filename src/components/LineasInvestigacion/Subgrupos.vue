<template>
  <lista-con-botones
    :elements="subgrupos"
    @set="$emit('set', $event)"
    @edit="$emit('edit', $event)"
    @remove="$emit('remove', $event)"
    @add="$emit('add')">
    No hay subgrupos actualmente
  </lista-con-botones>
</template>

<script>
import ListaConBotones from './ListaConBotones'
export default {
  components: {ListaConBotones},
  props: {
    grupo: Object
  },
  computed: {
    subgrupos () {
      return this.$store.getters['facultad/subgrupos'](this.grupo.id)
    }
  }
}
</script>
