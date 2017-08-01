<template>
  <div class="row justify-around">
    <PerfilAlumno />
    <MenuAlumno />
  </div>
</template>

<style scoped>
.row {
  margin-top: 3%;
}
</style>

<script>
import PerfilAlumno from './PerfilAlumno.vue'
import MenuAlumno from './MenuAlumno.vue'
export default {
  components: {PerfilAlumno, MenuAlumno}
}
</script>
