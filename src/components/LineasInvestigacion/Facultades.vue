<template>
  <lista-con-botones
    :elements="facultades"
    @set="$emit('set', $event)"
    @edit="$emit('edit', $event)"
    @remove="$emit('remove', $event)"
    @add="$emit('add')">
    No hay facultades actualmente
  </lista-con-botones>
</template>

<script>
import { mapGetters } from 'vuex'
import ListaConBotones from './ListaConBotones'
export default {
  components: {ListaConBotones},
  computed: {
    ...mapGetters('facultad', ['facultades'])
  }
}
</script>
