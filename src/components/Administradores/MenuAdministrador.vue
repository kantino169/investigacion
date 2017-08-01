<template>
  <div class="width-3of5"> 
    <div class="row wrap justify-around">
        <button class="primary"
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
    width: 18%;
    margin-bottom: 20px;
    height: 80px;
  }

  button > i {
    font-size: 30px;
  }
</style>

<script>
const buttons = [
  {icon: 'description', link: '/proyectos/proyectos', title: 'Proyectos'}, {icon: 'supervisor_account', link: '/profesores/profesores', title: 'Profesores/Investigadores'}, {icon: 'face', link: '/alumnos/alumnos', title: 'Alumnos'}, {icon: 'assignment', link: '/evaluaciones/evaluaciones', title: 'Evaluaciones'}, {icon: 'assignment', link: '/lineasInvestigacion/lineasInvestigacion', title: 'Lineas de Investigacion'}, {icon: 'assessment', link: '/estadisticas/estadisticas', title: 'Estadisticas'}, {icon: 'date_range', link: '/fechasEntrega/fechasEntrega', title: 'Fechas de entrega'}, {icon: 'assignment_ind', link: '/evaluadores/evaluadores', title: 'Evaluadores'}, {icon: 'important_devices', link: '/equipos/equipos', title: 'Equipos'}, {icon: 'list', link: '/disciplinas/disciplinas', title: 'Disciplinas'}
]

export default {
  data: () => ({ buttons })
}
</script>
