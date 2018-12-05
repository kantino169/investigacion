<template>
  <div class="row items-end">
    <q-chips-input class="col-10" disabled float-label="Lineas de investigación" v-model="nombres" />
    <div class="col-2">
      <q-btn class="full-width" color="primary" @click="seleccionar">Agregar</q-btn>
    </div>
    <selector-modal ref="modal" />
  </div>
</template>

<script>
import SelectorModal from './Modal'

export default {
  components: {SelectorModal},
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    nombres: {
      get () {
        return this.value.map(l => l.nombre)
      },
      set (lineas) {
        this.$emit('input', this.value.filter(l => lineas.includes(l.nombre)))
      }
    }
  },
  methods: {
    async seleccionar () {
      try {
        const linea = await this.$refs.modal.open()
        this.$emit('input', this.value.concat(linea))
      } catch (error) {}
    }
  }
}
</script>
