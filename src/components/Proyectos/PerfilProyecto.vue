<template>
  <div class="list_with_heading">
    <h4>Proyectos</h4>
    <div class="row justify-around">
      <button class="light"
           v-for="button of buttons" :key="button.title"
           :title="button.title"
           v-link="button.link"><i>{{button.icon}}</i>Nuevo Proyecto</button>
    </div>
    <div class="list">
      <q-collapsible icon="description" v-for="proyecto in proyectos" :key="proyecto.id" :label="proyecto.titulo" >
        <div>{{proyecto.resumen}}</div>
        <div style="text-align: center;">
          <button class="light small"><i class="on-right">remove_red_eye</i>Ver</button>
          <button class="warning small"><i class="on-right">mode_edit</i>Editar</button>
          <button class="red small" @click="deleteProject(proyecto.id)"><i class="on-right">delete</i>Borrar</button>

        </div>
      </q-collapsible>
    </div>
    
  </div>
</template>
<style scoped>
.list_with_heading {
  width: 80%;
}
.list {
  margin-top: 10px;
}
</style>

<script>
import * as api from '../../api'
const buttons = [
    {icon: 'note_add', link: '/proyectos/nuevo', title: 'Cargar Proyecto'}
]
export default {
  data: () => ({ proyectos: [], buttons }),
  async mounted () {
    this.proyectos = await api.getProyectos()
  },
  methods: {
    async deleteProject (id) {
      await api.deleteProyecto(id)
      this.proyectos = this.proyectos.filter(p => p.id !== id)
    }
  }
}
</script>
