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
  {icon: 'description', link: '/proyectos', title: 'Proyectos'}, {icon: 'supervisor_account', link: '/profesores', title: 'Profesores/Investigadores'}, {icon: 'face', link: '/alumnos', title: 'Alumnos'}, {icon: 'assignment', link: '/evaluaciones', title: 'Evaluaciones'}, {icon: 'reorder', link: '/lineasInvestigacion', title: 'Lineas de Investigacion'}, {icon: 'assessment', link: '/estadisticas', title: 'Estadisticas'}, {icon: 'date_range', link: '/fechasEntrega', title: 'Fechas de entrega'}, {icon: 'assignment_ind', link: '/evaluadores', title: 'Evaluadores'}, {icon: 'important_devices', link: '/equipos', title: 'Equipos'}, {icon: 'list', link: '/disciplinas', title: 'Disciplinas'}
]

export default {
  data: () => ({ buttons })
}
</script>
