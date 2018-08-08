<template>
  <div class="list_with_heading">
    <h4>Proyectos</h4>
    <div class="row justify-around">
      <button class="light"
           v-for="button of $options.buttons" :key="button.title"
           :title="button.title"
           v-link="button.link"><i>{{button.icon}}</i>Nuevo Proyecto</button>
    </div>
    <div class="list">
      <q-collapsible icon="description" v-for="proyecto in projects" :key="proyecto.id" :label="proyecto.titulo" >
        <div>{{proyecto.resumen}}</div>
        <div style="text-align: center; margin-top: 2%;">
          <button class="proy light small" v-link="`/proyectos/${proyecto.id}`"><i class="on-right">remove_red_eye</i>Ver</button>
          <button class="proy warning small" v-link="`/proyectos/${proyecto.id}/editar`"><i class="on-right">mode_edit</i>Editar</button>
          <button class="proy red small" @click="deleteProject(proyecto.id)"><i class="on-right">delete</i>Borrar</button>
        </div>
      </q-collapsible>
    </div>
    
  </div>
</template>
<style scoped>
.list_with_heading {
  width: 94%;
}
.list {
  margin-top: 10px;
}

.proy {
  
  width: 30%;
  padding: 0 1px;
}
</style>

<script>
const buttons = [
    {icon: 'note_add', link: '/proyectos/nuevo', title: 'Cargar Proyecto'}
]
export default {
  buttons,
  async mounted () {
    this.$store.dispatch('load-projects')
  },
  computed: {
    projects () {
      return this.$store.state.projects
    }
  },
  methods: {
    async deleteProject (id) {
      await this.$store.dispatch('delete-project', id)
    },
    async getProjecto  (id) {
      this.$store.dispatch('load-project', id)
    }
  }
}
</script>
