<template>
  <div class="row justify-around">
    <PerfilAdministrador class="gt-md-width-2of3"/>
    <MenuAdministrador class="gt-md-width-3of5"/>
  </div>
</template>

<style scoped>
.row {
  margin-top: 3%;
}
</style>


<script>
import MenuAdministrador from './MenuAdministrador.vue'
import PerfilAdministrador from './PerfilAdministrador.vue'
export default {
  components: {MenuAdministrador, PerfilAdministrador}
}
</script>
