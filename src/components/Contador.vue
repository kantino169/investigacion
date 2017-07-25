<template>
  <div>
    <h3>{{cont}}</h3>
    <h1 v-if="mayor5">Ha llegado a 5</h1>
  </div>
</template>

<script>
export default {
  props: ['cont'],

  computed: {
    mayor5 () {
      return this.cont >= 5
    }
  }
}
</script>
