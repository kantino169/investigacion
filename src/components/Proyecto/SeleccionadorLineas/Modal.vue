<template>
  <q-modal v-model="isOpen">
    <selector-pasos v-if="isOpen" @select="select"/>
  </q-modal>
</template>

<script>
import PromiseModal from '../../../mixins/PromiseModal'
import SelectorPasos from './Pasos'

export default {
  mixins: [PromiseModal],
  components: {SelectorPasos},
  methods: {
    select (linea) {
      this.close()
      this.resolve(linea)
    }
  }
}
</script>
