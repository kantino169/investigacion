<template>
  <div class="wrapper justify-around">
    <!-- <PerfilAdministrador class=" gt-md-width-1of3"/> <br> -->
    <MenuAdministrador class="gt-md-width-3of5"/>  
  </div>
</template>

<style scoped>
.row {
  margin-top: 3%;
}
.wrapper {
  margin-top: 3%;
  margin-left: 3%;
  margin-right: 3%;
}
</style>


<script>
import MenuAdministrador from './MenuAdministrador.vue'
import PerfilAdministrador from './PerfilAdministrador.vue'
export default {
  components: {MenuAdministrador, PerfilAdministrador},
  mounted () {
    if (!this.$store.state.user) this.$router.replace('/')
  }
}
</script>
