<template>
  <div :title="cont">
    <button @click="calc(1)">+</button>
    <button @click="calc(-1)">-</button>
    <Contador :cont="cont"/>
  </div>
</template>

<script>
import Contador from './Contador.vue'

export default {
  components: {Contador},

  data: () => ({
    cont: 0
  }),

  computed: {
    mayor5 () {
      return this.cont >= 5
    }
  },

  methods: {
    calc (num) {
      this.cont += num
    }
  }
}
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>
