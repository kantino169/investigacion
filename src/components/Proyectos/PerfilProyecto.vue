<template>
  <div class="list_with_heading width-1of6">
    <h4>Proyectos</h4>
    <ul id="menuProyecto">
      <li v-for="proyecto in proyectos" :key="proyecto.id">{{proyecto.nombre}}</li>
    </ul>
    <div class="row justify-around">
      <button class="primary circular"
          v-for="button of buttons"
          :key="button.title"
          :title="button.title"
          v-link="button.link">
          <i>{{button.icon}}</i>
        </button>
    </div>
  </div>
</template>

<style scoped>
  .list_with_heading {
    font-weight: normal;
  }
  .row {
    margin: auto;
  }
  
</style>

<script>
const proyectos = [
  {nombre: 'A', id: '1'}, {nombre: 'B', id: '1'}
]
const buttons = [
  {icon: 'note_add', link: '/proyectos/nuevo', title: 'Cargar Proyecto'}, {icon: 'mode_edit', link: '/proyectos/editarproyecto', title: 'Profesores/Investigadores'}
]

export default {
  data: () => ({ proyectos, buttons })
}
</script>
