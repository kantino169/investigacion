<template>
  <div class="row justify-around">
    <PerfilProyecto/>
  </div>
</template>

<script>
import PerfilProyecto from './PerfilProyecto.vue'
import MenuProyecto from './MenuProyecto.vue'
export default {
  components: {PerfilProyecto, MenuProyecto}
}
</script>

<style scoped>
.row {
  margin-top: 3%;
}
</style>
