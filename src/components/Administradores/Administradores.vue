<template>
  <div class="row justify-around">
    <PerfilAdministrador/>
    <MenuAdministrador/>
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
