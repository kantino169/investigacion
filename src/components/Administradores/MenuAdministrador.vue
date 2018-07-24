<template>
  <div> 
    <div class="row wrap justify-around">
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
  button {
    margin-bottom: 20px;
    /*height: 80px; */
  }

  button > i {
    font-size: 30px;
  }
</style>

<script>
const buttons = [
  {icon: 'description', link: '/proyectos', title: 'Proyectos'}, {icon: 'directions_walk', link: '/usuarios', title: 'Usuarios'}, {icon: 'group_work', link: '/grupos', title: 'Grupos'}, {icon: 'reorder', link: '/lineasInvestigacion', title: 'Lineas de Investigacion'}, {icon: 'list', link: '/disciplinas', title: 'Disciplinas'}, {icon: 'assignment', link: '/evaluaciones', title: 'Evaluaciones'}, {icon: 'date_range', link: '/fechasEntrega', title: 'Fechas de entrega'}, {icon: 'assignment_ind', link: '/evaluadores', title: 'Evaluadores'}, {icon: 'important_devices', link: '/equipos', title: 'Equipos'}
]/* {icon: 'face', link: '/alumnos', title: 'Alumnos'},  */
/* {icon: 'assessment', link: '/estadisticas', title: 'Estadisticas'}, */

export default {
  data: () => ({ buttons })
}
</script>
