<template>
  <div>
    <div>
      <h4>Administrar</h4>  
    </div>
    <div class="row"> 
      <div>
        <table class="q-table bordered striped">
          <tr></tr>
            <th>Usuario actual</th>
          <tbody>
            <td>{{this.$store.state.user.email}}</td>
          </tbody>
        </table>
      </div>
      <div class="justify-around">
        <button class="primary big buttons"
          v-for="button of buttons"
          :key="button.title"
          :title="button.title"
          v-link="button.link"><i class="on-left">{{button.icon}}</i>{{button.title}}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  button {
    margin: 10px 10px;
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
