<template>
<div>
  <div>
    <h4 style="text-align: center">Disciplinas de estudio</h4>
  </div>
    <table class="q-table bordered full-width"> 
        <tr>
            <td>Id</td>
            <td>Nombre</td>
            <td colspan="2"></td>
        </tr>
        <tr v-for="disciplina in disciplinas"
            :key="disciplina.id">
            <td class="">{{disciplina.id}}</td>
            <td class="">{{disciplina.nombre}}</td>
            <td><button class="orange" @click="updateDisciplineCreationDialog(disciplina)">Modificar disciplina</button></td>
            <td><button class="red" @click="confirmRemoval(disciplina)">Eliminar disciplina</button></td>
        </tr>
    </table>
    <button class="primary" @click="newDisciplineCreationDialog()">Crear nueva disciplina</button>
</div>
</template>

<script>
import {Dialog, Toast} from 'quasar'
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState({disciplinas: 'studyDisciplines'})
  },
  mounted () {
    this.getDisciplinasDeEstudio()
  },
  methods: {
    ...mapActions({
      getDisciplinasDeEstudio: 'get-disciplines',
      createDiscipline: 'create-studyDiscipline',
      updateDiscipline: 'update-studyDiscipline',
      deleteDiscipline: 'remove-studyDiscipline'
    }),
    newDisciplineCreationDialog () {
      Dialog.create({
        title: 'Crear nueva disciplina de estudio',
        form: {
          name: {
            type: 'textbox',
            label: 'Nombre',
            model: ''
          }
        },
        buttons: [
          'Cancelar', {
            label: 'Crear',
            handler: (data) => { this.createDiscipline(data) }
          }
        ]
      })
    },
    updateDisciplineCreationDialog (disciplina) {
      Dialog.create({
        title: 'Editar disciplina de estudio',
        form: {
          name: {
            type: 'textbox',
            label: 'Nombre',
            model: disciplina.name
          }
        },
        buttons: [
          'Cancelar', {
            label: 'Modificar',
            handler: (data) => { this.updateDiscipline(Object.assign(data, {id: disciplina.id})) }
          }
        ]
      })
    },
    confirmRemoval (disciplina) {
      Dialog.create({
        title: 'Seguro que desea eliminar esta disciplina de estudio?',
        buttons: [
          'No', {
            label: 'Si',
            handler: () => this.deleteDiscipline(disciplina).catch((error) => Toast.create.negative({html: error.toString()}))}
        ]
      })
    }
  }
}
</script>
