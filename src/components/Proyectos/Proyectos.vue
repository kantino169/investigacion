<template>
  <div class="">
    <div>
      <h4>Proyectos</h4>
    </div>
    <div class="row justify-around">
      <button class="primary buttons" @click="createNewProject()">Nuevo Proyecto</button>
    </div>
    <div>
      <table class="q-table bordered striped cell-delimeter full-width">
        <tr>
          <th>Id</th>
          <th>Nombre</th>
        </tr>
        <tbody>
          <tr v-for="proyecto in proyectos" :key="proyecto.id">
            <td>{{proyecto.id}}</td>
            <td>{{proyecto.titulo}}</td>
            <td><button class="red" @click="confirmRemoval(proyecto)">Borrar proyecto</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {Dialog} from 'quasar'
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState({proyectos: 'projects'})
  },
  mounted () {
    this.getProyectos()
  },
  methods: {
    ...mapActions({
      getProyectos: 'get-projects',
      deleteProject: 'remove-project'
    }),
    createNewProject () {
      this.$router.push('/proyectos/nuevo')
    },
    confirmRemoval (proyecto) {
      Dialog.create({
        title: 'Seguro que desea eliminar este proyecto?',
        buttons: [
          'No', {
            label: 'Si',
            handler: () => this.deleteProject(proyecto)
          }
        ]
      })
    }
  }
}
</script>
